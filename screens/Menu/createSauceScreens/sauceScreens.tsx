import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Keyboard, Modal, RefreshControl, ScrollView, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ToastManager, { Toast } from "toastify-react-native";
import { getSauce, searchSauce } from "../../../api/sauce";
import { CustomeCard } from "../../../components/customeCard";
import { recycledStyles, toastManagerProps } from "../../../components/recycled-style";
import searchContainer from "../../../components/searchContainer";
import NoResultsCard from "../../../components/searchNotFound";
import { parseError } from "../../../components/toasts";
import CreateGroupModal from "./createGroupModal";
export default function SauceScreens({ navigation }: { navigation: any }) {
  const [apiInUse, setApiInUse] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [refreshing, setRefreshing] = useState(false);
  const [sauces, setSauces] = useState<any[]>([])
  const [pages, setPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [refreshes, setRefreshes] = useState<number>(0);

  async function prepare(isRefreshing: boolean = false) {
    if (isRefreshing) {
      
      setCurrentPage(1);
      setRefreshes(refreshes + 1);
    }
    setApiInUse(false);

    const itemResponse = await getSauce();

    if (itemResponse.data.success !== true) {
      Toast.error(parseError(itemResponse));
      setRefreshing(false);
      setApiInUse(false);
      return;
    }

    setPages(itemResponse.data.pages);
    setSauces(itemResponse.data.sauces);

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
      sauceName: "",
    },
    validationSchema: null,
    onSubmit: async (values) => {
      setButtonVisible(false);
      fetchSauce(values.sauceName);
    },
  });

  const fetchSauce = async (query: string) => {
    if (query.trim() === "") {
      prepare(true);
      return;
    }

    setApiInUse(true);
    try {
      const itemSearchRes = await searchSauce(query);
      if (itemSearchRes.data.success === true) {
        setSauces(itemSearchRes.data.sauces);
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
      fetchSauce(formik.values.sauceName);
    }, 500); 

    return () => clearTimeout(delayDebounce); // Cleanup function
  }, [formik.values.sauceName]);

  async function loadMore() {
    if (apiInUse) {
      return;
    }

    setApiInUse(true);

    const itemResponse = await getSauce(currentPage+ 1, sauces[sauces.length - 1].id);
    if (itemResponse.data.success !== true) {
      Toast.error(parseError(itemResponse));
    } else {
      setSauces([...sauces, ...itemResponse.data.sauces] as []);
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
          <View style={{ marginBottom: 10 }}>{searchContainer(formik, buttonVisible, apiInUse, "sauceName")}</View>

          <ScrollView>
            {sauces.length > 0 ? (
              sauces.map((item) => (
                <CustomeCard
                  key={item.id}
                  itemId={item.id}
                  title={item.name}
                  description={item.description}
                  foodTypes={item.foodPreferences}
                  onPress={() => {
                    navigation.navigate("SauceDetails", { itemDetails: item });
                  }}
                  icon="usd"
                  buttonName="manage"
                  buttonIsActive={true}
                  price={item.price}
                />
              ))
            ) : (
              <NoResultsCard
                message={"Sorry, No Item found In the Menu."}
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
