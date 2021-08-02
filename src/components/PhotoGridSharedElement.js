import React, { useRef } from "react"
import {
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Colors, Strings } from "../values"

import Heroes from "../assets/avatars/Heroes"

export default function PhotoGridSharedElement({ }){

    /** 
     * we want to save all the references to all images in the grid
     * 
     * When you press on the image, we will dynamically measure the 
     * element that you pressed and receive a callback with its positioning.
     * 
     * With the help of refs we can do that
    */
    const gridImages = useRef([])

    /**
     * 
     * @param {*} index index for the image that was clicked so that we 
     * can do our measurements and transition for that particular image
     */
    const handleOpenImage = (index) => {}

    return (
        <SafeAreaView style={styles.container} edges={["bottom", "left", "right"]}>
            <View style={styles.container}>
                <ScrollView style={styles.container
                    /** takses up the available space. FYI: we could use a FlatList 
                     * if you're worried about performance, but the concepts still apply. */}>
                    <View style={styles.grid}>
                        {
                            Heroes.map(({ id, photo }, index) => {
                                return (
                                    <TouchableWithoutFeedback
                                        key={id}
                                        onPress={() => handleOpenImage(index)}
                                    >
                                        <Image
                                            ref={image => gridImages.current[index] = image}
                                            source={photo}
                                            style={[styles.gridImage /**we want grid sized images */]}
                                            resizeMode="cover"
                                        />
                                    </TouchableWithoutFeedback>
                                )
                            })
                        }
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    grid: {
        flexDirection: "row",
        flexWrap: "wrap", //if we dont add this the images will overflow off the screen horizontally
    },
    gridImage: {
        width: "33%", //we want our images to be three per row
        height: 150, //ideally, you will want to calculate this based upon screen size
    },
})

export function PhotoGridSharedElementOptions({ }){
    return{
        title: Strings.component_custom_shared_element,
        headerTintColor: Colors.back,
        headerStyle: { 
            backgroundColor: Colors.theme_primary,
        },
    }
}