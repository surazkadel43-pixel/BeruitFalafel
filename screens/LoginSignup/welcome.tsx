import { StackActions, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ToastManager, { Toast } from "toastify-react-native";
import { dispose, snatch } from "../../api/store";
import { validateAuthCookie } from "../../api/user";
import { buttonBuilder } from "../../components/button";
import { recycledStyles, toastManagerProps } from "../../components/recycled-style";
import { parseError } from "../../components/toasts";

type RootStackParamList = {
  LoginNavigator: undefined;
  BottomTabs: undefined;
};
export default function Welcome({ navigation }: any) {
  const myNavigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [apiInUse, setApiInUse] = useState<boolean>(true);

  async function prepare() {
    const savedCookie = await snatch("authCookie");

    if (!savedCookie) {
      setApiInUse(false);
      return;
    }

    const checkCookieRes = await validateAuthCookie(savedCookie);

    if (checkCookieRes.status !== 200) {
      await dispose("authCookie");
      setApiInUse(false);
      Toast.error(parseError(checkCookieRes));
      return;
    }

    setApiInUse(false);

    myNavigation.reset({
      index: 0,
      routes: [{ name: "BottomTabs" }], // This replaces the entire stack
    });
  }

  useEffect(() => {
    prepare();
  }, []);

  return (
    <SafeAreaView style={recycledStyles.safeAreaView}>
      <ToastManager {...toastManagerProps} />
      <Text style={recycledStyles.title}>Welcome to Beruit Falafel!</Text>
      <Text style={styles.subTitle}>This app is for Owner!</Text>
      {buttonBuilder(
        "Start",
        async () => {
          navigation.dispatch(StackActions.replace("Login"));
        },
        apiInUse,
        undefined,
        true
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  subTitle: {
    color: "#f3f4f6",
    fontSize: 25,
    textAlign: "center",
    margin: 10,
  },
});
