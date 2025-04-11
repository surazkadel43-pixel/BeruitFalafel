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
import { getAllBevragesByType, searchBevrage } from "../../../api/bevrages";
import { buttonBuilder } from "../../../components/button";
import { CustomeImageCard } from "../../../components/customeCard";
import { recycledStyles, toastManagerProps } from "../../../components/recycled-style";
import searchContainer from "../../../components/searchContainer";
import NoResultsCard from "../../../components/searchNotFound";
import { parseError } from "../../../components/toasts";
import { useStickyScroll } from "../../../hooks/useStickyScroll";
import { getProductTypeById, ItemType } from "../../../utils/enums";
import CreateGroupModal from "./createGroupModal";

const images = [
  require("../../../assets/images/skewers.png"),
  require("../../../assets/images/oreganoLabneh.png"),
  require("../../../assets/images/oregannoVeggi.png"),
  require("../../../assets/images/beefBurgerChips.png"),
  require("../../../assets/images/traditionalFalafelWrap.png"),
];

export default function BevrageScreens({ navigation }: { navigation: any }) {
  const [apiInUse, setApiInUse] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [bevrages, setBevrages] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [shouldRefresh, setShouldRefresh] = useState(false);
  const route = useRoute() as { params?: { refresh?: boolean } };
  const [refreshes, setRefreshes] = useState<number>(0);
  let { onScroll, scrollY, stickyTop, stickyOpacity, resetScroll } = useStickyScroll();
  const itemType = useRef<number>(1);
  async function prepare(isRefreshing: boolean = false) {
    if (isRefreshing) {
      setRefreshes(refreshes + 1);
    }
    setApiInUse(false);

    const itemResponse = await getAllBevragesByType(itemType.current);

    if (itemResponse.data.success !== true) {
      Toast.error(parseError(itemResponse));
      setRefreshing(false);
      setApiInUse(false);
      return;
    }

    setBevrages(itemResponse.data.results);

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

  const formik = useFormik({
    initialValues: {
      bevrageName: "",
    },
    validationSchema: null,
    onSubmit: async (values) => {
      setButtonVisible(false);
      fetchBevrage(values.bevrageName);
    },
  });
  const fetchBevrage = async (query: string) => {
    if (query.trim() === "") {
      prepare(true);
      return;
    }

    setApiInUse(true);
    try {
      const itemSearchRes = await searchBevrage(query);
      if (itemSearchRes.data.success === true) {
        setBevrages(itemSearchRes.data.results);
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
      fetchBevrage(formik.values.bevrageName);
    }, 500);

    return () => clearTimeout(delayDebounce); // Cleanup function
  }, [formik.values.bevrageName]);

  const onRefresh = () => {
    setRefreshing(true);
    prepare(true);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={recycledStyles.safeAreaView}>
        <ToastManager {...toastManagerProps} />
        <FlatList
          data={bevrages} // Your array of products
          keyExtractor={(item) => item.id.toString()} // Provide a unique key for each item
          renderItem={({ item }) => (
            <CustomeImageCard
              key={item.id}
              itemId={item.id}
              title={item.name}
              description={item.description}
              drinkTypes={item.drinkTypes}
              onPress={() => {
                navigation.navigate("BevrageDetails", { itemDetails: item });
              }}
              icon="usd"
              buttonName="manage"
              buttonIsActive={true}
              price={item.price}
              quantity={item.quantity}
              itemType={getProductTypeById(item.itemType)}
            />
          )}
          ListEmptyComponent={() => (
            <NoResultsCard
              message={"Sorry, No Bevrages found In the Products."}
              additionalProps={{
                icon: <FontAwesome name="cutlery" size={30} color="white" />,
              }}
            />
          )}
          ListHeaderComponent={
            <View style={{ marginBottom: 10 }}>
              {searchContainer(formik, buttonVisible, apiInUse, "bevrageName")}
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
