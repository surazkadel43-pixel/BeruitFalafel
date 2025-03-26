import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import PromotionDetailsScreens from "../../screens/promotion/promotionDetails";
import PromotionScreens from "../../screens/promotion/promotionScreens";
const Stack = createStackNavigator();

export default function PromotionStackNavigator({ navigation }: { navigation: any }) {
  return (
    <Stack.Navigator
      initialRouteName="PromotionScreens"
      screenOptions={{
        headerStyle: { backgroundColor: "#12193D" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      <Stack.Screen name="PromotionScreens" component={PromotionScreens} options={{ title: "Promotion", headerShown: false }} />

      <Stack.Screen
        name="PromotionDetails"
        component={PromotionDetailsScreens}
        options={{
          presentation: "modal",
          headerShown: true,
          headerTitle: "Promotion Details",
          headerStyle: {
            backgroundColor: "#1C2237", // Change header background color
          },
          headerTintColor: "white", // Change header text color
        }}
      />
    </Stack.Navigator>
  );
}