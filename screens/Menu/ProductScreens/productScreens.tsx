import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useRoute } from "@react-navigation/native";

import { useFormik } from "formik";
import React, { useCallback, useEffect, useState } from "react";
import { Keyboard, Modal, RefreshControl, ScrollView, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ToastManager, { Toast } from "toastify-react-native";
import { getProduct, searchProduct } from "../../../api/product";
import { CustomeMenuCard } from "../../../components/customeCard";
import { recycledStyles, toastManagerProps } from "../../../components/recycled-style";
import searchContainer from "../../../components/searchContainer";
import NoResultsCard from "../../../components/searchNotFound";
import { parseError } from "../../../components/toasts";
import CreateGroupModal from "./createGroupModal";

export default function ProductScreens({ navigation }: { navigation: any }) {
  const [apiInUse, setApiInUse] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const route = useRoute() as { params?: { refresh?: boolean } };
  const [refreshing, setRefreshing] = useState(false);
  const [products, setProduct] = useState<any[]>([]);
  const [pages, setPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [refreshes, setRefreshes] = useState<number>(0);
  const [shouldRefresh, setShouldRefresh] = useState(false);

  async function prepare(isRefreshing: boolean = false) {
    if (isRefreshing) {
      setCurrentPage(1);
      setRefreshes(refreshes + 1);
    }
    setApiInUse(false);

    const itemResponse = await getProduct();

    if (itemResponse.data.success !== true) {
      Toast.error(parseError(itemResponse));
      setRefreshing(false);
      setApiInUse(false);
      return;
    }

    setPages(itemResponse.data.pages);
    setProduct(itemResponse.data.results);

    setApiInUse(false);
    setRefreshing(false);
  }

  // 1. Run once on initial screen mount
  useEffect(() => {
    prepare(); // ✅ Initial load
  }, []);

  // 2. Refresh only after modal closes with new data
  //const [shouldRefresh, setShouldRefresh] = useState(false);
  useEffect(() => {
    if (shouldRefresh) {
      prepare(); // ✅ Refresh after creation
      setShouldRefresh(false);
    }
  }, [shouldRefresh]);

  //const route = useRoute() as { params?: { refresh?: boolean } };
  useFocusEffect(
    useCallback(() => {
      if (route.params?.refresh) {
        prepare();
        navigation.setParams({ refresh: false }); // Reset the flag
      }
    }, [route.params?.refresh])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    prepare(true);
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
      prepare(true);
      return;
    }

    setApiInUse(true);
    try {
      const itemSearchRes = await searchProduct(query);
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

  async function loadMore() {
    if (apiInUse) {
      return;
    }

    setApiInUse(true);

    const itemResponse = await getProduct(currentPage + 1, products[products.length - 1].id);
    if (itemResponse.data.success !== true) {
      Toast.error(parseError(itemResponse));
    } else {
      setProduct([...products, ...itemResponse.data.results] as []);
      setCurrentPage(currentPage + 1);
    }

    setApiInUse(false);
  }
  function onScroll(event: any) {
    if (apiInUse || currentPage === pages) {
      return;
    }

    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    if (layoutMeasurement.height + contentOffset.y >= contentSize.height - 900) {
      console.log("loading more, 1000", apiInUse, currentPage, pages);
      loadMore();
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView key={refreshes} style={recycledStyles.safeAreaView}>
        <ToastManager {...toastManagerProps} />
        <ScrollView
          onScroll={onScroll}
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
                    navigation.navigate("ProductDetails", { itemDetails: item });
                  }}
                  icon="usd"
                  buttonName="manage"
                  buttonIsActive={true}
                  price={item.price}
                  files={item.files}
                  isSmall={true}
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
          <CreateGroupModal onClose={() => setModalVisible(false)}  onRefresh={() => setShouldRefresh(true)} />
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
