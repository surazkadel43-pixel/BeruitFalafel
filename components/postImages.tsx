import React, { useState } from "react";
import { Image, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import PagerView from "react-native-pager-view";
import ZoomImageModal from "./zoomImageModals";

interface PostImageProps {
  files: any[] ;
  isSmall?: boolean;
}

export const PostImages: React.FC<PostImageProps> = ({ files, isSmall }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      {/* Image Carousel */}
      <PagerView
        style={[styles.pagerView, { height: isSmall ? 200 : 400 }]}
        initialPage={0}
        onPageSelected={(event) => setCurrentIndex(event.nativeEvent.position)}
      >
        {files.map((item, index) => (
          <TouchableWithoutFeedback key={index} onPress={() => setModalVisible(true)}>
            <View style={styles.page}>
              <Image
                source={{ uri: item.presignedURL }}
                style={[styles.postImage, isSmall && styles.reducedImageSize]}
                resizeMode="contain"
              />
            </View>
          </TouchableWithoutFeedback>
        ))}
      </PagerView>

      {/* Zoom Image Modal (Single instance) */}
      <ZoomImageModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        source={files[currentIndex]} // Shows the currently selected image
      />

      {/* Pagination Dots */}
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
  pagerView: {
    height: 400,
    flex: 1,
  },
  page: {
    justifyContent: "center",
    alignItems: "center",
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
  postImage: {
    width: "100%",
    height: "100%",
  },
  reducedImageSize: {
    width: "50%",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8,
  },
});
