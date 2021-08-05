import React from "react"
import { createSharedElementStackNavigator } from "react-navigation-shared-element"
import AnimatedColorPicker, { AnimatedColorPickerOptions } from "./components/AnimatedColorPicker"
import AnimatedNotifications, { AnimatedNotificationsOptions } from "./components/AnimatedNotifications"
import AnimatedQuestionnaire, { AnimatedQuestionnaireOptions } from "./components/AnimatedQuestionnaire"
import AnimatedSvg, { AnimatedSvgOptions } from "./components/AnimatedSvg"
import ApplicationIntro, { ApplicationIntroOptions } from "./components/ApplicationIntro"
import FABWithMenu, { FABWithMenuOptions } from "./components/FABWithMenu"
import FourCorners, { FourCornersOptions } from "./components/FourCorners"
import KittenCards, { KittenCardsOptions } from "./components/KittenCards"
import MainComponent, { MainComponentOptions } from "./components/MainComponent"
import PanResponderTest, { PanResponderTestOptions } from "./components/PanResponderTest"
import PhotoGridSharedElement, { PhotoGridSharedElementOptions } from "./components/PhotoGridSharedElement"
import ProgressbarButton, { ProgressbarButtonOptions } from "./components/ProgressbarButton"
import SnapChatStoriesComponent, { SnapChatStoriesComponentOptions } from "./components/SnapChatStoriesComponent"
import SnapChatStoriesDetails from "./components/SnapChatStoriesDetails"
import StaggeredHeadDrag, { StaggeredHeadDragOptions } from "./components/StaggeredHeadDrag"
import StaggerFormItems, { StaggerFormItemsOptions } from "./components/StaggerFormItems"
import UnmountAnimation, { UnmountAnimationOptions } from "./components/UnmountAnimations"
import XYZReaderComponent, { XYZReaderComponentOptions } from "./components/XYZReaderComponent"
import XYZReaderDetails, { XYZReaderDetailsOptions } from "./components/XYZReaderDetails"
import { Strings } from "./values"

const Stack = createSharedElementStackNavigator()
const MainNavigator = () => (
  <Stack.Navigator 
    initialRouteName={Strings.component_main}
    screenOptions={{
      gestureEnabled: true,
      //headerShown: false,
      cardOverlayEnabled: true,
    }}
    mode="modal"
  >
    <Stack.Screen
      name={Strings.component_main}
      component={MainComponent}
      options={MainComponentOptions}
    />
    <Stack.Screen
      name={Strings.component_snapchat_stories}
      component={SnapChatStoriesComponent}
      options={SnapChatStoriesComponentOptions}
    />
    <Stack.Screen
      name={Strings.component_snapchat_stories_details}
      component={SnapChatStoriesDetails}
      options={{
        headerShown: false,
        cardStyle: { backgroundColor: "transparent" },
      }}
    />
    <Stack.Screen
      name={Strings.component_xyz_reader}
      component={XYZReaderComponent}
      options={XYZReaderComponentOptions}
    />
    <Stack.Screen
      name={Strings.component_xyz_reader_details}
      component={XYZReaderDetails}
      options={XYZReaderDetailsOptions}
    />
    <Stack.Screen
      name={Strings.component_panresponser_test}
      component={PanResponderTest}
      options={PanResponderTestOptions}
    />
    <Stack.Screen
      name={Strings.component_Kitten_cards}
      component={KittenCards}
      options={KittenCardsOptions}
    />
    <Stack.Screen
      name={Strings.component_staggered_head_drag}
      component={StaggeredHeadDrag}
      options={StaggeredHeadDragOptions}
    />
    <Stack.Screen
      name={Strings.component_animated_svg}
      component={AnimatedSvg}
      options={AnimatedSvgOptions}
    />
    <Stack.Screen
      name={Strings.component_unmount_animations}
      component={UnmountAnimation}
      options={UnmountAnimationOptions}
    />
    <Stack.Screen
      name={Strings.component_four_corners}
      component={FourCorners}
      options={FourCornersOptions}
    />
    <Stack.Screen
      name={Strings.component_stagger_form_items}
      component={StaggerFormItems}
      options={StaggerFormItemsOptions}
    />
    <Stack.Screen
      name={Strings.component_progress_bar_button}
      component={ProgressbarButton}
      options={ProgressbarButtonOptions}
    />
    <Stack.Screen
      name={Strings.component_animated_notifications}
      component={AnimatedNotifications}
      options={AnimatedNotificationsOptions}
    />
    <Stack.Screen
      name={Strings.component_animated_questionare}
      component={AnimatedQuestionnaire}
      options={AnimatedQuestionnaireOptions}
    />
    <Stack.Screen
      name={Strings.component_custom_shared_element}
      component={PhotoGridSharedElement}
      options={PhotoGridSharedElementOptions}
    />
    <Stack.Screen
      name={Strings.component_color_picker}
      component={AnimatedColorPicker}
      options={AnimatedColorPickerOptions}
    />
    <Stack.Screen
      name={Strings.component_fab_with_menu}
      component={FABWithMenu}
      options={FABWithMenuOptions}
    />
    <Stack.Screen
      name={Strings.component_application_intro}
      component={ApplicationIntro}
      options={ApplicationIntroOptions}
    />
  </Stack.Navigator>
)

export default MainNavigator
