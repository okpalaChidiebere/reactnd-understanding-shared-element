import React, { useRef } from "react"
import {
  AppRegistry,
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
    const toggelOpen = () => {}

    return (
        <SafeAreaView style={styles.container} edges={["bottom", "left", "right"]}>
            <View style={styles.container}>
                <TouchableWithoutFeedback /** order menu action*/>
                    <Animated.View style={[styles.button, styles.other]}>
                        <Icon name="food-fork-drink" size={20} color="#555" />
                    </Animated.View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback /** the reload menu action */>
                    <Animated.View style={[styles.button, styles.other]}>
                        <Icon name="reload" size={20} color="#555" />
                    </Animated.View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={toggelOpen} /**our FAB "pay" button */>
                    <View style={[styles.button, styles.pay]}>
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
        position: "absolute",
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