import React, { useState } from "react"
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableWithoutFeedback
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Colors, Strings } from "../values"
import Heart from "./Heart"


function getRandomInt(min, max){
    return Math.floor(Math.random() * (max - min)) + min
}
export default function FloatingHearts(){

    const { width } = Dimensions.get("window")
    const [state, setState] = useState({
        hearts: []
    })

    const handleAddheart = () => {
        //NOTE: we wanted to make sure that all of the state has flushed throught thats is why we passed the callback to setState
        setState((currState) => ({
            hearts: [
                ...currState.hearts,
                {
                    start: getRandomInt(100, width - 100)//a starting position along the bottom of the screen
                }
            ]
        }))

    }

    return (
        <SafeAreaView style={styles.container} edges={["bottom", "left", "right"]}>
            <View style={[styles.container, styles.center]}>
                <TouchableWithoutFeedback onPress={handleAddheart}>
                    <View style={StyleSheet.absoluteFill}>
                        {state.hearts.map(({ start }, index) => (
                            <Heart 
                                key={index}
                                filled
                                style={{ 
                                    /**
                                     * This style property is important. Without this 
                                     * you will not see somany hearts appear in the screens 
                                     * */ 
                                    position: "absolute",
                                }} 
                                startPosition={start}
                            />
                        ))}
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
    center: {
        alignItems: "center",
        justifyContent: "center",
    },
})

export function FloatingHeartsOptions(){
    return {
        title: Strings.component_floating_hearts,
        headerTintColor: Colors.back,
        headerStyle: { 
            backgroundColor: Colors.theme_primary,
        },
    }
}