import React, { useRef, } from "react"
import {
    StyleSheet,
    Text,
    View,
    Animated,
    TouchableWithoutFeedback,
    Dimensions,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Colors, Strings } from "../values"


export default function FourCorners({ }){

    const measuredWidth = useRef(null)
    const measuredHeight = useRef(null)

    const saveDimensions = (e) => {
        //nativeEvent.layout provides the width height, x and y
        /**
         * We want to save off the height and width and do our 
         * animations based on the dynamic width and height
         */
        measuredWidth.current = e.nativeEvent.layout.width
        measuredHeight.current = e.nativeEvent.layout.height
    }
    return(
        <SafeAreaView style={styles.container} edges={["bottom", "left", "right"]}>
            <View style={styles.container}>
                <TouchableWithoutFeedback
                    onLayout={saveDimensions /** TouchableWithoutFeedback does a clone 
                    of the single child component passed and proagates the onLayout to its child nodes. 
                    So this is a good place to measure instead of the Animated.view*/}
                >
                    <Animated.View style={[styles.box]} />
                </TouchableWithoutFeedback>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    box: {
      width: 150,
      height: 150,
      backgroundColor: "tomato",
      position: "absolute",
      top: 0,
      left: 0,
    },
})

export function FourCornersOptions(){
    return {
        title: Strings.component_four_corners,
        headerTintColor: Colors.back,
        headerStyle: { 
            backgroundColor: Colors.theme_primary,
        },
    }
}