import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { useFormik } from "formik";
import React, { useCallback, useEffect, useState } from "react";
import { Keyboard, Modal, RefreshControl, ScrollView, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ToastManager, { Toast } from "toastify-react-native";
import { getAllCateringProducts, searchCateringProduct } from "../../../api/cateringProduct";
import { CustomeMenuCard } from "../../../components/customeCard";
import { recycledStyles, toastManagerProps } from "../../../components/recycled-style";
import searchContainer from "../../../components/searchContainer";
import NoResultsCard from "../../../components/searchNotFound";
import { parseError } from "../../../components/toasts";
import { ItemType } from "../../../utils/enums";
import CreateGroupModal from "./createGroupModal";

export default function CateringScreens({ navigation }: { navigation: any }) {
  const [apiInUse, setApiInUse] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [shouldRefresh, setShouldRefresh] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [products, setProduct] = useState<any[]>([]);

  const route = useRoute() as { params?: { refresh?: boolean } };

  async function prepare() {
    setApiInUse(false);

    const itemResponse = await getAllCateringProducts();

    if (itemResponse.data.success !== true) {
      Toast.error(parseError(itemResponse));
      setRefreshing(false);
      setApiInUse(false);
      return;
    }

    setProduct(itemResponse.data.results);

    setApiInUse(false);
    setRefreshing(false);
  }

  useEffect(() => {
    prepare();
  }, []);

  useEffect(() => {
    if (shouldRefresh) {
      prepare();
      setShouldRefresh(false);
    }
  }, [shouldRefresh]);

  useFocusEffect(
    useCallback(() => {
      if (route.params?.refresh) {
        prepare();
        navigation.setParams({ refresh: false });
      }
    }, [route.params?.refresh])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    prepare();
  };
  const formik = useFormik({
    initialValues: {
      productName: "",
    },
    validationSchema: null,
    onSubmit: async (values) => {
      setButtonVisible(false);
      fetchProduct(values.productName);
    },
  });

  const fetchProduct = async (query: string) => {
    if (query.trim() === "") {
      prepare();
      return;
    }

    setApiInUse(true);
    try {
      const itemSearchRes = await searchCateringProduct(query);
      if (itemSearchRes.data.success === true) {
        setProduct(itemSearchRes.data.results);
      } else {
        Toast.error(parseError(itemSearchRes));
      }
    } catch (error) {
      Toast.error("Something went wrong.");
    }
    setApiInUse(false);
  };
  // Debounced search to prevent excessive API calls
  useEffect(() => {
    setButtonVisible(true);
    const delayDebounce = setTimeout(() => {
      fetchProduct(formik.values.productName);
    }, 500);

    return () => clearTimeout(delayDebounce); // Cleanup function
  }, [formik.values.productName]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={recycledStyles.safeAreaView}>
        <ToastManager {...toastManagerProps} />
        <ScrollView
          scrollEventThrottle={16}
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          <View style={{ marginBottom: 10 }}>{searchContainer(formik, buttonVisible, apiInUse, "productName")}</View>

          <ScrollView>
            {products.length > 0 ? (
              products.map((item) => (
                <CustomeMenuCard
                  key={item.id}
                  title={item.name}
                  description={item.description}
                  menuTypes={item.productTypes}
                  onPress={() => {
                    navigation.navigate("CateringDetails", { itemDetails: item });
                  }}
                  productType={ItemType.Catering}
                  icon="usd"
                  buttonName="manage"
                  buttonIsActive={true}
                  price={item.price}
                  quantity={item.quantity}
                />
              ))
            ) : (
              <NoResultsCard
                message={"Sorry, No Item found In the Products."}
                additionalProps={{ icon: <FontAwesome name="cutlery" size={30} color="white" /> }}
              />
            )}
          </ScrollView>
        </ScrollView>
        {/* Modal */}
        <Modal
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
          animationType="slide"
          transparent={true} // ✅ Keeps background transparent
          style={recycledStyles.modal}
        >
          <CreateGroupModal onClose={() => setModalVisible(false)} onRefresh={() => setShouldRefresh(true)} />
        </Modal>
        <TouchableOpacity style={recycledStyles.addButton} onPress={() => setModalVisible(true)} activeOpacity={0.7}>
          <Ionicons name="add" size={40} color="white" />
        </TouchableOpacity>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  //recycledStyles
});
