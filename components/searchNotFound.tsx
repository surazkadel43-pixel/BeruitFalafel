import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const NoResultsCard = ({message}: {message: string}) => {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={1}>
      <FontAwesome name="search" size={30} color="white" />
      <Text style={styles.message}>{message} </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1C2237",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
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
