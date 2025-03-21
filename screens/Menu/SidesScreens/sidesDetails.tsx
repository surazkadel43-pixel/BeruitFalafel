import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Keyboard, ScrollView, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ToastManager, { Toast } from "toastify-react-native";

import { buttonBuilder } from "../../../components/button";

import { deleteSide } from "../../../api/sides";
import { recycledStyles, toastManagerProps } from "../../../components/recycled-style";
import showAlert from "../../../components/showAlert";
import { parseError } from "../../../components/toasts";
import { CustomeMenuCard } from "../../../components/customeDetailsCard";
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
  const handelDeleteSide = async () => {
    setApiInUse(true);
    const deltedRes = await deleteSide(itemDetails.id);
    if (deltedRes.data.success !== true) {
      Toast.error(parseError(deltedRes));
      setApiInUse(false);
      return;
    }
    setApiInUse(false);
    showAlert("Sucess", `Sides deleted successfully  `, async () => {
      navigation.goBack();
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
            foodTypes={itemDetails.drinkTypes}
            meats={itemDetails.meats}
            sauces={itemDetails.sauces}
            bevrages={itemDetails.bevrages}
            items={itemDetails.items}
            icon="usd"
            price={itemDetails.price}
            files={itemDetails.files || []}
            isSmall={false}
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
