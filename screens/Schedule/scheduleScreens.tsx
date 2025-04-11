import { FontAwesome, Ionicons } from "@expo/vector-icons";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
  FlatList,
  Keyboard,
  Modal,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ToastManager, { Toast } from "toastify-react-native";

import { CustomeScheduleCard } from "../../components/customeCard";
import { recycledStyles, toastManagerProps } from "../../components/recycled-style";
import NoResultsCard from "../../components/searchNotFound";
import { parseError } from "../../components/toasts";
import CreateScheduleModal from "./createModal";

import { useFocusEffect, useRoute } from "@react-navigation/core";
import { deleteSchedule, getAllSchedulesByType } from "../../api/schedules";
import { buttonBuilder } from "../../components/button";
import showAlert, { yesOrNoAlert } from "../../components/showAlert";
import { useStickyScroll } from "../../hooks/useStickyScroll";
import { ItemType } from "../../utils/enums";

export default function ScheduleScreens({ navigation }: { navigation: any }) {
  const [apiInUse, setApiInUse] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [schedules, setSchedules] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [refreshes, setRefreshes] = useState<number>(0);
  const route = useRoute() as { params?: { refresh?: boolean } };
  const scheduleType = useRef<number>(1);
  let { onScroll, stickyTop, stickyOpacity, resetScroll } = useStickyScroll();

  async function prepare(isRefreshing: boolean = false) {
    if (isRefreshing) {
      setRefreshes(refreshes + 1);
    }
    setApiInUse(false);

    const scheduleResponse = await getAllSchedulesByType(scheduleType.current);

    if (scheduleResponse.data.success !== true) {
      Toast.error(parseError(scheduleResponse));
      setRefreshing(false);
      setApiInUse(false);
      return;
    }
    setSchedules(scheduleResponse.data.schedules);

    setApiInUse(false);
    setRefreshing(false);
  }

  useEffect(() => {
    prepare();
  }, []);
  useEffect(() => {
    if (refresh) {
      prepare();
      setRefresh(false);
    }
  }, [refresh]);

  useFocusEffect(
    useCallback(() => {
      if (route.params?.refresh) {
        prepare();
        navigation.setParams({ refresh: false });
      }
    }, [route.params?.refresh])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    prepare(true);
  };

  const handleItemTypeChange = (type: number) => {
    setApiInUse(true);
    resetScroll();
    scheduleType.current = type;
    onRefresh();
  };

  async function handelDeleteSchedule(id: string) {
    yesOrNoAlert(
      "Delete Promotion",
      "Are you sure you want to delete this Promotion?",
      async () => {
        setApiInUse(true);
        const deltedRes = await deleteSchedule(id);
        if (deltedRes.data.success !== true) {
          Toast.error(parseError(deltedRes));
          setApiInUse(false);
          return;
        }
        setApiInUse(false);
        showAlert("Sucess", `Schedule deleted successfully `, async () => {
          onRefresh( );
        } );
      },
      () => {
        return;
      }
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView key={refreshes} style={recycledStyles.safeAreaView}>
        <ToastManager {...toastManagerProps} />

        <FlatList
          data={schedules}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <CustomeScheduleCard
              itemId={item.id}
              day={item.day}
              scheduleType={item.scheduleType}
              isOpen={item.isOpen}
              openingTime={item.openTime}
              closingTime={item.closeTime}
              description={item.description}
              onEditPress={() => {
                navigation.navigate("EditSchedule", { scheduleDetails: item });
              }}
              onDeletePress={() => {
                handelDeleteSchedule(item.id);
              }}
            />
          )}
          ListEmptyComponent={() => (
            <NoResultsCard
              message={"Sorry, No Schedule Founds."}
              additionalProps={{
                icon: <FontAwesome name="cutlery" size={30} color="white" />,
              }}
            />
          )}
          ListHeaderComponent={
            <View style={{ marginBottom: 10 }}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false} // Optionally hide the scroll indicator
                contentContainerStyle={{ flexDirection: "row" }}
              >
                <View style={recycledStyles.actionButtons}>
                  {buttonBuilder(
                    "Product",
                    () => handleItemTypeChange(ItemType.Product),
                    apiInUse,
                    undefined,
                    scheduleType.current === ItemType.Product,
                    {
                      style: [recycledStyles.buttonContainer, { backgroundColor: scheduleType.current === ItemType.Product ? "green" : "#4C5BD4" }],
                    }
                  )}
                  {buttonBuilder(
                    "Catering",
                    () => handleItemTypeChange(ItemType.Catering),
                    apiInUse,
                    undefined,
                    scheduleType.current === ItemType.Catering,
                    {
                      style: [recycledStyles.buttonContainer, { backgroundColor: scheduleType.current === ItemType.Catering ? "green" : "#4C5BD4" }],
                    }
                  )}
                </View>
              </ScrollView>
            </View>
          }
          contentContainerStyle={{ paddingBottom: 20 }} // Optional: Add some padding at the bottom if needed
          showsVerticalScrollIndicator={false} // Hide the scroll indicator if needed
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          // onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}
          onScroll={onScroll}
        />
        {/* Animated Action Buttons that appear on top of the list */}
        <Animated.View
          style={[
            recycledStyles.stickyScrollViewWrapper,
            {
              top: stickyTop,
              opacity: stickyOpacity,
            },
          ]}
        >
          <View style={{ marginBottom: 10 }}>
            <ScrollView
              bounces={false}
              horizontal
              showsHorizontalScrollIndicator={false} // Optionally hide the scroll indicator
              contentContainerStyle={{ flexDirection: "row" }}
            >
              <View style={recycledStyles.actionButtons}>
                {buttonBuilder(
                  "Product",
                  () => handleItemTypeChange(ItemType.Product),
                  apiInUse,
                  undefined,
                  scheduleType.current === ItemType.Product,
                  {
                    style: [recycledStyles.buttonContainer, { backgroundColor: scheduleType.current === ItemType.Product ? "green" : "#4C5BD4" }],
                  }
                )}
                {buttonBuilder(
                  "Catering",
                  () => handleItemTypeChange(ItemType.Catering),
                  apiInUse,
                  undefined,
                  scheduleType.current === ItemType.Catering,
                  {
                    style: [recycledStyles.buttonContainer, { backgroundColor: scheduleType.current === ItemType.Catering ? "green" : "#4C5BD4" }],
                  }
                )}
              </View>
            </ScrollView>
          </View>
        </Animated.View>

        {/* Modal */}
        <Modal
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
          animationType="slide"
          transparent={true} // ✅ Keeps background transparent
          style={recycledStyles.modal}
        >
          <CreateScheduleModal onClose={() => setModalVisible(false)} onRefresh={() => setRefresh(true)} />
        </Modal>
        <TouchableOpacity style={recycledStyles.addButton} onPress={() => setModalVisible(true)} activeOpacity={0.7}>
          <Ionicons name="add" size={40} color="white" />
        </TouchableOpacity>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({});
