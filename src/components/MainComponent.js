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

  const onPress4Corners = () => {
    const { navigation } = props
    if (navigation) {
      navigation.push(Strings.component_four_corners)
    }
  }

  const onPressStaggerFromItemsOpacity = () => {
    const { navigation } = props
    if (navigation) {
      navigation.push(Strings.component_stagger_form_items)
    }
  }

  const onPressProgressBarButton = () => {
    const { navigation } = props
    if (navigation) {
      navigation.push(Strings.component_progress_bar_button)
    }
  }

  const onPressDynamicNotifications = () => {
    const { navigation } = props
    if (navigation) {
      navigation.push(Strings.component_animated_notifications)
    }
  }

  const onPressAnimatedQuestionare = () => {
    const { navigation } = props
    if (navigation) {
      navigation.push(Strings.component_animated_questionare)
    }
  }

  const onPressCustomSharedElement = () => {
    const { navigation } = props
    if (navigation) {
      navigation.push(Strings.component_custom_shared_element)
    }
  }

  const onPressColorPicker = () => {
    const { navigation } = props
    if (navigation) {
      navigation.push(Strings.component_color_picker)
    }
  }

  const onPressFABMenu = () => {
    const { navigation } = props
    if (navigation) {
      navigation.push(Strings.component_fab_with_menu)
    }
  }

  const onPressAppIntro = () => {
    const { navigation } = props
    if (navigation) {
      navigation.push(Strings.component_application_intro)
    }
  }

  const onPressEvolveWriteButton = () => {
    const { navigation } = props
    if (navigation) {
      navigation.push(Strings.component_evolve_write_button)
    }
  }

  const onPressAnimateModalSwipe = () => {
    const { navigation } = props
    if (navigation) {
      navigation.push(Strings.component_modal_with_animation)
    }
  }

  const onPressInputWithSuccess = () => {
    const { navigation } = props
    if (navigation) {
      navigation.push(Strings.component_input_with_success_message)
    }
  }

  const onPressExplodingHearts = () => {
    const { navigation } = props
    if (navigation) {
      navigation.push(Strings.component_exploding_hearts)
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
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={onPress4Corners}
        >
          <View style={styles.demoItemContainer}>
            <View style={styles.demoItemContent}>
              <Heading3>4 Corners</Heading3>
              <Caption style={styles.description}>When a press on a box, it springs to all the four corners of the screen and back to its original
               point(top-left corner)</Caption>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={onPressStaggerFromItemsOpacity}
        >
          <View style={styles.demoItemContainer}>
            <View style={styles.demoItemContent}>
              <Heading3>Stagger Form Items Visibility on Mount</Heading3>
              <Caption style={styles.description}>There may be times where you want to have an effect on mount. In some cases a subtle hidden
              - visible effect. This can be applied to many different elements for example google does a slight translate/fade for it's now cards. 
              We'll apply it to inputs of a login form.</Caption>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={onPressProgressBarButton}
        >
          <View style={styles.demoItemContainer}>
            <View style={styles.demoItemContent}>
              <Heading3>Animated Progress Bar Button</Heading3>
              <Caption style={styles.description}>This is nothing unique to this tutorial but demonstrates a decent animation. 
              It provides the user with instant feedback and localized to the action that they took.</Caption>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={onPressDynamicNotifications}
        >
          <View style={styles.demoItemContainer}>
            <View style={styles.demoItemContent}>
              <Heading3>Dynamic Animated Notifications</Heading3>
              <Caption style={styles.description}>Adding a system for errors, and notifications to your app is crucial. 
              It provides valuable feedback so your users can stay informed, and take necessary actions. React Native 
              makes it easy to build a notification view that can be dynamically sized and animate so that feedback 
              isn't jarring.</Caption>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={onPressAnimatedQuestionare}
        >
          <View style={styles.demoItemContainer}>
            <View style={styles.demoItemContent}>
              <Heading3>Animated Questionnaire with Progress Bar</Heading3>
              <Caption style={styles.description}>This demo is going to show how we can use state and animations to make
               it look like we have a smooth rendering of items. It is less than ideal to render hundreds of items. We'll 
               use something that I may consider a layout hack + a setState swap. Essentially animating an item to where 
               it will appear on the next state.</Caption>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={onPressCustomSharedElement}
        >
          <View style={styles.demoItemContainer}>
            <View style={styles.demoItemContent}>
              <Heading3>Photo Grid Shared Element</Heading3>
              <Caption style={styles.description}>We learn a techinique to do Shard element transitioning using width, 
              height and absolute positioning. This is one method you can do this, but there is other method out there
               as well. We are trasitioning elements in thesame screen and not across screens with navigations</Caption>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={onPressColorPicker}
        >
          <View style={styles.demoItemContainer}>
            <View style={styles.demoItemContent}>
              <Heading3>Animated Color Picker</Heading3>
              <Caption style={styles.description}>This tutorial will focus on constructing an animation piece by piece.
               When dealing with one view transitioning to another view in the same space it's easier to construct one 
               view without animation. Construct the second view across the top of it. Then figure out the animation to
                transition one to the other. Focusing on building the views and the animation at the same time just makes 
                things more difficult.</Caption>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={onPressFABMenu}
        >
          <View style={styles.demoItemContainer}>
            <View style={styles.demoItemContent}>
              <Heading3>Floating Action Button with Menu</Heading3>
              <Caption style={styles.description}>A common design paradigm popularized by Material design(?) is a floating action button 
              in the bottom right corner of the screen. In our case we'll be rebuilding the starbucks app pay button. Not only does this
               have a floating button, it has 2 other floating buttons, and a circular background cover that shoots out to allow you to 
               focus on the options.</Caption>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={onPressAppIntro}
        >
          <View style={styles.demoItemContainer}>
            <View style={styles.demoItemContent}>
              <Heading3>Application Intro Screen</Heading3>
              <Caption style={styles.description}>The key for all of this is that we setup our interpolations based upon the contentOffset
               of our scroll view. On our x axis since we will be scrolling horizontal.</Caption>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={onPressEvolveWriteButton}
        >
          <View style={styles.demoItemContainer}>
            <View style={styles.demoItemContent}>
              <Heading3>Evolving Write Button</Heading3>
              <Caption style={styles.description}>Sometimes it makes sense to start with the view you are attempting to animate to. Here we will start with our end editor animation and slowly work it down to a button. </Caption>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={onPressAnimateModalSwipe}
        >
          <View style={styles.demoItemContainer}>
            <View style={styles.demoItemContent}>
              <Heading3>Social Comment Modal</Heading3>
              <Caption style={styles.description}>Create a Social Comment Modal with Animated Swipe Away in React Native</Caption>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={onPressInputWithSuccess}
        >
          <View style={styles.demoItemContainer}>
            <View style={styles.demoItemContent}>
              <Heading3>Expanding Notify Input with Success Message</Heading3>
              <Caption style={styles.description}>In this lesson we'll create a notify button that expands from the middle to show a TextInput with a send button and once sent 
              will hide the TextInput and show a thank you message.</Caption>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={onPressExplodingHearts}
        >
          <View style={styles.demoItemContainer}>
            <View style={styles.demoItemContent}>
              <Heading3>Exploaing Hearts with Button</Heading3>
              <Caption style={styles.description}>we'll create a like button that explodes with hearts. We'll use Animated.parallel to execute the bouncy heart animation as well
               as the series of hearts exploding at the same time.</Caption>
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