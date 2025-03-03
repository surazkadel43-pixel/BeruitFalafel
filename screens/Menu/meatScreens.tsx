import { Ionicons } from "@expo/vector-icons";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Keyboard, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ToastManager from "toastify-react-native";
import { buttonBuilder } from "../../components/button";
import { recycledStyles, toastManagerProps } from "../../components/recycled-style";
import searchContainer from "../../components/searchContainer";
export default function MeatScreens() {
  const [apiInUse, setApiInUse] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [meat, setMeat] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate a data fetch or API call
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };
  const formik = useFormik({
    initialValues: {
      meatName: "",
    },
    validationSchema: null,
    onSubmit: async (values) => {
      //setApiInUse(true);
      values.meatName = "";
      //setApiInUse(false);
    },
  });

  // Debounced search to prevent excessive API calls
  useEffect(() => {
    setButtonVisible(true);
    const delayDebounce = setTimeout(() => {}, 500); // Delay search by 500ms after user stops typing

    return () => clearTimeout(delayDebounce); // Cleanup function
  }, [formik.values.meatName]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.safeAreaView}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
          <ToastManager {...toastManagerProps} />
          <View style={{ marginBottom: 10 }}>{searchContainer(formik, buttonVisible, apiInUse, "meatName")}</View>

          <TouchableOpacity style={recycledStyles.addButton} onPress={() => setModalVisible(true)} activeOpacity={0.7}>
            <Ionicons name="add" size={40} color="white" />
          </TouchableOpacity>

          <View style={styles.content}>
            <Text style={styles.title}>Welcome to Anno Menu </Text>
            <Text style={styles.subtitle}>This is for Meat Screens</Text>

            {buttonBuilder("Go to Feed", () => {}, apiInUse, undefined, true, {
              styles: styles.button,
              buttonText: styles.buttonText,
              hitSlop: { top: 10, left: 10, right: 10, bottom: 10 },
            })}
          </View>
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  safeAreaView: { flex: 1, backgroundColor: "#12193D", paddingHorizontal: 10, paddingTop: 10 },

  content: {
    //flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  subtitle: {
    color: "white",
    textAlign: "center",
    marginTop: 8,
    paddingHorizontal: 16,
  },
  button: {
    marginTop: 16,
    backgroundColor: "#3b82f6",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
  },
});
