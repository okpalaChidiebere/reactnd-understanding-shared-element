import React from "react"
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  PixelRatio,
} from "react-native"
import Animated, {
    useAnimatedScrollHandler, 
    useSharedValue, 
    interpolate, 
    Extrapolate, 
    useAnimatedStyle,
} from "react-native-reanimated"
import { SafeAreaView } from "react-native-safe-area-context"
import { Colors, Strings } from "../values"

const getScreen1Styles = (animation, width) => useAnimatedStyle(() => {
    /** 
     * we want to move image2 leftwards quicker than the other images on that screen.
     * This means we will have a negative translateX animation for image2 as we move our scrollView
     * to page2
     * 
     * This animation is reversible which means, the image can move back to its rest postion when 
     * the screen is stable or move leftwards when go to page 2, this means that we need an interpolate
     * 
     * So our interpolation for this animation of this screen will be off of the screen width
     *  */
    const image2TranslateX = interpolate(animation.value, 
        /**
         * Generally , our inout range will take in threee values
         * 1. One value for when you are moving towards a stable position
         * 2. The value for when you at a stable position
         * 3. The last value is for when you are moving away from a stable position
         * 
         * But for the first screen, only 2 and 3 applies to this screen because there is no screen before screen one 
         * 
         * Stable position, means the position where the pages has stopped
         * - The `0` value is the value for when you at a stable position
         * - The `width` is the next screen stable position. When we scroll from the first screen to the next screen, the x is increasing
         */
        [0, width], 
        [0, -100],
        Extrapolate.CLAMP //we want to lock the value at -100 so it does not go higher than -100
    )

    //return the animatedStyle
    return {
        transform: [
          {
            translateX: image2TranslateX,
          },
        ],
    }
})

export default function ApplicationIntro(){
    const { width, height } = Dimensions.get("window")
    const animation = useSharedValue(0)

    const screen1Styles = getScreen1Styles(animation, width) //the paging of the scrollView is off the width of screen, so our inoutRange for scrollAnimaton wll be the width as well

    return(
        <SafeAreaView style={styles.container} edges={["bottom", "left", "right"]}>
            <View style={styles.container}>
                <Animated.ScrollView
                    style={styles.container} /** we want the scrollView to fill up the outside space*/
                    pagingEnabled /** makes pages based upon the width and the height of the scrollView. In our case, its the whole screen*/
                    horizontal /**enable horizonatal scroll for this */
                    scrollEventThrottle={16}
                    onScroll={useAnimatedScrollHandler(e => {
                        //because we are scrolling horizontally we choose the x offset
                        animation.value = e.contentOffset.x
                    })}
                >
                    <View style={{ width, height, backgroundColor: "#F89E20" }} /** Screen 1 */>
                        <View style={styles.screenHeader}>
                            <Animated.Image
                                source={require("../assets/stories/c1.png")}
                                style={{
                                    /**
                                     * To maintain the partuclar size of this image across desnities of different screens
                                     * we use PixelRatio.getPixelSizeForLayoutSize(<whateverSize>)
                                     * 
                                     * SIDE NOTE: you can apply this to fontSize as well. Just use PixelRatio.getFontScale()
                                     *  */
                                    width: PixelRatio.getPixelSizeForLayoutSize(75), //this 75 might become a value larger than 75 on a larger phone with bigger densities
                                    height: PixelRatio.getPixelSizeForLayoutSize(63),
                                }}
                                resizeMode="contain"
                            />

                            <Animated.Image
                                source={require("../assets/stories/c2.png")}
                                style={[
                                    {
                                    width: PixelRatio.getPixelSizeForLayoutSize(46),
                                    height: PixelRatio.getPixelSizeForLayoutSize(28),
                                    position: "absolute",
                                    top: 235,
                                    left: 100,
                                    },
                                    screen1Styles
                                ]}
                                resizeMode="contain"
                            />
                            <Animated.Image
                                source={require("../assets/stories/c3.png")}
                                style={{
                                    width: PixelRatio.getPixelSizeForLayoutSize(23),
                                    height: PixelRatio.getPixelSizeForLayoutSize(17),
                                    position: "absolute",
                                    top: 200,
                                    left: 110,
                                }}
                                resizeMode="contain"
                            />
                        </View>
                        <View style={styles.screenText}>
                            <Text>Screen 1</Text>
                        </View>
                    </View>
                </Animated.ScrollView>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    screenHeader: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    screenText: {
        flex: 1,
    },
})

export function ApplicationIntroOptions(){
    return{
        title: Strings.component_application_intro,
        headerTintColor: Colors.back,
        headerStyle: { 
            backgroundColor: Colors.theme_primary,
        },
    }
}