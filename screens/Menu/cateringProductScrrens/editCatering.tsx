import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/core";
import * as ImagePicker from "expo-image-picker";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Dimensions, Image, Keyboard, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import ToastManager, { Toast } from "toastify-react-native";
import { getAllBevrages } from "../../../api/bevrages";
import { editCateringProduct } from "../../../api/cateringProduct";
import { getAllGenericItems } from "../../../api/genericItem";
import { getAllItems } from "../../../api/item";
import { getAllMeats } from "../../../api/meats";
import { getAllSauces } from "../../../api/sauce";
import { getAllSides } from "../../../api/sides";
import { createProductSchema } from "../../../api/validations";
import { buttonBuilder } from "../../../components/button";
import { inputBuilder } from "../../../components/input";
import {
  BevragesCheckbox,
  GenericItemsRadioButton,
  ItemsCheckbox,
  MeatsCheckbox,
  SauceCheckbox,
  SidesCheckbox,
  SidesTypesCheckbox,
} from "../../../components/meatTypesDropDown";
import { createItemPropsStyles, createModalStyles, imagePickerStyles, toastManagerProps } from "../../../components/recycled-style";
import showAlert from "../../../components/showAlert";
import { parseError } from "../../../components/toasts";
import ZoomImageModal from "../../../components/zoomImageModals";
import "../../../extension/extension";
import { popWithParams } from "../../../utils/routes";

const genericNames = [
  { id: "1", name: "Bowl" },
  { id: "2", name: "Falafel Wrap" },
  { id: "3", name: "Meat Wrap" },
  { id: "4", name: "Plates" },
];

const EditCatering = ({ navigation }: { navigation: any }) => {
  const [apiInUse, setApiInUse] = useState<boolean>(true);
  const [selectedImages, setSelectedImages] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const [items, setitems] = useState<any[]>([]);
  const [bevrages, setBevrages] = useState<any[]>([]);
  const [sauces, setSauces] = useState<any[]>([]);
  const [meats, setMeats] = useState<any[]>([]);
  const [genericItems, setGenericItems] = useState<any[]>(genericNames);
  const [sides, setSides] = useState<any[]>([]);
  const [canAttachMultipleImages, setCanAttachMultipleImages] = useState<boolean>(true);

  const route = useRoute();
  const { itemDetails } = route.params as { itemDetails: any };

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

    const sidesRes = await getAllSides();
    if (sidesRes.data.success !== true) {
      Toast.error(parseError(sidesRes));
      setApiInUse(false);
      return;
    }
    setSides(sidesRes.data.results);
  }

  async function setValues() {
    setApiInUse(false);
    const formattedImages = itemDetails.files?.map((file: any) => ({ uri: file.presignedURL })) || [];
    formik.setValues({
      name: itemDetails.name,
      price: itemDetails.price.toString().toCurrency(),
      description: itemDetails.description,
      discountedPrice: itemDetails.discountedPrice.toString().toCurrency(),
      image: formattedImages,
      foodTypes: itemDetails.productTypes,
      items: itemDetails.items,
      sauces: itemDetails.sauces,
      bevrages: itemDetails.beverages,
      meats: itemDetails.meats,
      genericName: itemDetails.genericName,
      sides: itemDetails.sides,
      quantity: itemDetails.quantity
    });
    setSelectedImages(formattedImages);
  }

  useEffect(() => {
    prepare();
    setValues();
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
      sides: [],
      quantity: undefined
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

      const response = await editCateringProduct(
        itemDetails.id,
        values.name,
        numericPrice, // Ensure price is a number
        numericDiscountPrice,
        values.description,
        values.image || [],
        values.foodTypes,
        values.items,
        values.sauces,
        values.bevrages,
        values.meats,
        values.genericName,
        values.sides,
        values.quantity
      );

      if (response.data.success !== true) {
        Toast.error(parseError(response));
        setApiInUse(false);
        return;
      }

      showAlert("Sucess", `Successfully Product Edited  `, async () => {
        popWithParams(navigation, 2, { refresh: true });
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
      <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }} keyboardShouldPersistTaps="handled">
        <SafeAreaView style={createModalStyles.container}>
          <ToastManager {...toastManagerProps} />
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={[createModalStyles.card, { marginVertical: 10 }]}>
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
              {inputBuilder("Enter your Quantity", "quantity", formik, {
                keyboardType: "numeric", // Only numeric input
                maxLength: 2, // Limit the input to 6 digits
                style: createItemPropsStyles.itemPrice,
              })}
              <GenericItemsRadioButton formik={formik} valueName="genericName" items={genericItems} />
              <SidesTypesCheckbox formik={formik} valueName="foodTypes" />
              <ItemsCheckbox formik={formik} valueName="items" items={items} />
              <SauceCheckbox formik={formik} valueName="sauces" items={sauces} />
              <BevragesCheckbox formik={formik} valueName="bevrages" items={bevrages} />
              <MeatsCheckbox formik={formik} valueName="meats" items={meats} />
              <SidesCheckbox formik={formik} valueName="sides" items={sides} />
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

              {buttonBuilder("Save", formik.handleSubmit, apiInUse, undefined, true)}
            </View>
          </ScrollView>
        </SafeAreaView>
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  );
};

export default EditCatering;

const { width, height } = Dimensions.get("window");
