import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { View, Text, StyleSheet } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import Home from "../screens/homepage";
import Search from "../screens/searchpage";
import CreatePost from "../screens/createPost";
import Profile from "../screens/profilepage";
import Subcribed from "../screens/subcribedPage";
import Drawer from "./drawer";
import MenuDrawer from "./menuDrawer";

const Tab = createBottomTabNavigator();

export default function BottomNavigation() {
  return (
    
      <Tab.Navigator
      initialRouteName="Drawer" 
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap;

            switch (route.name) {
              case "Drawer":
                iconName = focused ? "home" : "home-outline";
                break;
              case "Menu":
                iconName = focused ? "menu" : "menu-outline";
                break;
              case "CreatePost":
                iconName = focused ? "add-circle" : "add-circle-outline";
                break;
              case "Profile":
                iconName = focused ? "person" : "person-outline";
                break;
              case "Sucribed":
                iconName = focused ? "notifications" : "notifications-outline";
                break;
              default:
                iconName = "help-circle-outline";
                break;
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          headerShown: false,
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: {
            backgroundColor: "#16181c",
          }
        })}
        
      >
        <Tab.Screen name="Drawer" component={Drawer} options={{ title: "Home", }} />
        <Tab.Screen name="Menu" component={MenuDrawer} options={{ title: "Menu" }} />
        <Tab.Screen name="CreatePost" component={CreatePost} options={{ title: "Create" }} />
        <Tab.Screen name="Sucribed" component={Subcribed} options={{ title: "Stats" }} />
        <Tab.Screen name="Profile" component={Profile} options={{ title: "Profile" }} />
      </Tab.Navigator>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1a202c",
  },
  subtitle: {
    color: "#4a5568",
    textAlign: "center",
    marginTop: 8,
    paddingHorizontal: 16,
  },
  button: {
    marginTop: 16,
    backgroundColor: "#3b82f6",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
  },
});
