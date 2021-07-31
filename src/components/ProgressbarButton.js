import React, { useRef } from "react"
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Animated,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Colors, Strings } from "../values"

export default function ProgressbarButton(){
    const animation = useRef(new Animated.Value(0)).current //this controls the animtion for the color as well as the progress for the width of the progressBar view 
    const opacity = useRef(new Animated.Value(1)).current//help us have run an animation when the button progress is completed. The bar will be visible(1) and then fade out when progress complete

    /** Building our Progress animatedstyle */
    const progressInterpolate = animation.interpolate({
        inputRange: [0, 1],
        outputRange: ["0%", "100%"], //interpolate on the percentage
        extrapolate: "clamp", //incase the input range goes beyound 0 or 1, we dont want a negative percentage or a percentage over 100
    })
      
    //Our backgrround color interpolate
    const colorInterpolate = animation.interpolate({
        inputRange: [0, 1],
        outputRange: ["rgb(71,255,99)", "rgb(99,71,255)"],
    })
      
    const animatedProgressStyle = {
        opacity,
        width: progressInterpolate,
        bottom: 0, //remember we already had top and left of 0 in the styles already. Adding bottom 0, now allows the animated view width to percentage to grow as required
        backgroundColor: colorInterpolate,
    }
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
        animation.setValue(0)
        opacity.setValue(1)
      
        /**
         * If this was we real app, we would continally call this timming animation
         * with smaller toValue like .1, .2, .3 etc with smaller duration time, but just 
         * calling 1 will do for this demo
         */
        Animated.timing(animation, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: false, //you cant control properties like width, height, backgroundColor can run on native driver
        }).start(({ finished }) => {
            //if our animation was not inerrupted by another press? ie: our animation was completed
            if(finished){
                Animated.timing(opacity, {
                    toValue: 0,
                    duration: 200,
                    /**
                     * we can use native driver on opacity and transform properties, but in an animatedStyle, you cannot have 
                     * some part of the style controlled by the native driver and some part not controlled. 
                     * Either all of its animated properties is controlled by native driver or all of it will be controlled by JS
                     * 
                     * Since we already have backgroundColor and width controlled by js, we had to use js for the opacity as well
                     */
                    useNativeDriver: false,
                }).start()
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