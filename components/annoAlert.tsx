import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";


interface AlertModalProps {
  visible: boolean;
  title?: string;
  subTitle?: string;
  message: string;
  onConfirm: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
}


const AlertModal: React.FC<AlertModalProps> = ({
  visible,
  title = "Alert",
 
  message,
  onConfirm,
  onCancel,
  confirmText = "Yes",
  cancelText = "No",
  subTitle= "",
}) => {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.separator} />
          <Text style={[subTitle && styles.subTitle]}>{subTitle}</Text>
          <Text style={styles.message}>{message}</Text>


          <View style={styles.buttonContainer}>
            {onCancel && (
              <TouchableOpacity style={styles.button} onPress={onCancel}>
                <Text style={styles.buttonText}>{cancelText}</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={[styles.button, styles.confirmButton]} onPress={onConfirm}>
              <Text style={styles.buttonText}>{confirmText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};


const styles = StyleSheet.create({
  overlay: {
    paddingHorizontal: 30,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  modalContainer: {
    width: "100%",
    backgroundColor: "#111",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    flexDirection: 'column', // Ensure vertical stacking
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  separator: {
    width: "99%",
    height: 2,
    backgroundColor: "#fff",
    marginVertical: 10,
  },
  message: {
    fontSize: 20,
    color: "#ccc",
    textAlign: "center",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
  },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#333",
    alignItems: "center",
  },
  confirmButton: {
    backgroundColor: "#4c8bf5",
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
  },
  subTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
    textAlign: "center",
  }
});


export default AlertModal;



