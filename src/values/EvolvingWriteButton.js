import React from "react"
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Dimensions,
    TouchableWithoutFeedback,
} from "react-native"
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons"
import { SafeAreaView } from "react-native-safe-area-context"
import { Colors, Strings } from "../values"




export default function EvolvingWriteButton(){
    return (
        <SafeAreaView style={styles.container} edges={["bottom", "left", "right"]}>
            <View style={[styles.container, styles.center]}></View>
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