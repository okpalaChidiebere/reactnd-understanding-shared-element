import React, { useRef } from "react"
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  PixelRatio,
} from "react-native"
import Animated, { useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated"
import { SafeAreaView } from "react-native-safe-area-context"
import { Colors, Strings } from "../values"

export default function ApplicationIntro(){
    const animation = useSharedValue(0)

    return(
        <SafeAreaView style={styles.container} edges={["bottom", "left", "right"]}>
            <View style={styles.container}>
                <Animated.ScrollView
                    style={styles.container} /** we want the scrollView to fill up the outside space*/
                    pagingEnabled /** makes pages based upon the width and the height of the scrollView. In our case, its the whole screen*/
                    horizontal /**enable horizonatal scroll for this */
                    scrollEventThrottle={16}
                    onScroll={useAnimatedScrollHandler(e => {
                        //because we are scrolling horizontally we choose the x offset
                        animation.value = e.contentOffset.x
                    })}
                >
                    
                </Animated.ScrollView>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
})

export function ApplicationIntroOptions(){
    return{
        title: Strings.component_application_intro,
        headerTintColor: Colors.back,
        headerStyle: { 
            backgroundColor: Colors.theme_primary,
        },
    }
}