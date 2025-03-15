import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
const { width } = Dimensions.get("window");

const NoResultsCard = ({ message, additionalProps }: { message: string; additionalProps?: any }) => {

  return (
    <TouchableOpacity style={styles.card} activeOpacity={1}>
      
      {additionalProps?.icon}
      <Text style={styles.message}>{message}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 20,
    backgroundColor: "#1C2237",
    borderRadius: 12,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    marginHorizontal: 10,
  },
  message: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "500",
    textAlign: "center",
    marginTop: 10,
  },
});

export default NoResultsCard;
