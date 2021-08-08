import React, { useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native"
import Animated, { 
    interpolate, 
    useAnimatedStyle, 
    useSharedValue, 
    withDelay, 
    withSpring,
    withTiming,
    Extrapolate,
 } from "react-native-reanimated"

const Heart = ({ filled, isLiked, style, ...props }) => {
    const animation = useSharedValue(0)
    const { height } = Dimensions.get("window")

    const animatedStyle = useAnimatedStyle(() => {
        let style = { }

        if(props.effect){
            /** interpolation on the animation to create our effect */
            const { scale, x, y, rotate, opacity } = props.effect

            const scaleAnimation = interpolate(
                animation.value,
                [0, 1],
                [0, scale]
            )

            const xAnimation = interpolate(
                animation.value,
                [0, 1],
                [0, x]
            )

            const yAnimation = interpolate(
                animation.value,
                [0, 1],
                [0, y]
            )

            const rotateAnimation = interpolate(
                animation.value,
                [0, 1],
                [0, rotate]
            )

            const opacityAnimation = interpolate(
                animation.value,
                [0, 1],
                [0, opacity]
            )

            style = {
                opacity: opacityAnimation,
                transform: [
                    { scale: scaleAnimation },
                    { translateX: xAnimation },
                    { translateY: yAnimation },
                    { rotate: `${rotateAnimation}deg` }
                ]
            }
        } else if(props.heartButton){
            const bouncyHeart = interpolate(
                animation.value,
                [0, 1, 2],
                [1, .8, 1]
            )
            style = {
                transform: [
                    { scale: bouncyHeart }
                ]
            }
        } else if(props.startPosition){

          //The heart floating will consist of a series of animations
          const positionInterpolate = interpolate(
            animation.value,
            [0, height],
            [height - 50, 0], //we subtracted 50 from height because our height is 50px in height.

          )
          //the heart opacity will be one at starting position, and as it slides up, it will fade out
          const opacityInterpolate = interpolate(
              animation.value,
              [0, height - 200],
              [1, 0],
          )

          //The scale will make our heart to bubble up very quickly starting at 0 and look like it emerged on the scene
          const scaleInterpolate = interpolate(
              animation.value,
              [0, 15, 20],
              [0, 1.2, 1], //the heart will grow to 1.2 times its size and then back to its normal size
              Extrapolate.CLAMP //we dont want the heart to continue on scaling
          )

          //we want the heart to wobble 6 times on its way up
          const divideheight = height/6
          const wobbleInterpolate = interpolate(
              animation.value,
              [
                  0, 
                  divideheight * 1,
                  divideheight * 2,
                  divideheight * 3,
                  divideheight * 4,
                  divideheight * 5,
                  divideheight * 6
              ],
              //we just wobble back and forth between 15 and -15
              [
                  0,
                  15,
                  -15,
                  15,
                  -15,
                  15,
                  -15
              ],
              Extrapolate.CLAMP
          )


          style = {
              left: props.startPosition,//we want a random start position
              transform: [
                  { translateY: positionInterpolate },
                  { scale: scaleInterpolate },
                  { translateX: wobbleInterpolate }
              ],
              opacity: opacityInterpolate,
          }
        }
        
        return style
    })

    
    useEffect(() => {
        if (props.heartButton){
            animation.value = withSpring(props.heartButton, {}, () => {
                animation.value = 0 //to reset our bouncing heart animation so that we can respring tha animation if our button is pressed
            })
        } else if (props.effect){
            if (props.effect.delay && props.effect.spring){
                animation.value = withDelay(
                    props.effect.delay,
                    withSpring(props.effect.toValue)
                )
            } else if (props.effect.delay && props.effect.timming){
                animation.value = withDelay(
                    props.effect.delay,
                    withTiming(props.effect.toValue, { duration: 50 })
                )
            }
        } else if(props.startPosition){
          //Start the floating hearts animation
          animation.value = withTiming(height, { duration: 3000 })
        }
    }, [ props ])

  const centerNonFilled = (
    <View style={[StyleSheet.absoluteFill, styles.fit]}>
      <View style={[styles.leftHeart, styles.heartShape, styles.emptyFill]} />
      <View style={[styles.rightHeart, styles.heartShape, styles.emptyFill]} />
    </View>
  )
  const fillStyle = filled ? styles.filledHeart : styles.empty;

  return (
    <Animated.View {...props} style={[styles.heart, style, animatedStyle]}>
      <View style={[styles.leftHeart, styles.heartShape, fillStyle]} />
      <View style={[styles.rightHeart, styles.heartShape, fillStyle]} />
      {!filled && centerNonFilled}
    </Animated.View> 
  )
}

const styles = StyleSheet.create({
  heart: {
    width: 50,
    height: 50,
    backgroundColor: 'transparent',
  },
  heartShape: {
    width: 30,
    height: 45,
    position: 'absolute',
    top: 0,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  filledHeart: {
    backgroundColor: '#e31745',
  },
  fit: {
    transform: [
      { scale: .9}
    ]
  },
  emptyFill: {
    backgroundColor: "#FFF"
  },
  empty: {
    backgroundColor: "#ccc",
  },
  leftHeart: {
    transform: [
      {rotate: '-45deg'}
    ],
    left: 5
  },
  rightHeart: {
    transform: [
      {rotate: '45deg'}
    ],
    right: 5
  }
})

export default Heart;