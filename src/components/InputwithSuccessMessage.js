import React, { useState } from "react"
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity
} from "react-native"
import Animated, { 
    useAnimatedStyle,
    useSharedValue, 
    interpolate,
    Extrapolate,
    withTiming,
} from "react-native-reanimated"
import { SafeAreaView } from "react-native-safe-area-context"
import { Colors, Strings } from "../values"

export default function InputwithSuccessMessage(){

    const animate = useSharedValue(0)
    const [success, setSuccess] = useState(false)

    /**create an interpolation on the width so that we can control and expand it */
    const buttonWrapStyle = useAnimatedStyle(() => {
        const widthInterpolate = interpolate(
            animate.value,
            [0, .5, 1],
            [150, 150, 300],
            Extrapolate.CLAMP
        )
        return {
            width: widthInterpolate
        }
    })
    /**End creating buttonWidth */

    /**Adjust the input so that it is scalled out of the way. But default, it will not be visible */
    const inputScaleStyle = useAnimatedStyle(() => {
        const inputScaleInterpolate = interpolate(
            animate.value,
            [0, .5, .6],
            [0, 0, 1],
            Extrapolate.CLAMP, //we dont want to scale beyound 1
        )
        return {
            transform: [
                {
                    scale: inputScaleInterpolate,
                }
            ]
        }
    })
    /** End scaling the inputText view out of the way which will result in just having only the button */

    /** Scaling our Send Button */
    const sendButtonStyle = useAnimatedStyle(() => {
        const sendButtonInterpolate = interpolate(
            animate.value,
            [0, .6, 1] //we want our ibutton to animate in after our inputText as scaled in
            [0, 0, 1] //this button will be revealed late
        )
        return {
            transform: [
                {
                    scale: sendButtonInterpolate,
                }
            ]
        }
    })
    /** End scaling Send button*/

    /** 
     * Scale for our notify me button.
     * we need to scale out the button quickly before we scale anything else */
    const notifyTextStyle = useAnimatedStyle(() => {
        const nofifyTextScaleInterpolate = interpolate(
            animate.value,
            [0, .5],
            [1, 0],
            Extrapolate.CLAMP, //we dont want to scale any further
        )
        return {
            transform: [
                {
                    scale: nofifyTextScaleInterpolate
                }
            ]
        }
    })
    /** End adding scale for noifyMe */

    /** we want our `Thank You` message to scale in while every other thing scales out */
    const thnakYouTextStyle = useAnimatedStyle(() => {
        const thnakYouTextScaleInterpolate = interpolate(
            animate.value,
            [0, 1],
            [1, 0] //this will cause a reverse effect, causing this text to animate in as the inoutRange is resets from 1 to 0
        )
        return {
            transform: [
                { scale: thnakYouTextScaleInterpolate }
            ]
        }
    })
    /** End Adding ThankYou style */


    /**  transition the animation */
    const handlePress = () => {
        animate.value = withTiming(1, { duration: 300 })
    }

    /** resets the animation */
    const handleSend = () => {
        setSuccess(true) //allows our thankYou message to be rendered but wll be scaled at 0 by default. So the user cant see it yet
        animate.value = withTiming(0, { duration: 300 })
        setTimeout(() => setSuccess(false), 1500) //resets everything back to the begining
    }

    return (
        <SafeAreaView style={styles.container} edges={["bottom", "left", "right"]}>
            <View style={[styles.container, styles.center, { backgroundColor: "#FF7B73" }]}>
                <TouchableWithoutFeedback onPress={handlePress}>
                    <Animated.View style={[styles.buttonWrap, buttonWrapStyle]}>

                        {!success && (
                            <Animated.View 
                                style={[
                                    StyleSheet.absoluteFill, /** Helps position our input inside of our wrapping View (styles.buttonWrap). This allows us to animate our TextInput and our messages in and out without effecting layout of each other */
                                    styles.inputWrap,
                                    inputScaleStyle,
                                ]}>
                                <TextInput 
                                    autoFocus
                                    keyboardType="email-address"
                                    placeholder="Email" 
                                    placeholderTextColor="rgba(255,123,115, 0.8)" 
                                    style={styles.textInput}
                                />
                                <TouchableOpacity style={[styles.sendButton, sendButtonStyle]} onPress={handleSend}>
                                    <Text style={styles.sendText}>Send</Text>              
                                </TouchableOpacity>
                            </Animated.View>
                        )}

                        {!success && (
                            <Animated.View style={notifyTextStyle}>
                                <Text style={styles.notifyText}>Notify Me</Text>
                            </Animated.View>
                        )}
                        {/** when we are succesFul we render a  `Thank You` message */
                        success && (
                            <Animated.View style={thnakYouTextStyle}>
                                <Text style={styles.notifyText}>Thank You</Text>
                            </Animated.View>
                        )}
                    </Animated.View>
                </TouchableWithoutFeedback>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    center: {
        alignItems: "center",
        justifyContent: "center",
    },
    buttonWrap: {
      backgroundColor: "#FFF",
      paddingVertical: 15,
      paddingHorizontal: 30,
      borderRadius: 30,
      alignItems: "center",
      justifyContent: "center"
    },
    notifyText: {
      color: "#FF7B73",
      fontWeight: "bold"
    },
    inputWrap: {
      flexDirection: "row",
      justifyContent: "center",
      paddingVertical: 5,
      paddingHorizontal: 15,
    },
    textInput: {
      flex: 4,
    },
    sendButton: {
      backgroundColor: "#FF7B73",
      flex: 1,
      borderRadius: 15,
      paddingHorizontal: 15,
      paddingVertical: 5,
      alignItems: "center",
      justifyContent: "center"
    },
    sendText: {
      color: "#FFF"
    }
})

export function InputwithSuccessMessageOptions(){
    return{
        title: Strings.component_progress_bar_button,
        headerTintColor: Colors.back,
        headerStyle: { 
            backgroundColor: Colors.theme_primary,
        },
    }
}