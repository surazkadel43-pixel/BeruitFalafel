import { createStackNavigator } from "@react-navigation/stack";
import React from "react";



import BevrageDetailsScreens from "../../screens/Menu/BevragesScreens/bevrageDetails";
import BevrageEdit from "../../screens/Menu/BevragesScreens/bevrageEdit";

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
      {/* Item Screen */}
      <Stack.Screen name="PromotionScreens" component={PromotionScreens} options={{ title: "Promotion", headerShown: false }} />

      {/* ItemDetail */}
      <Stack.Screen
        name="BevrageDetails"
        component={BevrageDetailsScreens}
        options={{
          presentation: "modal",
          headerShown: true,
          headerTitle: "Bevrage Details",
          headerStyle: {
            backgroundColor: "#1C2237", // Change header background color
          },
          headerTintColor: "white", // Change header text color
        }}
      />
      {/* ItemDetail */}
      <Stack.Screen
        name="BevrageEdit"
        component={BevrageEdit}
        options={{
          presentation: "modal",
          headerShown: true,
          headerTitle: "Bevrage Edit",
          headerStyle: {
            backgroundColor: "#1C2237", // Change header background color
          },
          headerTintColor: "white", // Change header text color
        }}
      />
    </Stack.Navigator>
  );
}
