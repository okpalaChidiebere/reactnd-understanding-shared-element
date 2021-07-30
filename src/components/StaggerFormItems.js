import React, { useRef } from "react"
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
  Animated,
  KeyboardAvoidingView,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Colors, Strings } from "../values"


export default function StaggerFormItems(){
    const email = useRef(new Animated.Value(0)).current
    const password = useRef(new Animated.Value(0)).current
    const button = useRef(new Animated.Value(0)).current

    const AnimatedTextInput = Animated.createAnimatedComponent(TextInput)

    /**
     * Because each of the animations are exact thesame, we created a function that takes in an animatedValue an returns 
     * styling
     * This way our we write more clean code.
     *  */
     const createAnimationStyle = (animation) => {
         //we need an interpolation for translateY
        const translateY = animation.interpolate({
          inputRange: [0, 1],
          outputRange: [-5, 0], //we will start the postion of each items slightly higher(-5) and animate to an offset(0)
        })
      
        return {
          opacity: animation, //we know our Animated.Value is going from 0 to 1, so we can just used that same value for opacity :)
          transform: [
            {
              translateY,
            },
          ],
        }
    }

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