import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getProductText } from "../utils/enums";
import { PostImages } from "./postImages";
import { recycledStyles } from "./recycled-style";

interface CustomeCardProps {
  itemId?: number;
  title?: string;
  description?: string;
  price?: number;
  foodTypes?: string[];
  icon?: any;
  itemType?: number;
}

interface CustomeBevrageCardProps {
  itemId?: number;
  title?: string;
  description?: string;
  price?: number;
  drinkTypes?: string[];
  icon?: any;
  files?: any[];
  isSmall?: boolean;
  quantity: string;
  itemType?: number;
}
interface CustomeMenuCardProps {
  itemId?: string;
  title?: string;
  description?: string;
  price?: string;
  foodTypes?: string[];
  items?: string[];
  sauces?: string[];
  bevrages?: string[];
  meats?: string[];
  onPress?: () => void;
  icon?: any;
  files?: any[];
  isSmall?: boolean;
  quantity: string;
  productType?: number;
}

// Food type options (Label mapping)
const foodOptions = [
  { label: "Vegan", value: "V" },
  { label: "Dairy-Free", value: "DF" },
  { label: "Meat", value: "M" },
  { label: "Gluten-Free", value: "GF" },
  { label: "Nuts-Free", value: "NF" },
];

const drinkOptions = [
  { label: "Soda", value: "Soda" },
  { label: "Juice", value: "Juice" },
  { label: "Alcohol", value: "Alcohol" },
  { label: "Tea", value: "Tea" },
  { label: "Coffee", value: "Coffee" },
];

// ✅ Use Props in the Component
export const CustomeDetailsCard: React.FC<CustomeCardProps> = ({
  itemId = "N/A",
  title = "Untitled",
  description = "No description available",
  price = "$0.00",
  foodTypes = [],
  icon = "usd",
  itemType = 3,
}) => {
  const formattedFoodTypes = foodTypes.map((type) => foodOptions.find((option) => option.value === type)?.label || type).join(", ");
  return (
    <TouchableOpacity style={styles.groupCard} activeOpacity={1}>
      <View style={styles.groupInfo}>
        <View style={[styles.followerContainer, { flexDirection: "column", alignItems: "flex-start" }]}>
          <Text style={styles.followers}>
            {" "}
            <Text style={styles.groupName}>Item Id :</Text> {itemId}
          </Text>
          <Text style={styles.followers}>
            <Text style={styles.groupName}>Item Name :</Text> {title}
          </Text>
          <Text style={recycledStyles.postUsername}>{getProductText(itemType).toUpperCase() || "N/A"}</Text>
        </View>

        <View style={styles.followerContainer}>
          <Text style={styles.followers}>
            <Text style={styles.groupName}>Item Price :</Text>{" "}
          </Text>
          <FontAwesome name={icon} size={18} color="white" />
          <Text style={styles.followers}>{price}</Text>
        </View>
        <View style={styles.followerContainer}>
          <Text style={styles.followers}>
            <Text style={styles.groupName}>Item Description :</Text> {description}
          </Text>
        </View>
        <View style={styles.followerContainer}>
          <Text style={styles.followers}> Food Types: </Text>
          <Text style={[styles.followers, { fontWeight: "bold" }]}>{formattedFoodTypes.length > 0 ? formattedFoodTypes : "None"}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export const CustomeGenericDetailsCard: React.FC<CustomeCardProps> = ({
  itemId = "N/A",
  title = "Untitled",
  description = "No description available",
  foodTypes = [],
}) => {
  const formattedFoodTypes = foodTypes.map((type) => foodOptions.find((option) => option.value === type)?.label || type).join(", ");
  return (
    <TouchableOpacity style={styles.groupCard} activeOpacity={1}>
      <View style={styles.groupInfo}>
        <View style={[styles.followerContainer, { flexDirection: "column", alignItems: "flex-start" }]}>
          <Text style={styles.followers}>
            {" "}
            <Text style={styles.groupName}>Item Id :</Text> {itemId}
          </Text>
          <Text style={styles.followers}>
            <Text style={styles.groupName}>Item Name :</Text> {title}
          </Text>
        </View>

        <View style={styles.followerContainer}>
          <Text style={styles.followers}>
            <Text style={styles.groupName}>Item Description :</Text> {description}
          </Text>
        </View>
        <View style={styles.followerContainer}>
          <Text style={styles.followers}> Food Types: </Text>
          <Text style={[styles.followers, { fontWeight: "bold" }]}>{formattedFoodTypes.length > 0 ? formattedFoodTypes : "None"}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export const CustomeSauceCard: React.FC<CustomeCardProps> = ({
  itemId = "N/A",
  title = "Untitled",
  description = "No description available",
  price = "$0.00",
  foodTypes = [],
  icon,
  itemType = 3,
}) => {
  const formattedFoodTypes = foodTypes.map((type) => foodOptions.find((option) => option.value === type)?.label || type).join(", ");
  return (
    <TouchableOpacity style={styles.groupCard} activeOpacity={1}>
      <View style={styles.groupInfo}>
        <View style={[styles.followerContainer, { flexDirection: "column", alignItems: "flex-start" }]}>
          <Text style={styles.followers}>
            {" "}
            <Text style={styles.groupName}>Sauce Id :</Text> {itemId}
          </Text>
          <Text style={styles.followers}>
            <Text style={styles.groupName}>Sauce Name :</Text> {title}
          </Text>
          <Text style={recycledStyles.postUsername}>{getProductText(itemType).toUpperCase() || "N/A"}</Text>
        </View>

        <View style={styles.followerContainer}>
          <Text style={styles.followers}>
            <Text style={styles.groupName}>Sauce Price :</Text>{" "}
          </Text>
          <FontAwesome name={icon} size={18} color="white" />
          <Text style={styles.followers}>{price}</Text>
        </View>
        <View style={styles.followerContainer}>
          <Text style={styles.followers}>
            <Text style={styles.groupName}>Sauce Description :</Text> {description}
          </Text>
        </View>
        <View style={styles.followerContainer}>
          <Text style={styles.followers}> Food Types: </Text>
          <Text style={[styles.followers, { fontWeight: "bold" }]}>{formattedFoodTypes.length > 0 ? formattedFoodTypes : "None"}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const CustomeMeatCard: React.FC<CustomeCardProps> = ({
  itemId = "N/A",
  title = "Untitled",
  description = "No description available",
  price = "$0.00",
  foodTypes = [],
  icon,
  itemType = 3,
}) => {
  const formattedFoodTypes = foodTypes.map((type) => foodOptions.find((option) => option.value === type)?.label || type).join(", ");
  return (
    <TouchableOpacity style={styles.groupCard} activeOpacity={1}>
      <View style={styles.groupInfo}>
        <View style={[styles.followerContainer, { flexDirection: "column", alignItems: "flex-start" }]}>
          <Text style={styles.followers}>
            {" "}
            <Text style={styles.groupName}>Meat Id :</Text> {itemId}
          </Text>
          <Text style={styles.followers}>
            <Text style={styles.groupName}>Meat Name :</Text> {title}
          </Text>
          <Text style={recycledStyles.postUsername}>{getProductText(itemType).toUpperCase() || "N/A"}</Text>
        </View>

        <View style={styles.followerContainer}>
          <Text style={styles.followers}>
            <Text style={styles.groupName}>Meat Price :</Text>{" "}
          </Text>
          <FontAwesome name={icon} size={18} color="white" />
          <Text style={styles.followers}>{price}</Text>
        </View>
        <View style={styles.followerContainer}>
          <Text style={styles.followers}>
            <Text style={styles.groupName}>Meat Description :</Text> {description}
          </Text>
        </View>
        <View style={styles.followerContainer}>
          <Text style={styles.followers}> Food Types: </Text>
          <Text style={[styles.followers, { fontWeight: "bold" }]}>{formattedFoodTypes.length > 0 ? formattedFoodTypes : "None"}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const CustomeBevrageCard: React.FC<CustomeBevrageCardProps> = ({
  itemId = "N/A",
  title = "Untitled",
  description = "No description available",
  price = "$0.00",
  drinkTypes = [],
  icon,
  files = [],
  isSmall = false,
  quantity = "0",
  itemType = 3,
}) => {
  return (
    <TouchableOpacity style={styles.groupCard} activeOpacity={1}>
      <View style={styles.groupInfo}>
        <View style={[styles.followerContainer, { flexDirection: "column", alignItems: "flex-start" }]}>
          <Text style={styles.followers}>
            {" "}
            <Text style={styles.groupName}>Bevrages Id :</Text> {itemId}
          </Text>
          <Text style={styles.followers}>
            <Text style={styles.groupName}>Bevrages Name :</Text> {title}
          </Text>
          <Text style={recycledStyles.postUsername}>{getProductText(itemType).toUpperCase() || "N/A"}</Text>
        </View>

        <View style={styles.followerContainer}>
          <Text style={styles.followers}>
            <Text style={styles.groupName}>Bevrages Price :</Text>{" "}
          </Text>
          <FontAwesome name={icon} size={18} color="white" />
          <Text style={styles.followers}>{price}</Text>
        </View>
        <View style={styles.followerContainer}>
          <Text style={styles.followers}>
            <Text style={styles.groupName}>Bevrages Description :</Text> {description}
          </Text>
        </View>
        <View style={styles.followerContainer}>
          <Text style={styles.followers}>
            <Text style={styles.groupName}>Quantity: </Text> {quantity}
          </Text>
        </View>
        <View style={styles.followerContainer}>
          <Text style={styles.followers}> Drink Types: </Text>
          <Text style={[styles.followers, { fontWeight: "bold" }]}>{drinkTypes.join(", ")}</Text>
        </View>
        {/* Image Carousel */}
        {files.length > 0 && <PostImages files={files} isSmall={isSmall} />}
      </View>
    </TouchableOpacity>
  );
};
export const CustomeMenuCard: React.FC<CustomeMenuCardProps> = ({
  itemId = "N/A",
  title = "Untitled",
  description = "No description available",
  price = "$0.00",
  foodTypes = [],
  items = [],
  sauces = [],
  bevrages = [],
  meats = [],
  onPress = () => {},
  icon = "usd",
  files = [],
  isSmall = false,
  quantity = "0",
  productType = 3,
}) => {
  const formattedFoodTypes = foodTypes.map((type) => foodOptions.find((option) => option.value === type)?.label || type).join(", ");
  return (
    <TouchableOpacity style={styles.groupCard} activeOpacity={1}>
      <View style={styles.groupInfo}>
        {/* ID and Title Section */}
        <View style={[styles.followerContainer, { flexDirection: "column", alignItems: "flex-start" }]}>
          <Text style={styles.followers}>
            <Text style={styles.groupName}> ID: </Text> {itemId}
          </Text>
          <Text style={styles.followers}>
            <Text style={styles.groupName}> Name: </Text> {title}
          </Text>
          <Text style={recycledStyles.postUsername}>{getProductText(productType).toUpperCase() || "N/A"}</Text>
        </View>

        {/* Price Section */}
        <View style={styles.followerContainer}>
          <Text style={styles.followers}>
            <Text style={styles.groupName}>Price: </Text>
          </Text>
          <FontAwesome name={icon} size={18} color="white" />
          <Text style={styles.followers}>{price}</Text>
        </View>

        {/* Description Section */}
        <View style={styles.followerContainer}>
          <Text style={styles.followers}>
            <Text style={styles.groupName}>Description: </Text> {description}
          </Text>
        </View>

        <View style={styles.followerContainer}>
          <Text style={styles.followers}>
            <Text style={styles.groupName}>Quantity: </Text> {quantity}
          </Text>
        </View>

        {/* Food Types */}
        <View style={styles.followerContainer}>
          <Text style={styles.followers}>Food Types: </Text>
          <Text style={[styles.followers, { fontWeight: "bold" }]}>{formattedFoodTypes.length > 0 ? formattedFoodTypes : "None"}</Text>
        </View>

        <View style={styles.followerContainer}>
          <Text style={styles.followers}>Items: </Text>
          <Text style={[styles.followers, { fontWeight: "bold" }]}>{items.length > 0 ? items.join(", ") : "None"}</Text>
        </View>
        <View style={styles.followerContainer}>
          <Text style={styles.followers}>Sauces: </Text>
          <Text style={[styles.followers, { fontWeight: "bold" }]}>{sauces.length > 0 ? sauces.join(", ") : "None"}</Text>
        </View>
        <View style={styles.followerContainer}>
          <Text style={styles.followers}>Beverages: </Text>
          <Text style={[styles.followers, { fontWeight: "bold" }]}>{bevrages.length > 0 ? bevrages.join(", ") : "None"}</Text>
        </View>
        <View style={styles.followerContainer}>
          <Text style={styles.followers}>Meats: </Text>
          <Text style={[styles.followers, { fontWeight: "bold" }]}>{meats.length > 0 ? meats.join(", ") : "None"}</Text>
        </View>

        {/* Image Carousel */}
        {files.length > 0 && <PostImages files={files} isSmall={isSmall} />}
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  groupCard: { backgroundColor: "#191E2A", flexDirection: "row", borderRadius: 12, padding: 18, marginTop: 15, marginHorizontal: 10 }, //191E2A //1C2237
  groupInfo: { flex: 1, justifyContent: "center" },
  groupName: { color: "#fff", fontSize: 24, fontWeight: "400", marginBottom: 5, alignSelf: "center" },
  followerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 8,
    marginVertical: 5,
    marginHorizontal: 15,
    flexWrap: "wrap",
  },
  followers: { color: "white", fontSize: 22, fontWeight: "300", paddingHorizontal: 0 },
  separator: { width: 10 }, // Adds spacing between icons instead of opacity trick
});
