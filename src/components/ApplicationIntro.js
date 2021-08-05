import React, {  } from "react"
import {
  StyleSheet,
  Text,
  View,
  Animated,
  ScrollView,
  Dimensions,
  PixelRatio,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Colors, Strings } from "../values"

export default function ApplicationIntro(){
    return(
        <SafeAreaView style={styles.container} edges={["bottom", "left", "right"]}>
            <View style={styles.container}></View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
})

export function ApplicationIntroOptions(){
    return{
        title: Strings.component_application_intro,
        headerTintColor: Colors.back,
        headerStyle: { 
            backgroundColor: Colors.theme_primary,
        },
    }
}