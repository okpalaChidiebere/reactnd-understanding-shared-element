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
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"
import { Colors, Strings } from "../values"

import Heroes from "../assets/avatars/Heroes"

const initialState = {
    activeImage: null,
    activeIndex: null,
}
export default function PhotoGridSharedElement({ }){

    const insets = useSafeAreaInsets()
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
    const handleOpenImage = (index) => {
        //get access to the ref of the image clicked so that we can call measure on it
        gridImages.current[index].measure((x, y, width, height, pageX, pageY) => {
            /**
             * we can get the coordinates and the size so that we can do a image swap where the image clicked 
             * in the photoGrid will be hidden, we set the image in the detailModalView to be thesame size for the image that was hidden.
             * 
             * We are going to have the activeImage() have thesame measurements with the image clicked in the photo grid
             * we will finally have to swap out the image on the grid to the image in the modal
             */
            position.setValue({
                x: pageX,
                /**
                 * Note: this 92, was some offeset value to move the activeImage up a bit to fill the space
                 * left white by the imagepressed in the photo grid. The tutuorial i watched did not use this 
                 * offset, but the iOS emulator they used was a smaller screensize compared to my own emulator
                 */
                y: pageY - 92,
            })

            size.setValue({
                x: width,
                y: height,
            })

            setState({
                activeImage: Heroes[index].photo, //set our active image to the image we clicked
                /**
                 * Set the active index to know the image in grid we want to hide so that 
                 * we can put the image shared with the modalView in that exact spot :)
                 * 
                 * Helps the transition looks smooth!
                 */
                activeIndex: index,
            })

            /**
             * Now we this effect where the image in the photoGrip is swaped with the sharedImage(activeImage) in the modal view
             * we can now do the transtion effect
             * 
             * NOTE: we call `t` target :)
             */
            viewImage.current.measure((tX, tY, tWidth, tHeight, tPageX, tPageY) => {
                Animated.parallel([
                    //animate the image to the exact position (tPageX and tPageY will be 0, 0 as expected :) the will have the iage positioned at the top-left corner )
                    Animated.spring(position.x, {
                        toValue: tPageX,
                        useNativeDriver: false,
                    }),
                    Animated.spring(position.y, {
                        toValue: tPageY - 92,
                        useNativeDriver: false,
                    }),
                    //end positioning
                    //start sizing the image
                    Animated.spring(size.x, {
                        toValue: tWidth,
                        useNativeDriver: false,
                    }),
                    Animated.spring(size.y, {
                        toValue: tHeight,
                        useNativeDriver: false,
                    }),
                    //end sizing the image
                    //animation for our content. Rememeber we had thins animation value interpolated to be able to slide the content down(off the screen) and up
                    Animated.spring(animation, {
                        toValue: 1,
                        useNativeDriver: true,
                    }),
                ]).start()
            })
        })
    }

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

    /** Render shared item using animated values so it appears in the same spot as our start item */
    const activeImageStyle = {
        width: size.x,
        height: size.y,
        top: position.y,
        left: position.x,
    }

     /*
     * controls the opacity on our grid image (the image pressed in the grid)
     * We need to know what image we want to hide so that we can fill that space wih the shared image in the modal view
     */
    const activeIndexStyle = {
        opacity: state.activeImage ? 0 : 1, //we did not animate this because we want it to be instant
    }
    /** end rendering shared item to appear on thesame spot */

    /**
     * We had to animate the opacity of the button because the whole modalView itself is not animated with opacity 
     * only the texts in the modal view is
     * 
     * we dont want this button to appear when he transition has not happend yet
     */
    const animatedCloseButtonStyle = {
        opacity: animation,
    }

    const { activeImage, activeIndex } = state

    return (
        <SafeAreaView style={styles.container} edges={["bottom", "left", "right"]}>
            <View style={styles.container}>
                <ScrollView style={styles.container
                    /** takses up the available space. FYI: we could use a FlatList 
                     * if you're worried about performance, but the concepts still apply. */}>
                    <View style={styles.grid}>
                        {
                            Heroes.map(({ id, photo }, index) => {

                                const style = 
                                    index === activeIndex ? activeIndexStyle : undefined

                                return (
                                    <TouchableWithoutFeedback
                                        key={id}
                                        onPress={() => handleOpenImage(index)}
                                    >
                                        <Image
                                            ref={image => gridImages.current[index] = image}
                                            source={photo}
                                            style={[
                                                styles.gridImage, /**we want grid sized images */ 
                                                style,
                                            ]}
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
                        style={[styles.viewImage, activeImageStyle]}
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
                    <TouchableWithoutFeedback>
                        <Animated.View style={[styles.close, animatedCloseButtonStyle]}>
                            <Text style={styles.closeText}>X</Text>
                        </Animated.View>
                    </TouchableWithoutFeedback>
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
    close: {
        position: "absolute",
        top: 20,
        right: 20
    },
    closeText: {
        backgroundColor: "transparent",
        fontSize: 28,
        color: "#fff",
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