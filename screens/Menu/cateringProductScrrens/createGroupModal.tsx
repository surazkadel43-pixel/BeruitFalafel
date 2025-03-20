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
import { createBeverageSchema } from "../../../api/validations";
import { buttonBuilder } from "../../../components/button";
import { inputBuilder } from "../../../components/input";
import { createModalStyles, imagePickerStyles, toastManagerProps } from "../../../components/recycled-style";
import ZoomImageModal from "../../../components/zoomImageModals";
import "../../../extension/extension";

interface CreateCateringModal {
  onClose: () => void;
}

const CreateCateringModal: React.FC<CreateCateringModal> = (props) => {
  const [apiInUse, setApiInUse] = useState<boolean>(true);
  const [price, setPrice] = useState<string>("");
  const [selectedImages, setSelectedImages] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

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
    validationSchema: createBeverageSchema,
    onSubmit: async (values) => {
      setApiInUse(true);
      if (selectedImages.length === 0) {
        Toast.error("Please select an image.");
        setApiInUse(false);
        return;
      }
      setApiInUse(false);
    },
  });

  const pickImage = async () => {
    if (selectedImages.length >= 5) {
      Toast.error("You can only attach up to 5 images at once.");
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
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      if (result.assets.length > 5) {
        Toast.error("You can select up to 5 images at once.");
        return;
      }

      const newSelection = [...selectedImages];
      for (const asset of result.assets) {
        if (asset.fileSize === undefined || asset.fileSize > 1e7) {
          Toast.error("Encountered image larger then 10MB, this image has been excluded.");
        }
        newSelection.push(asset);
      }
      if (newSelection.length > 5) {
        Toast.error("You can select up to 5 images at once.");
        return;
      }

      setSelectedImages(newSelection);
    }
  };

  const openCamera = async () => {
    if (selectedImages.length >= 5) {
      Toast.error("You can only attach up to 5 images at once.");
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
        Toast.error("Encountered image larger then 10MB, this image has been excluded.");
      }
      setSelectedImages([...selectedImages, result.assets[0]]);
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages(selectedImages.filter((_, i) => i !== index));
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <View style={createModalStyles.container}>
          <ToastManager {...toastManagerProps} />
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            {/* Header Section */}
            <View style={createModalStyles.header}>
              <Text style={createModalStyles.title}>Create Product</Text>

              <TouchableOpacity onPress={props.onClose} style={createModalStyles.closeButton}>
                <Text style={createModalStyles.closeButtonText}>✖</Text>
              </TouchableOpacity>
            </View>

            <View style={createModalStyles.card}>
              {inputBuilder("Enter your Catering Menu Name", "name", formik, {
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
              {inputBuilder("Enter your Catering Menu Price", "price", formik, {
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
              {inputBuilder("Enter your Catering Menu Description", "description", formik, {
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
              </View>

              <View style={imagePickerStyles.chooseImage}>
                {buttonBuilder("Choose Image", pickImage, false, <Ionicons name="image" size={24} color="white" />)}
                {buttonBuilder("Camera", openCamera, false, <Ionicons name="camera" size={24} color="white" />)}
              </View>

              {buttonBuilder("Create", formik.handleSubmit, apiInUse)}
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default CreateCateringModal;

const { width, height } = Dimensions.get("window");
