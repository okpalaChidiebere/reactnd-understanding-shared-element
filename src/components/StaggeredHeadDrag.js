import React, { useState } from "react"
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
} from "react-native"
import Animated, { 
    useSharedValue, 
    useAnimatedGestureHandler,
    useAnimatedStyle,
    withSpring,
} from "react-native-reanimated"
import { PanGestureHandler } from "react-native-gesture-handler"
import { SafeAreaView } from "react-native-safe-area-context"
import { Colors, Strings } from "../values"

const AnimatedImageBackground = Animated.createAnimatedComponent(ImageBackground)

const Head = ({ item, isFirst, pan }) => {

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: item.animationX.value,
                },
                {
                    translateY: item.animationY.value,
                },
            ]
        }
    })

    return (
        isFirst 
        ? (
            <PanGestureHandler onGestureEvent={pan}>
                <AnimatedImageBackground
                    source={item.image}
                    style={[
                        styles.head,
                        animatedStyle
                    ]}
                >
                {item.text && <Text>
                    {item.text}
                </Text>}
                </AnimatedImageBackground>
            </PanGestureHandler>
        )
        : (
            <AnimatedImageBackground
                source={item.image}
                style={[
                    styles.head,
                    animatedStyle
                ]}
            >
            {item.text && <Text>
                {item.text}
            </Text>}
            </AnimatedImageBackground>
        )
    )
}

export default function StaggeredHeadDrag({ }){

    const initialState = [
        {
          image: require("../assets/avatars/andrea.schmidt.png"),
          //this helps us control the exact position for each of the heads
          animationX: useSharedValue(0),
          animationY: useSharedValue(0),
          text: "Drag Me",
        },
        {
          image: require("../assets/avatars/andrea.schmidt.png"),
          animationX: useSharedValue(0),
          animationY: useSharedValue(0),
        },
        {
          image: require("../assets/avatars/andrea.schmidt.png"),
          animationX: useSharedValue(0),
          animationY: useSharedValue(0),
        },
        {
          image: require("../assets/avatars/andrea.schmidt.png"),
          animationX: useSharedValue(0),
          animationY: useSharedValue(0),
        },
    ]

    const [heads, setHeads] = useState(initialState)

    /** 
     * When we were breaking down the animation, we noticed that we will have to so some sort of drag
     * This means we will set up a PanResonder and it is only going to be a single PanResponder for our first
     * top draggable head
     * */
    const headDragGestureHandler = useAnimatedGestureHandler({
        onStart(event, context){
            /** 
             * Since we know the View you are dragging is going to stay where its at after being dragged we will need to store the 
             * previous position of the view so that you can continue to drag the head from that exact same position where you left
             * 
             * We are going to store this previous translateX and translateY in the context. we will retrive this value stored when
             * we start dragging(onActive)
             * */
            context.translateX = heads[0].animationX.value
            context.translateY = heads[0].animationY.value
        },
        onActive(event, context){
            //We only want to setValues for the first Head.
            //NOTE: we still access headElemet from index 0 because we rendered a copy of the heads in reverse order. so it dont affect the order of our main head
            heads[0].animationX.value = event.translationX + context.translateX
            heads[0].animationY.value = event.translationY + context.translateY

            /** Now we control the other heads to stagger to wherever you drag the first head */
            heads.slice(1).map //we did not pick the first head because we are not staggering it
            (({ animationX, animationY }, index ) => {
                /** 
                 * Each head will have to sprint to the new loaction once the first head moves
                 * This will have each head operating on a separate spring animation. 
                 * The for each spring animation, we make each head heavier so a stagger effect will actually happen
                 * 
                 * FYI: using a withDelay before each spring animation will not cause the effect we want
                 * */
                animationX.value = withSpring(
                    event.translationX + context.translateX, 
                    { mass: index + .2, damping: 15 }
                )
                animationY.value = withSpring(event.translationY + context.translateY, { mass: index + .2, damping: 15 })
            })
        },
    })

    return (
        <SafeAreaView style={styles.container} edges={["bottom", "left", "right"]}>
            <View style={styles.container}>
                {heads
                .slice(0) //shallow clone the heads
                /**
                 * The order in which you render elements in react native matters.
                 * 
                 * we reverse the list so the first head will actually appear on top 
                 * so that we can drag it around. Another way you can tackle thiis without
                 * reversing the list is by setting the z-index for the heads but this will do
                 */
                .reverse()
                .map((item, index, items) => {
                    //console.log(index, items.length - 1)
                    //console.log(item.text)
                    return (
                        <Head 
                            key={index /**Remember ideally you want to use Ids. But for now this will do */} 
                            item={item}
                            isFirst={index === items.length - 1} //Beacuse the item we want to drag is at the end, we have to check for it
                            pan={headDragGestureHandler}
                        />
                    )
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
        /**
         * FYI: the alignItems and justifyCOntent of center will actually work 
         * even though our element has a position of absolute because we did not
         *  specify the top, left, right, bottom attributes
         */
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