import React from "react";
import { StyleSheet, Text, View } from "react-native";
import "../extension/extension";

import { recycledStyles } from "./recycled-style";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  phoneNumber: string;
}
// Function to get the appropriate icon for each user level

export const ProfileHeader = ({
  firstName = "First",
  lastName = "Last",
  email = "unknown@example.com",
  createdAt = "Unknown Date",
  phoneNumber = "N/A",
}: User) => {
  const { text, isFuture } = createdAt.timeAgo();
 
  return (
    <View style={styles.header}>
      <View style={styles.imageAndReport}>
        
      </View>
      <View>
        {/*this is for content */}
        <View style={styles.headerTitle}>
          <Text
            style={[
              recycledStyles.title,
              {
                fontSize: 23,
              },
            ]}
          >
            {firstName} {lastName}
          </Text>
        </View>
        <Text style={[recycledStyles.normalText, { fontWeight: "300" }]}>Since {createdAt ? text : "Unknown Year"}</Text>
        <View style={styles.content}>
          <Text style={recycledStyles.normalText}>
            <Text style={styles.followers}>email: </Text>
            {email || "Unknown Email"}
          </Text>
          <View style={styles.separator} />

          <Text style={recycledStyles.normalText}>
            <Text style={styles.followers}>number: </Text>
            {phoneNumber || "Unknown Email"}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dotIcon: {
    margin: 0,
  },

  imageAndReport: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  header: {
    padding: 10,
    flexDirection: "column",
    borderWidth: 1,
    borderColor: "white",
    marginHorizontal: 10,
    rowGap: 10,
    columnGap: 10,
  },
  followers: { color: "white", fontSize: 22, fontWeight: "bold" },
  separator: { width: 15 },
  headerTitle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});