import showAlert from "../../components/showAlert";

import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Keyboard, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ToastManager, { Toast } from "toastify-react-native";
import { changePhoneNumber } from "../../api/userEdit";
import { changePhoneNumberSchema, resetpassword } from "../../api/validations";
import { buttonBuilder } from "../../components/button";
import { inputBuilder } from "../../components/input";
import { recycledStyles, toastManagerProps } from "../../components/recycled-style";
import { parseError } from "../../components/toasts";
import { useRoute } from "@react-navigation/core";
export default function EditPhoneNumber({ navigation }: { navigation: any }) {
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
      newPhoneNumber: "",
      confirmPhoneNumber: "",
    },
    validationSchema: changePhoneNumberSchema,
    onSubmit: async (values) => {
      setApiInUse(true);

      const updatedUser = await changePhoneNumber(values.newPhoneNumber, currentUser.id);
      if (updatedUser.status !== 200 && updatedUser.data.success !== true) {
        Toast.error(parseError(updatedUser));
        setApiInUse(false);
        return;
      }

      setApiInUse(false);
      Toast.success(`Successfully changed the phone Number!`);
      showAlert("Sucess", `Successfully changed the phoneNumber!`, async () => {
        navigation.goBack();
      });
    },
  });

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          <ToastManager {...toastManagerProps} />

          <ScrollView>
            <View style={styles.headerTitle}>
              <Text style={recycledStyles.title}>Change Phone Number</Text>
              <Text style={[recycledStyles.normalText, { textAlign: "left" }]}>Your Current phone number is:
              {<Text style={[recycledStyles.normalText, { fontWeight: "bold" }]}>{currentUser.phoneNumber} </Text>}
                 </Text>
            </View>
            <View style={styles.inputs}>
              {inputBuilder("Enter your new  phone number", "newPhoneNumber", formik)}
              {inputBuilder("Confrim your phone number", "confirmPhoneNumber", formik)}
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
