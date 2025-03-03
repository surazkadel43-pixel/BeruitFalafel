
import { useFormik } from "formik";
import React, { useState } from "react";
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import ToastManager, { Toast } from "toastify-react-native";
import { buttonBuilder } from "./button";
import { inputBuilder } from "./input";
import { toastManagerProps } from "./recycled-style";
import { parseError } from "./toasts";

interface CreateGroupModal {
  onClose: () => void;
}

const CreateGroupModal: React.FC<CreateGroupModal> = (props) => {
  const [apiInUse, setApiInUse] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    validationSchema: null,
    onSubmit: async (values) => {
      setApiInUse(true);
      // const groupCreateRes = await createGroup(values.name, values.description);
      // if (groupCreateRes.status !== 200) {
      //   Toast.error(parseError(groupCreateRes));
      //   setApiInUse(false);
      //   return;
      // }
      // props.onClose();
      setApiInUse(false);
    },
  });

  

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ToastManager {...toastManagerProps} />
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.modalContent}>
          {/* Header Section */}
          <View style={styles.header}>
            <Text style={styles.title}> Create Group</Text>

            <TouchableOpacity onPress={props.onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>✖</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.card}>
            {inputBuilder("Enter your Group Name", "name", formik, {
              multiline: true,
              style: {
                backgroundColor: "#1e2124",
                color: "white",
                borderRadius: 8,
                fontSize: 20,
                minHeight: height * 0.08,
                maxHeight: height * 0.3,
                borderColor: "white",
                borderWidth: 2,
                padding: 10,
              },
            })}
            {inputBuilder("Enter your Group Description", "description", formik, {
              multiline: true,
              style: {
                backgroundColor: "#1e2124",
                color: "white",
                borderRadius: 8,
                fontSize: 20,
                minHeight: height * 0.15,
                maxHeight: height * 0.3,
                borderColor: "white",
                borderWidth: 2,
                padding: 10,
              },
            })}
            {buttonBuilder("Create", formik.handleSubmit, apiInUse)}
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CreateGroupModal;

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#12193D",
  },
  modalContent: {
    flex: 1,
    padding: 5,
    justifyContent: "flex-start",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
    paddingHorizontal: 10,
    borderBottomColor: "#D1D5DB",
    borderBottomWidth: 1,
  },
  closeButton: {
    padding: 10,
  },
  closeButtonText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
    alignSelf: "center",
  },
  card: { backgroundColor: "#1e2124", padding: 16, borderRadius: 8, borderWidth: 1, borderColor: "white", gap: 20 },
});
