import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useRoute } from "@react-navigation/native";
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
import { getAllMeatsByType, searchMeat } from "../../../api/meats";
import { buttonBuilder } from "../../../components/button";
import { CustomeCard } from "../../../components/customeCard";
import { recycledStyles, toastManagerProps } from "../../../components/recycled-style";
import searchContainer from "../../../components/searchContainer";
import NoResultsCard from "../../../components/searchNotFound";
import { parseError } from "../../../components/toasts";
import { useStickyScroll } from "../../../hooks/useStickyScroll";
import { ItemType } from "../../../utils/enums";
import CreateGroupModal from "./createGroupModal";
export default function MeatScreens({ navigation }: { navigation: any }) {
  const [apiInUse, setApiInUse] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [refreshing, setRefreshing] = useState(false);
  const [meats, setMeats] = useState<any[]>([]);
  const route = useRoute() as { params?: { refresh?: boolean } };
  const [shouldRefresh, setShouldRefresh] = useState(false);
  const [refreshes, setRefreshes] = useState<number>(0);
  const itemType = useRef<number>(1);
  let { onScroll, scrollY, stickyTop, stickyOpacity, resetScroll } = useStickyScroll();
  async function prepare(isRefreshing: boolean = false) {
    if (isRefreshing) {
      setRefreshes(refreshes + 1);
    }
    setApiInUse(false);

    const itemResponse = await getAllMeatsByType(itemType.current);

    if (itemResponse.data.success !== true) {
      Toast.error(parseError(itemResponse));
      setRefreshing(false);
      setApiInUse(false);
      return;
    }

    setMeats(itemResponse.data.results);

    setApiInUse(false);
    setRefreshing(false);
  }
  const handleItemTypeChange = (type: number) => {
    setApiInUse(true);
    resetScroll();
    itemType.current = type;
    onRefresh();
  };
  useEffect(() => {
    prepare();
  }, []);

  // 2. Refresh only after modal closes with new data

  useEffect(() => {
    if (shouldRefresh) {
      prepare(); // ✅ Refresh after creation
      setShouldRefresh(false);
    }
  }, [shouldRefresh]);

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
      meatName: "",
    },
    validationSchema: null,
    onSubmit: async (values) => {
      setButtonVisible(false);
      fetchSauce(values.meatName);
    },
  });

  const fetchSauce = async (query: string) => {
    if (query.trim() === "") {
      prepare(true);
      return;
    }

    setApiInUse(true);
    try {
      const itemSearchRes = await searchMeat(query);
      if (itemSearchRes.data.success === true) {
        setMeats(itemSearchRes.data.results);
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
      fetchSauce(formik.values.meatName);
    }, 500);

    return () => clearTimeout(delayDebounce); // Cleanup function
  }, [formik.values.meatName]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView key={refreshes} style={recycledStyles.safeAreaView}>
        <ToastManager {...toastManagerProps} />
        <FlatList
          data={meats}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <CustomeCard
              key={item.id}
              itemId={item.id}
              title={item.name}
              description={item.description}
              foodTypes={item.foodPreferences}
              onPress={() => {
                navigation.navigate("MeatDetails", { itemDetails: item });
              }}
              itemType={item.itemType}
              icon="usd"
              buttonName="manage"
              buttonIsActive={true}
              price={item.price}
            />
          )}
          ListEmptyComponent={() => (
            <NoResultsCard
              message={"Sorry, No Meat found In the Products."}
              additionalProps={{
                icon: <FontAwesome name="cutlery" size={30} color="white" />,
              }}
            />
          )}
          ListHeaderComponent={
            <View style={{ marginBottom: 10 }}>
              {searchContainer(formik, buttonVisible, apiInUse, "meatName")}
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
          <CreateGroupModal onClose={() => setModalVisible(false)} onRefresh={() => setShouldRefresh(true)} />
        </Modal>
        <TouchableOpacity style={recycledStyles.addButton} onPress={() => setModalVisible(true)} activeOpacity={0.7}>
          <Ionicons name="add" size={40} color="white" />
        </TouchableOpacity>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({});
