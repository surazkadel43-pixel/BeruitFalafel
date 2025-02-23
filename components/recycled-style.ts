import { Dimensions, StyleSheet } from "react-native";

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

    color: 'white',
    fontSize: 28, // Larger size for the 'X'
    fontWeight: 'bold',
    textAlign: "center"
  },

  normalText: {

    color: 'white',
    fontSize: 20, // Larger size for the 'X'
    fontWeight: '300',
    textAlign: "center"
  }
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
