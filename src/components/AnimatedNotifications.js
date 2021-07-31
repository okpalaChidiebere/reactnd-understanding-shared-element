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
    /**
     * We need to control the offset of our notification view. This will always be set 
     * to the height of the view right before we animate it.
     */
    const offset = useRef(new Animated.Value(0)).current

    const notificationStyle = {
        opacity,
        transform: [
            {
                /**
                 * we expect the initial position of this view to be off the screen 
                 * because we set a negative value offset after measurement of the notification container or wrapper
                 */
                translateY: offset,
            },
        ],
    }

    const handlePress = () => {
        setState(currState => ({
            value: "",
            notification: currState.value,
        }))
        //get the dynamic height of our view
        notificationRef.current.measure((x, y, width, height, pageX, pageY) => {
            /**
             * multiplying the value by -1 converts the integer to a nagative value :)
             * 
             * When we set the offset animation to -height this will move the view on 
             * the Y axis negatively. Meaning it'll move it up the screen for the amount 
             * we've set. So in this case it will move it to the exact height of the view 
             * so it won't be visible. This will make our notification look like it's sliding
             *  in from off screen.
             */
            offset.setValue(height * -1)

            /**
            * Animated.Parallel allow us to do multiple animations at once. 
            * For us that means animating in our opacity and our offset.
            * */
            const animateIn = Animated.parallel([
                    Animated.timing(opacity, {
                        toValue: 1,
                        duration: 300,
                        useNativeDriver: true,
                    }),
                    Animated.timing(offset, {
                        /**
                            * With our offset originally set at 0, this makes the notification 
                            * visibly in it's original position. This is why we our doing the 
                            * Animated.timing animation to 0.
                            */
                        toValue: 0,
                        duration: 300,
                        useNativeDriver: true,
                    }),
                ])

            /**
             * animateOut is basically reverse of animateIn
             */
            const animateOut = Animated.parallel([
                    Animated.timing(opacity, {
                        toValue: 0,
                        duration: 300,
                        useNativeDriver: true,
                    }),
                    Animated.timing(offset, {
                        toValue: height * -1,
                        duration: 300,
                        useNativeDriver: true,
                    }),
                ])

            /**
             * We want these 2 animations to happen in sequence, so we will 
             * need to use the Animated.sequence command to combine them. 
             * Additionally so our user can see the notification we'll use 
             * Animated.delay to wait before moving on to the hide animation.
            */
            Animated.sequence([
                animateIn,
                Animated.delay(1500),
                animateOut,
            ]).start()
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