import { useFormik } from "formik";

import React, { useEffect, useState } from "react";
import { Keyboard, SafeAreaView, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import ToastManager, { Toast } from "toastify-react-native";
import { hashPassword } from "../../api/crypto";
import { dispose, snatch } from "../../api/store";
import { resetPassword } from "../../api/user";
import { resetpassword } from "../../api/validations";
import { buttonBuilder } from "../../components/button";
import { secureInputBuilder } from "../../components/input";
import { recycledStyles, toastManagerProps } from "../../components/recycled-style";
import showAlert from "../../components/showAlert";
import { parseError } from "../../components/toasts";

export default function ResetPassword({ navigation }: any) {
  const [apiInUse, setApiInUse] = useState<boolean>(true);
  const [email, setEmail] = useState("");
  async function prepare() {
    setApiInUse(false);
    const userEmail = await snatch("userEmail"); // assuming snatch returns a string

    if (userEmail) {
      setEmail(userEmail);
    } else {
      setApiInUse(true);
      showAlert("Alert", `"Reset Password Process failed \n Plese try again" `, () => {
        navigation.replace("Login");
      });
    }
  }

  useEffect(() => {
    prepare();
  }, []);

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: resetpassword,
    onSubmit: async (data) => {
      setApiInUse(true);

     
      const response = await resetPassword(email, data.password, data.confirmPassword);

      if (response.status !== 200) {
        setApiInUse(false);
        data.password = "";
        data.confirmPassword = "";

        Toast.error(parseError(response));

        return;
      }
      setApiInUse(false);

      showAlert("Alert", `"Password changed successfully  `, async () => {
        try {
          await dispose("userEmail");
        } catch (error) {
          showAlert("Alert", `"Somme error happen when deleting the "userEmail" key from Expo Secure Storage `);
        } finally {
          navigation.replace("Login");
        }
      });
    },
  });

  return (
    <SafeAreaView style={recycledStyles.safeAreaView}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}>
          <Text style={recycledStyles.title}> SignUp</Text>
          <ToastManager {...toastManagerProps} />

          {secureInputBuilder("Enter your New password", "password", formik)}
          {secureInputBuilder("Confrim your New  password", "confirmPassword", formik)}
          {buttonBuilder("Reset Password", formik.handleSubmit, apiInUse)}

          <View style={styles.buttonContainer}>
            <Text style={recycledStyles.normalText}> Remember Your Account? </Text>
            {buttonBuilder(
              "Login",
              () => {
                navigation.replace("Login");
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
