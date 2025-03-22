import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Keyboard, ScrollView, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ToastManager, { Toast } from "toastify-react-native";
import { buttonBuilder } from "../../../components/button";

import { deleteProduct } from "../../../api/product";
import { CustomeMenuCard } from "../../../components/customeDetailsCard";
import { recycledStyles, toastManagerProps } from "../../../components/recycled-style";
import showAlert from "../../../components/showAlert";
import { parseError } from "../../../components/toasts";
import { popWithParams } from "../../../utils/routes";
export default function ProductDetailsScreens({ navigation }: { navigation: any }) {
  const [apiInUse, setApiInUse] = useState(false);

  const route = useRoute(); // ✅ Get the route object
  const { itemDetails } = route.params as { itemDetails: any };

  async function prepare() {
    setApiInUse(false);
  }

  useEffect(() => {
    prepare();
  }, []);
  const handelDeleteProduct = async () => {
    setApiInUse(true);
    const deltedRes = await deleteProduct(itemDetails.id);
    if (deltedRes.data.success !== true) {
      Toast.error(parseError(deltedRes));
      setApiInUse(false);
      return;
    }
    setApiInUse(false);

    showAlert("Sucess", `Product deleted successfully  `, async () => {
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
          />
          <View style={recycledStyles.buttons}>
            {buttonBuilder(
              "Edit Product",
              () => {
                navigation.navigate("ProductEdit", { itemDetails });
              },
              apiInUse,
              undefined,
              true
            )}
            {buttonBuilder("Delete Product", handelDeleteProduct, apiInUse)}
          </View>
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({});
