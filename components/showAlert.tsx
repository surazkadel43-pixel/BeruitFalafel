import { Alert } from "react-native";

const showAlert = (title: string, message: string, onPress?: () => void) => {
  Alert.alert(
    title,
    message,
    [{ text: "OK", style: "destructive", onPress: onPress || (() => {}) }]
  );
};

export default showAlert;
