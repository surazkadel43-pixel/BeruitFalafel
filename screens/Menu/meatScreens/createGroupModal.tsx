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
interface CreateMeatModal {
  onClose: () => void;
}

const CreateMeatModal: React.FC<CreateMeatModal> = (props) => {
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
    },
    validationSchema: createItemSchema,
    onSubmit: async (values) => {
      setApiInUse(true);
      // const groupCreateRes = await createGroup(values.name, values.description);
      // if (groupCreateRes.status !== 200) {
      //   Toast.error(parseError(groupCreateRes));
      //   setApiInUse(false);
      //   return;
      // }
      // props.onClose();
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
              <Text style={createModalStyles.title}> Create Item</Text>

              <TouchableOpacity onPress={props.onClose} style={createModalStyles.closeButton}>
                <Text style={createModalStyles.closeButtonText}>✖</Text>
              </TouchableOpacity>
            </View>

            <View style={createModalStyles.card}>
              {inputBuilder("Enter your Meat Name", "name", formik, {
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
              {inputBuilder("Enter your Meat Price", "price", formik, {
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
              {inputBuilder("Enter your Meat Description", "description", formik, {
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

export default CreateMeatModal;

const { width, height } = Dimensions.get("window");
