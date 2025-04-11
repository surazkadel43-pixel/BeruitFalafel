import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import { MyNavigationHeader } from "../../components/navigationHeader";
import EditSchedule from "../../screens/Schedule/editSchedule";
import ScheduleScreens from "../../screens/Schedule/scheduleScreens";
const Stack = createStackNavigator();

export default function ScheduleStackNavigator({ navigation }: { navigation: any }) {
  return (
    <Stack.Navigator
      initialRouteName="ScheduleScreens"
      screenOptions={{
        headerStyle: { backgroundColor: "#12193D" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      <Stack.Screen
        name="ScheduleScreens"
        component={ScheduleScreens}
        options={{ title: "Schedule", headerTitle: () => <MyNavigationHeader title="Schedule" navigation={navigation} /> }}
      />

      <Stack.Screen
        name="EditSchedule"
        component={EditSchedule}
        options={{
          presentation: "modal",
          headerShown: true,
          headerTitle: "Edit Schedule",
          headerStyle: {
            backgroundColor: "#1C2237", // Change header background color
          },
          headerTintColor: "white", // Change header text color
        }}
      />
    </Stack.Navigator>
  );
}
