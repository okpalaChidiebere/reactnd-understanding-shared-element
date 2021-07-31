import React from "react"
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Colors, Strings } from "../values"

export default function ProgressbarButton(){
    return(
        <SafeAreaView style={styles.container} edges={["bottom", "left", "right"]}>
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={this.handlePress}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Get it!</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    button: {
      backgroundColor: "#e6537d",
      borderRadius: 2,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 60,
      paddingVertical: 10,
      overflow: "hidden",
    },
    buttonText: {
      color: "#FFF",
      fontSize: 24,
      backgroundColor: "transparent",
    },
})

export function ProgressbarButtonOptions(){
    return{
        title: Strings.component_progress_bar_button,
        headerTintColor: Colors.back,
        headerStyle: { 
            backgroundColor: Colors.theme_primary,
        },
    }
}