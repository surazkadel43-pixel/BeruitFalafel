import { Feather } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import { Dimensions, FlatList, Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View, ViewToken } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PinchableImage } from "./pinchableImage";

import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { Alert } from "react-native";
import ToastManager, { Toast } from "toastify-react-native";
import { toastManagerProps } from "./recycled-style";

const { width, height } = Dimensions.get("window");

interface ZoomImageModalProps {
  visible: boolean;
  onClose: () => void;
  source: { presignedURL: string } | null;
  files?: { presignedURL: string }[];
  index?: number;
}

const ZoomImageModal: React.FC<ZoomImageModalProps> = ({ visible, onClose, source, files = [], index = 0 }) => {
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(index >= 0 ? index : 0);

  useEffect(() => {
    if (visible && typeof index === "number" && index >= 0) {
      setCurrentIndex(index);
    }
  }, [index, visible]);

  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0) {
      const index = viewableItems[0].index ?? 0;
      setCurrentIndex(index);
    }
  });

  useEffect(() => {
    // Scroll manually if initialIndex is valid
    if (visible && currentIndex >= 0 && flatListRef.current) {
      setTimeout(() => {
        flatListRef.current?.scrollToIndex({ index: currentIndex, animated: false });
      }, 0);
    }
  }, [visible, currentIndex]);

  const handleDownload = async () => {
    if (!files || files.length === 0) return;

    // Use the presignedURL from the current index
    const file = files[currentIndex];
    if (!file?.presignedURL) {
      Alert.alert("No valid URL", "This image does not have a valid URL to download.");
      return;
    }

    const fileUri = FileSystem.documentDirectory + "image.jpg";

    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission required", "We need permission to save images to your gallery.");
        return;
      }

      const downloadResumable = FileSystem.createDownloadResumable(
        file.presignedURL, // Use the presigned URL from the current index
        fileUri
      );

      // Download the file and check if `uri` is present in the result
      const result = await downloadResumable.downloadAsync();

      // TypeScript type guard: Check if result is defined and if it has a uri
      if (result && result.uri) {
        console.log("Finished downloading to", result.uri);

        // Save to gallery
        const asset = await MediaLibrary.createAssetAsync(result.uri);
        await MediaLibrary.createAlbumAsync("Downloads", asset, false);
        Toast.success("Download complete \n Image saved to your gallery.");
      } else {
        throw new Error("Download failed: No URI in result");
      }
    } catch (error) {
      console.error(error);
      Toast.error(`Download failed: ${error}`);
    }
  };
  const onSwipe = (direction: "left" | "right") => {
    if (!flatListRef.current) {
      console.warn("FlatList ref not ready");
      return;
    }
  
    let newIndex = currentIndex;
  
    if (direction === "left" && currentIndex < files.length - 1) {
      newIndex = currentIndex + 1;
    } else if (direction === "right" && currentIndex > 0) {
      newIndex = currentIndex - 1;
    } else {
      console.log("Swipe out of bounds");
      return;
    }
  
    console.log(`Swiping ${direction} to index ${newIndex}`);
  
    try {
      flatListRef.current.scrollToIndex({ index: newIndex, animated: true });
      setCurrentIndex(newIndex);
    } catch (error) {
      console.error("Error scrolling FlatList:", error);
    }
  };

  if (!source || files.length === 0) return null;

  return (
    <Modal visible={visible} animationType="fade" transparent={true} onRequestClose={onClose}>
      <ToastManager {...toastManagerProps} />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <TouchableWithoutFeedback>
          <View style={styles.modalOverlay}>
            {/* Close button */}
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>

            {/* Slide Indicator */}
            <View style={styles.indicatorContainer}>
              <Text style={styles.indicatorText}>
                {currentIndex + 1} / {files.length}
              </Text>
            </View>

            <TouchableOpacity style={styles.downloadIcon} onPress={handleDownload}>
              <Feather name="download" size={24} color="black" />
            </TouchableOpacity>

            {/* FlatList for swiping through images */}
            <FlatList
              ref={flatListRef}
              horizontal
              pagingEnabled
              data={files}
              keyExtractor={(_, index) => index.toString()}
              onViewableItemsChanged={onViewableItemsChanged.current}
              viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
              showsHorizontalScrollIndicator={false}
              getItemLayout={(_, index) => ({
                length: width,
                offset: width * index,
                index,
              })}
              renderItem={({ item }) => (
                <View style={styles.imageContainer}>
                  <PinchableImage source={item} onSwipe={onSwipe} />
                </View>
              )}
            />
          </View>
        </TouchableWithoutFeedback>
      </GestureHandlerRootView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.95)",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
    width: 40,
    height: 40,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 20, // or borderRadius: 999
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
  closeButtonText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "black",
  },
  imageContainer: {
    width,
    paddingVertical: height * 0.17,
  },
  indicatorContainer: {
    position: "absolute",
    top: 20,
    // left: 20,
    zIndex: 2,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  indicatorText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  downloadIcon: {
    position: "absolute",
    top: 20,
    left: 20,
    width: 40,
    height: 40,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 20, // or borderRadius: 999
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
});

export default ZoomImageModal;
