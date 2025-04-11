import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ToastManager, { Toast } from "toastify-react-native";
import { createOpeningHourSchema } from "../../api/validations";
import { buttonBuilder } from "../../components/button";
import { inputBuilder } from "../../components/input";
import { CustomeRadioButtons, TimePickerField } from "../../components/meatTypesDropDown";
import { createItemPropsStyles, createModalStyles, toastManagerProps } from "../../components/recycled-style";
import showAlert from "../../components/showAlert";
import "../../extension/extension";
import { createSchedule } from "../../api/schedules";
import { parseError } from "../../components/toasts";

interface CreatePromotionModal {
  onClose: () => void;
  onRefresh: () => void;
}

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


const CreateScheduleModal: React.FC<CreatePromotionModal> = (props) => {
  const [apiInUse, setApiInUse] = useState<boolean>(true);

  useEffect(() => {
    prepare();
  }, []);

  function prepare() {
    setApiInUse(false);
  }

  const formik = useFormik({
    initialValues: {
      day: "",
      isOpen: "",
      description: "",
      type: "",
      openTime: "11:00",
      closeTime: "15:00",
    },
    validationSchema: createOpeningHourSchema,
    onSubmit: async (values) => {
      setApiInUse(true);

      
      const response = await createSchedule(
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
      Toast.success("Successfully Schedule created in!");
      showAlert("Sucess", `Successfully Schedule created  `, async () => {
        props.onClose();
        props.onRefresh();
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
            {/* Header Section */}
            <View style={createModalStyles.header}>
              <Text style={createModalStyles.title}>Create Schedule</Text>

              <TouchableOpacity onPress={props.onClose} style={createModalStyles.closeButton}>
                <Text style={createModalStyles.closeButtonText}>✖</Text>
              </TouchableOpacity>
            </View>

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

              {buttonBuilder("Create", formik.handleSubmit, apiInUse)}
            </View>
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default CreateScheduleModal;

const { width, height } = Dimensions.get("window");
