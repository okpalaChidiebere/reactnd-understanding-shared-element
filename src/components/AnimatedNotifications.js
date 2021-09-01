import React, { useState, useRef } from "react"
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import Animated, { 
    useSharedValue, 
    useAnimatedStyle,
    withTiming,
    withDelay,
} from "react-native-reanimated"
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
    const opacity = useSharedValue(0)
    /**
     * We need to control the offset of our notification view. This will always be set 
     * to the height of the view right before we animate it.
     */
    const offset = useSharedValue(0)

    const notificationStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
        transform: [
            {
                /**
                 * we expect the initial position of this view to be off the screen 
                 * because we set a negative value offset after measurement of the notification container or wrapper
                 */
                translateY: offset.value,
            },
        ],
    }))

    const handlePress = () => {
        setState(currState => ({
            value: "",
            notification: currState.value,
        }))
        //get the dynamic height of our view
        notificationRef.current.measure((x, y, width, height, pageX, pageY) => {
            /**
             * We want these 2 animations to happen in sequence, animating 
             * the notification in and out 
             * 
             * Additionally so our user can see the notification we'll delay 
             * the animation that will hide the notification 
            */


            /**
             * multiplying the value by -1 converts the integer to a nagative value :)
             * 
             * When we set the offset animation to -height this will move the view on 
             * the Y axis negatively. Meaning it'll move it up the screen for the amount 
             * we've set. So in this case it will move it to the exact height of the view 
             * so it won't be visible. This will make our notification look like it's sliding
             *  in from off screen.
             */
            offset.value = height * -1

            /**
            * We are animating in our opacity and our offset in parallel.
            * */
            opacity.value = withTiming(1, { duration: 300 })
            offset.value = withTiming(0, { duration: 300 })

            /**
             * animateOut is basically reverse of animateIn
             */
            opacity.value = withDelay(1500, withTiming(0, { duration: 300 }))
            offset.value = withDelay(1500, withTiming(height * -1, { duration: 300 }))
            
        })
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