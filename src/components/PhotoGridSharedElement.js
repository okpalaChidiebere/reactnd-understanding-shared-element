import React, { useRef, useState } from "react"
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

const initialState = {
    activeImage: null, 
}
export default function PhotoGridSharedElement({ }){

    const [state, setState] = useState(initialState)

    /** 
     * we want to save all the references to all images in the grid
     * 
     * When you press on the image, we will dynamically measure the 
     * element that you pressed and receive a callback with its positioning.
     * 
     * With the help of refs we can do that
    */
    const gridImages = useRef([])
    const viewImage = useRef()
    const size = useRef(new Animated.ValueXY()).current //we are animating the widht and height of the images
    const position = useRef(new Animated.ValueXY()).current //we are animation the absolute position of the images
    /**
     * We could do an interoplation on the imageDetailsContent based upon the Y positioning, 
     * but we choose to use a separate animated value that we control. So this will do :)
     */
    const animation = useRef(new Animated.Value(0)).current //for general animation

    /**
     * 
     * @param {*} index index for the image that was clicked so that we 
     * can do our measurements and transition for that particular image
     */
    const handleOpenImage = (index) => {}

    /** We want to slide the content down out of the way and slide back up later */
    const animatedImageDetailContentTranslate = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [300, 0]
    })

    const animatedImageDetailContentStyles = {
        opacity: animation,
        transform: [
            {
                translateY: animatedImageDetailContentTranslate,
            }
        ]
    }

    const { activeImage } = state

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
                <View
                    style={StyleSheet.absoluteFill /** we render this view over the top of the scrollView*/}
                    pointerEvents={activeImage ? "auto" : "none"}
                >
                    <View
                        style={styles.imageDetailsTopContent} 
                        ref={viewImage /** we want to measure this container wrapping our image because when 
                        you swlwct an image in the grid, we will dynamically measure the element that you pressed 
                        and receive a callback with its positioning, then we will get the measurements of this wrapper 
                        view where the image will be, and we are going to set the imageProperties (like width, height 
                        and coordinates of that image) in to this wrapper to be that of measurements for the one we pressed in the grid. */}
                    >
                        <Animated.Image
                        key={activeImage /** helps clear out the cache each time we have a new active image or not */}
                        source={activeImage /** we set the image selected from our state. Starting at null, means the space for the image will be allocated but it will be transparent */}
                        resizeMode="cover" /** it is important we have matching resizeModes if we want the image transition to be smooth from the gird to this view */
                        style={[styles.viewImage]}
                        />
                    </View>
                    <Animated.View
                        /** we will transition the image content in as well when the image is selected */
                        style={[styles.imageDetailsContent, animatedImageDetailContentStyles]}
                        ref={(content) => (this._content = content)}
                    >
                        <Text style={styles.title}>Pretty Image from Unsplash</Text>
                        <Text>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lobortis
                        interdum porttitor. Nam lorem justo, aliquam id feugiat quis, malesuada
                        sit amet massa. Sed fringilla lorem sit amet metus convallis, et vulputate
                        mauris convallis. Donec venenatis tincidunt elit, sed molestie massa.
                        Fusce scelerisque nulla vitae mollis lobortis. Ut bibendum risus ac rutrum
                        lacinia. Proin vel viverra tellus, et venenatis massa. Maecenas ac gravida
                        purus, in porttitor nulla. Integer vitae dui tincidunt, blandit felis eu,
                        fermentum lorem. Mauris condimentum, lorem id convallis fringilla, purus
                        orci viverra metus, eget finibus neque turpis sed turpis.
                        </Text>
                    </Animated.View>
                </View>
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
    //the container we are measuring (Image wrapper)
    imageDetailsTopContent: {
        flex: 1,
    },
    imageDetailsContent: {
        flex: 2, //takes twice much space as the topImage wrapper
        backgroundColor: "#fff",
    },
    viewImage: {
        /** NOTE: we will be manipulating the width and height later thats why they are null */
        width: null,
        height: null,
        position:"absolute",
        top: 0,
        left: 0,
    },
    title: {
        fontSize: 28,
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