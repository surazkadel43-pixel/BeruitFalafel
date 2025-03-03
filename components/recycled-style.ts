import { Dimensions, StyleSheet } from "react-native";
import Search from "../screens/searchpage";

const { width } = Dimensions.get("window");

export const recycledStyles = StyleSheet.create({
  safeAreaView: {
    padding: 5,
    paddingTop: 15,
    flex: 1,
    backgroundColor: "#12193D",
    // alignItems: "center",
    justifyContent: "center",
  },

  disabled: {
    opacity: 0.5,
  },

  title: {
    color: "white",
    fontSize: 28, // Larger size for the 'X'
    fontWeight: "bold",
    textAlign: "center",
  },

  normalText: {
    color: "white",
    fontSize: 20, // Larger size for the 'X'
    fontWeight: "300",
    textAlign: "center",
  },
    mainBackGroundColor: {
    backgroundColor: "#12193D",
  },
  tabBarBackGroundColor: {
    backgroundColor: "#16181c",
  },
  cardBackGroundColor: {
    backgroundColor: "#1e2124",
  },
  searchBarBackGroundColor: {
    backgroundColor: "#2A2F45",
  },
  searchButtonBackGroundColor: {
    backgroundColor: "#4A80F0",
  },
  toastBackGroundColor: {
    backgroundColor: "#131517",
  },
  normalButtonBackGroundColor: {
    backgroundColor: "#4C5BD4",
  },
  activeButtonBackGroundColor: {
    backgroundColor: "green",
  },
  addButton: {
    width: 70, // Adjust size as needed
    height: 70, // Same as width for a perfect circle
    backgroundColor: "green", // Optional: Set a background color
    position: "absolute",
    bottom: 10, // Adjust position
    right: 30,
    borderRadius: 35, // Half of width/height to make it circular
    justifyContent: "center",
    alignItems: "center", // Center the icon
    zIndex: 999,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // For Android shadow
  },
});

export const toastManagerProps = {
  textStyle: { fontSize: 16, color: "white" },
  style: {
    backgroundColor: "#131517",
    opacity: 0.8,
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 10,
    marginBottom: 13,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    width: width - 20,
    height: "auto",
  },
};
