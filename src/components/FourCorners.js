import React, { useRef, } from "react"
import {
    StyleSheet,
    View,
    Animated,
    TouchableWithoutFeedback,
    Dimensions,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Colors, Strings } from "../values"


export default function FourCorners({ }){

    const animation = useRef(new Animated.ValueXY()).current
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

    const startAnimation = () => {
        //THis is not the perfect measureMent because of the safeAreaView. Measuring the View will be better but for demo this will do
        const { width, height } = Dimensions.get("window")

        /** We use an Animated.sqeuence which allows us to define the 
         * squence of the corners that we want to go to */
        const anim = Animated.sequence([
            /*FYI: we choose to use spring so that we dont have to define any particular timming ;) */

            /**
             * Going from the topLeft corner to the bottomLeft corner. 
             * This is a translateY so we only need to translate the Animated.ValueXY y property
             * */
            Animated.spring(animation.y, {
                //height of the screen minus our box. we dont necessary care what the height of our box or screen is
                toValue: height - measuredHeight.current,
                useNativeDriver: true,
            }),
            //translateX movement for the box moving from bottom-left corner to bottom-right corner
            Animated.spring(animation.x, {
                toValue: width - measuredWidth.current,
                useNativeDriver: true,
            }),

            /**To move our box back to the starting position(top-left),  we need to move to the top-right corner 
             * and then finally to the top-left. 
             * We know that at the top-left corner of the screen, xy value is 0,0
             * */
            Animated.spring(animation.y, {
                toValue: 0,
                useNativeDriver: true,
            }),
            Animated.spring(animation.x, {
                toValue: 0,
                useNativeDriver: true,
            }),
        ])

        anim.start()
    }

    const animatedStyles = {
        /**
         * The getTranslateTransform is a helper method that will return an 
         * array with a translateX and translateY for the X and Y of our animation.
         *  */
        transform: animation.getTranslateTransform()
    }

    return(
        <SafeAreaView style={styles.container} edges={["bottom", "left", "right"]}>
            <View style={styles.container}>
                <TouchableWithoutFeedback
                    onPress={startAnimation}
                    onLayout={saveDimensions /** TouchableWithoutFeedback does a clone 
                    of the single child component passed and proagates the onLayout to its child nodes. 
                    So this is a good place to measure instead of the Animated.view*/}
                >
                    <Animated.View style={[styles.box, animatedStyles]} />
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