import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { invalidateAuthCookie } from "../api/user";
import { dispose, snatch } from "../api/store";
import { useEffect, useState } from "react";
import showAlert from "../components/showAlert";
import { buttonBuilder } from "../components/button";

export default function Profile({navigation} : {navigation: any}) {
  const [authCookie, setAuthCookie] = useState("");
  const [apiInUse, setApiInUse] = useState<boolean>(true)
  async function prepare() {
    setApiInUse(false);
    const authCookie = await snatch("authCookie"); // assuming snatch returns a string

    if (authCookie) {
      setAuthCookie(authCookie);
      
    } else {
      setApiInUse(true);
      showAlert("Alert", `"Logging out " `, () => {
        navigation.replace("LoginNavigator");
      });
    }
    setApiInUse(false);
  }

  useEffect(() => {
    prepare();
  }, []);
  const handelLogout = async () => {
    setApiInUse(true);
    await dispose("authCookie");
    prepare();
    //navigation.replace("LoginNavigator");
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to Anno</Text>
        <Text style={styles.subtitle}>
          A space for humor, light-hearted conversations, and anonymous fun.
        </Text>
        
        {buttonBuilder("Log out", handelLogout, apiInUse)}
        
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1a202c",
  },
  subtitle: {
    color: "#4a5568",
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
