import { Image } from "expo-image";
import React, { useRef, useState } from "react";
import { Dimensions, FlatList, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import ZoomImageModal from "./zoomImageModals";
const { width } = Dimensions.get("window");

interface PostImageProps {
  files: any[];
  isSmall?: boolean;
}

export const PostImages: React.FC<PostImageProps> = ({ files, isSmall }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [containerWidth, setContainerWidth] = useState(width); // default fallback
  const flatListRef = useRef<FlatList>(null);
  const onClose = (index: number) => {
    setModalVisible(false);
    if (index >= 0 && index < files.length) {
      setTimeout(() => {
        flatListRef.current?.scrollToIndex({ index, animated: false });
      }, 100);
    }
    setCurrentIndex(index);
  };

  return (
    <View onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}>
      <FlatList
        ref={flatListRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        data={files}
        keyExtractor={(_, index) => index.toString()}
        onMomentumScrollEnd={(event) => {
          const newIndex = Math.round(event.nativeEvent.contentOffset.x / containerWidth);
          setCurrentIndex(newIndex);
        }}
        renderItem={({ item }) => (
          <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
            <View
              style={{
                width: containerWidth,
                height: isSmall ? 200 : 400,
                paddingVertical: 10,
              }}
            >
              <Image
                source={{ uri: item.presignedURL }}
                style={[isSmall ? styles.reducedImageSize : styles.image]}
                allowDownscaling={false}
                // contentFit="fill"
              />
            </View>
          </TouchableWithoutFeedback>
        )}
      />

      {/* Zoom Image Modal */}
      <ZoomImageModal visible={modalVisible} onClose={onClose} source={files[currentIndex]} files={files} index={currentIndex} />

      {/* Pagination */}
      {files.length > 1 && (
        <View style={styles.pagination}>
          {files.map((_, index) => (
            <View key={index} style={[styles.dot, currentIndex === index && styles.activeDot]} />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  reducedImageSize: {
    width: "50%",
    height: "100%",
    alignSelf: "center",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8,
  },
  dot: {
    width: 8,
    height: 8,
    backgroundColor: "gray",
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "white",
  },
});
