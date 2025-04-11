import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Keyboard, ScrollView, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ToastManager, { Toast } from "toastify-react-native";
import { deleteItem } from "../../../api/genericItem";
import { buttonBuilder } from "../../../components/button";
import { CustomeGenericDetailsCard } from "../../../components/customeDetailsCard";
import { recycledStyles, toastManagerProps } from "../../../components/recycled-style";
import showAlert, { yesOrNoAlert } from "../../../components/showAlert";
import { parseError } from "../../../components/toasts";
import { popWithParams } from "../../../utils/routes";

export default function GenericItemDetailsScreens({ navigation }: { navigation: any }) {
  const [apiInUse, setApiInUse] = useState(false);

  const route = useRoute();
  const params = route.params as { itemDetails?: any };
  const itemDetails = params?.itemDetails;

  
  async function prepare() {
    setApiInUse(false);
  }

  useEffect(() => {
    prepare();
  }, []);
  

  async function handelDeleteItem() {
    yesOrNoAlert(
      "Delete Item",
      "Are you sure you want to delete this Item?",
      async () => {
        setApiInUse(true);

        const deltedRes = await deleteItem(itemDetails.id);
        if (deltedRes.data.success !== true) {
          Toast.error(parseError(deltedRes));
          setApiInUse(false);
          return;
        }
        setApiInUse(false);
        showAlert("Sucess", `Item deleted successfully  `, async () => {
          popWithParams(navigation, 1, { refresh: true });
        });
      },
      () => {
        return;
      }
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={recycledStyles.safeAreaView}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <ToastManager {...toastManagerProps} />

          <CustomeGenericDetailsCard
            itemId={itemDetails.id}
            title={itemDetails.name}
            description={itemDetails.description}
            foodTypes={itemDetails.foodPreferences}
          />

          <View style={recycledStyles.buttons}>
            {buttonBuilder(
              "Edit Item",
              () => {
                navigation.navigate("GenericItemEdit", { itemDetails });
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
