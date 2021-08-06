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
import Animated from "react-native-reanimated"
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons"
import { SafeAreaView } from "react-native-safe-area-context"
import { Colors, Strings } from "../values"




export default function EvolvingWriteButton(){
    const { width } = Dimensions.get("window")
    const textInputRef = useRef() //allows us to focus or blur the TextInput whenever we open or close the editor

    return (
        <SafeAreaView style={styles.container} edges={["bottom", "left", "right"]}>
            <View style={[styles.container, styles.center]}>
            <KeyboardAvoidingView
            /** we used keyboardAvoidingView because we this is a user input */
                style={styles.center}
                behavior="padding"
            >
                <Animated.View /** This view ill wrap all of our editor content */
                    style={[styles.editor, { width: width - 40 /** FYI we will interpolate on this later */ }]}
                >
                    <View style={styles.bar} /** Since we are going to animate the bar icons in and the
                     rightButtons(inside styles.rightInnerBar) , we will need to have thesame blue 
                     background for whatever animations we need this wraping bar*/>
                        <Animated.View style={styles.toolbar}>
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
                    </View>
                    <Animated.View /** The will be our insert text input that slides up */
                        style={styles.lowerView}
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