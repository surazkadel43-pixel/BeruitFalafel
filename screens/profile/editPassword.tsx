import showAlert from "../../components/showAlert";
import { useRoute } from "@react-navigation/core";
import { CommonActions } from "@react-navigation/core";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ToastManager, { Toast } from "toastify-react-native";
import { dispose } from "../../api/store";
import { changePassword } from "../../api/userEdit";
import { changePasswordSchema } from "../../api/validations";
import { buttonBuilder } from "../../components/button";
import { secureInputBuilder } from "../../components/input";
import { recycledStyles, toastManagerProps } from "../../components/recycled-style";
import { parseError } from "../../components/toasts";
export default function EditPassword({ navigation }: { navigation: any }) {
  const [apiInUse, setApiInUse] = useState<boolean>(true);
  const route = useRoute();
  const { currentUser } = route.params as { currentUser: any };
  async function prepare() {
    setApiInUse(false);
  }

  useEffect(() => {
    prepare();
  }, []);

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: changePasswordSchema,
    onSubmit: async (values) => {
      setApiInUse(true);

      const updatedUser = await changePassword(values.newPassword, values.confirmPassword, currentUser.id);
      if (updatedUser.status !== 200 && updatedUser.data.success !== true) {
        Toast.error(parseError(updatedUser));
        setApiInUse(false);
        return;
      }

      await dispose("authCookie");

      setApiInUse(false);
      Toast.success(`Successfully changed the password!`);
      showAlert("Sucess", `Successfully changed the password!`, async () => {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "LoginNavigator" }],
          })
        );
      });
    },
  });

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <TouchableWithoutFeedback>
        <View style={{ flex: 1 }}>
          <ToastManager {...toastManagerProps} />

          <ScrollView>
            <View style={styles.headerTitle}>
              <Text style={recycledStyles.title}>Change Password</Text>
              <Text style={[recycledStyles.normalText, { textAlign: "left" }]}>
                Protect your account with a unique password at least 8 character long. Please note that changing the password will result in logging
                out of your account on all devices.
              </Text>
            </View>
            <View style={styles.inputs}>
              {secureInputBuilder("Enter your new  password", "newPassword", formik)}
              {secureInputBuilder("Confrim your new password", "confirmPassword", formik)}
            </View>
            <View style={styles.buttons}>
              {buttonBuilder("Save", formik.handleSubmit, apiInUse, undefined, true)}
              {buttonBuilder(
                "Cancel",
                () => {
                  navigation.goBack();
                },
                apiInUse
              )}
            </View>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: "#12193D",
    paddingHorizontal: 0,
    paddingTop: 10,
    justifyContent: "center",
  },
  buttonLogout: {
    borderRadius: 10,
    elevation: 8,
    backgroundColor: "#4C5BD4", // 1c4063
    paddingVertical: 10,
    paddingHorizontal: 12,
    margin: 15,
  },
  headerTitle: {
    alignItems: "flex-start",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  buttons: {
    marginVertical: 10,
    paddingHorizontal: 15,
    rowGap: 10,
  },
  inputs: {
    paddingHorizontal: 5,
  },
});
