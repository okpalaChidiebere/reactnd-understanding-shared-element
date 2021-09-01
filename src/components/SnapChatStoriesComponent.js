import React, { useLayoutEffect, useRef } from "react"
import { StyleSheet, View, ScrollView, Dimensions } from "react-native"
import { useSharedValue, withTiming, Easing } from "react-native-reanimated"
import StoryThumbnail from "./StoryThumbnail"
import { Colors } from "../values"

export const stories = [
    {
      id: "2",
      source: require("../assets/stories/2.jpg"),
      user: "derek.russel",
      avatar: require("../assets/avatars/derek.russel.png"),
    },
    {
      id: "4",
      source: require("../assets/stories/4.jpg"),
      user: "jmitch",
      avatar: require("../assets/avatars/jmitch.png"),
    },
    {
      id: "7",
      source: require("../assets/stories/7.jpg"),
      user: "andrea.schmidt",
      avatar: require("../assets/avatars/andrea.schmidt.png"),
      video: require("../assets/stories/7.mp4"),
    },
    {
      id: "5",
      source: require("../assets/stories/5.jpg"),
      user: "monicaa",
      avatar: require("../assets/avatars/monicaa.png"),
    },
    {
      id: "3",
      source: require("../assets/stories/3.jpg"),
      user: "alexandergarcia",
      avatar: require("../assets/avatars/alexandergarcia.png"),
    },
    {
      id: "1",
      source: require("../assets/stories/1.jpg"),
      user: "andrea.schmidt",
      avatar: require("../assets/avatars/andrea.schmidt.png"),
    },
    {
      id: "6",
      source: require("../assets/stories/6.jpg"),
      user: "andrea.schmidt",
      avatar: require("../assets/avatars/andrea.schmidt.png"),
    },
];

const { height } = Dimensions.get("window")

export default function SnapChatStoriesComponent(){

  const animationArrays = useRef([])

  const setInitialPosition = (animation) => {
    //const maxWidthOffset = Number(width.toFixed(2))
    const maxWidthOffset = Dimensions.get("window").width / 2 - 16 * 2 //for grid, it makesense to use basically the item width. If it was not a grid, we would use the window width
    const maxHeightOffset = Number(height.toFixed(2))

    // setup random initial state
    const xOffset = (Math.random() * (10 - (-10) + 1) + (-10)) * maxWidthOffset
    const yOffset = (Math.random() * (10 - (-10) + 1) + (-10)) * maxHeightOffset
    //more on random min max https://www.codegrepper.com/code-examples/javascript/generate+random+float+number+in+range+javascript

    animation.translateX.value = xOffset * -1
    animation.translateY.value = yOffset * -1
  }

  useLayoutEffect(() => {

    /** craft us an array of timming animations that we will run in parallel */
    animationArrays.current.map( animation => {  
       // now animate the storyThumbnails back into their natural position    
      animation.translateX.value = withTiming(0, 
        { 
          duration: 1000, 
          /**
           * We crafted our own easing and applied to Easing.in
           * https://animationbook.codedaily.io/animated-timing/
           * https://reactnative.dev/docs/0.60/easing#bezier
           * 
           * You have to play around with thus bezier to make sure 
           * motion is on a straight line. Make sure there is no overlapping paths 
           * Read docs to learn more about this.
           */
          easing: Easing.in(Easing.bezier(.12,1,.62,0.95)), //this is similar to easeIn
        }
      )
      animation.translateY.value = withTiming(0, 
        { 
          duration: 1000, 
          easing: Easing.in(Easing.bezier(.12,1,.62,0.95)), //this is similar to easeIn
        }
      )
    })

  }, [])

    return (
        <View style={styles.flex}>
            <ScrollView>
                <View style={styles.container}>
                    {stories.map((story) => {
                      const animation = {
                        translateX: useSharedValue(),
                        translateY: useSharedValue(),
                      }

                      setInitialPosition(animation)
                      animationArrays.current.push(animation)
                      return (
                        <StoryThumbnail key={story.id} story={story} animation={animation}/>
                      )
                    })}
                </View>
            </ScrollView>
        </View>
    )
}

export function SnapChatStoriesComponentOptions({ }){
    return {
        title: "Snapchat Stories",
        headerTintColor: Colors.back,
      headerStyle: { 
        backgroundColor: Colors.theme_primary,
      },
    }
}

const styles = StyleSheet.create({
    flex: {
      flex: 1
    },
    container: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
    },
})