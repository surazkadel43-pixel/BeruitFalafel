import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import ToastManager, { Toast } from "toastify-react-native";
import { createSauce } from "../../../api/sauce";
import { createItemSchema } from "../../../api/validations";
import { buttonBuilder } from "../../../components/button";
import { inputBuilder } from "../../../components/input";
import CheckBoxExample from "../../../components/meatTypesDropDown";
import { createItemPropsStyles, createModalStyles, toastManagerProps } from "../../../components/recycled-style";
import { parseError } from "../../../components/toasts";
import "../../../extension/extension";
import showAlert from "../../../components/showAlert";
interface CreateSauceModal {
  onClose: () => void;
}

const CreateSauceModal: React.FC<CreateSauceModal> = (props) => {
  const [apiInUse, setApiInUse] = useState<boolean>(true);

  useEffect(() => {
    prepare();
  }, []);

  function prepare() {
    setApiInUse(false);
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      description: "",
      foodPreferences: [],
    },
    validationSchema: createItemSchema,
    onSubmit: async (values) => {
      setApiInUse(true);
      const numericPrice = parseFloat(values.price.replace(/[^0-9.]/g, "")) || 0;
      const response = await createSauce(
        values.name,
        numericPrice, // Ensure price is a number
        values.description,
        values.foodPreferences
      );

      if (response.data.success !== true) {
        Toast.error(parseError(response));
        setApiInUse(false);
        return;
      }
     
      Toast.success("Successfully Sauce created in!");
      showAlert("Sucess", `Successfully Sauce created  `, async () => {
        props.onClose();
      });

      setApiInUse(false);
    },
  });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <ToastManager {...toastManagerProps} />
        <View style={createModalStyles.container}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
            {/* Header Section */}
            <View style={createModalStyles.header}>
              <Text style={createModalStyles.title}> Create Sauce</Text>

              <TouchableOpacity onPress={props.onClose} style={createModalStyles.closeButton}>
                <Text style={createModalStyles.closeButtonText}>✖</Text>
              </TouchableOpacity>
            </View>

            <View style={createModalStyles.card}>
              {inputBuilder("Enter your Sauce Name", "name", formik, {
                multiline: true,
                style: createItemPropsStyles.itemName,
              })}
              {inputBuilder("Enter your Sauce Price", "price", formik, {
                multiline: true,
                keyboardType: "numeric",
                onChangeText: (text: string) => {
                  formik.setFieldValue("price", text.toCurrency());
                },
                style: createItemPropsStyles.itemPrice,
              })}
              <CheckBoxExample formik={formik} valueName="foodPreferences" />
              {inputBuilder("Enter your Sauce Description", "description", formik, {
                multiline: true,
                style: createItemPropsStyles.itemDescription,
              })}
              {buttonBuilder("Create", formik.handleSubmit, apiInUse)}
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default CreateSauceModal;

const { width, height } = Dimensions.get("window");
