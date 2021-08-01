import React, { useState } from "react"
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity,
  Dimensions,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Colors, Strings } from "../values"

const initialState = {
    index: 0, //our active index which we'll default to 0
    questions: [
      "Do you tend to follow directions when given?",
      "Are you comfortable with the idea of standing and doing light physical activity most of the day?",
      "Would you enjoy making sure your customers leave happy?",
      "Are you willing to work nights and weekends (and possibly holidays)?",
    ],
}

export default function AnimatedQuestionnaire(){
    const [state, setState] = useState(initialState)

    const handleAnswer = () => {}

    return (
        <SafeAreaView style={styles.container} edges={["bottom", "left", "right"]}>
            <View style={styles.content}>
                <TouchableOpacity 
                    /**
                     * TIP: TouchableOpacity is actually an Animated.View so that means 
                     * we can apply styling to it. It is still in a column direction. */
                    onPress={handleAnswer} 
                    activeOpacity={.7} 
                    style={styles.option}
                >
                    <Text style={styles.optionText}>No</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={handleAnswer} 
                    activeOpacity={.7}
                    style={[styles.option, styles.yes]} 
                >
                    <Text style={styles.optionText}>Yes</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    content: {
      flex: 1,
      backgroundColor: "#E22D4B",
      flexDirection: "row", //this will allow us to lay our buttons out on the left and right sides
    },
    option: {
        flex: 1, //we want the button stretch the entire screen
        justifyContent: "flex-end", //we want our content to be at the end
        alignItems: "center" //we want our content to be centered inside
    },
    yes: {
        backgroundColor: "rgba(255,255,255,.1)", //we want to distinguish between the yes and no button
    },
    optionText: {
        fontSize: 30,
        color: "#FFF",
        marginBottom: 50,
    },
})

export function AnimatedQuestionnaireOptions(){
    return{
        title: Strings.component_animated_questionare,
        headerTintColor: Colors.back,
        headerStyle: { 
            backgroundColor: Colors.theme_primary,
        },
    }
}