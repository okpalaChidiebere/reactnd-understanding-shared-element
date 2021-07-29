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

                    /**
                     * extractOffset was suppose to set x and y values to 0 but it actually did not
                     * This resulted ins a space between the first item that has the panHandler and the other heads. So the dragging looked of
                     * This also resulted to the heads at the back being thrown off screen after you finished dragging the first item. But visually you will see it there
                     */
                    animation.setValue({ x: 0, y: 0 }) //necessary was necessary
                })
            },
            onPanResponderMove: (e, { dx, dy }) => {
                //We only want to setValues for the first Head.
                heads[0].animation.setValue({
                    x: dx,
                    y: dy,
                })

                /** Now lets control the other heads to  stagger to wherever you drag the first head*/
                const otherHeads = heads.slice(1).map //we did not pick the first head because we are not staggering it
                (({ animation }, index ) => {
                    /** 
                     * Each head will have to sprint to the new loaction once the first head moves
                     * This will have each head operating on a separate animation. So a stagger will actually happen */
                    Animated.sequence([
                        Animated.delay(index * 10), //we want to cause a delay for each animation base don the head. This will create the small distance between heads
                        Animated.spring(animation, {
                            toValue: { x: dx, y: dy },
                            useNativeDriver: false,
                        }),
                    ]).start()

                    /** 
                     * Note the animatins we implementd is similar to Animated.stagger() But using Animated.stagger did not really gve us the effect we want
                     * https://codedaily.io/courses/Master-React-Native-Animations/Stagger
                     * */
                })
            },
            // onPanResponderRelease: (e, gestaureState) => {} //Since mo release animation, so we dont need this. But theoretically you 
            //could animate and lock a head to either the left or right side depending on it's position.
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