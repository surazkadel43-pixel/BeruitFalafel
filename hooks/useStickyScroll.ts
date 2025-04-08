import { useRef } from "react";
import { Animated } from "react-native";

export function useStickyScroll(inputStart = 180, inputEnd = 300, outputTop = [-150, 10], outputOpacity = [0, 1]) {
  const scrollY = useRef(new Animated.Value(0)).current;

  const stickyTop = scrollY.interpolate({
    inputRange: [inputStart, inputEnd],
    outputRange: outputTop,
    extrapolate: "clamp",
  });

  const stickyOpacity = scrollY.interpolate({
    inputRange: [inputStart, inputEnd],
    outputRange: outputOpacity,
    extrapolate: "clamp",
  });
  const resetScroll = () => {
    scrollY.setValue(0); // 👈 This resets scroll state
  };

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false }
  );

  return {
    scrollY,
    onScroll,
    stickyTop,
    stickyOpacity,
    resetScroll, // 👈 return this function
  };
}
