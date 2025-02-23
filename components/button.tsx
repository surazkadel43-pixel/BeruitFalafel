import { Pressable, StyleSheet, Text } from "react-native";
import { recycledStyles } from "./recycled-style";

export function buttonBuilder(text: string, onClick: any, disabled: boolean, additionalProps?: any, isActive?: boolean) {
  return (
    <Pressable
      onPress={onClick}
      disabled={disabled}
      style={[
        styles.buttonContainer,
        isActive && styles.buttonActive, // Active state styles (orange or any color for active buttons)
        disabled && recycledStyles.disabled, // Disabled state styles
      ]}
    >
      {additionalProps}
      <Text style={styles.buttonText}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    elevation: 8,
    backgroundColor: "#4C5BD4", // 1c4063
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 10,
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
  buttonPressed: {
    backgroundColor: "#3B4BCF", // Darker color when pressed
    transform: [{ scale: 0.95 }], // Slight shrink effect for press
  },
  buttonActive: {
    backgroundColor: "green", // Change to orange when pressed
  },
});
