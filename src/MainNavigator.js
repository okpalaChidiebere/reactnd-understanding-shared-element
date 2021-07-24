import React from "react"
import { createSharedElementStackNavigator } from "react-navigation-shared-element"
import MainComponent, { MainComponentOptions } from "./components/MainComponent"
import { Strings } from "./values"

const Stack = createSharedElementStackNavigator()
const MainNavigator = () => (
  <Stack.Navigator headerMode="screen" initialRouteName={Strings.component_main}>
    <Stack.Screen
      name={Strings.component_main}
      component={MainComponent}
      options={MainComponentOptions}
  />
  </Stack.Navigator>
)

export default MainNavigator
