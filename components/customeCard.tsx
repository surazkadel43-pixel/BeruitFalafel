import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { buttonBuilder } from "./button";
import { PostImages } from "./postImages";

export const CustomeCard = ({
  itemId,
  title,
  description,
  price,
  foodTypes,
  onPress,
  icon,
  buttonName,
  buttonIsActive,
}: {
  itemId: string;
  title: string;
  description: string;
  price: string;
  foodTypes: string[];
  onPress: () => void;
  icon: any;
  buttonName: string;
  buttonIsActive: boolean;
}) => {
  return (
    <TouchableOpacity style={styles.groupCard} activeOpacity={1} onPress={onPress}>
      <View style={styles.groupInfo}>
        <View style={styles.followerContainer}>
          {/* <Text style={styles.groupName}>{itemId}</Text> */}
          <Text style={styles.groupName}>{title}</Text>
        </View>

        <View style={styles.followerContainer}>
          <FontAwesome name={icon} size={18} color="white" />
          <Text style={styles.followers}>{price}</Text>
        </View>
        <View style={styles.followerContainer}>
          <Text style={styles.followers}>{description}</Text>
        </View>
        <View style={styles.followerContainer}>
          <Text style={styles.followers}> Food Types: </Text>
          <Text style={[styles.followers, { fontWeight: "bold" }]}>{foodTypes.join(", ")}</Text>
        </View>
        {buttonBuilder(buttonName, onPress, false, undefined, buttonIsActive)}
      </View>
    </TouchableOpacity>
  );
};

export const CustomeImageCard = ({
  itemId,
  title,
  description,
  price,
  drinkTypes,
  onPress,
  icon,
  buttonName,
  buttonIsActive,
  files,
  isSmall,
}: {
  itemId: string;
  title: string;
  description: string;
  price: string;
  drinkTypes: string[];
  onPress: () => void;
  icon: any;
  buttonName: string;
  buttonIsActive: boolean;
  files: any[];
  isSmall: boolean;
}) => {
  return (
    <TouchableOpacity style={styles.groupCard} activeOpacity={1} onPress={onPress}>
      <View style={styles.groupInfo}>
        <View style={styles.followerContainer}>
          {/* <Text style={styles.groupName}>{itemId}</Text> */}
          <Text style={styles.groupName}>{title}</Text>
        </View>

        <View style={styles.followerContainer}>
          <FontAwesome name={icon} size={18} color="white" />
          <Text style={styles.followers}>{price}</Text>
        </View>
        <View style={styles.followerContainer}>
          <Text style={styles.followers}>{description}</Text>
        </View>
        <View style={styles.followerContainer}>
          <Text style={styles.followers}> Drink Types: </Text>
          <Text style={[styles.followers, { fontWeight: "bold" }]}>{drinkTypes.join(", ")}</Text>
        </View>
        {/* Image Carousel */}
        {files.length > 0 && <PostImages files={files} isSmall={isSmall} />}
        {buttonBuilder(buttonName, onPress, false, undefined, buttonIsActive)}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  groupCard: { backgroundColor: "#191E2A", flexDirection: "row", borderRadius: 12, padding: 18, marginTop: 15, marginHorizontal: 10 }, //191E2A //1C2237
  groupInfo: { flex: 1, justifyContent: "center" },
  groupName: { color: "#fff", fontSize: 27, fontWeight: "500", marginBottom: 5, alignSelf: "center" },
  followerContainer: { flexDirection: "row", alignItems: "center", gap: 8, marginVertical: 5, marginHorizontal: 15 },
  followers: { color: "white", fontSize: 22, fontWeight: "300", paddingHorizontal: 0 },
  separator: { width: 10 }, // Adds spacing between icons instead of opacity trick
});
