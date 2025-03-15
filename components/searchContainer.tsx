import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import { buttonBuilder } from "./button";
import { inputBuilder } from "./input";
export default function searchContainer(formik: any, buttonVisible: boolean, apiInUse: boolean, searchText: string) {
  return (
    <View style={styles.searchContainer}>
      {inputBuilder(`Search by ${searchText}`, `${searchText}`, formik, { style: styles.searchBar })}

      {/* Conditionally render the button if there is text in the input */}
      {formik.values[searchText].trim() !== "" &&
        buttonVisible &&
        buttonBuilder("", formik.handleSubmit, apiInUse, <Ionicons name="search" size={25} color="white" />, false, {
          style: styles.searchButton,
          hitSlop: { top: 10, bottom: 10, left: 10, right: 10 },
        })}
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center", // Aligns the items at the bottom baseline
    justifyContent: "center",
    columnGap: 1,
    marginBottom: 10,
    
  },
  searchBar: {
    backgroundColor: "#2A2F45",
    color: "#fff",
    padding: 12,
    borderRadius: 10,
    fontSize: 20,
    flex: 1, // Make the search bar take up available space
  },
  searchButton: {
    flexDirection: "row",
    padding: 6,
    marginLeft: 2,
    alignItems: "center", // Center text horizontally
    justifyContent: "center",
    elevation: 1, // Shadow effect for Android (elevates the button)
    shadowColor: "#000",
    borderRadius: 50, // Shadow color for iOS
    shadowOffset: { width: 0, height: 1 }, // Shadow offset
    shadowOpacity: 1, // Shadow opacity
    shadowRadius: 42, // Shadow radius
    backgroundColor: "#4A80F0", // Background color for the button
  },
});
