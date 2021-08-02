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
import { SafeAreaView } from "react-native-safe-area-context"
import { Colors, Strings } from "../values"


const initialState = {
    color: "#000", //default color to black to drive the color in the input View
    
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

    const handleToggle = () => {}

    const { color } = state

    /** we want the background color of the colorAction button to be driven off our state */
    const colorStyle = {
        backgroundColor: color,
    }

    return (
        <SafeAreaView style={styles.containerOutter} edges={["bottom", "left", "right"]}>
            <View style={styles.containerInner}>
                <Animated.View style={styles.rowWrap} /**this is a wrapping view */>
                    <TouchableWithoutFeedback>
                        <Animated.View style={[styles.colorBall, colorStyle]}/>
                    </TouchableWithoutFeedback>
                    <View style={styles.row}></View>
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

    },
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