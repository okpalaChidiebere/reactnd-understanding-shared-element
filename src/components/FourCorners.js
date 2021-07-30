import React from "react"
import {
    StyleSheet,
    View,
    Animated,
    TouchableWithoutFeedback,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Colors, Strings } from "../values"


export default function FourCorners({ }){
    return(
        <SafeAreaView style={styles.container} edges={["bottom", "left", "right"]}>
            <View style={styles.container}>
                <TouchableWithoutFeedback>
                    <Animated.View style={[styles.box]} />
                </TouchableWithoutFeedback>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    box: {
      width: 150,
      height: 150,
      backgroundColor: "tomato",
      position: "absolute",
      top: 0,
      left: 0,
    },
})

export function FourCornersOptions(){
    return {
        title: Strings.component_four_corners,
        headerTintColor: Colors.back,
        headerStyle: { 
            backgroundColor: Colors.theme_primary,
        },
    }
}