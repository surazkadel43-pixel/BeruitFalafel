import React, { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import PagerView from "react-native-pager-view";
import ZoomImageModal from "./zoomImageModals";
interface PostImageProps {
  files: any[];
  isComment? : boolean,
}


export const PostImages: React.FC<PostImageProps> = (props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);


  return (
    <TouchableOpacity activeOpacity={1} onPress={() => setModalVisible(true)}>
      {/* Image Carousel using PagerView */}
      <PagerView 
      style={[styles.pagerView, {height: props.isComment ? 200 : 380} ]} 
      initialPage={0} onPageSelected={(event) => setCurrentIndex(event.nativeEvent.position)}>
        {props.files.map((item, index) => (
          <View key={index} style={styles.page}>
            <Image source={{ uri: item.presignedURL }} 
             style={[styles.postImage, props.isComment && styles.reducedImageSize]}
            />
            <ZoomImageModal
              visible={modalVisible}
              onClose={() => {
                setModalVisible(false);
              }}
              source={item}
            />
          </View>
        ))}
      </PagerView>


      {/* Pagination Dots */}
      {props.files.length > 1 && (
        <View style={styles.pagination}>
          {props.files.map((_, index) => (
            <View key={index} style={[styles.dot, currentIndex === index && styles.activeDot]} />
          ))}
        </View>
      )}
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  pagerView: {

    //height: 380, 
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
    flex: 1,
    width: "100%",
    //height: 300,
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
