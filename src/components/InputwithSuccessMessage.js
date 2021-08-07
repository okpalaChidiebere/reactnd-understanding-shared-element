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
    useSharedValue, 
} from "react-native-reanimated"
import { SafeAreaView } from "react-native-safe-area-context"
import { Colors, Strings } from "../values"

export default function InputwithSuccessMessage(){

    const animate = useSharedValue(0)
    const [success, setSuccess] = useState(false)

    const handlePress = () => {

    }

    const handleSend = () => {

    }

    return (
        <SafeAreaView style={styles.container} edges={["bottom", "left", "right"]}>
            <View style={[styles.container, styles.center, { backgroundColor: "#FF7B73" }]}>
                <TouchableWithoutFeedback onPress={handlePress}>
                    <Animated.View style={[styles.buttonWrap]}>

                        {!success && (
                            <Animated.View 
                                style={[
                                    StyleSheet.absoluteFill, /** Helps position our input inside of our wrapping View (styles.buttonWrap). This allows us to animate our TextInput and our messages in and out without effecting layout of each other */
                                    styles.inputWrap,
                                ]}>
                                <TextInput 
                                    autoFocus
                                    keyboardType="email-address"
                                    placeholder="Email" 
                                    placeholderTextColor="rgba(255,123,115, 0.8)" 
                                    style={styles.textInput}
                                />
                                <TouchableOpacity style={[styles.sendButton]} onPress={handleSend}>
                                    <Text style={styles.sendText}>Send</Text>              
                                </TouchableOpacity>
                            </Animated.View>
                        )}

                        {!success && (
                            <Animated.View>
                                <Text style={styles.notifyText}>Notify Me</Text>
                            </Animated.View>
                        )}
                        {/** when we are succesFul we render a  `Thank You` message */
                        success && (
                            <Animated.View>
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