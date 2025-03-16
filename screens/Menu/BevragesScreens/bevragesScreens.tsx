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

const dummyBeverageData = [
  {
    id: 1,
    name: "Fresh Orange Juice",
    price: 4.99,
    description: "Freshly squeezed orange juice with no added sugar.",
    files: [{ presignedURL: Image.resolveAssetSource(images[0]).uri }],
    drinkTypes: ["Juice"],
  },
  {
    id: 2,
    name: "Green Tea",
    price: 3.99,
    description: "A soothing cup of hot green tea, rich in antioxidants.",
    files: [{ presignedURL: Image.resolveAssetSource(images[1]).uri }],
    drinkTypes: ["Tea"],
  },
  {
    id: 3,
    name: "Classic Coca-Cola",
    price: 2.99,
    description: "Chilled, carbonated Coca-Cola for a refreshing taste.",
    files: [{ presignedURL: Image.resolveAssetSource(images[2]).uri }],
    drinkTypes: ["Soda"],
  },
  {
    id: 4,
    name: "Caffe Latte",
    price: 5.49,
    description: "Smooth espresso with steamed milk and a touch of foam.",
    files: [{ presignedURL: Image.resolveAssetSource(images[3]).uri }],
    drinkTypes: ["Coffee"],
  },
  {
    id: 5,
    name: "Red Wine",
    price: 8.99,
    description: "A glass of rich, aged red wine with deep flavors.",
    files: [{ presignedURL: Image.resolveAssetSource(images[4]).uri }],
    drinkTypes: ["Alcohol"],
  },
];


export default function BevrageScreens({ navigation }: { navigation: any }) {
  const [apiInUse, setApiInUse] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [bevrages, setBevrages] = useState<any[]>(dummyBeverageData);
  const [refreshing, setRefreshing] = useState(false);

  const [pages, setPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [refreshes, setRefreshes] = useState<number>(0);

  async function prepare(isRefreshing: boolean = false) {
    if (isRefreshing) {
      setBevrages([]);
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
    setBevrages(itemResponse.data.bevrages);

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
      prepare();
      return;
    }

    setApiInUse(true);
    try {
      const itemSearchRes = await searchBevrage(query);
      if (itemSearchRes.data.success === true) {
        setBevrages(itemSearchRes.data);
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
      <SafeAreaView style={styles.safeAreaView}>
        <ScrollView
          onScroll={onScroll}
          scrollEventThrottle={16}
          contentContainerStyle={{ flexGrow: 1 }}
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
                  files={item.files}
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
  safeAreaView: { flex: 1, backgroundColor: "#12193D", paddingHorizontal: 10, paddingTop: 10 },

  content: {
    //flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  subtitle: {
    color: "white",
    textAlign: "center",
    marginTop: 8,
    paddingHorizontal: 16,
  },
  button: {
    marginTop: 16,
    backgroundColor: "#3b82f6",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
  },
});
