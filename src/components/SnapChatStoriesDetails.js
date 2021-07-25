import React from "react"
import { View, Image, StyleSheet } from "react-native"
import { Video } from "expo-av"
import { SharedElement } from "react-navigation-shared-element"


const SnapChatStoriesDetails = ({ route, navigation }) => {

    const { story } = route.params

    return (
        <View style={{ flex: 1}}>
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
        </View>
    )
}

SnapChatStoriesDetails.sharedElements = (route) => [
  route.params.story.id
]
export default SnapChatStoriesDetails