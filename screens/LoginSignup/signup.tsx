import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Keyboard, SafeAreaView, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import ToastManager, { Toast } from "toastify-react-native";
import { hashPassword } from "../../api/crypto";
import { storeJSON } from "../../api/store";
import { sendVertificationCode, signUp } from "../../api/user";
import { SignUpSchema } from "../../api/validations";
import { buttonBuilder } from "../../components/button";
import { inputBuilder, secureInputBuilder } from "../../components/input";
import { recycledStyles, toastManagerProps } from "../../components/recycled-style";
import showAlert from "../../components/showAlert";
import { parseError } from "../../components/toasts";
export default function SignUpForm({ navigation }: any) {
  const [apiInUse, setApiInUse] = useState<boolean>(true);

  useEffect(() => {
    prepare();
  }, []);

  async function prepare() {
    setApiInUse(false);
  }

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: SignUpSchema,
    onSubmit: async (data) => {
      setApiInUse(true);

     

      const signUpResponse = await signUp(data.email, data.password, data.phoneNumber, data.firstName, data.lastName, data.confirmPassword);

      if (signUpResponse.status !== 200) {
        Toast.error(parseError(signUpResponse));
        setApiInUse(false);

        return;
      }

      

     

      await storeJSON("userDetails", data);

      setApiInUse(false);

      showAlert("Alert", `"We have sent an Vertification Code to your email  "   ${data.email} \n Please Check Your Gmail`, () => {
        setApiInUse(false);
        navigation.push("VerifyCode");
      });
    },
  });

  return (
    <SafeAreaView style={[recycledStyles.safeAreaView, { justifyContent: "center" }]}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}>
          <Text style={recycledStyles.title}> SignUp</Text>
          <ToastManager {...toastManagerProps} />
          {inputBuilder("Enter your firstname", "firstName", formik)}
          {inputBuilder("Enter your lastname", "lastName", formik)}
          {inputBuilder("Enter your Phone Number", "phoneNumber", formik)}
          {inputBuilder("Enter your email", "email", formik)}
          {secureInputBuilder("Enter your password", "password", formik)}
          {secureInputBuilder("Confrim your password", "confirmPassword", formik)}
          {buttonBuilder("SignUp", formik.handleSubmit, apiInUse)}

          <View style={styles.buttonContainer}>
            <Text style={recycledStyles.normalText}> Have an Account? </Text>
            {buttonBuilder(
              "Login",
              () => {
                navigation.goBack();
              },
              apiInUse,
              undefined,
              true
            )}
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "baseline",
  },
});
