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
import { createItem } from "../../../api/genericItem";
import { createGenericItemSchema } from "../../../api/validations";
import { buttonBuilder } from "../../../components/button";
import { inputBuilder } from "../../../components/input";
import CheckBoxExample from "../../../components/meatTypesDropDown";
import { createItemPropsStyles, createModalStyles, toastManagerProps } from "../../../components/recycled-style";
import showAlert from "../../../components/showAlert";
import { parseError } from "../../../components/toasts";
import "../../../extension/extension";
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
      description: "",
      foodTypes: [],
    },
    validationSchema: createGenericItemSchema,
    onSubmit: async (values) => {
      setApiInUse(true);
     
      const itemResponse = await createItem(
        values.name,
        values.description,
        values.foodTypes
      );
      if (itemResponse.data.success !== true) {
        Toast.error(parseError(itemResponse));
        setApiInUse(false);
        return;
      }

      Toast.success("Successfully Generic Item created in!");
      showAlert("Sucess", `Successfully Generic Item created  `, async () => {
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
          <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
            {/* Header Section */}
            <View style={createModalStyles.header}>
              <Text style={createModalStyles.title}> Create Generic Item</Text>

              <TouchableOpacity onPress={props.onClose} style={createModalStyles.closeButton}>
                <Text style={createModalStyles.closeButtonText}>✖</Text>
              </TouchableOpacity>
            </View>

            <View style={createModalStyles.card}>
              {inputBuilder("Enter your Generic Item Name", "name", formik, {
                multiline: true,
                style: createItemPropsStyles.itemName,
              })}
              <CheckBoxExample formik={formik} valueName="foodTypes" />
              {inputBuilder("Enter your Generic Item Description", "description", formik, {
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
