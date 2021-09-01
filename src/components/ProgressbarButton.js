import React from "react"
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
} from "react-native"
import Animated, { 
    interpolateColor,
    useSharedValue, 
    useAnimatedStyle,
    interpolate,
    Extrapolate,
    withTiming,
} from "react-native-reanimated"
import { SafeAreaView } from "react-native-safe-area-context"
import { Colors, Strings } from "../values"

export default function ProgressbarButton(){
    const animation = useSharedValue(0) //this controls the animtion for the color as well as the progress for the width of the progressBar view 
    const opacity = useSharedValue(0)//help us have run an animation when the button progress is completed. The bar will be visible(1) and then fade out when progress complete
      
    const animatedProgressStyle = useAnimatedStyle(() => {
        /** Building our Progress animatedstyle */
        const progressInterpolate = interpolate(
            animation.value,
            [0, 1],
            [0, 100], //interpolate on the percentage
            Extrapolate.CLAMP //incase the input range goes beyound 0 or 1, we dont want a negative percentage or a percentage over 100
        )
      
        //Our backgrround color interpolate
        const colorInterpolate = interpolateColor(
            animation.value,
            [0, 1],
            ["#47ff63", "#6347ff"],
        )

        return {
            opacity: opacity.value,
            width: `${progressInterpolate}%`,
            bottom: 0, //remember we already had top and left of 0 in the styles already. Adding bottom 0, now allows the animated view width to percentage to grow as required
            backgroundColor: colorInterpolate,
        }
    })
    /** End building our progress animatedStyle */

    /**
     * Other progress styles you could use
        Top Down:
        const animatedProgressStyle = {
            height: progressInterpolate,
            right: 0,
            opacity,
            backgroundColor: colorInterpolate,
        }

        Small Bottom:
        const animatedProgressStyle = {
            top: null,
            bottom: 0,
            width: progressInterpolate,
            height: 5,
            opacity: this.state.opacity,
            backgroundColor: colorInterpolate,
        }

        const animatedProgressStyle = {
            opacity,
            width: progressInterpolate,
            bottom: 0, 
            backgroundColor: "rgba(255,255,255,.5)", //we dont want to animate the opacity :)
        }

     */

    //
    const handlePress = () => {
        /**In real life, we will control this by some async progress like betwork fetch, but lest just reset everything
         * by restarting the timing and opacity animation again
         */
        animation.value = 0
        opacity.value = 1

        /**
         * If this was we real app, we would continally call this timming animation
         * with smaller toValue like .1, .2, .3 etc and with smaller duration time as well, 
         * but just toValue of 1 and longer duration will do for this demo
         */
        animation.value = withTiming(1, { duration: 1500 }, (finished) => {
            /** We will haide the propgressBar when it is done loading */
            //if our animation was not inerrupted by another press? ie: our animation was completed
            if(finished){
                opacity.value = withTiming(0, { duration: 200 })
            }
        })
    }


    return(
        <SafeAreaView style={styles.container} edges={["bottom", "left", "right"]}>
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={handlePress}>
                    <View style={styles.button}>
                        <View style={StyleSheet.absoluteFill //basically left, top, tight, bottom of 0 values
                            /**This helps us ensure that with Animated View inside does not overflow the width it will fill up.
                             * 
                             * It is also important at this view comes before the buttonText, so that when the animation starts, 
                             * the buttonText will not get covered up
                             * */
                        }>
                            <Animated.View style={[styles.progress, animatedProgressStyle]}/>
                        </View>
                        <Text style={styles.buttonText}>Get it!</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    button: {
      backgroundColor: "#e6537d",
      borderRadius: 2,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 60,
      paddingVertical: 10,
      overflow: "hidden",
    },
    buttonText: {
      color: "#FFF",
      fontSize: 24,
      backgroundColor: "transparent",
    },
    /** Our progress Bar*/
    progress: {
        position: "absolute",
        /**
         * Placing this view leftLeft coner, lets us control the animated view to go
         * left to right, top top to bottom, or just cover the bottom of the parent 
         * container(StyleSheet.absoluteFill)
         *  */
        left: 0,
        top: 0,
    },
})

export function ProgressbarButtonOptions(){
    return{
        title: Strings.component_progress_bar_button,
        headerTintColor: Colors.back,
        headerStyle: { 
            backgroundColor: Colors.theme_primary,
        },
    }
}