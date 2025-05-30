import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Keyboard, ScrollView, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ToastManager, { Toast } from "toastify-react-native";

import { buttonBuilder } from "../../../components/button";

import { deleteSide } from "../../../api/sides";
import { CustomeMenuCard } from "../../../components/customeDetailsCard";
import { recycledStyles, toastManagerProps } from "../../../components/recycled-style";
import showAlert, { yesOrNoAlert } from "../../../components/showAlert";
import { parseError } from "../../../components/toasts";
import { popWithParams } from "../../../utils/routes";
export default function SidesDetailsScreens({ navigation }: { navigation: any }) {
  const [apiInUse, setApiInUse] = useState(false);

  const route = useRoute(); // ✅ Get the route object
  const { itemDetails } = route.params as { itemDetails: any };
  async function prepare() {
    setApiInUse(false);
  }

  useEffect(() => {
    prepare();
  }, []);
  

  async function handelDeleteSide() {
    yesOrNoAlert(
      "Delete Side",
      "Are you sure you want to delete this Side?",
      async () => {
        setApiInUse(true);
        const deltedRes = await deleteSide(itemDetails.id);
        if (deltedRes.data.success !== true) {
          Toast.error(parseError(deltedRes));
          setApiInUse(false);
          return;
        }
        setApiInUse(false);
        showAlert("Sucess", `Sides deleted successfully  `, async () => {
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
          <CustomeMenuCard
            key={itemDetails.id}
            itemId={itemDetails.id}
            title={itemDetails.name}
            description={itemDetails.description}
            foodTypes={itemDetails.sidesTypes}
            meats={itemDetails.meats}
            sauces={itemDetails.sauces}
            bevrages={itemDetails.beverages}
            items={itemDetails.items}
            productType={itemDetails.itemType}
            icon="usd"
            price={itemDetails.price}
            files={itemDetails.files || []}
            isSmall={false}
            quantity={itemDetails.quantity}
          />
          <View style={recycledStyles.buttons}>
            {buttonBuilder(
              "Edit Side",
              () => {
                navigation.navigate("SidesEdit", { itemDetails });
              },
              apiInUse,
              undefined,
              true
            )}
            {buttonBuilder("Delete Side", handelDeleteSide, apiInUse)}
          </View>
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({});
