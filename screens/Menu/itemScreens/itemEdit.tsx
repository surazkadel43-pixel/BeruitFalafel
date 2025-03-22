import { useRoute } from "@react-navigation/core";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Dimensions, Keyboard, SafeAreaView, ScrollView, TouchableWithoutFeedback, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ToastManager, { Toast } from "toastify-react-native";
import { editItem } from "../../../api/item";
import { createItemSchema } from "../../../api/validations";
import { buttonBuilder } from "../../../components/button";
import { inputBuilder } from "../../../components/input";
import CheckBoxExample from "../../../components/meatTypesDropDown";
import { createItemPropsStyles, createModalStyles, toastManagerProps } from "../../../components/recycled-style";
import showAlert from "../../../components/showAlert";
import { parseError } from "../../../components/toasts";
import "../../../extension/extension";
import { popWithParams } from "../../../utils/routes";

const EditItem = ({ navigation }: { navigation: any }) => {
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
      setApiInUse(true);
      const numericPrice = parseFloat(values.price.replace(/[^0-9.]/g, "")) || 0;
      const itemResponse = await editItem(
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
                {inputBuilder("Enter your Item Name", "name", formik, {
                  multiline: true,
                  style: createItemPropsStyles.itemName,
                })}
                {inputBuilder("Enter your Item Price", "price", formik, {
                  multiline: true,
                  keyboardType: "numeric",
                  onChangeText: (text: string) => {
                    formik.setFieldValue("price", text.toCurrency());
                  },
                  style: createItemPropsStyles.itemPrice,
                })}
                <CheckBoxExample formik={formik} valueName="foodTypes" />
                {inputBuilder("Enter your Item Description", "description", formik, {
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

export default EditItem;

const { width, height } = Dimensions.get("window");
