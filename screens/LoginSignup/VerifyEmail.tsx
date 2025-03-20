// VerifyEmail.tsx (Email Verification Screen)

import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Keyboard, SafeAreaView, StyleSheet, Text, TouchableWithoutFeedback } from "react-native";
import ToastManager, { Toast } from "toastify-react-native";
import { store } from "../../api/store";
import { verifyEmail } from "../../api/user";
import { authenticationEmail } from "../../api/validations";
import { buttonBuilder } from "../../components/button";
import { inputBuilder } from "../../components/input";
import { recycledStyles, toastManagerProps } from "../../components/recycled-style";
import showAlert from "../../components/showAlert";
import { parseError } from "../../components/toasts";

export default function VerifyEmail({ navigation }: any) {
  const [apiInUse, setApiInUse] = useState<boolean>(true);

  async function prepare() {
    setApiInUse(false);
  }

  useEffect(() => {
    prepare();
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: authenticationEmail,
    onSubmit: async (values) => {
      const email = values.email;
      setApiInUse(true); // Set API in use to disable buttons

      if (!email) {
        showAlert("Alert", `"Reset Password Process failed \n Plese try again"  ${email}`);
        return;
      }

      const resEmail = await verifyEmail(email);

      if (resEmail.status !== 200) {
        setApiInUse(false);
        Toast.error(parseError(resEmail));
        return;
      }

      setApiInUse(false);

      showAlert("Sucess", `"Email Vertified SucessFully \n Account found in Database  `, async () => {
        try {
          await store("userEmail", email);
        } catch (error) {
          showAlert("Alert", `"Somme error happen when adding the "userEmail" key to Expo Secure Storage `);
        } finally {
          navigation.push("VerifyResetCode");
        }
      });
    },
  });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={[recycledStyles.safeAreaView, { justifyContent: "center" }]}>
        <Text style={recycledStyles.title}> Verify Your Email</Text>
        <ToastManager {...toastManagerProps} />
        {inputBuilder("Enter your email", "email", formik)}
        {buttonBuilder("Verify", formik.handleSubmit, apiInUse, undefined, true)}
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1e3a8a",
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 20,
    color: "#374151",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#ffffff",
    padding: 12,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    fontSize: 20,
    color: "#1f2937",
  },
  errorText: {
    color: "#dc2626",
    marginTop: 5,
    fontSize: 16,
  },
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: "#2563eb",
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 20,
  },
});
