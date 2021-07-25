import React, { useState } from "react"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import { View, Image, StyleSheet, Dimensions, Pressable } from "react-native"
import { Strings } from "../values"
import { SharedElement } from "react-navigation-shared-element";


const margin = 16;
const borderRadius = 5
const width = Dimensions.get("window").width / 2 - margin * 2



export default function StoryThumbnail({ story }){
    const navigation = useNavigation()
    const [opacity, setOpacity] = useState(1)

    useFocusEffect(() => {
        if (navigation.isFocused()) {
        setOpacity(1)
        }
    })

    return (
        <SharedElement id={story.id}>
            <Pressable
            style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}
            onPress={() => {
                setOpacity(0);
                navigation.navigate(Strings.component_snapchat_stories_details, { story })
            }}
            >
                <View style={[styles.container, /*{ opacity }*/]}>
                    <Image source={story.source} style={styles.image} />
                </View>
            </Pressable>
        </SharedElement>
    )
}

const styles = StyleSheet.create({
    container: {
      width,
      height: width * 1.77,
      marginTop: 16,
      borderRadius,
    },
    image: {
      ...StyleSheet.absoluteFillObject,
      width: undefined,
      height: undefined,
      resizeMode: "cover",
      borderRadius,
    },
})