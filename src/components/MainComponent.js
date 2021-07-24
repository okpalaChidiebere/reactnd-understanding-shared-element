import React from "react"
import { Text, View, StyleSheet, Platform }  from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Colors, Strings } from "../values"

export default function MainComponent(){

  return (
    <SafeAreaView style={styles.container} edges={["bottom", "left", "right"]}>
      <View style={styles.content}>
        <Text>Open MainComponent.js to start working on your app!</Text>
      </View>
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