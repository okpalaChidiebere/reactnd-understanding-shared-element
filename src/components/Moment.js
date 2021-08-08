import React from "react"
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Animated from "react-native-reanimated"
const { width, height } = Dimensions.get("window")

export default function Moment({ title, image, animatedStyle }){
    return (
        <View style={styles.container}>
            <Animated.Image
                source={image}
                style={[styles.image, animatedStyle]}
                resizeMode="cover"
            />
            <View style={[StyleSheet.absoluteFill, styles.center]}>
                <View style={styles.textWrap}>
                    <Text style={styles.title}>{title}</Text>
                </View>
            </View>
        </View>
      );
}

const styles = StyleSheet.create({
  container: {
    width,
    height,
    overflow: "hidden"
  },
  image: {
    flex: 1,
    width: null,
    height: null
  },
  center: {
    justifyContent: "center"
  },
  textWrap: {
    backgroundColor: "rgba(0,0,0,.5)",
    paddingVertical: 10
  },
  title: {
    backgroundColor: "transparent",
    fontSize: 30,
    color: "#FFF",
    textAlign: "center"
  }
})