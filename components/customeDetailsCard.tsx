import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface CustomeCardProps {
  itemId: number;
  title: string;
  description: string;
  price: number;
  foodTypes: string[];
  icon: any; // Change this to `IconName` if using `@expo/vector-icons`
}

// ✅ Use Props in the Component
export const CustomeDetailsCard: React.FC<CustomeCardProps> = ({ itemId, title, description, price, foodTypes, icon }) => {
  return (
    <TouchableOpacity style={styles.groupCard} activeOpacity={1}>
      <View style={styles.groupInfo}>
        <View style={[styles.followerContainer, { flexDirection: "column", alignItems: "flex-start" }]}>
          <Text style={styles.followers}> <Text style={styles.groupName}>Item Id :</Text> {itemId}</Text>
          <Text style={styles.followers}><Text style={styles.groupName}>Item Name :</Text> {title}</Text>
        </View>

        <View style={styles.followerContainer}>
          <Text style={styles.followers}><Text style={styles.groupName}>Item Price :</Text> </Text>
          <FontAwesome name={icon} size={18} color="white" />
          <Text style={styles.followers}>{price}</Text>
        </View>
        <View style={styles.followerContainer}>
          <Text style={styles.followers}><Text style={styles.groupName}>Item Description :</Text> {description}</Text>
        </View>
        <View style={styles.followerContainer}>
          <Text style={styles.followers}> Food Types: </Text>
          <Text style={[styles.followers, { fontWeight: "bold" }]}>{foodTypes.join(", ")}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  groupCard: { backgroundColor: "#191E2A", flexDirection: "row", borderRadius: 12, padding: 18, marginTop: 15, marginHorizontal: 10 }, //191E2A //1C2237
  groupInfo: { flex: 1, justifyContent: "center" },
  groupName: { color: "#fff", fontSize: 24, fontWeight: "400", marginBottom: 5, alignSelf: "center" },
  followerContainer: { flexDirection: "row", alignItems: "center",justifyContent: "flex-start", gap: 8, marginVertical: 5, marginHorizontal: 15 },
  followers: { color: "white", fontSize: 22, fontWeight: "300", paddingHorizontal: 0 },
  separator: { width: 10 }, // Adds spacing between icons instead of opacity trick
});
