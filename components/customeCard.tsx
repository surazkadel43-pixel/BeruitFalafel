import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { buttonBuilder } from "./button";
import { PostImages } from "./postImages";

export const CustomeCard = ({
  itemId = "N/A",
  title = "Untitled",
  description = "No description available",
  price = "$0.00",
  foodTypes = [],
  onPress = () => {},
  icon = "usd",
  buttonName = "Manage",
  buttonIsActive = true,
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
  itemId = "N/A",
  title = "Untitled",
  description = "No description available",
  price = "$0.00",
  drinkTypes = [],
  onPress = () => {},
  icon = "usd",
  buttonName = "Manage",
  buttonIsActive = true,
  files = [],
  isSmall = true,
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
  files: any[] ;
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

        {files.length > 0 && <PostImages files={files || []} isSmall={isSmall} />}

        {buttonBuilder(buttonName, onPress, false, undefined, buttonIsActive)}
      </View>
    </TouchableOpacity>
  );
};

export const CustomeMenuCard = ({
 
  title = "",
  description = "",
  price = "",
  menuTypes = [],
  
  onPress = () => {},
  icon = "usd",
  buttonName = "Manage",
  buttonIsActive = true,
  files = [],
  isSmall = true,
}: {
 
  title: string;
  description: string;
  price: string;
  menuTypes: string[];
  
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
          <Text style={styles.followers}> Food Types: </Text>
          <Text style={[styles.followers, { fontWeight: "bold" }]}>{menuTypes.join(", ")}</Text>
        </View>
        

        {files.length > 0 && <PostImages files={files || []} isSmall={isSmall} />}

        {buttonBuilder(buttonName, onPress, false, undefined, buttonIsActive)}
      </View>
    </TouchableOpacity>
  );
};

export const CustomePromotionCard = ({
  itemId = "N/A",
  title = "Untitled",
  description = "No description available",
  code = "$0.00",
  expiryDate = "N/A",
  onPress = () => {},
  icon = "date-range",
  buttonName = "Manage",
  buttonIsActive = true,
}: {
  itemId: string;
  title: string;
  description: string;
  code: string;
  expiryDate: string;
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
          <Text style={styles.followers}>{expiryDate}</Text>
        </View>
        <View style={styles.followerContainer}>
          
          <Text style={styles.followers}>{code}</Text>
        </View>
        <View style={styles.followerContainer}>
          <Text style={styles.followers}>{description}</Text>
        </View>
        
        {buttonBuilder(buttonName, onPress, false, undefined, buttonIsActive)}
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  groupCard: { backgroundColor: "#191E2A", flexDirection: "row", borderRadius: 12, padding: 18, marginTop: 15, marginHorizontal: 10 }, //191E2A //1C2237
  groupInfo: { flex: 1, justifyContent: "center" },
  groupName: { color: "#fff", fontSize: 27, fontWeight: "500", marginBottom: 5, alignSelf: "center" },
  followerContainer: { flexDirection: "row", alignItems: "center", gap: 8, marginVertical: 5, marginHorizontal: 15, flexWrap: "wrap" },
  followers: { color: "white", fontSize: 22, fontWeight: "300", paddingHorizontal: 0 },
  separator: { width: 10 }, // Adds spacing between icons instead of opacity trick
});
