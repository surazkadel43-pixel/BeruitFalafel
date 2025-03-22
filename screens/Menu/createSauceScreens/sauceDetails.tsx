import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Keyboard, ScrollView, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ToastManager, { Toast } from "toastify-react-native";
import { deleteSauce } from "../../../api/sauce";
import { buttonBuilder } from "../../../components/button";
import { CustomeSauceCard } from "../../../components/customeDetailsCard";
import { recycledStyles, toastManagerProps } from "../../../components/recycled-style";
import showAlert from "../../../components/showAlert";
import { parseError } from "../../../components/toasts";
import { popWithParams } from "../../../utils/routes";
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
    showAlert("Sucess", `Sauce deleted successfully  `, async () => {
      popWithParams(navigation, 1, { refresh: true });
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={recycledStyles.safeAreaView}>
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
          <View style={recycledStyles.buttons}>
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

const styles = StyleSheet.create({});
