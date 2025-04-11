import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function NavigationHeader({ title, navigation }: { title: string; navigation?: any }) {
  return (
    <View style={styles.header}>
      <View style={styles.headerView}>
        <Image source={require("../assets/favicon.png")} style={{ alignItems: "center" }} />
        <Text style={styles.title}> {title} </Text>
      </View>
    </View>
  );
}

export function MyNavigationHeader({ title, navigation }: { title: string; navigation?: any }) {
  return (
    <View style={styles.header}>
      <MaterialIcons name="menu" size={24} style={styles.icon} onPress={() => navigation.openDrawer()} />
      <View style={styles.headerView}>
        <Image source={require("../assets/favicon.png")} style={{ alignItems: "center" }} />
        <Text style={styles.title}> {title} </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "skyblue",
  },

  headerText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#333",
  },

  headerView: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  icon: {
    position: "absolute",
    left: 15,
  },
  Addicon: {
    position: "absolute",
    right: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
  },
});
