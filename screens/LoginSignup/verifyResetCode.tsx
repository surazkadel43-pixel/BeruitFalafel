// VerifyEmail.tsx (Email Verification Screen)

import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Keyboard, SafeAreaView, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import ToastManager, { Toast } from "toastify-react-native";
import { snatch } from "../../api/store";
import { sendVertificationCode, verify6DigitCode } from "../../api/user";
import { validationCode } from "../../api/validations";
import { buttonBuilder } from "../../components/button";
import { inputBuilder } from "../../components/input";
import { recycledStyles, toastManagerProps } from "../../components/recycled-style";
import showAlert from "../../components/showAlert";
import { parseError } from "../../components/toasts";

export default function VerifyResetCode({ navigation }: any) {
  const [apiInUse, setApiInUse] = useState<boolean>(true);
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  async function prepare() {
    setApiInUse(false);
    const userEmail = await snatch("userEmail"); // assuming snatch returns a string

    if (userEmail) {
      showAlert("Alert", `"We have sent an Vertification Code to your email  "   ${userEmail} \n Please Check Your Gmail`, () => {
        setApiInUse(false);
      });
      setEmail(userEmail);
    } else {
      setApiInUse(true);
      showAlert("Alert", `"Reset Password Process failed \n Plese try again" `, () => {
        navigation.goBack();
      });
    }
  }

  useEffect(() => {
    prepare();
  }, []);

  const formik = useFormik({
    initialValues: {
      code: "",
    },
    validationSchema: validationCode,
    onSubmit: async (values) => {
      const verificationCode = values.code;
      setApiInUse(true);

      if (verificationCode.length !== 6) {
        (values.code = ""), setApiInUse(false);
        Toast.success("Please enter a valid 6-digit code.");
        return;
      }

      const verifyRes = await verify6DigitCode(email, verificationCode);
      if (verifyRes.status !== 200) {
        (values.code = ""), Toast.error(parseError(verifyRes));
        setApiInUse(false);

        return;
      }

      setApiInUse(false);

      showAlert("Alert", `"Vertification Code authenticated SucessFully \n User Vertified Sucessfully `, async () => {
        setApiInUse(false);
        navigation.push("ResetPassword");
      });
    },
  });

  const handleResendCode = async () => {
    setApiInUse(true);

    const vertificatioRes = await sendVertificationCode(email);

    if (vertificatioRes.status !== 200) {
      Toast.error(parseError(vertificatioRes));
      setApiInUse(false);
      return;
    }

    setApiInUse(false);

    showAlert("Alert", `"New Vertification Code has been  SucessFully sent to the email${email} \n Please Check Your Gmail `, () => {
      setApiInUse(false);
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={recycledStyles.safeAreaView}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}>
          <Text style={recycledStyles.title}> Verify Reset Code</Text>
          <ToastManager {...toastManagerProps} />
          {inputBuilder("Enter your code", "code", formik, {
            keyboardType: "numeric", // Only numeric input
            maxLength: 6, // Limit the input to 6 digits
          })}
          {buttonBuilder("Verify", formik.handleSubmit, apiInUse)}
          <View style={styles.buttonContainer}>{buttonBuilder("Resend Code", handleResendCode, apiInUse, undefined, true)}</View>
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    justifyContent: "center",
    padding: 20,
  },

  buttonContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch",
  },
});
