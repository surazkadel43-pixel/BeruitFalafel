import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Keyboard, ScrollView, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ToastManager, { Toast } from "toastify-react-native";
import { deleteItem } from "../../../api/item";
import { buttonBuilder } from "../../../components/button";
import { CustomeDetailsCard, CustomeSauceCard } from "../../../components/customeDetailsCard";
import { toastManagerProps } from "../../../components/recycled-style";
import showAlert from "../../../components/showAlert";
import { parseError } from "../../../components/toasts";
import { deleteSauce } from "../../../api/sauce";
export default function SauceDetailsScreens({ navigation }: { navigation: any }) {
  const [apiInUse, setApiInUse] = useState(false);

  const route = useRoute(); // ✅ Get the route object
  const { itemDetails } = route.params as { itemDetails: any };

  async function prepare() {
    setApiInUse(false);
  }

  useEffect(() => {
    prepare();
  }, []);
  const handelDeleteSauce = async () => {
    setApiInUse(true);
    const deltedRes = await deleteSauce(itemDetails.id);
    if (deltedRes.data.success !== true) {
      Toast.error(parseError(deltedRes));
      setApiInUse(false);
      return;
    }
    setApiInUse(false);
    showAlert("Sucess", `Item deleted successfully  `, async () => {
      navigation.goBack();
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.safeAreaView}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <ToastManager {...toastManagerProps} />
          <CustomeSauceCard
            itemId={itemDetails.id}
            title={itemDetails.name}
            description={itemDetails.description}
            price={itemDetails.price}
            foodTypes={itemDetails.foodPreferences}
            icon="usd"
          />
          <View style={styles.buttons}>
            {buttonBuilder(
              "Edit Sauce",
              () => {
                navigation.navigate("SauceEdit", { itemDetails });
              },
              apiInUse,
              undefined,
              true
            )}
            {buttonBuilder("Delete Sauce", handelDeleteSauce, apiInUse)}
          </View>
        </ScrollView>
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
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  buttons: {
    marginVertical: 10,
    paddingHorizontal: 15,
    rowGap: 5,
  },
});
