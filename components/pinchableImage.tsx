import { ImageZoom } from "@likashefqet/react-native-image-zoom";
import React, { useEffect } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { useSharedValue } from "react-native-reanimated";
const { width, height } = Dimensions.get("window");

interface ZoomImageModalProps {
  source: { presignedURL: string };
  onSwipe: (direction: "left" | "right") => void;
  onPinchableImageScale: (scale: number) => void;
}

export const PinchableImage: React.FC<ZoomImageModalProps> = ({ source, onSwipe, onPinchableImageScale }) => {
  const scale = useSharedValue(1);

  useEffect(() => {}, []);

  return (
    <ImageZoom
      uri={source.presignedURL}
      minScale={1}
      maxScale={5}
      doubleTapScale={3}
      maxPanPointers={1}
      isPanEnabled={true}
      isPinchEnabled={true}
      isSingleTapEnabled={true}
      isDoubleTapEnabled={true}
      onInteractionStart={() => {}}
      onInteractionEnd={() => {}}
      onPinchStart={(event) => {}}
      onPinchEnd={(event) => {
        scale.value = event.scale;
        onPinchableImageScale(2);
      }}
      onPanStart={(event) => {}}
      onPanEnd={(event) => {
        const SWIPE_VELOCITY_THRESHOLD = 300 * 0.8;
        const SWIPE_DISTANCE_THRESHOLD = 100 * 0.8;

        const { translationX, velocityX } = event;

        if (scale.value == 1.01) {
          if (translationX > SWIPE_DISTANCE_THRESHOLD && velocityX > SWIPE_VELOCITY_THRESHOLD) {
            onSwipe("right");
          } else if (translationX < -SWIPE_DISTANCE_THRESHOLD && velocityX < -SWIPE_VELOCITY_THRESHOLD) {
            onSwipe("left");
          }
        }
      }}
      onSingleTap={() => {}}
      onDoubleTap={(event) => {
        let zoomScale = 1;
        if (event === "ZOOM_IN") {
          zoomScale = 3;
        } else {
          zoomScale = 1;
        }
        scale.value = zoomScale;

        onPinchableImageScale(zoomScale);
      }}
      onProgrammaticZoom={(event) => {}}
      onResetAnimationEnd={(scale, zoom) => {
        onPinchableImageScale(1);
      }}
      onLayout={() => {}}
      style={{  paddingVertical: height * 0.17 }}
    />
  );
};

const styles = StyleSheet.create({
  focalPoint: {
    ...StyleSheet.absoluteFillObject,
    width: 20,
    height: 20,
    backgroundColor: "blue",
    borderRadius: 10,
  },
});
