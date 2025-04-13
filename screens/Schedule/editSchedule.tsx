import { useRoute } from "@react-navigation/core";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Dimensions, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, TouchableWithoutFeedback, View } from "react-native";
import ToastManager, { Toast } from "toastify-react-native";
import { editSchedule } from "../../api/schedules";
import { createOpeningHourSchema } from "../../api/validations";
import { buttonBuilder } from "../../components/button";
import { inputBuilder } from "../../components/input";
import { CustomeRadioButtons, TimePickerField } from "../../components/meatTypesDropDown";
import { createItemPropsStyles, createModalStyles, toastManagerProps } from "../../components/recycled-style";
import showAlert from "../../components/showAlert";
import { parseError } from "../../components/toasts";
import "../../extension/extension";
import { popWithParams } from "../../utils/routes";

type options = { label: string; value: number };

const days: options[] = [
  { label: "Sunday", value: 1 },
  { label: "Monday", value: 2 },
  { label: "Tuesday", value: 3 },
  { label: "Wednesday", value: 4 },
  { label: "Thursday", value: 5 },
  { label: "Friday", value: 6 },
  { label: "Saturday", value: 7 },
];

const scheduleFor: options[] = [
  { label: "Product", value: 1 },
  { label: "Catering", value: 2 },
];
const open: options[] = [
  { label: "Yes", value: 1 },
  { label: "No", value: 0 },
];
const anPm: options[] = [
  { label: "AM", value: 1 },
  { label: "PM", value: 0 },
];
const EditSchedule = ({ navigation }: { navigation: any }) => {
  const [apiInUse, setApiInUse] = useState<boolean>(true);

  const route = useRoute(); // ✅ Get the route object
  const { scheduleDetails } = (route.params as { scheduleDetails: any }) || {};
  console.log(scheduleDetails);
  useEffect(() => {
    prepare();
  }, []);

  function prepare() {
    setApiInUse(false);
  }

  const formik = useFormik({
    initialValues: {
      day: scheduleDetails.day.toString(),
      isOpen: scheduleDetails.isOpen.toString(),
      description: scheduleDetails.description,
      type: scheduleDetails.scheduleType.toString(),
      openTime: scheduleDetails.openTime,
      closeTime: scheduleDetails.closeTime,
    },
    validationSchema: createOpeningHourSchema,
    onSubmit: async (values) => {
      setApiInUse(true);

      const response = await editSchedule(
        scheduleDetails.id,
        parseInt(values.day) || 1,
        parseInt(values.type) || 1,
        values.description,
        values.openTime,
        values.closeTime,
        parseInt(values.isOpen) || 0
      );

      if (response.data.success !== true) {
        Toast.error(parseError(response));
        setApiInUse(false);
        return;
      }
      Toast.success("Successfully Schedule Edited in!");
      showAlert("Sucess", `Successfully Schedule Edited `, async () => {
        popWithParams(navigation, 1, { refresh: true });
      });
      setApiInUse(false);
    },
  });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <SafeAreaView style={createModalStyles.container}>
          <ToastManager {...toastManagerProps} />
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={createModalStyles.card}>
              <CustomeRadioButtons formik={formik} valueName="day" expanded={true} lable="Select Day" typesOptions={days} />
              <CustomeRadioButtons formik={formik} valueName="type" expanded={true} lable="Schedule For" typesOptions={scheduleFor} />
              <CustomeRadioButtons formik={formik} valueName="isOpen" expanded={true} lable="Is Open" typesOptions={open} />
              <TimePickerField formik={formik} valueName="openTime" title="Opening Time" />
              <TimePickerField formik={formik} valueName="closeTime" title="Closing Time" />
              {inputBuilder("Enter Schedule Description.", "description", formik, {
                multiline: true,
                style: createItemPropsStyles.itemDescription,
              })}

              {buttonBuilder("Save", formik.handleSubmit, apiInUse, undefined, true)}
            </View>
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default EditSchedule;

const { width, height } = Dimensions.get("window");
