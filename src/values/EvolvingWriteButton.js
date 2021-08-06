import React, { useRef } from "react"
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Dimensions,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
} from "react-native"
import Animated, { Extrapolate, interpolate, useSharedValue, useAnimatedStyle } from "react-native-reanimated"
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons"
import { SafeAreaView } from "react-native-safe-area-context"
import { Colors, Strings } from "../values"




export default function EvolvingWriteButton(){
    const { width } = Dimensions.get("window")
    const textInputRef = useRef() //allows us to focus or blur the TextInput whenever we open or close the editor
    const animation = useSharedValue(0) //This is a reversible an imation so we only have a single animated value that defaults to 0

    /** Half way through the animation we want to have the toolBar to be full width */
    const widthInterpolate = interpolate(
        animation.value,
        [0, .5],
        /**
         * 100, is width of the bar when the editor is closed. 
         * width - 50 is the final width. On your own you can interpolate this width based in percentage but we are going off the width of the screen
         */
        [100, width - 50],
        Extrapolate.CLAMP
    )

    /** We want the toolBar icons to *appear when the icons is closed */
    const opacityToolBarInterpolate = interpolate(
        animation.value,
        [0, .5],
        [0, 1], //we want the icons to only show up half-way through the animation
        Extrapolate.CLAMP
    )

    const editorToolbarStyles = useAnimatedStyle(() => ({
        opacity: opacityToolBarInterpolate,
    }))

    /** we want the editorheight to dropDown at the later stage of this animation */
    const editorHeightInterpolate = interpolate(
        animation.value,
        [.7, 1],
        [0, 150],
        Extrapolate.CLAMP
    )

    const editorCententStyle = useAnimatedStyle(() => ({
        opacity: animation.value,
        height: editorHeightInterpolate,
    }))
    /** End adding animation for editorHeight */

    /** 
     * Hide button text at the firstHalf(0 to .5) of the animation. The text will disappear
     * as we open the textEditor
     * 
     * While breaking down the animation frames it dribble, it quickly disappears,
     * but we want to have it slowly disapear
     *  */
    const opacityButtonInterpolate = interpolate(
        animation.value,
        [0, .5],
        [1, 0],
        Extrapolate.CLAMP
    )

    const buttonStyle = useAnimatedStyle(() => ({
        opacity: opacityButtonInterpolate,
    }))
    /** End hiding button Text */

    return (
        <SafeAreaView style={styles.container} edges={["bottom", "left", "right"]}>
            <View style={[styles.container, styles.center]}>
            <KeyboardAvoidingView
            /** we used keyboardAvoidingView because we this is a user input */
                style={styles.center}
                behavior="padding"
            >
                <Animated.View /** This view ill wrap all of our editor content */
                    style={[styles.editor, { width: widthInterpolate }]}
                >
                    <View style={styles.bar} /** Since we are going to animate the bar icons in and the
                     rightButtons(inside styles.rightInnerBar) , we will need to have thesame blue 
                     background for whatever animations we need this wraping bar*/>
                        <Animated.View style={[styles.toolbar, editorToolbarStyles]}>
                            <Icon name="format-bold" color="#FFF" size={20} />
                            <Icon name="format-italic" color="#FFF" size={20} />
                            <Icon name="format-underline" color="#FFF" size={20} />
                            <Icon name="format-list-bulleted" color="#FFF" size={20} />
                            <Icon name="format-list-numbered" color="#FFF" size={20} />
                            <View style={styles.rightInnerBar} /** FYI: there will always be a spaces the icons in here and the once above */>
                                <Icon name="link" color="#FFF" size={20} />
                                <Icon name="image" color="#FFF" size={20} />
                                <Icon name="arrow-down-bold-box" color="#FFF" size={20} />
                            </View>
                        </Animated.View>
                        <Animated.View 
                            /**Our button is rendered inside the bar, so that it will have the blue background */
                            style={[StyleSheet.absoluteFill, styles.center, buttonStyle]}
                        >
                            <TouchableWithoutFeedback>
                                <View>
                                    <Text style={styles.buttonText}>Write</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </Animated.View>
                    </View>
                    <Animated.View /** The will be our insert text input that slides up */
                        style={[styles.lowerView, editorCententStyle]}
                    >
                        <TextInput 
                            placeholder="Start typing ...."
                            multiline /**allows us to wirte in multiple lines */
                            ref={textInputRef}
                            style={[StyleSheet.absoluteFill, styles.input]} /** We want this TextInput to continue to ajust to the height of the parent viw that we will animate */
                        />
                    </Animated.View>
                </Animated.View>
            </KeyboardAvoidingView>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      /** this will center our keyboardAvoidingView */
      alignItems: "center",
      justifyContent: "center",
    },
    center: {
      alignItems: "center",
      justifyContent: "center",
    },
    editor: {
        borderWidth: 1,
        borderColor: "rgba(0,0,0,.1)",
    },
    bar: {
        height: 50, //this will be the button height as well
        backgroundColor: "#2979ff",
        justifyContent: "center",
    },
    toolbar: {
        flexDirection: "row", //we want our toolBar icons to be arraned in a row
        paddingHorizontal: 10,//we want some spaces at both ends of our toolbar
        alignItems: "center",
        justifyContent: "flex-start", //force the items in out toolbar to start in the left side of its parentView
    },
    rightInnerBar: {
        flex: 1, //we mist add this so that the flexEnd will really work, otherwise, this view will squish to the left
        flexDirection: "row",
        alignContent: "center",
        justifyContent: "flex-end", //this will position the items at the end of a its parentView
    },
    lowerView: {
        height: 150,
    },
    input: {
        padding: 10,
        fontSize: 20,
    },
    buttonText: {
        color: Colors.back,
    },
})

export function EvolvingWriteButtonOptions(){
    return{
        title: Strings.component_evolve_write_button,
        headerTintColor: Colors.back,
        headerStyle: { 
            backgroundColor: Colors.theme_primary,
        },
    }
}