import { useRoute } from "@react-navigation/core";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Dimensions, Keyboard, SafeAreaView, ScrollView, TouchableWithoutFeedback, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ToastManager, { Toast } from "toastify-react-native";
import { editItem } from "../../../api/genericItem";
import { createGenericItemSchema } from "../../../api/validations";
import { buttonBuilder } from "../../../components/button";
import { inputBuilder } from "../../../components/input";
import CheckBoxExample from "../../../components/meatTypesDropDown";
import { createItemPropsStyles, createModalStyles, toastManagerProps } from "../../../components/recycled-style";
import showAlert from "../../../components/showAlert";
import { parseError } from "../../../components/toasts";
import "../../../extension/extension";
import { popWithParams } from "../../../utils/routes";

const EditGenericItem = ({ navigation }: { navigation: any }) => {
  const [apiInUse, setApiInUse] = useState<boolean>(true);

  const route = useRoute(); // ✅ Get the route object
  const { itemDetails } = route.params as { itemDetails: any };

  useEffect(() => {
    prepare();
  }, []);

  function prepare() {
    setApiInUse(false);
    formik.setValues({
      name: itemDetails.name,
      description: itemDetails.description,
      foodTypes: itemDetails.foodPreferences,
    });
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      foodTypes: [],
    },
    validationSchema: createGenericItemSchema,
    onSubmit: async (values) => {
      setApiInUse(true);

      const itemResponse = await editItem(
        itemDetails.id,
        values.name,

        values.description,
        values.foodTypes
      );
      if (itemResponse.data.success !== true) {
        Toast.error(parseError(itemResponse));
        setApiInUse(false);
        return;
      }

      showAlert("Sucess", `Successfully Item Edited  `, async () => {
        popWithParams(navigation, 2, { refresh: true });
      });
      setApiInUse(false);
    },
  });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }} keyboardShouldPersistTaps="handled">
        <SafeAreaView style={{ flex: 1, backgroundColor: "#12193D", paddingTop: 10 }}>
          <View style={createModalStyles.container}>
            <ToastManager {...toastManagerProps} />
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
              <View style={[createModalStyles.card, { marginVertical: 10 }]}>
                {inputBuilder("Enter your Generic  Name", "name", formik, {
                  multiline: true,
                  style: createItemPropsStyles.itemName,
                })}

                <CheckBoxExample formik={formik} valueName="foodTypes" />
                {inputBuilder("Enter your Generic Description", "description", formik, {
                  multiline: true,
                  style: createItemPropsStyles.itemDescription,
                })}
                {buttonBuilder("Save", formik.handleSubmit, apiInUse)}
                {buttonBuilder(
                  "Cancel",
                  () => {
                    navigation.goBack();
                  },
                  apiInUse,
                  undefined,
                  true
                )}
              </View>
            </ScrollView>
          </View>
        </SafeAreaView>
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  );
};

export default EditGenericItem;

const { width, height } = Dimensions.get("window");
