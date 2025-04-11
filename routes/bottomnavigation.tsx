import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import NavigationHeader from "../components/navigationHeader";
import Subcribed from "../screens/subcribedPage";
import Drawer from "./drawer";
import MenuDrawer from "./menuDrawer";
import ProfileStackNavigator from "./profileNavigation/profileStacknavigator";
import SchedulePromotionDrawer from "./SchedulepromotionDrawer";

const Tab = createBottomTabNavigator();

export default function BottomNavigation(navigation: any) {
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
            case "Promotion":
              iconName = focused ? "gift" : "gift-outline";
              break;
            case "Profile":
              iconName = focused ? "person" : "person-outline";
              break;
            case "Report":
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
        },
      })}
    >
      <Tab.Screen name="Drawer" component={Drawer} options={{ title: "Home" }} />
      <Tab.Screen name="Menu" component={MenuDrawer} options={{ title: "Menu" }} />
      <Tab.Screen
        name="Promotion"
        component={SchedulePromotionDrawer}
        options={{
          title: "Promotion",
          headerShown: false,
          headerStyle: {
            backgroundColor: "skyblue",
          },
          headerTitleAlign: "center",
          headerTitleStyle: { backgroundColor: "skyblue" },
        }}
      />
      <Tab.Screen
        name="Report"
        component={Subcribed}
        options={{
          title: "Reports",
          headerShown: true,
          headerStyle: {
            backgroundColor: "skyblue",
          },
          headerTitle: () => <NavigationHeader title="Reports" navigation={navigation} />,
          headerTitleAlign: "center",
          headerTitleStyle: { backgroundColor: "skyblue" },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackNavigator}
        options={{
          title: "Profile",
          headerShown: true,
          headerStyle: {
            backgroundColor: "skyblue",
          },
          headerTitle: () => <NavigationHeader title="Profile" navigation={navigation} />,
          headerTitleAlign: "center",
          headerTitleStyle: { backgroundColor: "skyblue" },
        }}
      />
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
