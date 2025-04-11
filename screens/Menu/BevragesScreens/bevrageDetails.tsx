import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Keyboard, ScrollView, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ToastManager, { Toast } from "toastify-react-native";
import { deleteBevrage } from "../../../api/bevrages";
import { buttonBuilder } from "../../../components/button";
import { CustomeBevrageCard } from "../../../components/customeDetailsCard";
import { recycledStyles, toastManagerProps } from "../../../components/recycled-style";
import showAlert, { yesOrNoAlert } from "../../../components/showAlert";
import { parseError } from "../../../components/toasts";
import { popWithParams } from "../../../utils/routes";
export default function BevrageDetailsScreens({ navigation }: { navigation: any }) {
  const [apiInUse, setApiInUse] = useState(false);

  const route = useRoute(); // ✅ Get the route object
  const { itemDetails } = route.params as { itemDetails: any };

  async function prepare() {
    setApiInUse(false);
  }

  useEffect(() => {
    prepare();
  }, []);
  

  async function handelDeleteBevrage() {
    yesOrNoAlert(
      "Delete Bevrage",
      "Are you sure you want to delete this Beverage?",
      async () => {
        setApiInUse(true);
        const deltedRes = await deleteBevrage(itemDetails.id);
        if (deltedRes.data.success !== true) {
          Toast.error(parseError(deltedRes));
          setApiInUse(false);
          return;
        }
        setApiInUse(false);
        showAlert("Sucess", `Bevrages deleted successfully  `, async () => {
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
        <ToastManager {...toastManagerProps} />
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <CustomeBevrageCard
            key={itemDetails.id}
            itemId={itemDetails.id}
            title={itemDetails.name}
            description={itemDetails.description}
            drinkTypes={itemDetails.drinkTypes}
            icon="usd"
            price={itemDetails.price}
            files={itemDetails.files || []}
            isSmall={false}
            quantity={itemDetails.quantity}
            itemType={itemDetails.itemType}
          />
          <View style={recycledStyles.buttons}>
            {buttonBuilder(
              "Edit Bevrage",
              () => {
                navigation.navigate("BevrageEdit", { itemDetails });
              },
              apiInUse,
              undefined,
              true
            )}
            {buttonBuilder("Delete Bevrage", handelDeleteBevrage, apiInUse)}
          </View>
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({});
