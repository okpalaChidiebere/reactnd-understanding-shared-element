import React from "react"
import {
  StyleSheet,
  View,
  Dimensions,
} from "react-native"
import Animated, { useSharedValue, useAnimatedScrollHandler, interpolate, Extrapolate, useAnimatedStyle } from "react-native-reanimated"
import { SafeAreaView } from "react-native-safe-area-context"
import { Colors, Strings } from "../values"
import Moment from "./Moment"


const { width } = Dimensions.get("window") //returns the current dimensions of the phone screen
const Images = [
    { image: require("../assets/stories/1.jpg") , title: "Vodca Cran" },
    { image: require("../assets/stories/2.jpg"), title: "Old Fashion" },
    { image: require("../assets/stories/3.jpg"), title: "Mule" },
    { image: require("../assets/stories/4.jpg"), title: "Strawberry DiaQuir" },
]

/**
 * 
 * @param {*} animatedScroll 
 * @param {*} i the current index of page we are on
 * @param {*} imageLength current amount of images that we have
 * @returns an interpolation of the translateX in the style
 */
const getAnimatedStyle = (animatedScroll, i, imageLength) => {
    const inputRange = [
      (i - 1) * width, // set up the translateX for the image before it is swiped to
      i * width,  // the translateX for when we are at the image
      (i + 1) * width //the translateX after we have swiped away from the image
    ];
  
    const outputRange = i === 0 
        // here we are at the first index
        ? [0, 0, 150] 
        /** 
         * - The image will be -300 as we are swiping towards it
         * - When at width we do don't translate (we move towards 0)
         * - The image will translate 150 left as we swipe past it
        */
        : [-300, 0, 150]
  
    
    return useAnimatedStyle(() => {
        return {
            transform: [
                { 
                    translateX: interpolate(
                        animatedScroll.value,
                        inputRange,
                        outputRange,
                        Extrapolate.CLAMP
                    ) 
                }
            ]
        }
    })
}

const getSeparator = (i) => {
    return (
      <View
        key={i}
        style={[
            styles.separator, 
            { 
                /**
                 * This is the position where the separtor will be just at the begining 
                 * of each image
                 * Eg: for the first image(index0), we will add position the separator 
                 * at the begining before we render the image
                 *  */
                left: i * width - 2.5 
            }
        ]} 
      />
    )
}

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
                              animatedStyle={getAnimatedStyle(animatedScroll, i, Images.length)}
                            />
                        )
                    })}
                    {
                        /** Array.apply() method creates an empty array
                         * 
                         * we added + 1 because thwe want the separator in the final screen as well 
                         */
                        Array.apply( null, { length: Images.length + 1 } ).map((_, i) => getSeparator(i))
                    }
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
    separator: {
        backgroundColor: '#000',
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: 5,
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