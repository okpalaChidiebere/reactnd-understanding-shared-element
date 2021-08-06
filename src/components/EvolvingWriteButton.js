import React, { useRef, useState } from "react"
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Dimensions,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Pressable,
} from "react-native"
import Animated, { 
    Extrapolate, 
    interpolate,
    useSharedValue, 
    useAnimatedStyle, 
    withTiming, 
    runOnJS, 
} from "react-native-reanimated"
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons"
import { SafeAreaView } from "react-native-safe-area-context"
import { useHeaderHeight } from "@react-navigation/stack"
import { Colors, Strings } from "../values"


const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

export default function EvolvingWriteButton(){
    const { width } = Dimensions.get("window")
    const textInputRef = useRef() //allows us to focus or blur the TextInput whenever we open or close the editor
    const animation = useSharedValue(0) //This is a reversible an imation so we only have a single animated value that defaults to 0
    const isEditorOpened = useRef(null)
    /** Reversing the animation works, but we dont want it, so we just control the pointerEvents on the button laying over the toolBar */
    const [editorPointerEvent, SetEditorPointerEvent] = useState(false)
    
    /** Half way through the animation we want to have the toolBar to be full width */
    const editorWidthStyle = useAnimatedStyle(() => {
        const widthInterpolate = interpolate(
            animation.value,
            [0, .5],
            /**
             * 100, is width of the bar when the editor is closed. 
             * width - 50 is the final width. On your own you can interpolate this width based in percentage but we are going off the width of the screen
             * 
             * We will have the effect of the ToolBar shrinking to the width of the Button and disappear in the reverse, the toolBar will expand to its 
             * fullWidth and this button will disappear
             */
            [100, width - 50],
            Extrapolate.CLAMP
        )

        return {
            width: widthInterpolate
        }
    })

    /** We want the toolBar icons to *appear when the icons is closed */
    const editorToolbarStyles = useAnimatedStyle(() => {
        const opacityToolBarInterpolate = interpolate(
            animation.value,
            [0, .5],
            [0, 1], //we want the icons to only show up half-way through the animation
            Extrapolate.CLAMP
        )

        return {
            opacity: opacityToolBarInterpolate,
        }
    })

    const closeButton = useAnimatedStyle(() => {
        return {
            opacity: interpolate(
                animation.value,
                [0, .5],
                [0, 1],
                Extrapolate.CLAMP
            )
        }
    })

    /** we want the editorHeight to dropDown at the later stage of this animation */
    const editorCententStyle = useAnimatedStyle(() => {
        const editorHeightInterpolate = interpolate(
            animation.value,
            [.7, 1],
            [0, 150],
            Extrapolate.CLAMP
        )

        return {
            opacity: animation.value,
            height: editorHeightInterpolate,
        }
    })
    //End adding animation for editorHeight

    const buttonStyle = useAnimatedStyle(() => {
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
        return {
            opacity: opacityButtonInterpolate,
        }
    })
    //End hiding button Text

    const toggleTransform = () => {
        /** 
         * Remember that once the toolBar expands, the button is will absolutely positioned
         * We could control mounting and unmounting that component but we will use the 
         * pointer-events technique
        */
       const toValue = isEditorOpened.current ? 0 : 1

       const updateEditor = () => {      
            isEditorOpened.current 
            ? textInputRef.current.blur() //here we are heading towards not opening the editor, so we blur out the keyboard
            : textInputRef.current.focus() //it means that we are opening

            isEditorOpened.current = !isEditorOpened.current
            SetEditorPointerEvent(isEditorOpened.current)
        }
       
        animation.value = withTiming(toValue, { duration: 550 }, (finished) => {
            //more on runJS reanimated2 here https://docs.swmansion.com/react-native-reanimated/docs/worklets
            runOnJS(updateEditor)()
        })
    }

    return (
        <SafeAreaView style={styles.container} edges={["bottom", "left", "right"]}>
            <View style={[styles.container, styles.center]}>
            <KeyboardAvoidingView
            /** we used keyboardAvoidingView because we this is a user input */
                style={styles.center}
                behavior="padding"
                keyboardVerticalOffset={useHeaderHeight() + 20} //see more ways to set this https://stackoverflow.com/questions/48420468/keyboardavoidingview-not-working-properly
            >
                <Animated.View /** This view ill wrap all of our editor content */
                    style={[styles.editor, editorWidthStyle]}
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
                            /**
                             * We used pointer events because we want the icons to still be interactable as well 
                             * even though the button is on top of the icons */
                            pointerEvents={editorPointerEvent? "none" : "auto"}
                        >
                            <TouchableWithoutFeedback onPress={toggleTransform}>
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
                <AnimatedPressable style={closeButton/** i could have used editorToolbarStyles here again, but reanimated2 does not allow that. I have to repeat the code :( */} onPress={toggleTransform}>
                    <Text style={styles.close}>Close</Text>
                </AnimatedPressable>
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
    close: {
        color: "#2979ff",
        marginTop: 10,
        marginBottom: 20,
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