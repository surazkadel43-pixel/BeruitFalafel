import { Feather } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import { Dimensions, FlatList, Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View, ViewToken } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { Alert } from "react-native";
import { PinchableImage } from "./pinchableImage";
import { showInfoToast } from "./toasts";

const { width } = Dimensions.get("window");

interface ZoomImageModalProps {
  visible: boolean;
  onClose: (index: number) => void;
  source: { presignedURL: string } | null;
  files?: any[];
  index?: number;
}

const ZoomImageModal: React.FC<ZoomImageModalProps> = ({ visible, onClose, files = [], index = 0 }) => {
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(index);
  const isSwipingRef = useRef(false);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (visible && typeof index === "number" && index >= 0) {
      setCurrentIndex(index);
      // Adding a small delay to ensure the list has time to render or update before scrolling
      setTimeout(() => {
        flatListRef.current?.scrollToIndex({ index, animated: false });
      }, 100); // 100ms delay can be adjusted if needed
    }
  }, [index, visible]);

  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0) {
      const idx = viewableItems[0].index ?? 0;
      setCurrentIndex(idx);
    }
  });

  const handleDownload = async () => {
    if (!files || files.length === 0) return;
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

      const downloadResumable = FileSystem.createDownloadResumable(file.presignedURL, fileUri);
      const result = await downloadResumable.downloadAsync();

      if (result && result.uri) {
        const asset = await MediaLibrary.createAssetAsync(result.uri);
        await MediaLibrary.createAlbumAsync("Downloads", asset, false);
        showInfoToast("Image downloaded successfully!");
      } else {
        throw new Error("Download failed: No URI in result");
      }
    } catch (error) {
      console.error(error);
      showInfoToast(`Download failed: ${error}`);
    }
  };

  const onPinchableImageScale = (newScale: number) => {
    setScale(newScale);
  };

  const onSwipe = (direction: "left" | "right") => {
    if (isSwipingRef.current) return; // debounce
    isSwipingRef.current = true;

    if (!files || files.length === 0) {
      isSwipingRef.current = false;
      return;
    }

    if (!flatListRef.current) {
      console.warn("FlatList ref not ready");
      isSwipingRef.current = false;
      return;
    }

    let newIndex = currentIndex;

    if (direction === "left" && currentIndex < files.length - 1) {
      newIndex = currentIndex + 1;
    } else if (direction === "right" && currentIndex > 0) {
      newIndex = currentIndex - 1;
    } else {
      console.log("Swipe out of bounds");
      isSwipingRef.current = false;
      return;
    }

    try {
      flatListRef.current.scrollToIndex({ index: newIndex, animated: true });
    } catch (error) {
      console.error("Error scrolling FlatList:", error);
      isSwipingRef.current = false;
    }
  };

  if (files.length === 0) return null;

  return (
    <Modal visible={visible} animationType="fade" transparent={true} onRequestClose={() => onClose(currentIndex)}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <TouchableWithoutFeedback>
          <View style={styles.modalOverlay}>
            {scale === 1 && (
              <View style={styles.topButtons}>
                <TouchableOpacity style={styles.downloadIcon} onPress={handleDownload}>
                  <Feather name="download" size={24} color="black" />
                </TouchableOpacity>
                <View style={styles.indicatorContainer}>
                  <Text style={styles.indicatorText}>
                    {currentIndex + 1} / {files.length}
                  </Text>
                </View>

                <TouchableOpacity style={styles.closeButton} onPress={() => onClose(currentIndex)}>
                  <Text style={styles.closeButtonText}>X</Text>
                </TouchableOpacity>
              </View>
            )}

            <FlatList
              ref={flatListRef}
              horizontal
              pagingEnabled
              data={files}
              scrollEnabled={false}
              keyExtractor={(_, i) => i.toString()}
              onViewableItemsChanged={onViewableItemsChanged.current}
              viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
              showsHorizontalScrollIndicator={false}
              getItemLayout={(_, index) => ({
                length: width,
                offset: width * index,
                index,
              })}
              onMomentumScrollEnd={() => {
                isSwipingRef.current = false;
              }}
              renderItem={({ item }) => (
                <View style={styles.imageContainer}>
                  <PinchableImage source={item} onSwipe={onSwipe} onPinchableImageScale={onPinchableImageScale} />
                </View>
              )}
            />
            {files.length > 1 && scale === 1 && (
              <View style={styles.pagination}>
                {currentIndex !== 0 && (
                  <TouchableOpacity style={styles.paginationButtons} onPress={() => onSwipe("right")}>
                    <Feather name="chevron-left" size={26} color="black" />
                  </TouchableOpacity>
                )}
                {currentIndex !== files.length - 1 && (
                  <TouchableOpacity style={styles.paginationButtons} onPress={() => onSwipe("left")}>
                    <Feather name="chevron-right" size={26} color="black" />
                  </TouchableOpacity>
                )}
              </View>
            )}
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
    width: 40,
    height: 40,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 20, // or borderRadius: 999
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "black",
  },
  imageContainer: {
    width,
    // paddingVertical: height * 0.17,
  },
  indicatorContainer: {
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
    width: 40,
    height: 40,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 20, // or borderRadius: 999
    justifyContent: "center",
    alignItems: "center",
  },

  pagination: {
    position: "absolute",
    bottom: 10,
    alignSelf: "center", // centers horizontally
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    width: "40%", // optional, depending on how much width you want
  },
  paginationButtons: {
    width: 40,
    height: 40,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 20, // or borderRadius: 999
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },

  topButtons: {
    position: "absolute",
    top: 10,
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    gap: 10,
    zIndex: 2,
  },
});

export default ZoomImageModal;
