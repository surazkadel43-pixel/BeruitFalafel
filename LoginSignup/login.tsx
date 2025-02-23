import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Keyboard, SafeAreaView, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";

import ToastManager, { Toast } from "toastify-react-native";
import { hashPassword } from "../api/crypto";
import { store } from "../api/store";
import { logIn } from "../api/user";
import { authentication } from "../api/validations";
import { buttonBuilder } from "../components/button";
import { inputBuilder, secureInputBuilder } from "../components/input";
import { recycledStyles, toastManagerProps } from "../components/recycled-style";
import { parseError } from "../components/toasts";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  LoginNavigator: undefined;
  BottomTabs: undefined;
};

export default function LoginForm({ navigation }: any) {
  const [apiInUse, setApiInUse] = useState<boolean>(true);
  const myNavigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    prepare();
  }, []);

  async function prepare() {
    setApiInUse(false);
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: authentication,
    onSubmit: async (values) => {
      setApiInUse(true);
      const hashedPassword = await hashPassword(values.password);

      const logInRes = await logIn(values.email, hashedPassword);

      if (logInRes.status !== 200) {
        
        Toast.error(parseError(logInRes));

        setApiInUse(false);

        return;
      }

      await store("authCookie", logInRes.data.customToken);
      Toast.success("Successfully logged in!");
      setApiInUse(false);

      myNavigation.reset({
        index: 0,
        routes: [{ name: "BottomTabs" }], // This replaces the entire stack
      });
      //navigation.replace("BottomTabs");
    
    },
  });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={recycledStyles.safeAreaView}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}>
          <Text style={recycledStyles.title}> LOGIN</Text>
          <ToastManager {...toastManagerProps} />
          {inputBuilder("Enter your email", "email", formik)}
          {secureInputBuilder("Enter your password", "password", formik)}
          <View style={styles.buttonContainer}>
            {buttonBuilder("Login", formik.handleSubmit, apiInUse)}
            {buttonBuilder(
              "SignUp",
              () => {
                navigation.push("SignUp");
              },
              apiInUse,
              undefined,
              true
            )}
            {buttonBuilder(
              "Forget Password",
              () => {
                navigation.push("ForgotPassword");
              },
              apiInUse,
              undefined,
              false
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
    backgroundColor: "#12193D",
    //alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1e3a8a",
    marginBottom: 20,
  },

  buttonContainer: {
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",

    flexWrap: "wrap",
    columnGap: "15",
  },
});
