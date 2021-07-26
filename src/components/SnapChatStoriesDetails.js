import React from "react"
import { Image, StyleSheet, Dimensions } from "react-native"
import { Video } from "expo-av"
import { SharedElement } from "react-navigation-shared-element"
import { PanGestureHandler } from "react-native-gesture-handler"
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring, runOnJS } from "react-native-reanimated"
import { snapPoint } from "react-native-redash"


const { height } = Dimensions.get("window")

const SnapChatStoriesDetails = ({ route, navigation }) => {

    const { story } = route.params
    const translateX = useSharedValue(0)
    const translateY = useSharedValue(0)
    const handleGuestureEvent = useAnimatedGestureHandler({
      //onActive is called when you are dragging around the direct child Animated View that the PanGestureHandler wraps
      onActive: ({ translationX, translationY }) => {
        //we need the translateX and translateY to do the scaling of the AnimatedView
        translateX.value = translationX
        translateY.value = translationY
      },
      //onEnd is called when the direct Child of the (which must be an Animated View) that the PanGestureHandler wraps is been released or no more being dragged
      onEnd: ({ velocityX, velocityY }) => {
        //we need the VelocityX and VelocityY to do the spring animation of the Animated View (the whole DetailScreen in our case)
        /** 
         * When we release the gesture there are two animations possible for our useCase
         * 1. Either we spring the animatedView back to full screen by having a spring animaton moving translateX and translateY back to 0
         * 2. Or we go back to the master screen and let the Shared transition deal with doing the transition from currnet 
         *    state of the details screen back to the master screen by calling navigation.goBack()
         * */

        //So to detect if we have to go back to master screen or not we have to calculate the snapPoint. 
        const goback = 
          snapPoint(translateY.value, velocityY, [0, height]) === height //we are caluclating the Vertical(translateY.value & velocityY) values and how far away they are from the top(0) or bottom(height) of the screen

          //we go back to the master screen if the gesture is at the bottom of the screen
          if(goback){
            /** scenario 2 */
            runOnJS(navigation.goBack)() //we let SharedElement take care of the rest. FYI, All Js code you want to run inside onGestureEvent function can only be done inside runOnJS() method
          }else {
            //scenario 1
            translateX.value = withSpring(0, { velocity: velocityX})
            translateY.value = withSpring(0, { velocity: velocityY})
          }
      }
    })
    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [
          { translateX: translateX.value },
          { translateY: translateY.value },
        ],
      }
    })

    return (
      <PanGestureHandler onGestureEvent={handleGuestureEvent}>
        <Animated.View style={[{ flex: 1}, animatedStyle]}>
          <SharedElement id={story.id} style={{ flex: 1}}>
              {!story.video && (
                <Image
                  source={story.source}
                  style={[
                    {
                      ...StyleSheet.absoluteFillObject,
                      width: undefined,
                      height: undefined,
                      resizeMode: "cover",
                      borderRadius: 0
                    },
                  ]}
                />
              )}
              {story.video && (
                <Video
                  source={story.video}
                  rate={1.0}
                  isMuted={false}
                  resizeMode="cover"
                  shouldPlay
                  isLooping
                  style={[StyleSheet.absoluteFill, { borderRadius: 0 }]}
                />
              )}
          </SharedElement>
        </Animated.View>
      </PanGestureHandler>
    )
}

SnapChatStoriesDetails.sharedElements = (route) => [
  route.params.story.id
]
export default SnapChatStoriesDetails