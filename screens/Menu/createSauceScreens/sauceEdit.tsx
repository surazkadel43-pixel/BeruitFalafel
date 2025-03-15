import { useRoute } from "@react-navigation/core";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Dimensions, Keyboard, ScrollView, TouchableWithoutFeedback, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ToastManager, { Toast } from "toastify-react-native";
import { editSauce } from "../../../api/sauce";
import { createItemSchema } from "../../../api/validations";
import { buttonBuilder } from "../../../components/button";
import { inputBuilder } from "../../../components/input";
import CheckBoxExample from "../../../components/meatTypesDropDown";
import { createModalStyles, toastManagerProps } from "../../../components/recycled-style";
import { parseError } from "../../../components/toasts";
import "../../../extension/extension";

const EditSauce = ({ navigation }: { navigation: any }) => {
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
      price: itemDetails.price.toString().toCurrency(),
      description: itemDetails.description,
      foodTypes: itemDetails.foodPreferences,
    });
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      description: "",
      foodTypes: [],
    },
    validationSchema: createItemSchema,
    onSubmit: async (values) => {
      console.log(values);
      setApiInUse(true);
      const numericPrice = parseFloat(values.price.replace(/[^0-9.]/g, "")) || 0;
      const itemResponse = await editSauce(
        itemDetails.id,
        values.name,
        numericPrice, // Ensure price is a number
        values.description,
        values.foodTypes
      );
      if (itemResponse.data.success !== true) {
        Toast.error(parseError(itemResponse));
        setApiInUse(false);
        return;
      }

      Toast.success("Successfully Item created in!");
      setApiInUse(false);
    },
  });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAwareScrollView contentContainerStyle={{ flex: 1}} keyboardShouldPersistTaps="handled">
        <ToastManager {...toastManagerProps} />
        <View style={createModalStyles.container}>
          <ScrollView contentContainerStyle={{}} showsVerticalScrollIndicator={false}>
            <View style={[createModalStyles.card, { marginVertical: 19, marginHorizontal: 10 }]}>
              {inputBuilder("Enter your Item Name", "name", formik, {
                multiline: true,
                style: {
                  backgroundColor: "#1e2124",
                  color: "white",
                  borderRadius: 8,
                  fontSize: 20,
                  minHeight: height * 0.08,
                  maxHeight: height * 0.3,
                  borderColor: "white",
                  borderWidth: 2,
                  padding: 10,
                },
              })}
              {inputBuilder("Enter your Item Price", "price", formik, {
                multiline: true,
                keyboardType: "numeric",
                onChangeText: (text: string) => {
                  formik.setFieldValue("price", text.toCurrency());
                },
                style: {
                  backgroundColor: "#1e2124",
                  color: "white",
                  borderRadius: 8,
                  fontSize: 20,
                  minHeight: height * 0.08,
                  maxHeight: height * 0.3,
                  borderColor: "white",
                  borderWidth: 2,
                  padding: 10,
                },
              })}
              <CheckBoxExample formik={formik} valueName="foodTypes" />
              {inputBuilder("Enter your Item Description", "description", formik, {
                multiline: true,
                style: {
                  backgroundColor: "#1e2124",
                  color: "white",
                  borderRadius: 8,
                  fontSize: 20,
                  minHeight: height * 0.15,
                  maxHeight: height * 0.3,
                  borderColor: "white",
                  borderWidth: 2,
                  padding: 10,
                },
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
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  );
};

export default EditSauce;

const { width, height } = Dimensions.get("window");
