import React, { useRef } from "react"
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    ScrollView,
    PanResponder,
    Animated,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Colors, Strings } from "../values"

export default function ModalWithAnimatedSwipeAway(){
    const animated = useRef(new Animated.Value(0)).current
    const animatedMargin = useRef(new Animated.Value(0)).current //helps us add the crushing swipe down effect to our modal
    const scrollOffset = useRef(0)
    const contentheight = useRef(0)
    const scrollViewHeight = useRef(0)

    const panResponder = useRef(
        /** PanResonder allows us to act on the gestures and when we want to start and stop them */
        PanResponder.create({
            /** THis allows us to determine when we want to start the take over of the guestures */
            onMoveShouldSetPanResponder: (evt, gestureState) => {
                const { dy } = gestureState //dy means deltaY
                const totalScrollHeight = scrollOffset.current + scrollViewHeight.current

                //define contitions for when this panResponder should respond
                if(
                    //for when we are at the top and we are dragging downwards and we want to crush our modal out of the way
                    (scrollOffset.current <= 0 && dy > 0) ||
                    //when we are at the button and we are dragging up and we want to swipe this modal away
                    (totalScrollHeight >= contentheight.current && dy < 0)
                ){
                    return true //this will trigger our panResponder and allows us to interact with the gesture
                }
            },
            onPanResponderMove: (evt, gestureState) => {
                const { dy } = gestureState
                if(dy < 0){ //means you are swiping up the dy is negative
                    animated.setValue(dy) //animates the increase in marginBottom and fading(opacity)the modal away
                }else if(dy > 0){ //dy being positive value means you are swiping down
                    animatedMargin.setValue(dy) //animates that curshing effect of the modal
                }
            },
            //we need to control what happens when we release
            onPanResponderRelease: (evt, gestureState) => {
                const { dy } = gestureState

                //NOTE: 150 is just an abitarily treshold that we want to use to know when to spring back or swipe away the modal 
                if (dy < -150){ //we are swiping the modal up
                    Animated.parallel([
                        Animated.timing(animated, {
                            toValue: -400,
                            duration: 150,
                            useNativeDriver: true,
                        }),
                        Animated.timing(animatedMargin, {
                            toValue: 0,
                            duration: 150,
                            useNativeDriver: false, //you cannout animate margins with native code :(
                        })
                    ]).start()
                } else if(dy > -150  && dy < 150){ //we have not gone outside of our teshold
                    //we set the modal back to its neutral position
                    Animated.parallel([
                        Animated.timing(animated, {
                            toValue: 0,
                            duration: 150,
                            useNativeDriver: true,
                        }),
                        Animated.timing(animatedMargin, {
                            toValue: 0,
                            duration: 150,
                            useNativeDriver: false, //you cannout animate margins with native code :(
                        })
                    ]).start()
                } else if (dy > 150){ //we are swiping the modal down
                    Animated.timing(animated, {
                        toValue: 400,
                        duration: 300,
                        useNativeDriver: true,
                    }).start()
                }
            },
        })
    ).current


    const spacerStyle = {
        marginTop: animatedMargin,
    }

    const opacityInterpolate = animated.interpolate({
        //Remember that we can fade the modal up or down the screen, so we set the opacity as appropriate
        inputRange:[-400, 0, 400],
        outputRange: [0, 1, 0]
    })

    const modalStyle = {
        transform: [
            //we want to control the swiping of up and down and moving our modal out of the screen
            { translateY: animated }
        ],
        opacity: opacityInterpolate,
    }

    return (
        <SafeAreaView style={styles.container} edges={["bottom", "left", "right"]}>
            <View style={[styles.center, styles.container]}>
                <Animated.View style={spacerStyle}/>
                <Animated.View
                    style={[styles.modal, modalStyle]}
                    {...panResponder.panHandlers}
                >
                    <View style={styles.comments}>
                        <ScrollView
                            scrollEventThrottle={1}
                            onScroll={event => {
                                scrollOffset.current = event.nativeEvent.contentOffset.y
                                scrollViewHeight.current = event.nativeEvent.layoutMeasurement.height
                            }}
                            onContentSizeChange={(contentWidth, contentHeight) => {
                                contentheight.current = contentHeight
                            }}
                        >
                            <Text style={styles.fakeText}>Top</Text>
                            <View style={styles.fakeComments}/>
                            <Text style={styles.fakeText}>Bottom</Text>
                        </ScrollView>
                    </View>
                    <View style={styles.inputWrap}>
                        <TextInput style={styles.textInput} placeholder="Comment"/>
                    </View>
                </Animated.View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    center: {
      alignItems: "center",
      justifyContent: "center",
    },
    modal: {
        flex: 1,
        width: "90%",
        borderWidth: 1,
        borderColor: "#000",
        borderRadius: 20,
        overflow:"hidden",
        marginVertical: 10
    },
    comments: {
        flex: 9,
        backgroundColor: "#fff"
    },
    inputWrap: {
        flex: 1,
        backgroundColor: "#fff"
    },
    fakeText: {
        height: 50,
        textAlign: "center"
    },
    fakeComments: {
        height: 800,
        backgroundColor: "#eee",
    },
    textInput: {
        padding: 10,
    },
})

export function ModalWithAnimatedSwipeAwayOptions(){
    return{
        title: Strings.component_modal_with_animation,
        headerTintColor: Colors.back,
        //gestureEnabled: false, //kinda optional
        //cardOverlayEnabled: false,
        headerStyle: { 
            backgroundColor: Colors.theme_primary,
        },
    }
}