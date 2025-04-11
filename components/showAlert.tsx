import { Alert } from "react-native";

const showAlert = (title: string, message: string, onPress?: () => void) => {
  Alert.alert(
    title,
    message,
    [{ text: "OK", style: "destructive", onPress: onPress || (() => {}) }]
  );
};

export const yesOrNoAlert = (title: string, message: string, onPressYes: () => void, onPressNo: () => void) => {
  Alert.alert(
    title,
    message,
    [
      { text: "No", style: "cancel", onPress: onPressNo || (() => {}) },
      { text: "Yes", style: "default", onPress: onPressYes || (() => {}) },
      
    ]
  );
}


export default showAlert;
