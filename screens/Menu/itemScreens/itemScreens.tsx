import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Keyboard, Modal, RefreshControl, ScrollView, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ToastManager, { Toast } from "toastify-react-native";
import { getItems } from "../../../api/item";
import { CustomeCard } from "../../../components/customeCard";
import { recycledStyles, toastManagerProps } from "../../../components/recycled-style";
import searchContainer from "../../../components/searchContainer";
import NoResultsCard from "../../../components/searchNotFound";
import { parseError } from "../../../components/toasts";
import CreateGroupModal from "./createGroupModal";

export default function ItemScreens({navigation}: {navigation: any}) {
  const [apiInUse, setApiInUse] = useState(false);
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

  const [refreshing, setRefreshing] = useState(false);

  async function prepare() {
    setApiInUse(false);

    const itemResponse = await getItems();

    if (itemResponse.status !== 200) {
      Toast.error(parseError(itemResponse));
      setApiInUse(false);
      return;
    }

    setItems(itemResponse.data.items);

    setApiInUse(false);
  }

  useEffect(() => {
    prepare();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await prepare();
      setRefreshing(false);
    } catch (error) {
      setRefreshing(false);
    }
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

  // Debounced search to prevent excessive API calls
  useEffect(() => {
    setButtonVisible(true);
    const delayDebounce = setTimeout(() => {}, 500); // Delay search by 500ms after user stops typing

    return () => clearTimeout(delayDebounce); // Cleanup function
  }, [formik.values.itemName]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.safeAreaView}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, }} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
          <ToastManager {...toastManagerProps} />
          <View style={{  }}>{searchContainer(formik, buttonVisible, apiInUse, "itemName")}</View>

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
  safeAreaView: { flex: 1, backgroundColor: "#12193D", paddingHorizontal: 10, paddingTop: 10,paddingBottom: 10 },

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
