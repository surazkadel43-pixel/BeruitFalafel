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
import { createItem } from "../../../api/item";
import { createItemSchema } from "../../../api/validations";
import { buttonBuilder } from "../../../components/button";
import { inputBuilder } from "../../../components/input";
import CheckBoxExample, { ItemTypeRadioButtons } from "../../../components/meatTypesDropDown";
import { createItemPropsStyles, createModalStyles, toastManagerProps } from "../../../components/recycled-style";
import { parseError } from "../../../components/toasts";
import "../../../extension/extension";
import showAlert from "../../../components/showAlert";
interface CreateItemModal {
  onClose: () => void;
  onRefresh: () => void;
}

const CreateItemModal: React.FC<CreateItemModal> = (props) => {
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
      foodTypes: [],
      itemType: "",
    },
    validationSchema: createItemSchema,
    onSubmit: async (values) => {
      
      setApiInUse(true);
      const numericPrice = parseFloat(values.price.replace(/[^0-9.]/g, "")) || 0;
      const numericItemType = parseInt(values.itemType) || 0;
      const itemResponse = await createItem(
        values.name,
        numericPrice, 
        values.description,
        values.foodTypes,
        numericItemType, 
      );
      if (itemResponse.data.success !== true) {
        Toast.error(parseError(itemResponse));
        setApiInUse(false);
        return;
      }

      Toast.success("Successfully Item created in!");
      showAlert("Sucess", `Successfully Item created  `, async () => {
        props.onRefresh();
        props.onClose();
      });
      setApiInUse(false);
    },
  });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <View style={createModalStyles.container}>
          <ToastManager {...toastManagerProps} />
          <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} >
            {/* Header Section */}
            <View style={createModalStyles.header}>
              <Text style={createModalStyles.title}> Create Item</Text>

              <TouchableOpacity onPress={props.onClose} style={createModalStyles.closeButton}>
                <Text style={createModalStyles.closeButtonText}>✖</Text>
              </TouchableOpacity>
            </View>

            <View style={createModalStyles.card}>
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
              <ItemTypeRadioButtons formik={formik} valueName="itemType"  />
              <CheckBoxExample formik={formik} valueName="foodTypes" />
              {inputBuilder("Enter your Item Description", "description", formik, {
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

export default CreateItemModal;

const { width, height } = Dimensions.get("window");
