import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Keyboard, Modal, RefreshControl, ScrollView, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ToastManager, { Toast } from "toastify-react-native";

import { CustomeCard, CustomePromotionCard } from "../../components/customeCard";
import { recycledStyles, toastManagerProps } from "../../components/recycled-style";
import searchContainer from "../../components/searchContainer";
import NoResultsCard from "../../components/searchNotFound";
import { parseError } from "../../components/toasts";
import CreatePromotionModal from "./createGroupModal";
import { getPromotion, searchPromotion } from "../../api/promotion";

export default function PromotionScreens({ navigation }: { navigation: any }) {
  const [apiInUse, setApiInUse] = useState(true);
  const [buttonVisible, setButtonVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  
  const [promotions, setPromotions] = useState<any[]>([])
  const [pages, setPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [refreshing, setRefreshing] = useState(false);
  const [refreshes, setRefreshes] = useState<number>(0);

  async function prepare(isRefreshing: boolean = false) {
    if (isRefreshing) {
     
      setCurrentPage(1);
      setRefreshes(refreshes + 1);
    }
    setApiInUse(false);

    const itemResponse = await getPromotion();

    if (itemResponse.data.success !== true) {
      Toast.error(parseError(itemResponse));
      setRefreshing(false);
      setApiInUse(false);
      return;
    }
    setPages(itemResponse.data.pages);
    setPromotions(itemResponse.data.results);

    setApiInUse(false);
    setRefreshing(false);
  }

  useEffect(() => {
    prepare();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    prepare(true);
  };
  const formik = useFormik({
    initialValues: {
      promotionCode: "",
    },
    validationSchema: null,
    onSubmit: async (values) => {
      setButtonVisible(false);
      fetchItem(values.promotionCode);
    },
  });

  const fetchItem = async (query: string) => {
    if (query.trim() === "") {
      prepare(true);
      return;
    }

    setApiInUse(true);
    try {
      const itemSearchRes = await searchPromotion(query);
      if (itemSearchRes.data.success === true) {
        setPromotions(itemSearchRes.data.results);
      } else {
        Toast.error(parseError(itemSearchRes));
      }
    } catch (error) {
      Toast.error("Something went wrong.");
    }
    setApiInUse(false);
  };
  async function loadMore() {
    if (apiInUse) {
      return;
    }

    setApiInUse(true);

    const postReq = await getPromotion(currentPage + 1, promotions[promotions.length - 1].id);
    if (postReq.data.success !== true) {
      Toast.error(parseError(postReq));
    } else {
      setPromotions([...promotions, ...postReq.data.results] as []);
      setCurrentPage(currentPage + 1);
    }

    setApiInUse(false);
  }
  // Debounced search to prevent excessive API calls
  useEffect(() => {
    setButtonVisible(true);
    const delayDebounce = setTimeout(() => {
      fetchItem(formik.values.promotionCode);
    }, 500); // Delay search by 500ms after user stops typing

    return () => clearTimeout(delayDebounce); // Cleanup function
  }, [formik.values.promotionCode]);

  function onScroll(event: any) {
    if (apiInUse || currentPage === pages) {
      return;
    }
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    if (layoutMeasurement.height + contentOffset.y >= contentSize.height - 1000) {
      loadMore();
    } 
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView key={refreshes} style={recycledStyles.safeAreaView}>
        <ScrollView
          onScroll={onScroll}
          scrollEventThrottle={16}
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          <ToastManager {...toastManagerProps} />
          <View style={{}}>{searchContainer(formik, buttonVisible, apiInUse, "promotionCode")}</View>

          <ScrollView>
            {promotions.length > 0 ? (
              promotions.map((item) => (
                <CustomePromotionCard
                  key={item.id}
                  itemId={item.id}
                  title={item.name}
                  description={item.description}
                  code={item.code}
                  onPress={() => {
                    navigation.navigate("PromotionDetail", { itemDetails: item });
                  }}
                  icon="date-range"
                  buttonName="manage"
                  buttonIsActive={true}
                  expiryDate={item.expiryDate}
                />
              ))
            ) : (
              <NoResultsCard
                message={"Sorry, No promotions found In the Menu."}
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
          <CreatePromotionModal onClose={() => setModalVisible(false)} />
        </Modal>
        <TouchableOpacity style={recycledStyles.addButton} onPress={() => setModalVisible(true)} activeOpacity={0.7}>
          <Ionicons name="add" size={40} color="white" />
        </TouchableOpacity>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  
});
