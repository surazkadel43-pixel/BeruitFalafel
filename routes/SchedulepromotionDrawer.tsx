import React from "react";

import { MaterialIcons } from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import NavigationHeader, { MyNavigationHeader } from "../components/navigationHeader";
import { recycledStyles } from "../components/recycled-style";

import PromotionStackNavigator from "./promotionNavigation/promotionStackNavigator";
import ScheduleStackNavigator from "./scheduleNavigation/scheduleStackNavigator";
const RootDrawerNavigator = createDrawerNavigator();
export default function SchedulePromotionDrawer(navigation: any) {
  return (
    <RootDrawerNavigator.Navigator
      initialRouteName="PromotionStack"
      screenOptions={{
       // headerShown: false,
        drawerActiveTintColor: recycledStyles.activeButtonBackGroundColor.backgroundColor,
        drawerInactiveTintColor: "purple",
        drawerActiveBackgroundColor: "green",
        drawerStyle: {
          backgroundColor: recycledStyles.tabBarBackGroundColor.backgroundColor,
        },
        drawerLabelStyle: {
          fontSize: 16, // Change font size
          fontWeight: "bold", // Make text bold
          color: "white", // Custom text color
        },
      }}
    >
      <RootDrawerNavigator.Screen
        name="PromotionStack"
        component={PromotionStackNavigator}
        options={{
          headerShown: false,
          drawerIcon: ({ color, size }) => <MaterialIcons name="home" color="white" size={size} />,
          
          headerStyle: { backgroundColor: "skyblue" },
        }}
      />
      <RootDrawerNavigator.Screen
        name="ScheduleStack"
        component={ScheduleStackNavigator}
        options={{
          headerShown: false,
          drawerIcon: ({ color, size }) => <MaterialIcons name="home" color="white" size={size} />,
         
          headerStyle: { backgroundColor: "skyblue" },
        }}
      />
    </RootDrawerNavigator.Navigator>
  );
}
