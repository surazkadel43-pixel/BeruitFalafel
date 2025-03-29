import { CommonActions, useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { Animated, RefreshControl, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ToastManager, { Toast } from "toastify-react-native";
import { dispose } from "../../api/store";
import { getCurrentUser } from "../../api/user";
import { buttonBuilder } from "../../components/button";
import { CustomeProfileCard } from "../../components/customeCard";
import { ProfileHeader } from "../../components/profileHeader";
import { recycledStyles, toastManagerProps } from "../../components/recycled-style";
import showAlert from "../../components/showAlert";
import { parseError } from "../../components/toasts";

export default function ProfileScreens({ navigation }: { navigation: any }) {
  const [apiInUse, setApiInUse] = useState<boolean>(true);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  function prepare() {
    setApiInUse(false);
  }
  useFocusEffect(
    useCallback(() => {
      getUser();
    }, [])
  );

  useEffect(() => {
    prepare();
    getUser();
  }, []);

  const getUser = async () => {
    setApiInUse(true);
    const userResponse = await getCurrentUser();
  
    if (userResponse.status !== 200) {
      Toast.error(parseError(userResponse));
      setApiInUse(false);
      return;
    }
    setCurrentUser(userResponse.data.user);
    console.log(userResponse.data.user);

    setApiInUse(false);
  };
  const handelLogout = async () => {
    setApiInUse(true);
    await dispose("authCookie");
    setApiInUse(false);
    showAlert("Alert", `"Logging out " `, () => {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "LoginNavigator" }],
        })
      );
    });
  };
  const onRefresh = async () => {
    setRefreshing(true);

    try {
      await prepare();
    } catch (error) {
      Toast.error("Something went wrong.");
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <SafeAreaView style={[recycledStyles.safeAreaView, { paddingHorizontal: 0 }]}>
      <ToastManager {...toastManagerProps} />
      <Animated.ScrollView scrollEventThrottle={16} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <ProfileHeader
          firstName={currentUser?.firstName}
          lastName={currentUser?.lastName}
          email={currentUser?.email}
          createdAt={currentUser?.createdAt}
          phoneNumber={currentUser?.phoneNumber}
        />

        <View>
          <CustomeProfileCard
            title="Change Name"
            description="Edit your Name"
            onPress={() => {
              navigation.navigate("EditName", { currentUser: currentUser });
            }}
            icon="edit"
            buttonName="Edit"
            buttonIsActive={true}
          />
          <CustomeProfileCard
            title="Change Password"
            description="Edit your Password"
            onPress={() => {
              navigation.navigate("EditPassword", { currentUser: currentUser });
            }}
            icon="edit"
            buttonName="Edit"
            buttonIsActive={true}
          />

          <CustomeProfileCard
            title="Change Phone Number"
            description="Edit your Phone Number"
            onPress={() => {
              navigation.navigate("EditPhoneNumber", { currentUser: currentUser });
            }}
            icon="edit"
            buttonName="edit"
            buttonIsActive={true}
          />
        </View>

        {buttonBuilder("Log Out", handelLogout, apiInUse, undefined, true, {
          style: [styles.buttonLogout],
        })}
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  buttonLogout: {
    borderRadius: 10,
    elevation: 8,
    backgroundColor: "#4C5BD4", // 1c4063
    paddingVertical: 10,
    paddingHorizontal: 12,
    margin: 15,
  },
});
