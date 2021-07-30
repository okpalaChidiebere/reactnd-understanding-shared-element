import React from "react"
import { Text, View, StyleSheet, Platform, TouchableOpacity, ScrollView }  from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Colors, Strings } from "../values"

function Heading3(props){
  const { light, ...otherProps } = props
  return (
    <Text
      {...otherProps}
      style={[styles.heading3, light ? styles.light : undefined, props.style]}
    />
  )
}

function Caption(props){
  const { light, ...otherProps } = props
  return (
    <Text
      {...otherProps}
      style={[styles.caption, light ? styles.light : undefined, props.style]}
    />
  )
}

export default function MainComponent(props){

  const onPressSnapchatDemo = () => {
    const { navigation } = props
    if (navigation) {
      navigation.push(Strings.component_snapchat_stories)
    }
  }

  const onPressXYZReaderDemo = () => {
    const { navigation } = props
    if (navigation) {
      navigation.push(Strings.component_xyz_reader)
    }
  }

  const onPressPanResponserTest = () => {
    const { navigation } = props
    if (navigation) {
      navigation.push(Strings.component_panresponser_test)
    }
  }

  const onPressKittenCards = () => {
    const { navigation } = props
    if (navigation) {
      navigation.push(Strings.component_Kitten_cards)
    }
  }

  const onPressStaggeredHeadsDrag = () => {
    const { navigation } = props
    if (navigation) {
      navigation.push(Strings.component_staggered_head_drag)
    }
  }

  const onPressAnimateSVG = () => {
    const { navigation } = props
    if (navigation) {
      navigation.push(Strings.component_animated_svg)
    }
  }

  const onPressAnimateHidden = () => {
    const { navigation } = props
    if (navigation) {
      navigation.push(Strings.component_unmount_animations)
    }
  }

  return (
    <SafeAreaView style={styles.container} edges={["bottom", "left", "right"]}>
      <ScrollView style={styles.content} endFillColor={Colors.empty}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={onPressSnapchatDemo}
        >
          <View style={styles.demoItemContainer}>
            <View style={styles.demoItemContent}>
              <Heading3>SnapChat Stories Demo</Heading3>
              <Caption style={styles.description}>
                Snapchat stories Shared Transition. We have a list of Stories. 
                We can top on one to ee the detail. We can drag the detail screen 
                around as well. As we move the storydetail screen the scale will be different
              </Caption>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={onPressXYZReaderDemo}
        >
          <View style={styles.demoItemContainer}>
            <View style={styles.demoItemContent}>
              <Heading3>XYZ Reader Demo</Heading3>
              <Caption style={styles.description}>Article Reveal with shared element transitions </Caption>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={onPressPanResponserTest}
        >
          <View style={styles.demoItemContainer}>
            <View style={styles.demoItemContent}>
              <Heading3>Basics of Understanding Gestures</Heading3>
              <Caption style={styles.description}>Maintain Touchable Items with a Parent PanResponder in React Native</Caption>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={onPressKittenCards}
        >
          <View style={styles.demoItemContainer}>
            <View style={styles.demoItemContent}>
              <Heading3>Kitten Cards Demo</Heading3>
              <Caption style={styles.description}>Dragging cards left/right has become the new way to quickly make decisions on apps. 
              Adding draggable card stacks can take some fine tuning to get the ideal feeling for your app. We'll walk through how to 
              implement the drag and additionally add an extra animation step to scale in the next card.</Caption>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={onPressStaggeredHeadsDrag}
        >
          <View style={styles.demoItemContainer}>
            <View style={styles.demoItemContent}>
              <Heading3>Staggered Head Drag</Heading3>
              <Caption style={styles.description}>This is an animation similar to FB heads drags for chats</Caption>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={onPressAnimateSVG}
        >
          <View style={styles.demoItemContainer}>
            <View style={styles.demoItemContent}>
              <Heading3>Flubber and Animated for Better SVG Path Morphing</Heading3>
              <Caption style={styles.description}>Animate Simple SVG paths. You must have the start path (default image or icon you render)
              and End Path (the next image or icon you can to animate to)</Caption>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={onPressAnimateHidden}
        >
          <View style={styles.demoItemContainer}>
            <View style={styles.demoItemContent}>
              <Heading3>Animate Hidden</Heading3>
              <Caption style={styles.description}>Animated doesn't support unmounting animations, which means you need to manually control 
              whether or not an item will stay mounted via state. We learned how to handle Interuped Animations as well. Handling interrupted 
              animations is a crucial part of the user experience. Generally when animations are quick, or they are a single animation the 
              chances of being interrupted is lower. However when dealing with more complex, and longer running animations you don't want 
              to trap the user after they have made a mistake.</Caption>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
      flex: 1
  },
  content: Platform.select({
    ios: {
      flex: 1,
      backgroundColor: Colors.empty
    },
    android: {
      flex: 1
    }
  }),
  demoItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.back,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderColor: Colors.separator,
    borderBottomWidth: StyleSheet.hairlineWidth,
    minHeight: 60,
  },
  demoItemContent: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start"
  },
  description: {
    marginTop: 1
  },
  heading3: {
    fontSize: 17,
    fontWeight: "700",
    color: Colors.text
  },
  light: {
    color: Colors.back
  }
})

export function MainComponentOptions(){
  return {
      title: Strings.app_name,
      headerTintColor: Colors.back,
      headerStyle: { 
        backgroundColor: Colors.theme_primary,
      },
  }
}