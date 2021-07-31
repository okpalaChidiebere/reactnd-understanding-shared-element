import React, { useState } from "react"
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Colors, Strings } from "../values"

const initialState = {
    value: "",
}

export default function AnimatedNotifications(){
    const [state, setState] = useState(initialState)

    const handlePress = () => {}

    const { value } = state 

    return (
        <SafeAreaView style={styles.container} edges={["bottom", "left", "right"]}>
            <View style={styles.container}>
                <View>
                    <TextInput
                        style={styles.input}
                        value={value}
                        onChangeText={value => setState({ value })}
                    />
                    <TouchableOpacity onPress={handlePress}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>Show Notification</Text>
                        </View>
                    </TouchableOpacity>
                </View>
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
      backgroundColor: "tomato",
      padding: 15,
      marginTop: 10,
    },
    buttonText: {
      color: "#FFF",
      textAlign: "center",
    },
    input: {
      width: 250,
      height: 40,
      padding: 5,
      borderWidth: 1,
      borderColor: "#CCC",
    },
})

export function AnimatedNotificationsOptions(){
    return{
        title: Strings.component_stagger_form_items,
        headerTintColor: Colors.back,
        headerStyle: { 
            backgroundColor: Colors.theme_primary,
        },
    }
}