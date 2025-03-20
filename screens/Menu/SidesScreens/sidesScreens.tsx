import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Keyboard, Modal, RefreshControl, ScrollView, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ToastManager, { Toast } from "toastify-react-native";
import { getSauce, searchSauce } from "../../../api/sauce";
import { getSide, searchSide } from "../../../api/sides";
import { recycledStyles, toastManagerProps } from "../../../components/recycled-style";
import searchContainer from "../../../components/searchContainer";
import NoResultsCard from "../../../components/searchNotFound";
import { parseError } from "../../../components/toasts";
import CreateGroupModal from "./createGroupModal";
import { CustomeImageCard, CustomeMenuCard } from "../../../components/customeCard";
export default function SidesScreens({ navigation }: { navigation: any }) {
  const [apiInUse, setApiInUse] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [refreshing, setRefreshing] = useState(false);
  const [sides, setSides] = useState<any[]>([]);
  const [pages, setPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [refreshes, setRefreshes] = useState<number>(0);

  async function prepare(isRefreshing: boolean = false) {
    if (isRefreshing) {
      setCurrentPage(1);
      setRefreshes(refreshes + 1);
    }
    setApiInUse(false);

    const itemResponse = await getSide();

    if (itemResponse.data.success !== true) {
      Toast.error(parseError(itemResponse));
      setRefreshing(false);
      setApiInUse(false);
      return;
    }

    setPages(itemResponse.data.pages);
    setSides(itemResponse.data.results);

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
      sideName: "",
    },
    validationSchema: null,
    onSubmit: async (values) => {
      setButtonVisible(false);
      fetchSauce(values.sideName);
    },
  });

  const fetchSauce = async (query: string) => {
    if (query.trim() === "") {
      prepare(true);
      return;
    }

    setApiInUse(true);
    try {
      const itemSearchRes = await searchSide(query);
      if (itemSearchRes.data.success === true) {
        setSides(itemSearchRes.data.results);
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
      fetchSauce(formik.values.sideName);
    }, 500);

    return () => clearTimeout(delayDebounce); // Cleanup function
  }, [formik.values.sideName]);

  async function loadMore() {
    if (apiInUse) {
      return;
    }

    setApiInUse(true);

    const itemResponse = await getSide(currentPage + 1, sides[sides.length - 1].id);
    if (itemResponse.data.success !== true) {
      Toast.error(parseError(itemResponse));
    } else {
      setSides([...sides, ...itemResponse.data.sauces] as []);
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
          <View style={{ marginBottom: 10 }}>{searchContainer(formik, buttonVisible, apiInUse, "sideName")}</View>

          <ScrollView>
            {sides.length > 0 ? (
              sides.map((item) => (
                <CustomeMenuCard
                  key={item.id}
                  itemId={item.id }
                  title={item.name}
                  description={item.description}
                  menuTypes={item.menuTypes}
                  items = {item.items} 
                  sauces={item.sauces }
                  bevrages={item.beverages}
                  onPress={() => {
                    navigation.navigate("BevrageDetails", { itemDetails: item });
                  }}
                  icon="usd"
                  buttonName="manage"
                  buttonIsActive={true}
                  price={item.price}
                  files={item.images }
                  isSmall={true}
                />
              ))
            ) : (
              <NoResultsCard
                message={"Sorry, No Item found In the Sides."}
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
          <CreateGroupModal onClose={() => setModalVisible(false)} />
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
