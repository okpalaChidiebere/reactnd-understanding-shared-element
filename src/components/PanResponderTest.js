import React, { useState, useRef } from "react"
import { StyleSheet, View, TouchableOpacity, Text, Dimensions, PanResponder, } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Colors, Strings } from "../values"


const { width, height } = Dimensions.get("window")

/**
 * moveX and moveY are the current coordinate positions of the gestureState. 
 * dx and dy are the distance change from where the initial finger was put down (delta X and delta Y).
 */
const getDirectionAndColor = ({ moveX, moveY, dx, dy }) => {
    // if a user moves their finger in a direction further than 30 pixels than we'll trigger a direction.
    const draggedDown = dy > 30;
    const draggedUp = dy < -30;
    const draggedLeft = dx < -30;
    const draggedRight = dx > 30;
    //end defining directions

    //if the finger moved are within the absolutely positioned zones we'll tag them with red or blue.
    const isRed = moveY < 90 && moveY > 40 && moveX > 0 && moveX < width;
    const isBlue = moveY > height - 50 && moveX > 0 && moveX < width;
    let dragDirection = "";
  
    if (draggedDown || draggedUp) {
      if (draggedDown) dragDirection += "dragged down ";
      if (draggedUp) dragDirection += "dragged up ";
    }
  
    if (draggedLeft || draggedRight) {
      if (draggedLeft) dragDirection += "dragged left ";
      if (draggedRight) dragDirection += "dragged right ";
    }
  
    if (isRed) return `red ${dragDirection}`;
    if (isBlue) return `blue ${dragDirection}`;


    console.log(!!dragDirection)
    if (dragDirection) return dragDirection;
};

export default function PanResponderTest(){

    const [zone, setZone] = useState("Still Touchable")

    /**
     * https://reactnative.dev/docs/panresponder#usage-pattern
     */
    const panResponder = useRef(
        /**
         * What this panResponder does is we did not update the UI until the user has drag their fingers 30pixels in any 
         * direction. Incluiding diagonally
         * 
         * ALso whenever the finger entres the red or blue zones in the screen, we let the know :)
         * 
         * Eg: the user moves their finger diagonally up the screen in a top-right diection, we will have "dragged up dragged right" as the state valye
         */
        PanResponder.create({
            /**
             * onMoveShouldSetResponderCapture is called on each movement of the finger in realtime.
             * 
             * FYI: We casted the string value returned by getDirectionAndColor method to a boolean
             * https://brianflove.com/2014-09-02/whats-the-double-exclamation-mark-for-in-javascript/
             */
            onMoveShouldSetPanResponder: (evt, gestureState) => !!getDirectionAndColor(gestureState),
            /**
             * onPanResponderMove will be called multiple times, every time a new drag motion is made.
             * onPanResponderMove is called right after onMoveShouldSetResponderCapture. 
             * 
             * NOTE if the initial value onMoveShouldSetResponderCapture is false, onPanResponderMove will not be called. But
             * once you set onMoveShouldSetResponderCapture to true during the gesture onPanResponderMove will start capturing events.
             * This time it does not matter if onMoveShouldSetResponderCapture goes back to false. It will still capture.
             * The onPanResponderMove stops capturing this time, when the onPanResponderTerminationRequest is made: (ie geusture event stops)
             * 
             * This is where we want to update the UI based on the gestureState. 
             * You can pass in an Aniated.event method as well if you want to make some UI animations based the guestureState 
             */
            onPanResponderMove: (e, gestureState) => {
                const drag = getDirectionAndColor(gestureState)
                setZone(drag)
            },
            //we are saying: "Sure whatever else wants the gesture they can have it"
            onPanResponderTerminationRequest: (evt, gestureState) => true,
        })
    ).current

    const onPress = () => {
        setZone("I got touched with a parent pan responder")
    }

    return (
        <SafeAreaView style={styles.container} edges={["bottom", "left", "right"]}>
            <View style={styles.container} {...panResponder.panHandlers}>
                <View style={styles.zone1} />
                <View style={styles.center}>
                    <TouchableOpacity onPress={onPress}>
                        <Text>{zone}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.zone2} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    center: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    zone1: {
        top: 0,
        left: 0,
        right: 0,
        height: 50,
        position: 'absolute',
        backgroundColor: "red"
    },
    zone2: {
        left: 0,
        right: 0,
        bottom: 0,
        height: 50,
        position: 'absolute',
        backgroundColor: "blue"
    },
  });

export function PanResponderTestOptions(){
    return {
        title: Strings.component_panresponser_test,
        headerTintColor: Colors.back,
        headerStyle: { 
            backgroundColor: Colors.theme_primary,
        },
    }
}