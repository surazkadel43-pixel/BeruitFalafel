import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

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
  modal: {
    justifyContent: "flex-end",
    margin: 0,
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

export const createModalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#12193D",
  },
  modalContent: {
    flex: 1,
    padding: 5,
    justifyContent: "flex-start",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
    paddingHorizontal: 10,
    borderBottomColor: "#D1D5DB",
    borderBottomWidth: 1,
  },
  closeButton: {
    padding: 10,
  },
  closeButtonText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
    alignSelf: "center",
  },
  card: { backgroundColor: "#1e2124", padding: 16, borderRadius: 8, borderWidth: 1, borderColor: "white", gap: 10 },
});

export const imagePickerStyles = StyleSheet.create({
  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap", // Ensures images move to the next line
    justifyContent: "flex-start",
    marginVertical: 10,
  },
  imageWrapper: {
    position: "relative",
    margin: 5,
  },
  selectedImage: {
    width: width * 0.25, // Adjusts to screen width
    height: width * 0.25,
    borderRadius: 8,
  },
  removeButton: {
    position: "absolute",
    top: 2,
    right: 2,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 50,
    padding: 5,
  },
  chooseImage: { flexDirection: "row", justifyContent: "space-between", marginTop: 10, gap: 5 },
});
