import React, { useState, useRef } from "react"
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Colors, Strings } from "../values"
import Heart from "./Heart"


const initialstate = {
    explodeHearts: [
        { toValue: null, scale: .4, y: -280, x: 0, rotate: 10, opacity: .7 },
        { toValue: null, scale: .7, y: -120, x: 40, rotate: 45, opacity: .5 },
        { toValue: null, scale: .8, y: -120, x: -40, rotate: -45, opacity: .3 },
        { toValue: null, scale: .3, y: -150, x: 120, rotate: -35, opacity: .6 },
        { toValue: null, scale: .3, y: -120, x: -120, rotate: -35, opacity: .7 },
        { toValue: null, scale: .8, y: -60, x: 0, rotate: 35, opacity: .8 },
    ],
    //for our bouncingButton
    bounceHeart: { 
        toValue: null,
    }
}
export default function ExplodingHeartButton(){
    const [liked, setLiked] = useState(false)
    const delay = useRef([1, 50, 100, 150, 200, 250]) //having this delay array for each exploding heart will cause the hearts to explode in a staggering manner
    const [state, setState] = useState(initialstate)

    const triggerLike = () => {
        setLiked(!liked)

        const showAnimation = state.explodeHearts.map((heart, index) => {
            return { ...heart, delay: delay.current[index], toValue: 1, spring: true }
        })
        /**
         * This will run our animatiuon in parallel, the button will bounce an the hearts exploding out as well
         * ReanimatedV2 does not have parallel animations :(
         *  */
        setState({
            explodeHearts: showAnimation,
            bounceHeart: { toValue: 2 },
        })

        //NOTE: Our Hearts will hide in the reverse direction. If you want change that, you can reverse the delay array
        const hideAnimation = state.explodeHearts.map((heart, index) => {
            return { ...heart, delay: delay.current[index], toValue: 0, timming: true }
        })

        setTimeout(() => setState({
            explodeHearts: hideAnimation,
            bounceHeart: { toValue: null }
        }), 1000)
    }

    return (
        <SafeAreaView style={styles.container} edges={["bottom", "left", "right"]}>
            <View style={[styles.container, styles.center]}>
                <View>
                    {state.explodeHearts.map((heart, index) => {
                        return <Heart filled style={styles.heart} effect={heart} key={index} />
                    })}
                    <TouchableWithoutFeedback onPress={triggerLike}>
                        <Heart filled={liked} heartButton={state.bounceHeart.toValue}/>
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
    heart: {
        position: "absolute",
        top: 0,
        left: 0
      }
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