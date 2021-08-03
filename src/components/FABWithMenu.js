import React, { useRef } from "react"
import {
  StyleSheet,
  View,
  Animated,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native"
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons'; 

import { SafeAreaView } from "react-native-safe-area-context"
import { Colors, Strings } from "../values"

export default function FABWithMenu(){

    /**
     * We will build our FAB animation in a reversible fashion. This means
     *  that we will have a single animatedValue that we animate from 0 to 1 
     * and everything interpolates correctly
     */
    const animation = useRef(new Animated.Value(0)).current
    const toggelOpen = () => {
        /**
         * initially this.open will be undefined(which is Falsy) so 1 will be assinged to toValue
         * https://developer.mozilla.org/en-US/docs/Glossary/Falsy
         */
        const toValue = this.mOpen ? 0 : 1

        Animated.timing(animation, {
            toValue,
            duration: 200,
            useNativeDriver: true,
        }).start()

        this.mOpen = !this.mOpen
    }

    const reloadActionStyle = {
        transform: [
            {
                /**
                 * FYI: we are passing our animtion value here directly knowing
                 * that it only will range from 0 to 1. If any chance than anition 
                 * value will go pass 1 or below 0, then we will have to pass the interpolation
                 * of the animtionValue with inputRange and outputRange between 0 to 1 with 
                 * a "clamp" extrapolate
                 * 
                 * Good to know :)
                 * */
                scale: animation
            },
            {
                translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -70], //-70 (60 for button size and 10 pixels upwards from rest position) means we are moving this button upwards
                })
            },
        ],
    }
      
    const orderActionStyle = {
        transform: [
            {
                scale: animation
            },
            {
                translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -140],
                })
            },
        ],
    }

    /** START APPY ANIMATION STYLE TO BUTTON LABEL */
    //we will slowly or causaully move the text outwoards to the left from the rest position
    const labelPositionInterpolate = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [-30, -90] //The text will always be offset by -30 and animate to an offset of -90
    })
    
    /**
     * we will not show the button label until the 80th percent of the animation because we 
     * don't want the text to appear over our icons and transition out
     */
    const buttonLabelOpacityInterpolate = animation.interpolate({
        inputRange: [0, 0.8, 1], //you can try .2 on your own to see how the text moves out from the button :)
        outputRange: [0, 0, 1]
    })
      
    const buttonLabelStyle = {
        opacity: buttonLabelOpacityInterpolate,
        transform: [
          {
            translateX: labelPositionInterpolate,
          },
        ],
    }
    /** END APPLY ANIMATION STYLE TO BUTTON LABEL */

    return (
        <SafeAreaView style={styles.container} edges={["bottom", "left", "right"]}>
            <View style={styles.container}>
                <TouchableWithoutFeedback /** order menu action*/>
                    <Animated.View style={[styles.button, styles.other, orderActionStyle]}>
                        <Animated.Text style={[styles.label, buttonLabelStyle]}>Order</Animated.Text>
                        <Icon name="food-fork-drink" size={20} color="#555" />
                    </Animated.View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback /** the reload menu action */>
                    <Animated.View style={[styles.button, styles.other, reloadActionStyle]}>
                        <Animated.Text style={[styles.label, buttonLabelStyle]}>Reload</Animated.Text>
                        <Icon name="reload" size={20} color="#555" />
                    </Animated.View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={toggelOpen} /**our FAB "pay" button */>
                    <View style={[styles.button, styles.pay]}>
                        <Animated.Text style={[styles.label, buttonLabelStyle]}>Pay</Animated.Text>
                        <Text style={styles.payText}>$5.00</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    button: {
        width: 60,
        height: 60,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#333",
        shadowOpacity: 0.2,
        shadowOffset: { x: 2, y: 6 },
        shadowRadius: 2,
        elevation: 6,
        borderRadius: 30, //half of our width and height
        /**
         * //we want our menu buttons to be stacked on top of each other with 
         * the pay button being at the top. This way we dont have to use opacity
         *  to hide the other buttons. we will only have to use the translate Y 
         * to reveal the menu other buttons outwards from behind our pay button
         * 
         * On your own, you could potentially add opacity and scaling animations to them ;)
         */
        position: "absolute",
        bottom: 20,
        right: 20,
    },
    label: {
        color: "#fff",
        position: "absolute", //the button text will be independent of anything inside the button
        fontSize: 18,
        backgroundColor: "transparent",
    },      
    payText: {
        color: "#fff",
    },
    pay: {
        backgroundColor: "#00b15e",
    },
    other: {
        backgroundColor: "#FFF",
    },
})

export function FABWithMenuOptions(){
    return{
        title: Strings.component_fab_with_menu,
        headerTintColor: Colors.back,
        headerStyle: { 
            backgroundColor: Colors.theme_primary,
        },
    }
}