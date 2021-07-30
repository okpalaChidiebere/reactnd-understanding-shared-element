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
    const [state, setState] = useState({
        started: false,
        visible: true, //controls whether or not the box is mounted or unmounted.
    })

    const startAnimation = () => {

        setState(currState => ({
            ...currState,
            started: true
        }))
        Animated.timing(animation, {
            toValue: 0,
            duration: 1500, //this is a really long animation, but we are giving ourself enough time to interrupt the animation by pressing the box twice
            useNativeDriver: true,
        }).start(({ finished }) => {
            /** 
             * the finished value tells us if the animation is completed an uninterrupted 
             * Uninterrupted means that another animation was not called in our `animation` variable value
             * 
             * What will happen is that when you trigger a second animation on thesame animation value when 
             * the first one has not been completed yet, both animations will run this function, but the first 
             * animation will return a finishedValue of false, and the second animation will return true if it was
             * not interrupted by another press action
            */
           setState({
               visible: !finished, //our animated has completed and we can unmount our box. When visible is false, the box will not be rendered so we have to negate the finished value that will return true when the animation is done
               started: false,
           })
        })
    }
    
    const resetAnimation = () => {
        setState({
            started: false,
        })
        /**
         * This will reset the interupted click because, we are not calling the first callBack function
         * that was triggerd by the first click. we interrupt the animated value half way as its going to zero,
         * and spring it back to 1. So it will really reset!
         * 
         */
        Animated.spring(animation, {
            toValue: 1,
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

    const { visible, started } = state
    return (
        <SafeAreaView style={styles.container} edges={["bottom", "left", "right"]}>
            <View style={styles.container}>
                {visible && ( /** As soon as visible becomes false, this component will unmount */
                    <TouchableWithoutFeedback onPress={started ? resetAnimation : startAnimation}>
                        <Animated.View style={[styles.box, animatedStyles]} />
                    </TouchableWithoutFeedback>
                )}
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