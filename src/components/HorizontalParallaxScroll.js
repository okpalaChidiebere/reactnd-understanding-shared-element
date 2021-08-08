import React, {  } from "react"
import {
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Colors, Strings } from "../values"

const Images = [
    { image: require("../assets/stories/1.jpg") , title: "Vodca Cran" },
    { image: require("../assets/stories/2.jpg"), title: "Old Fashion" },
    { image: require("../assets/stories/3.jpg"), title: "Mule" },
    { image: require("../assets/stories/4.jpg"), title: "Strawberry DiaQuir" },
]

export default function HorizontalParallaxScroll(){
    return (
        <SafeAreaView style={styles.container} edges={["bottom", "left", "right"]}>
            <View style={[styles.container]}>

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#333",
    },
})

export function HorizontalParallaxScrollOptions(){
    return {
        title: Strings.component_horizontal_parallax,
        headerTintColor: Colors.back,
        headerStyle: { 
            backgroundColor: Colors.theme_primary,
        },
    }
}