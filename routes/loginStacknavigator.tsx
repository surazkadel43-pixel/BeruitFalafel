import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import LoginForm from "../screens/LoginSignup/login";
import ResetPassword from "../screens/LoginSignup/resetPassword";
import SignUpForm from "../screens/LoginSignup/signup";
import VerifyCode from "../screens/LoginSignup/veriFyCode";
import VerifyEmail from "../screens/LoginSignup/VerifyEmail";
import VerifyResetCode from "../screens/LoginSignup/verifyResetCode";
import Welcome from "../screens/LoginSignup/welcome";

const Stack = createStackNavigator();

export default function LoginStackNavigator({ navigation }: any) {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerStyle: { backgroundColor: "#12193D" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      {/* Login Screen */}
      <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
      {/* Login Screen */}
      <Stack.Screen name="Login" component={LoginForm} options={{ title: "Login", headerShown: false }} />

      {/* Sign up Screen */}
      <Stack.Screen name="SignUp" component={SignUpForm} options={{ title: "SignUp", headerShown: true }} />

      {/* Verify Email Screen */}
      <Stack.Screen name="ForgotPassword" component={VerifyEmail} options={{ title: "Forgot Password", headerShown: true }} />

      {/* Verify Email Screen */}
      <Stack.Screen name="ResetPassword" component={ResetPassword} options={{ title: "Reset Password" }} />

      {/* Verify Email Screen */}
      <Stack.Screen name="VerifyCode" component={VerifyCode} options={{ title: "Veritification", headerShown: true }} />

      {/* Verify Email Screen */}
      <Stack.Screen name="VerifyResetCode" component={VerifyResetCode} options={{ title: "Veritification", headerShown: true }} />
    </Stack.Navigator>
  );
}
