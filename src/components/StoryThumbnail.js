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
            setOpacity(1) //once this screen is back on focus by the user navigating back, we make the listItem the user visited to be visible again! 
        }
    })

    return (
        <Pressable
            style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}
            onPress={() => {
                setOpacity(0);
                navigation.navigate(Strings.component_snapchat_stories_details, { story })
            }}
        >
            <View style={[styles.container, { opacity /** Because the detailScreen is has transparent background, you can see mainScreen through. So when the user clicks on an item, we set the opacity to 0, this will let the user know the listItem tha they are viewing */}]}>
                <SharedElement id={story.id} style={{ flex: 1 }}>
                    <Image source={story.source} style={styles.image} />
                </SharedElement>
            </View>
        </Pressable>
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
