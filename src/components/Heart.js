import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native"
import Animated, { 
    interpolate, 
    useAnimatedStyle, 
    useSharedValue, 
    withDelay, 
    withSpring,
    withTiming,
 } from "react-native-reanimated"

const Heart = ({ filled, isLiked, style, ...props }) => {
    const animation = useSharedValue(0)

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