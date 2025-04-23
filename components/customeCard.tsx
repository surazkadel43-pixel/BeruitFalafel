import { FontAwesome } from "@expo/vector-icons";
import { Skeleton } from "moti/skeleton";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getDayName } from "../utils/dayEnums";
import { getProductText, getProductType, ItemType } from "../utils/enums";
import { buttonBuilder } from "./button";
import { PostImages } from "./postImages";
import { recycledStyles } from "./recycled-style";
const SkeletonCommonProps = {
  colorMode: "dark",
  transition: {
    type: "timing",
    duration: 100,
  },
  marginBottom: 10,
  // backgroundColor: '#D4D4D4',
} as const;

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
  itemType = ItemType.Both,
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
  itemType: ItemType;
}) => {
  return (
    <TouchableOpacity style={styles.groupCard} activeOpacity={1} onPress={onPress}>
      <View style={styles.groupInfo}>
        <View style={styles.followerContainer}>
          {/* <Text style={styles.groupName}>{itemId}</Text> */}
          <Text style={styles.groupName}>{title}</Text>
          <Text style={recycledStyles.postUsername}>{getProductType(itemType).toUpperCase() || "N/A"}</Text>
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

export const CustomeGenericCard = ({
  itemId = "N/A",
  title = "Untitled",
  description = "No description available",
  foodTypes = [],
  onPress = () => {},
  buttonName = "Manage",
  buttonIsActive = true,
}: {
  itemId: string;
  title: string;
  description: string;

  foodTypes: string[];
  onPress: () => void;

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
  quantity = "N/A",
  drinkTypes = [],
  onPress = () => {},
  icon = "usd",
  buttonName = "Manage",
  buttonIsActive = true,
  itemType = ItemType.Both,
}: {
  itemId: string;
  title: string;
  description: string;
  price: string;
  quantity: string;
  drinkTypes: string[];
  onPress: () => void;
  icon: any;
  buttonName: string;
  buttonIsActive: boolean;
  itemType: ItemType;
}) => {
  return (
    <TouchableOpacity style={styles.groupCard} activeOpacity={1} onPress={onPress}>
      <View style={styles.groupInfo}>
        <View style={styles.followerContainer}>
          <Text style={styles.groupName}>{title}</Text>
          <Text style={recycledStyles.postUsername}>{getProductType(itemType).toUpperCase() || "N/A"}</Text>
        </View>

        <View style={styles.followerContainer}>
          <FontAwesome name={icon} size={18} color="white" />
          <Text style={styles.followers}>{price}</Text>
        </View>
        {quantity && (
          <View style={styles.followerContainer}>
            <Text style={styles.followers}>Quantity: {quantity}</Text>
          </View>
        )}
        <View style={styles.followerContainer}>
          <Text style={styles.followers}>{description}</Text>
        </View>
        <View style={styles.followerContainer}>
          <Text style={styles.followers}> Drink Types: </Text>
          <Text style={[styles.followers, { fontWeight: "bold" }]}>{drinkTypes.join(", ")}</Text>
        </View>

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
  quantity = "N/A",
  onPress = () => {},
  icon = "usd",
  buttonName = "Manage",
  buttonIsActive = true,
  productType = ItemType.Both,
}: {
  title: string;
  description: string;
  price: string;
  menuTypes: string[];
  quantity: string;
  onPress: () => void;
  icon: any;
  buttonName: string;
  buttonIsActive: boolean;
  productType: ItemType;
}) => {
  return (
    <TouchableOpacity style={styles.groupCard} activeOpacity={1} onPress={onPress}>
      <View style={styles.groupInfo}>
        <View style={styles.followerContainer}>
          <Text style={styles.groupName}>{title}</Text>
          <Text style={recycledStyles.postUsername}>{getProductType(productType).toUpperCase() || "N/A"}</Text>
        </View>

        <View style={styles.followerContainer}>
          <FontAwesome name={icon} size={18} color="white" />
          <Text style={styles.followers}>Price: {price}</Text>
        </View>

        <View>
          {quantity ? (
            <View style={styles.followerContainer}>
              <Text style={styles.followers}>Quantity: {quantity}</Text>
            </View>
          ) : (
            <View style={styles.followerContainer}>
              <Text style={styles.followers}>Quantity: {quantity}</Text>
            </View>
          )}
        </View>

        <View style={styles.followerContainer}>
          <Text style={styles.followers}>{description}</Text>
        </View>

        <View style={styles.followerContainer}>
          <Text style={styles.followers}> Food Types: </Text>
          <Text style={[styles.followers, { fontWeight: "bold" }]}>{menuTypes.join(", ")}</Text>
        </View>

        {buttonBuilder(buttonName, onPress, false, undefined, buttonIsActive)}
      </View>
    </TouchableOpacity>
  );
};

export const CustomeSkelatonCard = ({ show = false }: { show: boolean }) => {
  return (
    <TouchableOpacity style={styles.groupCard} activeOpacity={1}>
      <View style={styles.groupInfo}>
        <Skeleton.Group show={show}>
          <View style={{ marginBottom: 10 }}>
            <Skeleton width="99%" height={40} radius="round" {...SkeletonCommonProps} />
          </View>

          <View style={{ marginBottom: 10 }}>
            <Skeleton width="99%" height={30} radius="round" {...SkeletonCommonProps} />
          </View>

          <View style={{ marginBottom: 10 }}>
            <Skeleton width="99%" height={32} radius="round" {...SkeletonCommonProps} />
          </View>

          <View style={{ marginBottom: 10 }}>
            <Skeleton width="99%" height={32} radius="round" {...SkeletonCommonProps} />
          </View>

          <Skeleton width="99%" height={32} radius="round" {...SkeletonCommonProps}></Skeleton>
        </Skeleton.Group>
      </View>
    </TouchableOpacity>
  );
};
export const CustomeProfileCard = ({
  title,
  description,
  onPress,
  icon,
  buttonName,
  buttonIsActive,
}: {
  title: string;
  description: string;
  onPress: () => void;
  icon: any;
  buttonName: string;
  buttonIsActive: boolean;
}) => {
  return (
    <TouchableOpacity style={styles.groupCard} activeOpacity={1}>
      <View style={styles.groupInfo}>
        <Text style={styles.groupName}>{title}</Text>
        <View style={styles.followerContainer}>
          <FontAwesome name={icon} size={18} color="white" />
          <Text style={styles.followers}>{description}</Text>
        </View>
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
  icon = "calendar",
  buttonName = "Manage",
  buttonIsActive = true,
  discount = "N/A",
  itemType = ItemType.Both,
}: {
  itemId: string;
  title: string;
  description: string;
  code: string;
  expiryDate: string;
  onPress?: () => void;
  icon: any;
  buttonName: string;
  buttonIsActive: boolean;
  discount: string;
  itemType: ItemType;
}) => {
  const { text, isFuture } = expiryDate.timeAgo();

  return (
    <TouchableOpacity style={styles.groupCard} activeOpacity={1} onPress={onPress}>
      <View style={styles.groupInfo}>
        <View style={styles.followerContainer}>
          <Text style={styles.groupName}>{title}</Text>
          <Text style={recycledStyles.postUsername}>{getProductType(itemType).toUpperCase() || "N/A"}</Text>
        </View>

        <View style={styles.followerContainer}>
          <FontAwesome name={icon} size={18} color="white" />
          <Text style={styles.followers}>{isFuture ? `Expires in ${text}` : `Expired ${text} ago`}</Text>
        </View>
        <View style={styles.followerContainer}>
          <Text style={styles.followers}>{code}</Text>
        </View>
        <View style={styles.followerContainer}>
          <Text style={styles.followers}>{discount} %</Text>
        </View>
        <View style={styles.followerContainer}>
          <Text style={styles.followers}>{description}</Text>
        </View>

        {buttonBuilder(buttonName, onPress, false, undefined, buttonIsActive)}
      </View>
    </TouchableOpacity>
  );
};

export const PromotionDetailsCard = ({
  itemId = "N/A",
  title = "Untitled",
  description = "No description available",
  code = "$0.00",
  expiryDate = "N/A",
  icon = "calendar",
  files = [],
  discount = "N/A",
  itemType = ItemType.Both,
}: {
  itemId: string;
  title: string;
  description: string;
  code: string;
  expiryDate: string;
  icon: any;
  files?: any[];
  discount: string;
  itemType: ItemType;
}) => {
  const { text, isFuture } = expiryDate.timeAgo();

  return (
    <TouchableOpacity style={styles.groupCard} activeOpacity={1}>
      <View style={styles.groupInfo}>
        <View style={styles.followerContainer}>
          {/* <Text style={styles.groupName}>{itemId}</Text> */}
          <Text style={styles.groupName}>{title}</Text>
          <Text style={recycledStyles.postUsername}>{getProductType(itemType).toUpperCase() || "N/A"}</Text>
        </View>

        <View style={styles.followerContainer}>
          <FontAwesome name={icon} size={18} color="white" />
          <Text style={styles.followers}>{isFuture ? `Expires in ${text}` : `Expired ${text} ago`}</Text>
        </View>
        <View style={styles.followerContainer}>
          <Text style={styles.followers}>{code}</Text>
        </View>
        <View style={styles.followerContainer}>
          <Text style={styles.followers}>{discount} %</Text>
        </View>
        <View style={styles.followerContainer}>
          <Text style={styles.followers}>{description}</Text>
        </View>
        {/* Image Carousel */}
        {files.length > 0 && <PostImages files={files} isSmall={false} />}
      </View>
    </TouchableOpacity>
  );
};
interface CustomeScheduleCardProps {
  itemId?: number;
  day?: number;
  scheduleType?: number;
  isOpen?: number;
  openingTime?: string;
  closingTime?: string;
  description?: string;
  onDeletePress?: () => void;
  onEditPress?: () => void;
}

export const CustomeScheduleCard: React.FC<CustomeScheduleCardProps> = ({
  itemId = "N/A",
  day = 0,
  scheduleType = 0,
  isOpen = 0,
  openingTime = "N/A",
  closingTime = "N/A",
  onDeletePress,
  onEditPress,
  description = "",
}) => {
  return (
    <TouchableOpacity style={styles.groupCard} activeOpacity={1}>
      <View style={styles.groupInfo}>
        <View style={styles.followerContainer}>
          <Text style={recycledStyles.postUsername}>{getDayName(day)}</Text>
        </View>

        <View style={styles.followerContainer}>
          <FontAwesome name="calendar" size={18} color="white" />
          <Text style={styles.followers}>Opening Time: {openingTime}</Text>
        </View>

        <View style={styles.followerContainer}>
          <Text style={recycledStyles.postUsername}>{getProductText(scheduleType).toUpperCase() || "N/A"}</Text>
        </View>

        <View style={styles.followerContainer}>
          <FontAwesome name="calendar" size={18} color="white" />
          <Text style={styles.followers}>Closing Time: {closingTime}</Text>
        </View>

        <View style={styles.followerContainer}>
          <Text style={styles.followers}>
            Is Open: <Text style={recycledStyles.postUsername}>{isOpen === 1 ? "Yes" : "No"}</Text>
          </Text>
        </View>

        {description ? (
          <View style={styles.followerContainer}>
            <Text style={styles.followers}>{description}</Text>
          </View>
        ) : null}

        <View>
          {buttonBuilder("Edit", onEditPress, false, undefined, true)}
          {buttonBuilder("Delete", onDeletePress, false, undefined, false)}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  groupCard: { backgroundColor: "#191E2A", flexDirection: "row", borderRadius: 12, padding: 18, marginTop: 15, marginHorizontal: 10 }, //191E2A //1C2237
  groupInfo: { flex: 1, justifyContent: "center" },
  groupName: { color: "#fff", fontSize: 27, fontWeight: "500", marginBottom: 5, alignSelf: "center" },
  followerContainer: { flexDirection: "row", alignItems: "center", gap: 8, marginVertical: 3, marginHorizontal: 15, flexWrap: "wrap" },
  followers: { color: "white", fontSize: 22, fontWeight: "300", paddingHorizontal: 0 },
  separator: { width: 10 }, // Adds spacing between icons instead of opacity trick
});
