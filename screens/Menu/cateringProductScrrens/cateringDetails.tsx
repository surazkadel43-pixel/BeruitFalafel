import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Keyboard, ScrollView, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ToastManager, { Toast } from "toastify-react-native";

import { buttonBuilder } from "../../../components/button";

import { deleteCateringProduct } from "../../../api/cateringProduct";
import { CustomeMenuCard } from "../../../components/customeDetailsCard";
import { recycledStyles, toastManagerProps } from "../../../components/recycled-style";
import showAlert from "../../../components/showAlert";
import { parseError } from "../../../components/toasts";
import { popWithParams } from "../../../utils/routes";
export default function CateringDetailsScreens({ navigation }: { navigation: any }) {
  const [apiInUse, setApiInUse] = useState(false);

  const route = useRoute(); // ✅ Get the route object
  const { itemDetails } = route.params as { itemDetails: any };

  async function prepare() {
    setApiInUse(false);
  }

  useEffect(() => {
    prepare();
  }, []);
  const handelDeleteCatering = async () => {
    setApiInUse(true);
    const deltedRes = await deleteCateringProduct(itemDetails.id);
    if (deltedRes.data.success !== true) {
      Toast.error(parseError(deltedRes));
      setApiInUse(false);
      return;
    }
    setApiInUse(false);
    
    showAlert("Sucess", `Catering deleted successfully  `, async () => {
      popWithParams(navigation, 1, { refresh: true });
    });
  };

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
            foodTypes={itemDetails.productTypes}
            meats={itemDetails.meats}
            sauces={itemDetails.sauces}
            bevrages={itemDetails.beverages}
            items={itemDetails.items}
            icon="usd"
            price={itemDetails.price}
            files={itemDetails.files || []}
            isSmall={false}
            quantity={itemDetails.quantity}
            productType={itemDetails.itemType}
          />
          <View style={recycledStyles.buttons}>
            {buttonBuilder(
              "Edit Catering",
              () => {
                navigation.navigate("CateringEdit", { itemDetails });
              },
              apiInUse,
              undefined,
              true
            )}
            {buttonBuilder("Delete Product", handelDeleteCatering, apiInUse)}
          </View>
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({});
