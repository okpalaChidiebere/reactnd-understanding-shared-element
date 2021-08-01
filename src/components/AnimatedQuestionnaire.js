import React, { useState, useRef } from "react"
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
    const animation  = useRef(new Animated.Value(0)).current
    const progress = useRef(new Animated.Value(0)).current

    const handleAnswer = () => {
        Animated.parallel([
            Animated.timing(progress, {
              toValue: state.index + 1, //the input to our progress should be the current question we are on. remember that the inputRange for this animation is dynamic to questions.length :)
              duration: 400,
              useNativeDriver: false //you can only animate the widht property with javascript
            }),
            Animated.timing(animation, {
                toValue: 1,
                duration: 400,
                useNativeDriver: true
            }),
          ]).start(() => {
            /**
             * Pro tip: it is important to know how to use animated 
             * callbacks that animated provides as it allows us to setup and adjust our animations
             * an prepare for new animation
             */

            //transitioning the index as well once the animation is done.
            setState(currState => ({
                ...currState,
                index: currState.index + 1, //this causes the next question to be the main question and we have new next question
            }))
            animation.setValue(0) //we dont wnt want the next question to be translated offscreen as its not the main question
        })
    }

    const { questions, index } = state

    const { width } = Dimensions.get("window")

    /**
     * This interpolation for our progress, we figured out based on the number of questions that we have, 
     * what percentage we need to have so that it will progress appropriately across the screen when a new
     * question is answered
     */
    const progressInterpolate = progress.interpolate({
        inputRange: [0, questions.length], //the end inputRange is dynamic which is how many questions based on the state
        outputRange: ["0%", "100%"],
    })

    const animatedProgressStyle = {
        width: progressInterpolate
    }

    /** we will have our mainQuestion sit at 0, and when our animation happens, we will move it to the left */
    const mainQuestionInterpolate = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -width]
    })

    /** 
     * we will have then next question sit offSet in screen and move the it into 0 as the 
     * question asnwered moves off. */
    const nextQuestionInterpolate = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [width, 0]
    })

    //craft our styling
    const animatedMainQuestionStyle = {
        transform: [
            {
                //rememeber, translateX is responsible for moving objects left to right on screen
                translateX: mainQuestionInterpolate,
            }
        ]
    }

    const animatedNextQuestionStyle = {
        transform: [
            {
                translateX: nextQuestionInterpolate,
            }
        ]
    }
    //end crafting our styling

    /** 
     * we will render the question at index 0 at the first question, 
     * and the second question (index 1) that will sit offscreen that 
     * can translate in at thesame time we translate out the first question
     * */
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
                    <Animated.Text style={[styles.questionText, animatedMainQuestionStyle]}>
                        {question}
                    </Animated.Text>
                    <Animated.Text style={[styles.questionText, animatedNextQuestionStyle]}>
                        {nextQuestion}
                    </Animated.Text>
                </View>
                <View style={styles.progress}>
                    <Animated.View style={[styles.bar, animatedProgressStyle]} />
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
    progress: {
        position: "absolute",
        left: 0,
        bottom: 0,
        right: 0,
        height: 10,
    },
    bar: {
        height: "100%",
        backgroundColor: "#FFF",
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