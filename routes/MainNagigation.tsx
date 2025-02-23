import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect } from "react";

import BottomNavigation from "./bottomnavigation";
import LoginStackNavigator from "./loginStacknavigator"; // Ensure the path is correct
import { StatusBar } from 'expo-status-bar';





const Stack = createStackNavigator();

export default function MainNavigation() {
  
  

  return (
    <>
    { <StatusBar style="light" translucent={false} backgroundColor="#12193D" /> }
    
    <NavigationContainer>
      
      <Stack.Navigator
        initialRouteName="LoginNavigator"
        screenOptions={{
          headerShown: false,
          headerStyle: { backgroundColor: "#12193D" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      >
        

        {/* Wrap LoginStackNavigator inside a Stack.Screen component */}
        <Stack.Screen
          name="LoginNavigator"
          component={LoginStackNavigator} // Correctly pass as the component prop
        />

        {/* Bottom Tab Navigator */}
        <Stack.Screen
          name="BottomTabs"
          component={BottomNavigation} // Bottom navigation screen
        />
      </Stack.Navigator>
    </NavigationContainer>
    </>

  );
}
