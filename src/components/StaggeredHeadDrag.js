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

    /** 
     * When we were breaking down the animation, we noticed that we will have to so some sort of drag
     * This means we will set up a PanResonder and it is only going to be a single PanResponder for our first
     * top draggable head
     * */
    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: (e, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onPanResponderGrant: (e, gestureState) => {},
            onPanResponderMove: (e, gestureState) => {},
            // onPanResponderRelease: (e, gestaureState) => {} //Since mo release animation, so we dont need this
        })
    ).current

    return (
        <SafeAreaView style={styles.container} edges={["bottom", "left", "right"]}>
            <View style={styles.container}>
                {heads.slice(0).reverse().map((item, index, items) => {
                    return (
                        <ImageBackground
                            key={index}
                            source={item.image}
                            //imageStyle={{ borderRadius: 40 }}
                            style={[styles.head]}
                        >
                        <Text>
                            {item.text}
                        </Text>
                        </ImageBackground>
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