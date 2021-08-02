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
    const okButtonAnimation = useRef(new Animated.Value(0)).current //drive open and close animation of the color input view when the color button is clicked from the actionView
    const inputViewText = useRef() //we want to be able to control the focus of the inputText
    const openTextEditor = useRef() //we dont care if the textEditor unmounts in this projects so we will not put the value in our state

    const handleToggle = () => {
        const toValue = openTextEditor.current ? 0 : 1

        Animated.spring(animation, {
            toValue,
            useNativeDriver: true,
        }).start()

        openTextEditor.current = !openTextEditor.current
    }

    /** when the color icon is togged, we will  */
    const toggleInput = () => {
        const toValue = state.inputOpen ? 0 : 1;
        Animated.timing(okButtonAnimation, {
          toValue,
          duration: 350,
          useNativeDriver: true
        }).start()
      
        setState(currstate => ({ ...currstate, inputOpen: !currstate.inputOpen }))
        //we want to show of blur focus on the textInput field causing the keyboard to open or close
        state.inputOpen ? inputViewText.current.blur() : inputViewText.current.focus()
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

    /** START INPUT VIEW ANIMATION */
    /** we want to move the OK button in the inputView from the left(offest position) at start to it normal postion which is right end of the inputView  */
    const moveInterpoate = okButtonAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [-150, 0]
    })

    //we want to reveal the TextInput right about then the OK button is about to reach its final positon
    const inputTextOpacityInterpolate = okButtonAnimation.interpolate({
        inputRange: [0, .8, 1], 
        outputRange: [0, 0, 1] //the inputText will be hidden for about 80% of the animation and will quickly appear
    })

    //As we move the okButton from left to right, we increase the scale as well and vice-visa
    const animatedOkButtonStyle = {
        transform: [
            {
                translateX: moveInterpoate //we want to squeeze the width of this view and then release the with to it normal size kater
            },
            {
                scale: okButtonAnimation //we want to make the view small and scale out to its normal size from 0 to 1. when at 0, the button is non-exisitent because the scale is 0. You can see it :)
            }
        ]
    }

    //opacity animatin for the textInput
    const animatedInputTextStyle = {
        opacity: inputTextOpacityInterpolate
    }
    /** END INPUT VIEW ANIMATION */

    /** START ACTION VIEW ANIMATION
     * 
     * **Rememeber that we are animating the elements(AnimatedIcons) in inside the actionView itself
     * and not hiding the whole view itself
     * 
     * We are hidding the items in one view while revealing the items in another view and also controling 
     * the pointer events of the inputView that is on top of the actionView. This way we know when to allow 
     * the actionItems to be interactable with or not
     * 
     */
    const actionItemsIconTranslate = okButtonAnimation.interpolate({
        inputRange: [0, 1],
        /**
         * we wan to move the button a bit in the opposite direction that the ok button is moving
         * 
         * 
         * This movement effect makes it look like the okButton and the actionItems icons are swapping places
         */
        outputRange: [0, -20],
    })
      
    //interpolation for the opacity of the icons as well. We will hide the icons in the actionView very quicky
    const opacityIconInterpolate = okButtonAnimation.interpolate({
        inputRange: [0, 0.2],
        outputRange: [1, 0], //the icons will be visible when the okButton is closed and hidden if the okButton is opening
        extrapolate: "clamp",
    })
      
    const iconStyle = {
        opacity: opacityIconInterpolate,
        transform: [
          {
            translateX: actionItemsIconTranslate,
          },
        ],
    }
    /** END ACTION VIEW ANIMATION */

    const { color, inputOpen } = state

    /** we want the background color of the colorAction button to be driven off our state */
    const colorStyle = {
        backgroundColor: color,
    }

    return (
        <SafeAreaView style={styles.containerOutter} edges={["bottom", "left", "right"]}>
            <View style={styles.containerInner}>
                <Animated.View style={[styles.rowWrap, animatedTextEditorStyle]} /**this is a wrapping view */>
                    <TouchableWithoutFeedback onPress={toggleInput}>
                        <Animated.View style={[styles.colorBall, colorStyle]}/>
                    </TouchableWithoutFeedback>
                    <View style={styles.row}>
                        <TouchableOpacity>
                            <AnimatedIcon name="bold" size={30} color="#555" style={iconStyle} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <AnimatedIcon name="italic" size={30} color="#555"  style={iconStyle} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <AnimatedIcon
                                name="align-center"
                                size={30}
                                color="#555"
                                style={iconStyle}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <AnimatedIcon name="link" size={30} color="#555" style={iconStyle} />
                        </TouchableOpacity>

                        <Animated.View /** The inputView position on top of the actionView( with actionIcons) */
                            style={[StyleSheet.absoluteFill, styles.colorRowWrap]}
                            pointerEvents={inputOpen ? "auto" : "none" /**control the pointer events on this view. When it is none, it means that the okutton is hidden and we can interact with the actionItem icons */}
                        >
                            <AnimatedTextInput
                                value={color}
                                style={[styles.input, animatedInputTextStyle]}
                                onChangeText={(color) => setState(currstate => ({ ...currstate, color }))}
                                ref={inputViewText}
                            />
                            <TouchableWithoutFeedback onPress={toggleInput /**Ok button can be toggled just like colorBall */}>
                                <Animated.View style={[styles.okayButton, animatedOkButtonStyle]}>
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