import React from 'react';
import { StyleSheet, Image, Dimensions } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';


const { width, height } = Dimensions.get('window');

interface ZoomImageModalProps {
  source: { presignedURL: string };
  onSwipe: (direction: 'left' | 'right') => void;
}

export const PinchableImage: React.FC<ZoomImageModalProps> = ({ source, onSwipe }) => {
  const scale = useSharedValue(1);
  const focalX = useSharedValue(0);
  const focalY = useSharedValue(0);
  const swipeX = useSharedValue(0);

  const AnimatedImage = Animated.createAnimatedComponent(Image);

  const pinchGesture = Gesture.Pinch()
    .onUpdate((event) => {
      scale.value = Math.max(event.scale, 1);
      focalX.value = event.focalX;
      focalY.value = event.focalY;
    })
    .onEnd(() => {
      scale.value = withTiming(1);
    });

    const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      swipeX.value = event.translationX; // Track horizontal swipe
    })
    .onEnd((event) => {
      // If the swipe is significant enough, change the image
      if (swipeX.value > 50) {
        console.log("swipe right");
        runOnJS(onSwipe)("right");
      } else if (swipeX.value < -50) {
        console.log("swipe left");
        runOnJS(onSwipe)("left");
      }
      swipeX.value = withSpring(0); // Reset position after swipe
    });
     // Combine both pinch and pan gestures
  const gestureHandler = Gesture.Race(pinchGesture, panGesture);

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: focalX.value },
        { translateY: focalY.value },
        { translateX: -width / 2 },
        { translateY: -height / 2 },
        { scale: scale.value },
        { translateX: -focalX.value },
        { translateY: -focalY.value },
        { translateX: width / 2 },
        { translateY: height / 2 },
      ],
    };
  });

  const focalPointStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: focalX.value }, { translateY: focalY.value }],
    };
  });
  

  return (
    <GestureDetector gesture={gestureHandler}>
      <Animated.View style={{ flex: 1,  }}>
        <AnimatedImage
          style={[{ flex: 1, }, rStyle]}
          source={{ uri: source.presignedURL }}
        />
        <Animated.View style={[ focalPointStyle]} />
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  focalPoint: {
    ...StyleSheet.absoluteFillObject,
    width: 20,
    height: 20,
    backgroundColor: 'blue',
    borderRadius: 10,
  },
});
