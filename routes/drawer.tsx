import React from "react";

import { MaterialIcons } from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import NavigationHeader from "../components/navigationHeader";
import Home from "../screens/homepage";
import CreatePost from "../screens/createPost";
import NewOrder from "../screens/orderCatering/newOrder";
import Order from "../screens/orderCatering/orderScreen";
import CateringOrder from "../screens/orderCatering/caterinOrderScreen";
const RootDrawerNavigator = createDrawerNavigator();
import { recycledStyles } from "../components/recycled-style";

export default function Drawer(navigation: any) {
  return (
    <RootDrawerNavigator.Navigator
      initialRouteName="NewOrder"
      screenOptions={{
        headerShown: true,
        drawerActiveTintColor: recycledStyles.activeButtonBackGroundColor.backgroundColor,
        drawerInactiveTintColor: "purple",
        drawerActiveBackgroundColor: "green",
        drawerStyle: {
          backgroundColor: recycledStyles.tabBarBackGroundColor.backgroundColor
        },
        drawerLabelStyle: {
          fontSize: 16, // Change font size
          fontWeight: "bold", // Make text bold
          color: "white", // Custom text color
        },
      }}
    >
      <RootDrawerNavigator.Screen
        name="NewOrder"
        component={NewOrder}
        options={{
          drawerIcon: ({ color, size }) => <MaterialIcons name="home" color="white" size={size} />,
          headerTitle: () => <NavigationHeader title="New Order" navigation={navigation} />,
          headerStyle: { backgroundColor: "skyblue" },
        }}
      />

      <RootDrawerNavigator.Screen
        name="Order"
        component={Order}
        options={{
          drawerIcon: ({ color, size }) => <MaterialIcons name="home" color="white" size={size} />,
          headerTitle: () => <NavigationHeader title="Order" navigation={navigation} />,
          headerStyle: { backgroundColor: "skyblue" },
        }}
      />
      <RootDrawerNavigator.Screen
        name="CateringOrder"
        component={CateringOrder}
        options={{
          drawerIcon: ({ color, size }) => <MaterialIcons name="home" color="white" size={size} />,
          headerTitle: () => <NavigationHeader title="CateringOrder" navigation={navigation} />,
          headerStyle: { backgroundColor: "skyblue" },
        }}
      />
    </RootDrawerNavigator.Navigator>
  );
}
