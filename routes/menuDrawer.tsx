import React from "react";

import { MaterialIcons } from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import NavigationHeader from "../components/navigationHeader";
import { recycledStyles } from "../components/recycled-style";
import BevrageScreens from "../screens/Menu/BevragesScreens/bevragesScreens";
import CateringProductScreens from "../screens/Menu/cateringProductScrrens/cateringMenu";
import ItemScreens from "../screens/Menu/itemScreens/itemScreens";
import MeatScreens from "../screens/Menu/meatScreens/meatScreens";
import ProductScreens from "../screens/Menu/ProductScreens/productScreens";
import SauceScreens from "../screens/Menu/createSauceScreens/sauceScreens";
import SidesScreens from "../screens/Menu/SidesScreens/sidesScreens";

const RootDrawerNavigator = createDrawerNavigator();
export default function MenuDrawer(navigation: any) {
  return (
    <RootDrawerNavigator.Navigator
      initialRouteName="ProductScreens"
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
        name="ProductScreens"
        component={ProductScreens}
        options={{
          drawerIcon: ({ color, size }) => <MaterialIcons name="home" color="white" size={size} />,
          headerTitle: () => <NavigationHeader title="Product" navigation={navigation} />,
          headerStyle: { backgroundColor: "skyblue" },
        }}
      />

      <RootDrawerNavigator.Screen
        name="ItemScreens"
        component={ItemScreens}
        options={{
          drawerIcon: ({ color, size }) => <MaterialIcons name="home" color="white" size={size} />,
          headerTitle: () => <NavigationHeader title="Item" navigation={navigation} />,
          headerStyle: { backgroundColor: "skyblue" },
        }}
      />

      <RootDrawerNavigator.Screen
        name="BevrageScreens"
        component={BevrageScreens}
        options={{
          drawerIcon: ({ color, size }) => <MaterialIcons name="home" color="white" size={size} />,
          headerTitle: () => <NavigationHeader title="Bevrages" navigation={navigation} />,
          headerStyle: { backgroundColor: "skyblue" },
        }}
      />
      <RootDrawerNavigator.Screen
        name="SidesScreens"
        component={SidesScreens}
        options={{
          drawerIcon: ({ color, size }) => <MaterialIcons name="home" color="white" size={size} />,
          headerTitle: () => <NavigationHeader title="Sides" navigation={navigation} />,
          headerStyle: { backgroundColor: "skyblue" },
        }}
      />
      <RootDrawerNavigator.Screen
        name="CateringProductScreens"
        component={CateringProductScreens}
        options={{
          drawerIcon: ({ color, size }) => <MaterialIcons name="home" color="white" size={size} />,
          headerTitle: () => <NavigationHeader title="Catering" navigation={navigation} />,
          headerStyle: { backgroundColor: "skyblue" },
        }}
      />
      <RootDrawerNavigator.Screen
        name="SauceScreens"
        component={SauceScreens}
        options={{
          drawerIcon: ({ color, size }) => <MaterialIcons name="home" color="white" size={size} />,
          headerTitle: () => <NavigationHeader title="Sauce" navigation={navigation} />,
          headerStyle: { backgroundColor: "skyblue" },
        }}
      />
      <RootDrawerNavigator.Screen
        name="MeatScreens"
        component={MeatScreens}
        options={{
          drawerIcon: ({ color, size }) => <MaterialIcons name="home" color="white" size={size} />,
          headerTitle: () => <NavigationHeader title="Meat" navigation={navigation} />,
          headerStyle: { backgroundColor: "skyblue" },
        }}
      />
    </RootDrawerNavigator.Navigator>
  );
}
