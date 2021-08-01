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

    return (
        <SafeAreaView style={styles.container} edges={["bottom", "left", "right"]}>
            <View style={styles.content}></View>
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