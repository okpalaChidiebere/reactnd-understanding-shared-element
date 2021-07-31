import React, { useState, useRef } from "react"
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Animated,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Colors, Strings } from "../values"

const initialState = {
    value: "",
    notification: "",
}

export default function AnimatedNotifications(){
    const [state, setState] = useState(initialState)
    /**
     * we need to use the measure function on the ref eventually so we can actually 
     * craft a dynamic animation based upon the height of the of notification. 
     * If you look our styles.notification we did not define a constant width and height
     * 
     * This will allow us to make a flexible notification component rather than specifying 
     * a specific height.
     */
    const notificationRef = useRef()
    const opacity = useRef(new Animated.Value(0)).current

    const notificationStyle = {
        opacity,
    }

    const handlePress = () => {
        setState(currState => ({
            value: "",
            notification: currState.value,
        }))
    }

    const { value, notification } = state 

    return (
        <SafeAreaView style={styles.container} edges={["bottom", "left", "right"]}>
            <Animated.View
                style={[styles.notification, notificationStyle]}
                ref={notificationRef}
            >
                <Text style={styles.notificationText}>{notification}</Text>
            </Animated.View>
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
    notification: {
        position: "absolute", //We use position: "absolute" so our notification won't be effected by our container styling
        paddingHorizontal: 7,
        paddingVertical: 15,
        /**size the notification view to the edges of it's parent container.*/
        left: 0,
        top: 0,
        right: 0,
        /**End sizing */
        backgroundColor: "tomato",
    },
    notificationText: {
        color: "#FFF",
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