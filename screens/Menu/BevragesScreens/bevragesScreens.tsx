import { Ionicons } from "@expo/vector-icons";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Keyboard, Modal, RefreshControl, ScrollView, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ToastManager, { Toast } from "toastify-react-native";
import { getBevrage, searchBevrage } from "../../../api/bevrages";
import { CustomeImageCard } from "../../../components/customeCard";
import { recycledStyles, toastManagerProps } from "../../../components/recycled-style";
import searchContainer from "../../../components/searchContainer";
import NoResultsCard from "../../../components/searchNotFound";
import { parseError } from "../../../components/toasts";
import CreateGroupModal from "./createGroupModal";
import { Image } from "react-native";


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

  const [pages, setPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [refreshes, setRefreshes] = useState<number>(0);

  async function prepare(isRefreshing: boolean = false) {
    if (isRefreshing) {
      
      setCurrentPage(1);
      setRefreshes(refreshes + 1);
    }
    setApiInUse(false);

    const itemResponse = await getBevrage();

    if (itemResponse.data.success !== true) {
      Toast.error(parseError(itemResponse));
      setRefreshing(false);
      setApiInUse(false);
      return;
    }
   

    setPages(itemResponse.data.pages);
    setBevrages(itemResponse.data.results);
   


    setApiInUse(false);
    setRefreshing(false);
  }

  useEffect(() => {
    prepare();
  }, []);

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

  async function loadMore() {
    if (apiInUse) {
      return;
    }

    setApiInUse(true);

    const itemResponse = await getBevrage(currentPage + 1, bevrages[bevrages.length - 1].id);
    if (itemResponse.data.success !== true) {
      Toast.error(parseError(itemResponse));
    } else {
      setBevrages([...bevrages, ...itemResponse.data.sauces] as []);
      setCurrentPage(currentPage + 1);
    }

    setApiInUse(false);
  }
  function onScroll(event: any) {
    if (apiInUse || currentPage === pages) {
      return;
    }

    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    if (layoutMeasurement.height + contentOffset.y >= contentSize.height - 1000) {
      console.log("loading more, 1000", apiInUse, currentPage, pages);
      loadMore();
    }
  }
  const onRefresh = () => {
    setRefreshing(true);
    prepare(true);
  };


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={recycledStyles.safeAreaView}>
        <ScrollView
          onScroll={onScroll}
          scrollEventThrottle={16}
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          <ToastManager {...toastManagerProps} />
          <View style={{ marginBottom: 10 }}>{searchContainer(formik, buttonVisible, apiInUse, "bevrageName")}</View>

          <ScrollView>
            {bevrages.length > 0 ? (
              bevrages.map((item) => (
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
                  files={item.files || []}
                  isSmall={true}
                />
              ))
            ) : (
              <NoResultsCard message={"Sorry, No Bevrages found In the Menu."} />
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
  

  
});
