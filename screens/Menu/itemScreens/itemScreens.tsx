import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Keyboard, Modal, RefreshControl, ScrollView, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ToastManager, { Toast } from "toastify-react-native";
import { getItem, searchItem } from "../../../api/item";
import { CustomeCard } from "../../../components/customeCard";
import { recycledStyles, toastManagerProps } from "../../../components/recycled-style";
import searchContainer from "../../../components/searchContainer";
import NoResultsCard from "../../../components/searchNotFound";
import { parseError } from "../../../components/toasts";
import CreateGroupModal from "./createGroupModal";

export default function ItemScreens({ navigation }: { navigation: any }) {
  const [apiInUse, setApiInUse] = useState(true);
  const [buttonVisible, setButtonVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  //const [items, setItems] = useState<any[]>([]);
  const [items, setItems] = useState<any[]>([
    {
      id: 1,
      name: "Burger",
      description: "A delicious cheeseburger",
      price: 8.99,
      foodPreferences: ["V", "DF"],
    },
    {
      id: 2,
      name: "Vegan Salad",
      description: "A fresh green salad with avocado",
      price: 6.49,
      foodPreferences: ["V", "GF"],
    },
    {
      id: 3,
      name: "Pasta",
      description: "Classic Italian pasta with tomato sauce",
      price: 10.99,
      foodPreferences: ["V"],
    },
    {
      id: 4,
      name: "Gluten-Free Pizza",
      description: "A crispy pizza with gluten-free crust",
      price: 12.99,
      foodPreferences: ["GF"],
    },
    {
      id: 5,
      name: "Nut-Free Cake",
      description: "Chocolate cake made without nuts",
      price: 5.99,
      foodPreferences: ["NF"],
    },
  ]);
  const [pages, setPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [refreshing, setRefreshing] = useState(false);
  const [refreshes, setRefreshes] = useState<number>(0);

  async function prepare(isRefreshing: boolean = false) {
    if (isRefreshing) {
      setItems([]);
      setCurrentPage(1);
      setRefreshes(refreshes + 1);
    }
    setApiInUse(false);

    const itemResponse = await getItem();

    if (itemResponse.data.success !== true) {
      Toast.error(parseError(itemResponse));
      setRefreshing(false);
      setApiInUse(false);
      return;
    }
    setPages(itemResponse.data.pages);
    setItems(itemResponse.data.items);

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
      itemName: "",
    },
    validationSchema: null,
    onSubmit: async (values) => {
      //setApiInUse(true);
      values.itemName = "";
      //setApiInUse(false);
    },
  });

  const fetchItem = async (query: string) => {
    if (query.trim() === "") {
      setItems([]);
      return;
    }

    setApiInUse(true);
    try {
      const itemSearchRes = await searchItem(query);
      if (itemSearchRes.data.success === true) {
        setItems(itemSearchRes.data);
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

    const postReq = await getItem(currentPage + 1, items[items.length - 1].id);
    if (postReq.data.success !== true) {
      Toast.error(parseError(postReq));
    } else {
      setItems([...items, ...postReq.data.results] as []);
      setCurrentPage(currentPage + 1);
    }

    setApiInUse(false);
  }
  // Debounced search to prevent excessive API calls
  useEffect(() => {
    setButtonVisible(true);
    const delayDebounce = setTimeout(() => {
      fetchItem(formik.values.itemName);
    }, 500); // Delay search by 500ms after user stops typing

    return () => clearTimeout(delayDebounce); // Cleanup function
  }, [formik.values.itemName]);

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
      <SafeAreaView key={refreshes} style={styles.safeAreaView}>
        <ScrollView
          onScroll={onScroll}
          scrollEventThrottle={16}
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          <ToastManager {...toastManagerProps} />
          <View style={{}}>{searchContainer(formik, buttonVisible, apiInUse, "itemName")}</View>

          <ScrollView>
            {items.length > 0 ? (
              items.map((item) => (
                <CustomeCard
                  key={item.id}
                  itemId={item.id}
                  title={item.name}
                  description={item.description}
                  foodTypes={item.foodPreferences}
                  onPress={() => {
                    console.log(`this is  ${item.id}`);
                    navigation.navigate("ItemDetail", { itemDetails: item });
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
          style={styles.modal}
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
  safeAreaView: { flex: 1, backgroundColor: "#12193D", paddingHorizontal: 10, paddingTop: 10, paddingBottom: 10 },

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
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
});
