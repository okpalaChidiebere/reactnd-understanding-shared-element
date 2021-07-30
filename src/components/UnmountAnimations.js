import React, { useRef, useState } from "react"
import {
  StyleSheet,
  View,
  Animated,
  TouchableWithoutFeedback,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Colors, Strings } from "../values"

export default function UnmountAnimation(){

    const animation = useRef(new Animated.Value(1)).current //we will animate to zero as we are unmounting

    const startAnimation = () => {
        Animated.timing(animation, {
            toValue: 0,
            duration: 1500, //this is a really long animation, but we are giving ourself enough time to interrupt the animation by pressing the button twice
            useNativeDriver: true,
        }).start()
    }

    //we want to move the box downwards and out(Y axis) the screem
    const translateYInterpolate = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [500, 0], //when our animated.Value is 1, we are not going anywhere, but we move the box downwards when our animation goes to 0
    })

    const animatedStyles = {
        opacity: animation, //the opacity will still happen correctly because we are going from 1 to 0
        transform: [
            {
              translateY: translateYInterpolate,
            },
        ],
    }

    return (
        <SafeAreaView style={styles.container} edges={["bottom", "left", "right"]}>
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={startAnimation}>
                    <Animated.View style={[styles.box, animatedStyles]} />
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
    box: {
      width: 150,
      height: 150,
      backgroundColor: "tomato",
    },
})
  

export function UnmountAnimationOptions({ }){
    return {
        title: Strings.component_unmount_animations,
        headerTintColor: Colors.back,
        headerStyle: { 
            backgroundColor: Colors.theme_primary,
        },
    }
}