import React, { useState } from "react"
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
} from "react-native"
import Animated, {  } from "react-native-reanimated"
import { SafeAreaView } from "react-native-safe-area-context"
import { Colors, Strings } from "../values"
import Heart from "./Heart"


export default function ExplodingHeartButton(){
    const [liked, setLiked] = useState(false)

    const triggerLike = () => {

    }

    return (
        <SafeAreaView style={styles.container} edges={["bottom", "left", "right"]}>
            <View style={[styles.container, styles.center]}>
                <View>
                    <TouchableWithoutFeedback onPress={triggerLike}>
                        <Animated.View>
                            <Heart filled={liked}/>
                        </Animated.View>
                    </TouchableWithoutFeedback>
                </View>
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

export function ExplodingHeartButtonOptions(){
    return{
        title: Strings.component_exploding_hearts,
        headerTintColor: Colors.back,
        headerStyle: { 
            backgroundColor: Colors.theme_primary,
        },
    }
}