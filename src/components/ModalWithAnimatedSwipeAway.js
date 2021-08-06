import React from "react"
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    ScrollView,
} from "react-native"
import Animated, { } from "react-native-reanimated"
import { SafeAreaView } from "react-native-safe-area-context"
import { Colors, Strings } from "../values"

export default function ModalWithAnimatedSwipeAway(){
    return (
        <SafeAreaView style={styles.container} edges={["bottom", "left", "right"]}>
            <View style={[styles.center, styles.container]}>
                <Animated.View
                    style={[styles.modal]}
                >
                    <View style={styles.comments}>
                        <ScrollView>
                            <Text style={styles.fakeText}>Top</Text>
                            <View style={styles.fakeComments}/>
                            <Text style={styles.fakeText}>Bottom</Text>
                        </ScrollView>
                    </View>
                    <View style={styles.inputWrap}>
                        <TextInput style={styles.textInput} placeholder="Comment"/>
                    </View>
                </Animated.View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    center: {
      alignItems: "center",
      justifyContent: "center",
    },
    modal: {
        width: "90%",
        height: "97%",
        borderWidth: 1,
        borderColor: "#000",
        borderRadius: 20,
        overflow:"hidden",
        position: "absolute",
    },
    comments: {
        flex: 9,
        backgroundColor: "#fff"
    },
    inputWrap: {
        flex: 1,
        backgroundColor: "#fff"
    },
    fakeText: {
        height: 50,
        textAlign: "center"
    },
    fakeComments: {
        height: 800,
        backgroundColor: "#eee",
    },
    textInput: {
        padding: 10,
    },
})

export function ModalWithAnimatedSwipeAwayOptions(){
    return{
        title: Strings.component_evolve_write_button,
        headerTintColor: Colors.back,
        headerStyle: { 
            backgroundColor: Colors.theme_primary,
        },
    }
}