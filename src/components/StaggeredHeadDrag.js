import React, { useState, useRef } from "react"
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Animated,
  PanResponder,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Colors, Strings } from "../values"

const initialState = [
    {
      image: require("../assets/avatars/andrea.schmidt.png"),
      animation: new Animated.ValueXY(), //this helps us control the exact position for each of the heads
      text: "Drag Me",
    },
    {
      image: require("../assets/avatars/andrea.schmidt.png"),
      animation: new Animated.ValueXY(),
    },
    {
      image: require("../assets/avatars/andrea.schmidt.png"),
      animation: new Animated.ValueXY(),
    },
    {
      image: require("../assets/avatars/andrea.schmidt.png"),
      animation: new Animated.ValueXY(),
    },
]

export default function StaggeredHeadDrag({ }){

    const [heads, setHeads] = useState(initialState)

    const AnimatedImageBackground = Animated.createAnimatedComponent(ImageBackground)

    /** 
     * When we were breaking down the animation, we noticed that we will have to so some sort of drag
     * This means we will set up a PanResonder and it is only going to be a single PanResponder for our first
     * top draggable head
     * */
    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: (e, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onPanResponderGrant: (e, gestureState) => {
                /** 
                 * Since we know the View you are dragging is going to stay where its at after being dragged we will need to use an extract offset.
                 * We are going to need to map over all the animated values and extract the offSet for each one 
                 * */
                heads.map(({ animation }) => {
                    /**
                     * Reset Animated.ValueXY to 0. This will keep your finger and the top head together as you drag. 
                     * if you dont do this there will be an increasing space between your finger and the item you are dragging while you drag. 
                     * We dont want that
                     */
                    animation.extractOffset()
                })
            },
            onPanResponderMove: (e, { dx, dy }) => {
                //We only want to setValues for the first Head.
                heads[0].animation.setValue({
                    x: dx,
                    y: dy,
                })
            },
            // onPanResponderRelease: (e, gestaureState) => {} //Since mo release animation, so we dont need this
        })
    ).current

    return (
        <SafeAreaView style={styles.container} edges={["bottom", "left", "right"]}>
            <View style={styles.container}>
                {heads
                .slice(0) //shallow clone the heads
                .reverse() //revers the list so the first head will actually appear on top so that we can drag it around. The did this same thing for KittenCards
                .map((item, index, items) => {

                    //Beacuse the  item we want to drag is at the end, we have to chack for it
                    const pan = index === items.length - 1 
                    ? panResponder.panHandlers : {} //NOTE: we returned an empty object so that we can continue the spread on all of the images
                    return (
                        <AnimatedImageBackground
                            {...pan}
                            key={index /**Remember ideally you want to use Ids. But for now this will do */}
                            source={item.image}
                            //imageStyle={{ borderRadius: 40 }}
                            style={[
                                styles.head,
                                {
                                    transform: item.animation.getTranslateTransform() //craft the translateXY for us
                                }
                            ]}
                        >
                        <Text>
                            {item.text}
                        </Text>
                        </AnimatedImageBackground>
                    );
                })}
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
    head: {
        width: 80,
        height: 80,
        borderRadius: 40,
        overflow: 'hidden',
        position: "absolute", //position of abosolute make sure the items are free floating; So the heads will stack on top of each other
        alignItems: "center",
        justifyContent: "center",
    },
})

export function StaggeredHeadDragOptions(){
    return {
        title: Strings.component_staggered_head_drag,
        headerTintColor: Colors.back,
        headerStyle: { 
            backgroundColor: Colors.theme_primary,
        },
    }
}