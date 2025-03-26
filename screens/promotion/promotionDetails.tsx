import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Keyboard, ScrollView, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ToastManager, { Toast } from "toastify-react-native";
import { removePromotion } from "../../api/promotion";
import { buttonBuilder } from "../../components/button";
import { PromotionDetailsCard } from "../../components/customeCard";
import { recycledStyles, toastManagerProps } from "../../components/recycled-style";
import showAlert from "../../components/showAlert";
import { parseError } from "../../components/toasts";
import { popWithParams } from "../../utils/routes";
export default function PromotionDetailsScreens({ navigation }: { navigation: any }) {
  const [apiInUse, setApiInUse] = useState(false);

  const route = useRoute(); // ✅ Get the route object
  const { PromotionDetails } = route.params as { PromotionDetails: any };

  async function prepare() {
    setApiInUse(false);
  }

  useEffect(() => {
    prepare();
  }, []);
  const handelDeletePromotion = async () => {
    setApiInUse(true);
    const deltedRes = await removePromotion(PromotionDetails.id);
    if (deltedRes.data.success !== true) {
      Toast.error(parseError(deltedRes));
      setApiInUse(false);
      return;
    }
    setApiInUse(false);
    showAlert("Sucess", `Promotion deleted successfully  `, async () => {
      popWithParams(navigation, 1, { refresh: true });
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={recycledStyles.safeAreaView}>
        <ToastManager {...toastManagerProps} />
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <PromotionDetailsCard
            key={PromotionDetails.id}
            itemId={PromotionDetails.id}
            title={PromotionDetails.name}
            description={PromotionDetails.description}
            code={PromotionDetails.code}
            icon="clock-o"
            expiryDate={PromotionDetails.expiryDate}
            files={PromotionDetails.files}
          />
          <View style={recycledStyles.buttons}>{buttonBuilder("Remove Promotion", handelDeletePromotion, apiInUse, undefined, true)}</View>
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({});