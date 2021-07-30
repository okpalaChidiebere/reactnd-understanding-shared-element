import React, { useRef, useEffect } from "react"
import {
  StyleSheet,
  View,
  Animated,
  TouchableWithoutFeedback,
  Easing
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import Svg, { Path } from "react-native-svg"
import { interpolate } from "flubber" //fLubber is used for smoother animations in between SVG paths https://github.com/veltman/flubber
import { Colors, Strings } from "../values"

//I got these values from here https://github.com/udacity/ud862-samples/blob/master/TickCross/app/src/main/res/values/tick_cross.xml
const ic_tick = `M4.8,13.4 L9,17.6 M10.4,16.2 L19.6,7`
const ic_cross = `M6.4,6.4 L17.6,17.6 M6.4,17.6 L17.6,6.4`

export default function AnimatedSvg({ }){

    const startPath = ic_tick
    const endPath = ic_cross
    const _path = useRef() //helps us to be able to call setNativeProps() method
    const animation = useRef(new Animated.Value(0)).current
    /**
     * Animated does not support anmating SVG paths; however flubber interpolate does
     * So we can just pass the two strings we want to interpolate between and it do the interpolation for us.
     * interpolate from flubber has the ability to
     */
    const pathInterpolate = interpolate(startPath, endPath, {
        maxSegmentLength: 1,
    })

    useEffect(() => {
        animation.addListener(({ value }) => {
          const path = pathInterpolate(value)

          /**
           * Setting the props(with setNativeProps) is how animated works.
           * Using setNativeProps we can by pass setState. every single React-native components have this function as props
           * 
           * In our case, it makesense to use setNativeProps to update that props dynamically
           */
          _path.current.setNativeProps({ d: path }) //remeber the Path component have the d props passed to it
        })
        return () => animation.removeAllListeners()//remove the listener once this comonent unmoints
    }, [])

    const handlePress = () => {
        Animated.sequence([
          Animated.timing(animation, {
            toValue: 1,
            duration: 300,
            easing: Easing.linear, //optional. see more https://codedaily.io/courses/Master-React-Native-Animations/Easing
            useNativeDriver: true,
          }),
          Animated.delay(1500),
          Animated.timing(animation, {
            toValue: 0,
            duration: 300,
            easing: Easing.bounce, //optional
            useNativeDriver: true,
          }),
        ]).start()
    }

    return (
        <SafeAreaView style={styles.container} edges={["bottom", "left", "right"]}>
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={handlePress}>
                    <Svg width={120} height={120}>
                        <Path
                            scale={3}
                            d={startPath}
                            stroke="black"
                            ref={_path}
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