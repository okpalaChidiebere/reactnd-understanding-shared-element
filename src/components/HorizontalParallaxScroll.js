import React, {  } from "react"
import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from "react-native"
import Animated, { useSharedValue, useAnimatedScrollHandler } from "react-native-reanimated"
import { SafeAreaView } from "react-native-safe-area-context"
import { Colors, Strings } from "../values"
import Moment from "./Moment"


const { width, height } = Dimensions.get("window") //returns the current dimensions of the phone screen
const Images = [
    { image: require("../assets/stories/1.jpg") , title: "Vodca Cran" },
    { image: require("../assets/stories/2.jpg"), title: "Old Fashion" },
    { image: require("../assets/stories/3.jpg"), title: "Mule" },
    { image: require("../assets/stories/4.jpg"), title: "Strawberry DiaQuir" },
]

export default function HorizontalParallaxScroll(){
    const animatedScroll = useSharedValue(0)
    return (
        <SafeAreaView style={styles.container} edges={["bottom", "left", "right"]}>
            <View style={[styles.container]}>
                <Animated.ScrollView
                    pagingEnabled //cause the scrollView to stop at multiples of its width
                    horizontal
                    scrollEventThrottle={16}
                    onScroll={useAnimatedScrollHandler(e => {
                        //because we are scrolling horizontally we choose the x offset
                        animatedScroll.value = e.contentOffset.x
                    })}
                >
                    {Images.map((image, i) => {
                        return (
                            <Moment 
                              key={i}
                              {...image} //pass on the image properties as props "image" and "title"
                            />
                        )
                    })}
                </Animated.ScrollView>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#333",
    },
})

export function HorizontalParallaxScrollOptions(){
    return {
        title: Strings.component_horizontal_parallax,
        headerTintColor: Colors.back,
        headerStyle: { 
            backgroundColor: Colors.theme_primary,
        },
    }
}