import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useFormik } from "formik";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
  FlatList,
  Keyboard,
  Modal,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ToastManager, { Toast } from "toastify-react-native";

import { getAllPromotionByTypes, searchPromotion } from "../../api/promotion";
import { CustomePromotionCard } from "../../components/customeCard";
import { recycledStyles, toastManagerProps } from "../../components/recycled-style";
import searchContainer from "../../components/searchContainer";
import NoResultsCard from "../../components/searchNotFound";
import { parseError } from "../../components/toasts";
import CreatePromotionModal from "./createGroupModal";

import { useFocusEffect, useRoute } from "@react-navigation/core";
import { buttonBuilder } from "../../components/button";
import { useStickyScroll } from "../../hooks/useStickyScroll";
import { ItemType } from "../../utils/enums";

export default function PromotionScreens({ navigation }: { navigation: any }) {
  const [apiInUse, setApiInUse] = useState(true);
  const [buttonVisible, setButtonVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [promotions, setPromotions] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [refreshes, setRefreshes] = useState<number>(0);
  const route = useRoute() as { params?: { refresh?: boolean } };
  const itemType = useRef<number>(1);
  let { onScroll, scrollY, stickyTop, stickyOpacity, resetScroll } = useStickyScroll();

  async function prepare(isRefreshing: boolean = false) {
    if (isRefreshing) {
      setRefreshes(refreshes + 1);
    }
    setApiInUse(false);

    const itemResponse = await getAllPromotionByTypes(itemType.current);

    if (itemResponse.data.success !== true) {
      Toast.error(parseError(itemResponse));
      setRefreshing(false);
      setApiInUse(false);
      return;
    }
    setPromotions(itemResponse.data.results);

    setApiInUse(false);
    setRefreshing(false);
  }

  useEffect(() => {
    prepare();
  }, []);
  useEffect(() => {
    if (refresh) {
      prepare();
      setRefresh(false);
    }
  }, [refresh]);

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

  // Debounced search to prevent excessive API calls
  useEffect(() => {
    setButtonVisible(true);
    const delayDebounce = setTimeout(() => {
      fetchItem(formik.values.promotionCode);
    }, 500); // Delay search by 500ms after user stops typing

    return () => clearTimeout(delayDebounce); // Cleanup function
  }, [formik.values.promotionCode]);

  const handleItemTypeChange = (type: number) => {
    setApiInUse(true);
    resetScroll();
    itemType.current = type;
    onRefresh();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView key={refreshes} style={recycledStyles.safeAreaView}>
        <ToastManager {...toastManagerProps} />

        <FlatList
          data={promotions}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <CustomePromotionCard
              key={item.id}
              itemId={item.id}
              title={item.name}
              description={item.description}
              code={item.code}
              onPress={() => {
                navigation.navigate("PromotionDetails", { PromotionDetails: item });
              }}
              icon="clock-o"
              buttonName="manage"
              buttonIsActive={true}
              expiryDate={item.expiryDate}
              discount={item.discount}
              itemType={item.itemType}
            />
          )}
          ListEmptyComponent={() => (
            <NoResultsCard
              message={"Sorry, No Item found In the Products."}
              additionalProps={{
                icon: <FontAwesome name="cutlery" size={30} color="white" />,
              }}
            />
          )}
          ListHeaderComponent={
            <View style={{ marginBottom: 10 }}>
              {searchContainer(formik, buttonVisible, apiInUse, "promotionCode")}
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false} // Optionally hide the scroll indicator
                contentContainerStyle={{ flexDirection: "row" }}
              >
                <View style={recycledStyles.actionButtons}>
                  {buttonBuilder(
                    "Product",
                    () => handleItemTypeChange(ItemType.Product),
                    apiInUse,
                    undefined,
                    itemType.current === ItemType.Product,
                    {
                      style: [recycledStyles.buttonContainer, { backgroundColor: itemType.current === ItemType.Product ? "green" : "#4C5BD4" }],
                    }
                  )}
                  {buttonBuilder(
                    "Catering",
                    () => handleItemTypeChange(ItemType.Catering),
                    apiInUse,
                    undefined,
                    itemType.current === ItemType.Catering,
                    {
                      style: [recycledStyles.buttonContainer, { backgroundColor: itemType.current === ItemType.Catering ? "green" : "#4C5BD4" }],
                    }
                  )}
                  {buttonBuilder("Both", () => handleItemTypeChange(ItemType.Both), apiInUse, undefined, itemType.current === ItemType.Both, {
                    style: [recycledStyles.buttonContainer, { backgroundColor: itemType.current === ItemType.Both ? "green" : "#4C5BD4" }],
                  })}
                  {buttonBuilder("None", () => handleItemTypeChange(ItemType.None), apiInUse, undefined, itemType.current === ItemType.None, {
                    style: [recycledStyles.buttonContainer, { backgroundColor: itemType.current === ItemType.None ? "green" : "#4C5BD4" }],
                  })}
                </View>
              </ScrollView>
            </View>
          }
          contentContainerStyle={{ paddingBottom: 20 }} // Optional: Add some padding at the bottom if needed
          showsVerticalScrollIndicator={false} // Hide the scroll indicator if needed
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          // onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}
          onScroll={onScroll}
        />
        {/* Animated Action Buttons that appear on top of the list */}
        <Animated.View
          style={[
            recycledStyles.stickyScrollViewWrapper,
            {
              top: stickyTop,
              opacity: stickyOpacity,
            },
          ]}
        >
          <View style={{ marginBottom: 10 }}>
            <ScrollView
              bounces={false}
              horizontal
              showsHorizontalScrollIndicator={false} // Optionally hide the scroll indicator
              contentContainerStyle={{ flexDirection: "row" }}
            >
              <View style={recycledStyles.actionButtons}>
                {buttonBuilder("Product", () => handleItemTypeChange(ItemType.Product), apiInUse, undefined, itemType.current === ItemType.Product, {
                  style: [recycledStyles.buttonContainer, { backgroundColor: itemType.current === ItemType.Product ? "green" : "#4C5BD4" }],
                })}
                {buttonBuilder(
                  "Catering",
                  () => handleItemTypeChange(ItemType.Catering),
                  apiInUse,
                  undefined,
                  itemType.current === ItemType.Catering,
                  {
                    style: [recycledStyles.buttonContainer, { backgroundColor: itemType.current === ItemType.Catering ? "green" : "#4C5BD4" }],
                  }
                )}
                {buttonBuilder("Both", () => handleItemTypeChange(ItemType.Both), apiInUse, undefined, itemType.current === ItemType.Both, {
                  style: [recycledStyles.buttonContainer, { backgroundColor: itemType.current === ItemType.Both ? "green" : "#4C5BD4" }],
                })}
                {buttonBuilder("None", () => handleItemTypeChange(ItemType.None), apiInUse, undefined, itemType.current === ItemType.None, {
                  style: [recycledStyles.buttonContainer, { backgroundColor: itemType.current === ItemType.None ? "green" : "#4C5BD4" }],
                })}
              </View>
            </ScrollView>
          </View>
        </Animated.View>

        {/* Modal */}
        <Modal
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
          animationType="slide"
          transparent={true} // ✅ Keeps background transparent
          style={recycledStyles.modal}
        >
          <CreatePromotionModal onClose={() => setModalVisible(false)} onRefresh={() => setRefresh(true)} />
        </Modal>
        <TouchableOpacity style={recycledStyles.addButton} onPress={() => setModalVisible(true)} activeOpacity={0.7}>
          <Ionicons name="add" size={40} color="white" />
        </TouchableOpacity>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({});
