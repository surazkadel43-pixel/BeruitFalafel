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
import ToastManager from "toastify-react-native";
import { createItemSchema } from "../../../api/validations";
import { buttonBuilder } from "../../../components/button";
import { inputBuilder } from "../../../components/input";
import { createModalStyles, toastManagerProps } from "../../../components/recycled-style";
import "../../../extension/extension";
import CheckBoxExample from "../../../components/meatTypesDropDown";
import { createItem } from "../../../api/item";
interface CreateSauceModal {
  onClose: () => void;
}

const CreateSauceModal: React.FC<CreateSauceModal> = (props) => {
  const [apiInUse, setApiInUse] = useState<boolean>(true);
  const [price, setPrice] = useState<string>("");
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
      try {
        const response = await createItem(
          values.name,
          parseFloat(values.price), // Ensure price is a number
          values.description,
          values.foodPreferences
        );
    
        console.log("Item Created Successfully:", response);
      } catch (error) {
        console.error("Error creating item:", error);
      }
      setApiInUse(false);
    },
  });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <View style={createModalStyles.container}>
          <ToastManager {...toastManagerProps} />
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
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
              {inputBuilder("Enter your Sauce Price", "price", formik, {
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
              <CheckBoxExample formik={formik} valueName="foodPreferences" />
              {inputBuilder("Enter your Sauce Description", "description", formik, {
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
