import React from "react"
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
} from "react-native"
import Animated, { 
    useSharedValue, 
    runOnJS, 
    withTiming,  
    useAnimatedProps, 
    withSequence, 
    withDelay,
    Easing,
} from "react-native-reanimated"
import { interpolatePath, parse } from "react-native-redash" //you must import react-native-reanimated bfore you import react-native-redash
import { SafeAreaView } from "react-native-safe-area-context"
import Svg, { Path } from "react-native-svg"
import { interpolate } from "flubber" //fLubber is used for smoother animations in between SVG paths https://github.com/veltman/flubber
import { Colors, Strings } from "../values"

//I got these values from here https://github.com/udacity/ud862-samples/blob/master/TickCross/app/src/main/res/values/tick_cross.xml
const ic_tick = `M4.8,13.4 L9,17.6 M10.4,16.2 L19.6,7`
const ic_cross = `M6.4,6.4 L17.6,17.6 M6.4,17.6 L17.6,6.4`

const shape1 = parse("M4.8,13.4 L9,17.6 M10.4,16.2 L19.6,7")
const shape2 = parse("M6.4,6.4 L17.6,17.6 M6.4,17.6 L17.6,6.4")


const AnimatedPath = Animated.createAnimatedComponent(Path)

export default function AnimatedSvg({ }){

    const startPath = ic_tick
    const endPath = ic_cross
    const animation = useSharedValue(0)
    const d = useSharedValue()

    /** 
     * because  interpolate from flubber is an external library and it is not marked as worklet like
     * interpolatePath from react-native-redash, we will must use a callback to run this code and pass this
     * callback to  runOnJS() to be able to run this code in reanimatedV2 hooks
    */
    const handleInterpolatePath = (progress) => {
        const pathInterpolate = interpolate(startPath, endPath, {
            maxSegmentLength: 1,
        })
        d.value = pathInterpolate(progress.value)
    }

    /**SIDE NOTE: 
    * Setting the props(with setNativeProps) is how animated works.
    * Using setNativeProps we can by pass setState. every single React-native components have this function as props
    * 
    * In our case, it makesense to use setNativeProps to update that props dynamically
    * useAnimatedProps() from reanimatedV2 uses the setNativeProps behind the scenes!
    */
    const animatedProps = useAnimatedProps(() => {
        /**
         * Animated does not support anmating SVG paths; however flubber interpolate react-native-redash interplatePath does
         * 
         * For flubber we can just pass the two strings we want to interpolate between and it do the interpolation for us.
         * interpolate from flubber has the ability to
         * 
         * For interpolatePath method works well when you want to morph between more than two svg paths
         * this method is already worklet but for some reason, the cross_tick path was not drawn properly.
         * I will have to look into mastering basics of SVG
         */
        runOnJS(handleInterpolatePath)(animation)
        return {
          d: d.value,
          //d: interpolatePath(animation.value, [0, 1], [shape1, shape2])
        }
    })

    const handlePress = () => {
        animation.value = withSequence(
            withTiming(1, { duration: 300, easing: Easing.linear }),
            withDelay(1500, withTiming(0, { duration: 300 })),
        )
    }

    return (
        <SafeAreaView style={styles.container} edges={["bottom", "left", "right"]}>
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={handlePress}>
                    <Svg width={120} height={120}>
                        <AnimatedPath
                            scale={3}
                            stroke="black"
                            animatedProps={animatedProps}
                            /** Addtional props to correctly have the tick icon look good*/
                            strokeWidth={2}
                            strokeLinecap="square"
                        />
                    </Svg>
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
})

export function AnimatedSvgOptions(){
    return {
        title: Strings.component_animated_svg,
        headerTintColor: Colors.back,
        headerStyle: { 
            backgroundColor: Colors.theme_primary,
        },
    }
}