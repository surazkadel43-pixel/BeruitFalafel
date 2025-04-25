import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { recycledStyles } from "../components/recycled-style";

export default function Subcribed() {
  return (
    <SafeAreaView style={recycledStyles.safeAreaView}>
      <View style={styles.content}>
        <Text style={recycledStyles.title}>Welcome to Reports </Text>
        <Text style={recycledStyles.normalText}>This page is for reports and enquiry and under construction</Text>
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