import React from "react";

import { MaterialIcons } from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import NavigationHeader from "../components/navigationHeader";
import { recycledStyles } from "../components/recycled-style";

import BevrageStackNavigator from "./bevrageNavigation/bevrageStackNavigator";
import GenericItemStackNavigator from "./genericNavigation/genericStackNavigator";
import ItemStackNavigator from "./itemNavigation/itemStackNavigation";
import MeatStackNavigator from "./meatNavigation/meatStackNavigator";
import ProductStackNavigator from "./productNavigation/productStackNavigator";
import SauceStackNavigator from "./sauceNavigation/sauceStackNavigation";
import SidesStackNavigator from "./sidesNavigation/sideStackNavigator";

const RootDrawerNavigator = createDrawerNavigator();
export default function MenuDrawer(navigation: any) {
  return (
    <RootDrawerNavigator.Navigator
      initialRouteName="Item"
      screenOptions={{
        headerShown: true,
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
        name="Product"
        component={ProductStackNavigator}
        options={{
          drawerIcon: ({ color, size }) => <MaterialIcons name="home" color="white" size={size} />,
          headerTitle: () => <NavigationHeader title="Product" navigation={navigation} />,
          headerStyle: { backgroundColor: "skyblue" },
        }}
      />

      <RootDrawerNavigator.Screen
        name="Item"
        component={ItemStackNavigator}
        options={{
          drawerIcon: ({ color, size }) => <MaterialIcons name="home" color="white" size={size} />,
          headerTitle: () => <NavigationHeader title="Item" navigation={navigation} />,
          headerStyle: { backgroundColor: "skyblue" },
        }}
      />

      <RootDrawerNavigator.Screen
        name="Sauce"
        component={SauceStackNavigator}
        options={{
          drawerIcon: ({ color, size }) => <MaterialIcons name="home" color="white" size={size} />,
          headerTitle: () => <NavigationHeader title="Sauce" navigation={navigation} />,
          headerStyle: { backgroundColor: "skyblue" },
        }}
      />
      <RootDrawerNavigator.Screen
        name="Meat"
        component={MeatStackNavigator}
        options={{
          drawerIcon: ({ color, size }) => <MaterialIcons name="home" color="white" size={size} />,
          headerTitle: () => <NavigationHeader title="Meat" navigation={navigation} />,
          headerStyle: { backgroundColor: "skyblue" },
        }}
      />

      <RootDrawerNavigator.Screen
        name="Sides"
        component={SidesStackNavigator}
        options={{
          drawerIcon: ({ color, size }) => <MaterialIcons name="home" color="white" size={size} />,
          headerTitle: () => <NavigationHeader title="Sides" navigation={navigation} />,
          headerStyle: { backgroundColor: "skyblue" },
        }}
      />

      <RootDrawerNavigator.Screen
        name="Generic"
        component={GenericItemStackNavigator}
        options={{
          drawerIcon: ({ color, size }) => <MaterialIcons name="home" color="white" size={size} />,
          headerTitle: () => <NavigationHeader title="Generic" navigation={navigation} />,
          headerStyle: { backgroundColor: "skyblue" },
        }}
      />
      <RootDrawerNavigator.Screen
        name="Bevrage"
        component={BevrageStackNavigator}
        options={{
          drawerIcon: ({ color, size }) => <MaterialIcons name="home" color="white" size={size} />,
          headerTitle: () => <NavigationHeader title="Bevrages" navigation={navigation} />,
          headerStyle: { backgroundColor: "skyblue" },
        }}
      />
    </RootDrawerNavigator.Navigator>
  );
}
