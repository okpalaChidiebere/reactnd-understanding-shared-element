import React, { useRef, useLayoutEffect } from "react"
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
  KeyboardAvoidingView,
} from "react-native"
import Animated, { 
    useSharedValue, 
    useAnimatedStyle,
    withTiming,
    withDelay,
    interpolate,
    runOnJS,
} from "react-native-reanimated"
import { SafeAreaView } from "react-native-safe-area-context"
import { Colors, Strings } from "../values"

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput)

export default function StaggerFormItems(){
    const email = useSharedValue(0)
    const password = useSharedValue(0)
    const button = useSharedValue(0)
    /**
     * We get the reference to the input that we want to focus first,
     * so that once our animation is complete, we will focus on the 
     * first form filed and the keyboard will come up. 
     * 
     * We don't want the keyboard to come up during the animation.
     */
    const emailRef = useRef()

    /**
     * Because each of the animations are exact thesame, we created a function that takes in an animatedValue an returns 
     * styling
     * This way our we write more clean code.
     *  */
     const createAnimationStyle = (animation) => {
        return useAnimatedStyle(() => {
            //we need an interpolation for translateY
            const translateY = interpolate(
                animation.value,
                [0, 1],
                [-5, 0], //we will start the postion of each items slightly higher(-5) and animate to an offset(0)
            )

            return {
                opacity: animation.value, //we know our Animated.Value is going from 0 to 1, so we can just used that same value for opacity :)
                transform: [
                  {
                    translateY,
                  },
                ],
            }
        })
    }

    const popUpKeyBoard = () => {
        /**
        * when dealing with forms, focus the form field for the users so 
         * they do not have to tap on the form field. */
         emailRef.current.focus() //we can now focus on our email input
    }

    //called right after the component mounts were we start the animation
    useLayoutEffect(() => {

        //we dont realy need to craft our own stagger like we did for staggered heads :)
        //we have a stagger of 100ms between each animation
        email.value = withDelay(
            100,
            withTiming(1, {
                duration: 400,
            }),
        )
        password.value = withDelay(
            200,
            withTiming(1, {
                duration: 400,
            }),
        )
        button.value = withDelay(
            300,
            withTiming(1, {
                duration: 400,
            }, () => {
                runOnJS(popUpKeyBoard)()
            }),
        )
        
    }, [ ])
    

    /**FYI: None of the items will be visible, based on the default style because the opacity is 0. 
     * The items are there bit just not visible. No magic here :)
     *  */
    const animatedEmailStyle = createAnimationStyle(email)
    const animatedPasswordStyle = createAnimationStyle(password)
    const animatedButtonStyle = createAnimationStyle(button)

    return(
        <SafeAreaView style={styles.container} edges={["bottom", "left", "right"]}>
            <View style={styles.container}>
                <ImageBackground
                    source={require("../assets/avatars/karen.jpg")}
                    resizeMode="cover"
                    style={[StyleSheet.absoluteFill, { width: null, height: null }]}
                >
                    <View style={styles.container} />
                    <KeyboardAvoidingView style={styles.form/**command k on macbook to open up the simulator phone keyboard to see this work :)*/} behavior="padding">
                        <View style={styles.container}>
                            <Text style={styles.title}>Login</Text>
                            <AnimatedTextInput
                                ref={emailRef}
                                style={[styles.input, animatedEmailStyle]}
                                placeholder="Email"
                                keyboardType="email-address"
                            />
                            <AnimatedTextInput
                                placeholder="Password"
                                style={[styles.input, animatedPasswordStyle]}
                                secureTextEntry
                            />
                            <TouchableOpacity>
                                <Animated.View style={[styles.button, animatedButtonStyle]}>
                                    <Text style={styles.buttonText}>Login</Text>
                                </Animated.View>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
                    <View style={styles.container} />
                </ImageBackground>
            </View>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    title: {
        fontSize: 30,
        color: "#FFF",
        backgroundColor: "transparent",
        textAlign: "center",
        marginBottom: 10,
    },
    form: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,.25)",
        paddingVertical: 10,
    },
    input: {
        width: 250,
        height: 35,
        paddingHorizontal: 10,
        marginVertical: 5,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#FFF",
        color: "#333",
        backgroundColor: "#FFF",
    },
    button: {
        marginTop: 10,
        backgroundColor: "tomato",
        paddingVertical: 10,
        paddingHorizontal: 5,
        borderRadius: 5,
    },
    buttonText: {
        textAlign: "center",
        color: "#FFF",
        fontSize: 16,
    },
})
  

export function StaggerFormItemsOptions(){
    return{
        title: Strings.component_stagger_form_items,
        headerTintColor: Colors.back,
        headerStyle: { 
            backgroundColor: Colors.theme_primary,
        },
    }
}