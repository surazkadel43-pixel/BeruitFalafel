import showAlert from "../../components/showAlert";

import { useRoute } from "@react-navigation/core";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Keyboard, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ToastManager, { Toast } from "toastify-react-native";
import { changeName } from "../../api/userEdit";
import { changeNameSchema } from "../../api/validations";
import { buttonBuilder } from "../../components/button";
import { inputBuilder } from "../../components/input";
import { recycledStyles, toastManagerProps } from "../../components/recycled-style";
import { parseError } from "../../components/toasts";
export default function EditName({ navigation }: { navigation: any }) {
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
      firstName: "",
      lastName: "",
    },
    validationSchema: changeNameSchema,
    onSubmit: async (values) => {
      setApiInUse(true);

      const updatedUser = await changeName(values.firstName, values.lastName, currentUser.id);
      if (updatedUser.status !== 200 && updatedUser.data.success !== true) {
        Toast.error(parseError(updatedUser));
        setApiInUse(false);
        return;
      }

      setApiInUse(false);
      Toast.success(`Successfully changed the Name!`);
      showAlert("Sucess", `Successfully changed the Name!`, () => {
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
              <Text style={recycledStyles.title}>Change Name</Text>
              <Text style={[recycledStyles.normalText, { textAlign: "left" }]}>
                Introduce your account with a full name. Your current name is:{" "}
                {<Text style={[recycledStyles.normalText, { fontWeight: "bold" }]}>{currentUser.firstName} {currentUser.lastName}</Text>}
              </Text>
            </View>
            <View style={styles.inputs}>
              {inputBuilder("Enter your new  First Name", "firstName", formik)}
              {inputBuilder("Enter your new Last Name", "lastName", formik)}
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
