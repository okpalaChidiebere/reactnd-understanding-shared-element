import React from "react"
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Colors, Strings } from "../values"


export default function AnimatedColorPicker({ }){

    const handleToggle = () => {}

    return (
        <SafeAreaView style={styles.containerOutter} edges={["bottom", "left", "right"]}>
            <View style={styles.containerInner}>
                <TouchableOpacity onPress={handleToggle} style={styles.button}>
                    <Text>Toggle Open/Closed</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    containerOutter: {
        flex: 1,
    },
    containerInner: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    button: {

    },
})

export function AnimatedColorPickerOptions({ }){
    return{
        title: Strings.component_color_picker,
        headerTintColor: Colors.back,
        headerStyle: { 
            backgroundColor: Colors.theme_primary,
        },
    }
}