import React from "react"
import { createSharedElementStackNavigator } from "react-navigation-shared-element"
import MainComponent, { MainComponentOptions } from "./components/MainComponent"
import SnapChatStoriesComponent, { SnapChatStoriesComponentOptions } from "./components/SnapChatStoriesComponent"
import SnapChatStoriesDetails from "./components/SnapChatStoriesDetails"
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
  </Stack.Navigator>
)

export default MainNavigator
