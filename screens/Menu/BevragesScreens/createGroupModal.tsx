import { FontAwesome, Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
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
import { createBevrage } from "../../../api/bevrages";
import { createBeverageSchema } from "../../../api/validations";
import { buttonBuilder } from "../../../components/button";
import { inputBuilder } from "../../../components/input";
import { BevragesTypesCheckbox, ItemTypeRadioButtons } from "../../../components/meatTypesDropDown";
import { createItemPropsStyles, createModalStyles, imagePickerStyles, toastManagerProps } from "../../../components/recycled-style";
import showAlert from "../../../components/showAlert";
import { parseError } from "../../../components/toasts";
import ZoomImageModal from "../../../components/zoomImageModals";
import "../../../extension/extension";

interface CreateBevrageModal {
  onClose: () => void;
  onRefresh: () => void;
}

const CreateBevrageModal: React.FC<CreateBevrageModal> = (props) => {
  const [apiInUse, setApiInUse] = useState<boolean>(true);
  const [selectedImages, setSelectedImages] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [canAttachMultipleImages, setCanAttachMultipleImages] = useState<boolean>(true);
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
      image: null,
      drinkTypes: [],
      quantity: "",
      itemType: "",
    },
    validationSchema: createBeverageSchema,
    onSubmit: async (values) => {
      setApiInUse(true);
      if (selectedImages.length === 0) {
        Toast.error("Please select an image.");
        setApiInUse(false);
        return;
      }

      const numericPrice = parseFloat(values.price.replace(/[^0-9.]/g, "")) || 0;
      const numericQuantity = parseInt(values.quantity) || 0;
      const numericItemType = parseInt(values.itemType) || 0;
      const response = await createBevrage(
        values.name,
        numericPrice, // Ensure price is a number
        values.description,
        values.drinkTypes,
        values.image || [],
        numericQuantity, // Ensure quantity is a number
        numericItemType
      );
      if (response.data.success !== true) {
        Toast.error(parseError(response));
        setApiInUse(false);
        return;
      }

      Toast.success("Successfully Bevrage created in!");
      showAlert("Sucess", `Successfully Bevrage created  `, async () => {
        props.onRefresh();
        props.onClose();
      });
      setApiInUse(false);
    },
  });

  const pickImage = async () => {
    const maxImages = canAttachMultipleImages ? 5 : 1;
    if (selectedImages.length >= maxImages) {
      Toast.error(`You can only attach up to ${maxImages} image${maxImages === 1 ? "" : "s"} at once.`);
      return;
    }

    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Toast.error("Permission Denied\nYou need to grant photo library permissions to upload images.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 1,
      allowsMultipleSelection: false,
    });

    if (!result.canceled) {
      if (result.assets.length > maxImages) {
        Toast.error(`You can only attach up to ${maxImages} image${maxImages === 1 ? "" : "s"} at once.`);
        return;
      }

      const newSelection = [...selectedImages];
      for (const asset of result.assets) {
        if (asset.fileSize === undefined || asset.fileSize > 1e7) {
          Toast.error("Encountered image larger than 10MB, this image has been excluded.");
        }
        newSelection.push(asset);
      }
      if (newSelection.length > maxImages) {
        Toast.error(`You can only attach up to ${maxImages} image${maxImages === 1 ? "" : "s"} at once.`);
        return;
      }

      setSelectedImages(newSelection);
      formik.setFieldValue("image", newSelection);
    }
  };

  const openCamera = async () => {
    const maxImages = canAttachMultipleImages ? 5 : 1;
    if (selectedImages.length >= maxImages) {
      Toast.error(`You can only attach up to ${maxImages} image${maxImages === 1 ? "" : "s"} at once.`);
      return;
    }

    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Toast.error("Permission Denied\nYou need to grant camera usage permissions to upload images.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      quality: 1,
    });

    if (!result.canceled) {
      if (result.assets[0].fileSize === undefined || result.assets[0].fileSize > 1e7) {
        Toast.error("Encountered image larger than 10MB, this image has been excluded.");
      }
      setSelectedImages([...selectedImages, result.assets[0]]);
      formik.setFieldValue("image", [...selectedImages, result.assets[0]]);
    }
  };

  const removeImage = (index: number) => {
    const updatedImages = selectedImages.filter((_, i) => i !== index);

    setSelectedImages(updatedImages);
    formik.setFieldValue("image", updatedImages.length > 0 ? updatedImages : null);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <View style={createModalStyles.container}>
          <ToastManager {...toastManagerProps} />
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            {/* Header Section */}
            <View style={createModalStyles.header}>
              <Text style={createModalStyles.title}>Create Bevrage</Text>

              <TouchableOpacity onPress={props.onClose} style={createModalStyles.closeButton}>
                <Text style={createModalStyles.closeButtonText}>✖</Text>
              </TouchableOpacity>
            </View>

            <View style={createModalStyles.card}>
              {inputBuilder("Enter your Bevrage Name", "name", formik, {
                multiline: true,
                style: createItemPropsStyles.itemName,
              })}
              {inputBuilder("Enter your Bevrage Price", "price", formik, {
                multiline: true,
                keyboardType: "numeric",
                onChangeText: (text: string) => {
                  formik.setFieldValue("price", text.toCurrency());
                },
                style: createItemPropsStyles.itemPrice,
              })}
              {inputBuilder("Enter your Quantity", "quantity", formik, {
                keyboardType: "numeric", // Only numeric input
                maxLength: 2, // Limit the input to 6 digits
                style: createItemPropsStyles.itemPrice,
              })}
              <ItemTypeRadioButtons formik={formik} valueName="itemType" />
              <BevragesTypesCheckbox formik={formik} valueName="drinkTypes" />
              {inputBuilder("Enter your Bevrage Description", "description", formik, {
                multiline: true,
                style: createItemPropsStyles.itemDescription,
              })}

              <View style={imagePickerStyles.imageContainer}>
                {selectedImages.map((img, index) => (
                  <View key={index} style={imagePickerStyles.imageWrapper}>
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                      <Image source={{ uri: img.uri }} style={imagePickerStyles.selectedImage} />
                    </TouchableOpacity>

                    <ZoomImageModal
                      visible={modalVisible}
                      onClose={() => {
                        setModalVisible(false);
                      }}
                      source={img}
                    />

                    <TouchableOpacity style={imagePickerStyles.removeButton} onPress={() => removeImage(index)}>
                      <FontAwesome name="times-circle" size={20} color="white" />
                    </TouchableOpacity>
                  </View>
                ))}
                {/* ✅ Display error message if validation fails */}
                {formik.touched.image && formik.errors.image ? (
                  <Text style={{ fontSize: 18, color: "red", paddingHorizontal: 15, paddingLeft: 20 }}>
                    {Array.isArray(formik.errors.image) ? formik.errors.image.join(", ") : formik.errors.image}
                  </Text>
                ) : null}
              </View>

              <View style={imagePickerStyles.chooseImage}>
                {buttonBuilder("Choose Image", pickImage, apiInUse, <Ionicons name="image" size={24} color="white" />)}
                {buttonBuilder("Camera", openCamera, apiInUse, <Ionicons name="camera" size={24} color="white" />)}
              </View>

              {buttonBuilder("Create", formik.handleSubmit, apiInUse)}
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default CreateBevrageModal;

const { width, height } = Dimensions.get("window");
