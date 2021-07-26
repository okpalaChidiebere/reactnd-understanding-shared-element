import React from "react"
import { StyleSheet, Dimensions } from "react-native"
import { Video } from "expo-av"
import { SharedElement } from "react-navigation-shared-element"
import { PanGestureHandler } from "react-native-gesture-handler"
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring, runOnJS, withTiming, interpolate, Extrapolate } from "react-native-reanimated"
import { snapPoint } from "react-native-redash"


const { height } = Dimensions.get("window")
const AnimatedVideo = Animated.createAnimatedComponent(Video) //Animathe the Expo Video component

const SnapChatStoriesDetails = ({ route, navigation }) => {

    const { story } = route.params

    /**
     *  We want thesame border radious that is in the StoryThumbnail to be on this page as well when the user is dragging the page around
     */
    const isGestureActive = useSharedValue(false)

    const translateX = useSharedValue(0)
    const translateY = useSharedValue(0)
    const handleGuestureEvent = useAnimatedGestureHandler({
      //onStart is called right about when the gesture starts.
      onStart: () => {
        isGestureActive.value = true
      },
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
          isGestureActive.value = false
      }
    })
    const animatedStyle = useAnimatedStyle(() => {
      /**
       * We interpolate the translateY. 
       * - At 0, the slaeValue will be 1 (fullScreenMode)
       * - At height, we scale the screen down to half
       * CLAMP means we dont want to go above 0.5 :)
       */
      const scale = interpolate(translateY.value, 
        [0, height], 
        [1, 0.5],
        Extrapolate.CLAMP
      )
      return {
        transform: [
          //FYI: we want the screen to stay in touch with our finger and the screen scale. So we multiply trasnlate values by scale
          { translateX: translateX.value * scale },
          { translateY: translateY.value * scale },
          { scale }
        ],
      }
    })

    const animatedBorderStyle = useAnimatedStyle(() => ({
      /** 
       * we do a transition to the borderRadius
       * 
       * Once the user starts dragging the detailScreen, we set the borderRadius, otherwise 
       * the borderRadius will be 0 meaning the detailScreen is in fullScreen
       *  */
      borderRadius: withTiming(isGestureActive.value ? 20 : 0)
    }))

    return (
      <PanGestureHandler onGestureEvent={handleGuestureEvent}>
        <Animated.View style={[{ flex: 1}, animatedStyle]}>
          <SharedElement id={story.id} style={{ flex: 1}}>
              {!story.video && (
                <Animated.Image
                  source={story.source}
                  style={[
                    {
                      ...StyleSheet.absoluteFillObject,
                      width: undefined,
                      height: undefined,
                      resizeMode: "cover",
                    },
                    animatedBorderStyle,
                  ]}
                />
              )}
              {story.video && (
                <AnimatedVideo
                  source={story.video}
                  rate={1.0}
                  isMuted={false}
                  resizeMode="cover"
                  shouldPlay
                  isLooping
                  style={[StyleSheet.absoluteFill, animatedBorderStyle]}
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