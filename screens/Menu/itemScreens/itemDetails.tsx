import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Keyboard, ScrollView, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ToastManager, { Toast } from "toastify-react-native";
import { deleteItem } from "../../../api/item";
import { buttonBuilder } from "../../../components/button";
import { CustomeDetailsCard } from "../../../components/customeDetailsCard";
import { recycledStyles, toastManagerProps } from "../../../components/recycled-style";
import showAlert from "../../../components/showAlert";
import { parseError } from "../../../components/toasts";
import { popWithParams } from "../../../utils/routes";
export default function ItemDetailsScreens({ navigation }: { navigation: any }) {
  const [apiInUse, setApiInUse] = useState(false);

  const route = useRoute(); // ✅ Get the route object
  const { itemDetails } = route.params as { itemDetails: any };

  async function prepare() {
    setApiInUse(false);
  }

  useEffect(() => {
    prepare();
  }, []);
  const handelDeleteItem = async () => {
    setApiInUse(true);

    const deltedRes = await deleteItem(itemDetails.id);
    if (deltedRes.data.success !== true) {
      Toast.error("deltedRes.data.error");
      Toast.error(parseError(deltedRes));
      setApiInUse(false);
      return;
    }
    setApiInUse(false);
    showAlert("Sucess", `Item deleted successfully  `, async () => {
      popWithParams(navigation, 1, { refresh: true });
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={recycledStyles.safeAreaView}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <ToastManager {...toastManagerProps} />
          <CustomeDetailsCard
            itemId={itemDetails.id}
            title={itemDetails.name}
            description={itemDetails.description}
            price={itemDetails.price}
            foodTypes={itemDetails.foodPreferences}
            icon="usd"
          />
          <View style={recycledStyles.buttons}>
            {buttonBuilder(
              "Edit Item",
              () => {
                navigation.navigate("ItemEdit", { itemDetails });
              },
              apiInUse,
              undefined,
              true
            )}
            {buttonBuilder("Delete Item", handelDeleteItem, apiInUse)}
          </View>
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({});
