import { dispose, snatch, store } from "./api/store";
import { validateAuthCookie } from "./api/user";
import { buttonBuilder } from "./components/button";
import { recycledStyles, toastManagerProps } from "./components/recycled-style";
import { parseError } from "./components/toasts";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ToastManager, { Toast } from "toastify-react-native";

import MainNavigation from "./routes/MainNagigation";

export default function Index() {
  

  return (
   
      <MainNavigation />
   
  );
}

const styles = StyleSheet.create({
  subTitle: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    margin: 10,
  },
});
