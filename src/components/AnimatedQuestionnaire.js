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

    /** we will render the question at index 0 at the first question, 
     * and the second question (index 1) that will sit offscreen that 
     * can translate in at thesame time we translate out the first question
     * */

    

    const { questions, index } = state
    const question = questions[index]
    let nextQuestion

    //if the next question is inside our array
    if(index + 1 < questions.length){
        //we get the next question
        nextQuestion = questions[index + 1]
    }

    
    return (
        <SafeAreaView style={styles.container} edges={["bottom", "left", "right"]}>
            <View style={styles.content}>
                <View 
                    style={[
                        StyleSheet.absoluteFill, /** we need this view that will render the qustions to operate independently. it should vover the entire container as well */
                        styles.overlay //centres the two questions in the middle of the screen
                    ]}
                >
                    <Animated.Text style={[styles.questionText]}>
                        {question}
                    </Animated.Text>
                    <Animated.Text style={[styles.questionText]}>
                        {nextQuestion}
                    </Animated.Text>
                </View>
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
    overlay: {
        /** 
         * we want to center our question in the middle of the screen and they have to be on thesame plane
         * This means, as we anmiate the next question in, it needs to be in exact same stop that the question
         *  being animated out left. To achieve this, we have to do some absolute positioning (look at styles.questionText) to make the items 
         * flow correctly
         */
        alignItems: "center",
        justifyContent: "center",
    },
    questionText: {
        fontSize: 30,
        color: "#FFF",
        textAlign: "center",
        position: "absolute", //We want the layout of the questions to be independent so that we can position then how we fill
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