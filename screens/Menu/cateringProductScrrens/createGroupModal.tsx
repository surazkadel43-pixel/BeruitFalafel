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
import { getAllBevrages } from "../../../api/bevrages";
import { createCateringProduct } from "../../../api/cateringProduct";
import { getAllGenericItems } from "../../../api/genericItem";
import { getAllItems } from "../../../api/item";
import { getAllMeats } from "../../../api/meats";
import { getAllSauces } from "../../../api/sauce";
import { createProductSchema } from "../../../api/validations";
import { buttonBuilder } from "../../../components/button";
import { inputBuilder } from "../../../components/input";
import { BevragesCheckbox, GenericItemsRadioButton, ItemsCheckbox, MeatsCheckbox, SauceCheckbox, SidesTypesCheckbox } from "../../../components/meatTypesDropDown";
import { createItemPropsStyles, createModalStyles, imagePickerStyles, toastManagerProps } from "../../../components/recycled-style";
import showAlert from "../../../components/showAlert";
import { parseError } from "../../../components/toasts";
import ZoomImageModal from "../../../components/zoomImageModals";
import "../../../extension/extension";

interface CreateCateringModal {
  onClose: () => void;
  onRefresh: () => void;
}
const genericNames = [
  { id: "1", name: "Bowl" },
  { id: "2", name: "Falafel Wrap" },
  { id: "3", name: "Meat Wrap" },
  { id: "4", name: "Plates" },
];

const CreateCateringModal: React.FC<CreateCateringModal> = (props) => {
  const [apiInUse, setApiInUse] = useState<boolean>(true);
  const [selectedImages, setSelectedImages] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [items, setitems] = useState<any[]>([]);
  const [bevrages, setBevrages] = useState<any[]>([]);
  const [sauces, setSauces] = useState<any[]>([]);
  const [meats, setMeats] = useState<any[]>([]);
  const [genericItems, setGenericItems] = useState<any[]>(genericNames);
  const [canAttachMultipleImages, setCanAttachMultipleImages] = useState<boolean>(true);

  async function prepare() {
    setApiInUse(false);
    const itemRes = await getAllItems();

    if (itemRes.data.success !== true) {
      Toast.error(parseError(itemRes));
      setApiInUse(false);
      return;
    }

    setitems(itemRes.data.items);

    const sauceRes = await getAllSauces();
    if (sauceRes.data.success !== true) {
      Toast.error(parseError(sauceRes));
      setApiInUse(false);
      return;
    }

    setSauces(sauceRes.data.sauces);

    const bevrageRes = await getAllBevrages();
    if (bevrageRes.data.success !== true) {
      Toast.error(parseError(bevrageRes));
      setApiInUse(false);
      return;
    }

    setBevrages(bevrageRes.data.results);

    const MeatRes = await getAllMeats();
    if (MeatRes.data.success !== true) {
      Toast.error(parseError(MeatRes));
      setApiInUse(false);
      return;
    }

    setMeats(MeatRes.data.results);

    const genericItemRes = await getAllGenericItems();
    if (genericItemRes.data.success !== true) {
      Toast.error(parseError(genericItemRes));
      setApiInUse(false);
      return;
    }

    setGenericItems(genericItemRes.data.results);
  }

  useEffect(() => {
    prepare();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      description: "",
      discountedPrice: "",
      image: null,
      foodTypes: [],
      items: [],
      sauces: [],
      bevrages: [],
      meats: [],
      genericName: "",
    },
    validationSchema: createProductSchema,
    onSubmit: async (values) => {
      setApiInUse(true);
      if (selectedImages.length === 0) {
        Toast.error("Please select an image.");
        setApiInUse(false);
        return;
      }

      /**
       * save sides  to server
       */
      const numericPrice = parseFloat(values.price.replace(/[^0-9.]/g, "")) || 0;
      const numericDiscountPrice = parseFloat(values.discountedPrice.replace(/[^0-9.]/g, "")) || 0;
      const response = await createCateringProduct(
        values.name,
        numericPrice,
        numericDiscountPrice,
        values.description,
        values.image || [],
        values.foodTypes,
        values.items,
        values.sauces,
        values.bevrages,
        values.meats,
        values.genericName
      );

      if (response.data.success !== true) {
        Toast.error(parseError(response));
        setApiInUse(false);
        return;
      }

      Toast.success("Successfully Product created in!");
      showAlert("Sucess", `Successfully Product created  `, async () => {
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
              <Text style={createModalStyles.title}>Create Catering Product</Text>

              <TouchableOpacity onPress={props.onClose} style={createModalStyles.closeButton}>
                <Text style={createModalStyles.closeButtonText}>✖</Text>
              </TouchableOpacity>
            </View>

            <View style={createModalStyles.card}>
              {inputBuilder("Enter your Product Name", "name", formik, {
                multiline: true,
                style: createItemPropsStyles.itemName,
              })}
              {inputBuilder("Enter your Product Price", "price", formik, {
                multiline: true,
                keyboardType: "numeric",
                onChangeText: (text: string) => {
                  formik.setFieldValue("price", text.toCurrency());
                },
                style: createItemPropsStyles.itemPrice,
              })}
              {inputBuilder("Enter your discountedPrice Price", "discountedPrice", formik, {
                multiline: true,
                keyboardType: "numeric",
                onChangeText: (text: string) => {
                  formik.setFieldValue("discountedPrice", text.toCurrency());
                },
                style: createItemPropsStyles.itemPrice,
              })}
              <GenericItemsRadioButton formik={formik} valueName="genericName" items={genericItems} />
              <SidesTypesCheckbox formik={formik} valueName="foodTypes" />
              <ItemsCheckbox formik={formik} valueName="items" items={items} />
              <SauceCheckbox formik={formik} valueName="sauces" items={sauces} />
              <BevragesCheckbox formik={formik} valueName="bevrages" items={bevrages} />
              <MeatsCheckbox formik={formik} valueName="meats" items={meats} />

              {inputBuilder("Enter your Product Description", "description", formik, {
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

export default CreateCateringModal;

const { width, height } = Dimensions.get("window");
