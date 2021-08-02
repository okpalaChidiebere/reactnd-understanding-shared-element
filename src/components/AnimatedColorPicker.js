import React, { useRef, useState, } from "react"
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native"
import { Foundation } from "@expo/vector-icons"
import { SafeAreaView } from "react-native-safe-area-context"
import { Colors, Strings } from "../values"


const AnimatedTextInput = Animated.createAnimatedComponent(TextInput)
const AnimatedIcon = Animated.createAnimatedComponent(Foundation)

const initialState = {
    color: "#000", //default color to black to drive the color in the input View
    /**We use this to control pointer events in the for the inputView. The inputs 
     * View has an absoluteFill style that makes it display over the ActionView */
    inputOpen: false, 
}
export default function AnimatedColorPicker({ }){

    const [state, setState] = useState(initialState)

    /**
     * In our animation breakdown down, we know there is an action view that opens up after
     *  you clicked on the button, that could be a single animation; basically going from
     * nothing to something. We know that that animation can be reversible as well. 
     * 
     * This means we need a single animation for that
     */
    const animation = useRef(new Animated.Value(0)).current //drive open and close animation of the action view when the text is clicked

    /**
     * There was a second open and close view with the input(where you put the color) and the button
     * and that seems reversable
     */
    const buttonAnimation = useRef(new Animated.Value(0)).current //drive open and close animation of the color input view when the color button is clicked from the actionView
    const openTextEditor = useRef() //we dont care if the textEditor unmounts in this projects so we will not put the value in our state

    const handleToggle = () => {
        const toValue = openTextEditor.current ? 0 : 1

        Animated.spring(animation, {
            toValue,
            useNativeDriver: true,
        }).start()

        openTextEditor.current = !openTextEditor.current
    }

    /**
     * START TEXT EDITOR ANIMATION
     * 
     * We will run the animation that opens the text Editor as a whole with interpolation
     * This means that this animation can be reversable
     * 
     * We want to have the effect where the textEditor explodes upwards and outwards when
     * the text is clicked
     *  */

    /**This explodes the textEditor upwards to its position */
    const translateYInterpolate = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [125, 0] //at rest, we push the editors downwards (125) a bit the move it up to the rest position (0)
    })
    /** This makes the textEditor this explodes the textEditor outwards */
    const scaleXInteroplate = animation.interpolate({
        inputRange: [0, .5, 1],
        outputRange: [0, 0, 1]
    })
    const animatedTextEditorStyle = {
        opacity: animation,
        transform: [
            {
                translateY: translateYInterpolate
            },
            {
                scaleX: scaleXInteroplate, //scales the editor along the x axis
            },
            {
                scaleY: animation //scales the editor along the Y axis.
            }
        ]
    }
    /**END TEXT EDITOR ANIMATION */

    const { color, inputOpen } = state

    /** we want the background color of the colorAction button to be driven off our state */
    const colorStyle = {
        backgroundColor: color,
    }

    return (
        <SafeAreaView style={styles.containerOutter} edges={["bottom", "left", "right"]}>
            <View style={styles.containerInner}>
                <Animated.View style={[styles.rowWrap, animatedTextEditorStyle]} /**this is a wrapping view */>
                    <TouchableWithoutFeedback>
                        <Animated.View style={[styles.colorBall, colorStyle]}/>
                    </TouchableWithoutFeedback>
                    <View style={styles.row}>
                        <TouchableOpacity>
                            <AnimatedIcon name="bold" size={30} color="#555" />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <AnimatedIcon name="italic" size={30} color="#555" />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <AnimatedIcon
                                name="align-center"
                                size={30}
                                color="#555"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <AnimatedIcon name="link" size={30} color="#555" />
                        </TouchableOpacity>

                        <Animated.View /** The inputView position on top of the actionView( with actionIcons) */
                            style={[StyleSheet.absoluteFill, styles.colorRowWrap]}
                        >
                            <AnimatedTextInput
                                value={color}
                                style={[styles.input]}
                                onChangeText={(color) => setState(currstate => ({ ...currstate, color }))}
                            />
                            <TouchableWithoutFeedback /*onPress={this.toggleInput}*/>
                                <Animated.View style={[styles.okayButton]}>
                                    <Text style={styles.okayText}>OK</Text>
                                </Animated.View>
                            </TouchableWithoutFeedback>
                        </Animated.View>
                    </View>
                </Animated.View>
                <TouchableOpacity onPress={handleToggle} style={styles.button}>
                    <Text>Toggle Open/Closed</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    containerOutter: {
        flex: 1,
    },
    containerInner: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    button: {
        marginTop: 25,
    },
    rowWrap: {
        flexDirection: "row", //the actionItems in the action view is arranged in a row direction
        alignItems: "center", //center along the horizontal line
        minWidth: "50%", //cover aleast 50% of our screen
        backgroundColor: "#fff",
        borderRadius: 20, //curved edges around the action view
        shadowColor: "#333", //darkGray
        shadowOpacity: .2,
        shadowOffset: { x: 2, y: 2 },
        shadowRadius: 3,
        elevation: 2,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    colorBall: {
        width: 15,
        height: 15,
        borderRadius: 8 //makes it a perfect circle
    },
    row: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-around", //there will be even spaces around the actionView icons
        flexDirection: "row",
        overflow: "hidden",
    },
    colorRowWrap: {
        flexDirection: "row",
        flex: 1,
        paddingLeft: 5,
    },
    input: {
        flex: 1,
    },
    okayButton: {
        borderRadius: 20,
        width: 33,
        height: "100%",
        backgroundColor: "#309eeb",
        alignItems: "center",
        justifyContent: "center",
    },
    okayText: {
        color: "#fff",
    }
})

export function AnimatedColorPickerOptions({ }){
    return{
        title: Strings.component_color_picker,
        headerTintColor: Colors.back,
        headerStyle: { 
            backgroundColor: Colors.theme_primary,
        },
    }
}