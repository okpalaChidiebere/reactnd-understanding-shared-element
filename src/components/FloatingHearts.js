import React from "react"
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableWithoutFeedback
} from "react-native"
import Animated, { } from "react-native-reanimated"
import { SafeAreaView } from "react-native-safe-area-context"
import { Colors, Strings } from "../values"
import Heart from "./Heart"


function getRandomInt(min, max){
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) - min
}
export default function FloatingHearts(){

    const handleAddheart = () => {

    }

    return (
        <SafeAreaView style={styles.container} edges={["bottom", "left", "right"]}>
            <View style={[styles.container, styles.center]}>
                <TouchableWithoutFeedback onPress={handleAddheart}>
                    <View style={StyleSheet.absoluteFill}>

                    </View>
                </TouchableWithoutFeedback>
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
    heart: {
        position: "absolute",
        top: 0,
        left: 0
      }
})

export function FloatingHeartsOptions(){
    return {
        title: Strings.component_floating_hearts,
        headerTintColor: Colors.back,
        headerStyle: { 
            backgroundColor: Colors.theme_primary,
        },
    }
}