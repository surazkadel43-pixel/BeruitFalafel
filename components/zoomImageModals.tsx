import React from "react";
import { Modal, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, View, Text } from "react-native";
import { Gesture, GestureDetector, GestureHandlerRootView,  PinchGestureHandler,
  PanGestureHandler, } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";


interface ZoomImageModalProps {
  visible: boolean;
  onClose: () => void;
  source: { presignedURL?: string, uri?: string } | null;
}


const ZoomImageModal: React.FC<ZoomImageModalProps> = ({ visible, onClose, source }) => {
  if (!source) return null; // Prevent rendering if source is null


  const scale = useSharedValue(1); // Shared value for scaling


  // Pinch Gesture Handler
  const pinchGesture = Gesture.Pinch()
    .onUpdate((event) => {
      scale.value = event.scale; // Update scale dynamically
    })
    .onEnd(() => {
      scale.value = withSpring(1); // Reset scale smoothly
    });


  // Animated style for zoom effect
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));


  const handlePinch = () => {};


  return (
    <Modal visible={visible} animationType="fade" transparent={true} onRequestClose={onClose}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <TouchableWithoutFeedback  accessible={false}>
          <View style={styles.modalOverlay}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>


            <GestureDetector gesture={pinchGesture}>
              <Animated.Image
                source={{ uri: source?.presignedURL || source?.uri }}
                style={[styles.postImage, animatedStyle]}
              />
            </GestureDetector>
          </View>
        </TouchableWithoutFeedback>
      </GestureHandlerRootView>
    </Modal>
  );
};


const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)", // Semi-transparent background
    justifyContent: "center",
    alignItems: "center",
  },
  postImage: {
    width: "90%", // Ensure proper scaling
    height: "90%",
    resizeMode: "contain",
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "rgba(255, 255, 255, 0.7)", // Light background for the button
    borderRadius: 50,
    padding: 12,
    zIndex: 1, // Make sure it appears on top of the image
  },
  closeButtonText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "black",
  },
});


export default ZoomImageModal;