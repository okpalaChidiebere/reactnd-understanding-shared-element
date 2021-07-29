import React, { useState, useRef } from "react"
import { StyleSheet, View, Text, Dimensions, Animated, PanResponder } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Colors, Strings } from "../values"

/**
 * This is the direction distance in which we swipe that will determine what a decision is
 */
const SWIPE_THRESHOLD = 120;

const { height } = Dimensions.get("window");

const intitalState = [
    {
        image: "https://d17h27t6h515a5.cloudfront.net/topher/2017/March/58c5be60_ebooks/ebooks.jpg",
        id: 1,
        text: "Sweet Cat",
      },
      {
        image: "https://d17h27t6h515a5.cloudfront.net/topher/2017/March/58c5be62_japanesefairytales/japanesefairytales.jpg",
        id: 2,
        text: "Sweeter Cat",
      },
      {
        image: "https://d17h27t6h515a5.cloudfront.net/topher/2017/March/58c5be62_scarlet-plague/scarlet-plague.jpg",
        id: 3,
        text: "Sweetest Cat",
      },
      {
        image: "https://d17h27t6h515a5.cloudfront.net/topher/2017/March/58c5be65_sonofthewolf/sonofthewolf.jpg",
        id: 4,
        text: "Aww",
      },
]

export default function KittenCards({ }){

    const [items, setItems] = useState(intitalState)
    /**
     * - We know here will be an interpolation off of the the X value in AnimatedXY whilte we drag because in our based on design UI thats when effects takes place like: 
     * (rotate the card a bit in the X direction of the swipe, opacity and rotate in the opposite direction of a text to confirm the action on the card, etc)
     * - When the user drags the card Up or down in the Y direction, nothing really happens
     * 
     * AnimatedXY stores our card swipe location. Remember XY transform is used to move items across the screen from point a to b
     */
    const animation = useRef(new Animated.ValueXY()).current
    const opacity = useRef(new Animated.Value(1)).current //Opacity for the yes or no actions that appearsn on the card as you swipe left or right
    /**
     * There is a slight animation of the card behind the card in front. 
     * We know this because, when the card in front get swiped out, there is a scaling of the card at the back with a spring animation.
     */
    const next = useRef(new Animated.Value(0.9)).current

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: (e, gestureState) => true,
            /**
             * We know that we need this because the card will be moved, up our down, left and right
             */
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            /**
             * We know that we need this because the card will be moved, up our down, left and right, but we will only run effects 
             * on the card when moved left or right.
             * 
             * Because the only animation we seen in the UI is based upon the X and Y direction(values), we assume that Animated.event
             * is enough for us for our usecase.
             */
            onPanResponderMove: Animated.event([
                null,
                {
                    dx: animation.x,
                    dy: animation.y,
                },
            ], { useNativeDriver: true }),
            /**
             * When the card is released, and it has not pass a certain point, we will bounce the card back to the middle
             * However, if we go a certain distance, there will be a decay or velocity that will make our card move of the 
             * screen in a particular direction
             */
            onPanResponderRelease: (e, gestaureState) => {
                
            }
            /**
             * NOTE: since when the card is dragged(swiped), we dont leave the card in any particular location OR
             * When the card is touched(AKA first touch) before it being dragged, we did not want to run an animation
             * we did not use `onPanResponderGrant`
             */

        })
    ).current

    /**
     * Define the rotation for our cards
     * 
     * We use Animated.X because our animation is driven of the x axis
     * 
     * negative values of x for how far left and positiove values of x for how far right.
     * Value 0 is when the card is at rest
     * */
    const rotate = animation.x.interpolate({
        inputRange: [-200, 0, 200],
        outputRange: ["-30deg", "0deg", "30deg"],
        extrapolate: "clamp" //for the card not no rotate past 30 degrees, we a clamp for the interpolate
    })

    const opacityInterpolate = animation.x.interpolate({
        inputRange: [-200, 0, 200],
        outputRange: [.5, 1, .5], //we dont want our opacity to go past 50%
        extrapolate: "clamp"
    })

    const animatedCardStyles = {
        opacity,
        transform: [
            {
                rotate,
            },
            /**
             * Remember this is simar to just writing:
             * {
                    translateX: animation.x
                }, 
                {
                    translateY: animation.y
                }
             */
            ...animation.getTranslateTransform() //returns our translateX and translateY from our Animated.ValueXY
        ]
    }

    const animatedImageStyles = {
        opacity: opacityInterpolate,
    }


    return(
        <SafeAreaView style={styles.container} edges={["bottom", "left", "right"]}>
            <View style={styles.container}>
                <View style={styles.top}>
                    {
                        /** We only nee dto render the first and second ite */
                        items
                        .slice(0, 2) //We only need to render the first and second item at first
                        /** 
                         * Since the card has position of abosulte, this means the cards will be placed on top of each other and last index of card will be at the top most
                         * So we reverse the list to have the first index rendered last to make it the on at the top because it is the one we want to provide our gestures to
                         */
                        .reverse()
                        .map(({ image, id, text }, index, items) => { //we desturture the item, got access to the current index, and the total items as well.

                            /**
                             * Pro Tip: Anytime you have animatedView, the default style is to use an array because we know we will eventually be adding 
                             * an animated style later :)
                             *  */

                            /**
                             * Since we are just looping over the two cards, we want to know if we are looking 
                             * at the card in front or the card at the back. So we define some helpers
                             * 
                             * Note: we only have to cards so our logic of determing the card in front or the card at the back make sense
                             * Remember that we reversed the list us checking the first card on screen as the last index and so on makesense :)                             
                             * */
                            const isLastItem = index === items.length - 1
                            const isSecondToLast = index === items.length - 2

                            const panHandlers = isLastItem ? panResponder.panHandlers : {}
                            const cardStyle = isLastItem ? animatedCardStyles : undefined
                            const imageStyle = isLastItem ? animatedImageStyles : undefined
                            
                            return (
                                <Animated.View 
                                    style={[styles.card, cardStyle]} 
                                    key={id}
                                    {...panHandlers /**Now we are able to drag this this item(s) */}
                                >
                                    <Animated.Image
                                        source={{uri: image}}
                                        style={[styles.image, imageStyle]}
                                        resizeMode="cover"
                                    />
                                    <View style={styles.lowerText}>
                                        <Text>{text}</Text>
                                    </View>
                                </Animated.View>
                            );
                        })
                    }
                </View>
                <View style={styles.bottomBar}>
                    <Text>Here</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    //This will hold our cards
    top: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    //contains the buttons we want to add
    bottomBar: {
        flexDirection:"row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 10,
    },
    card: {
        width: 300,
        height: 300,
        position: "absolute", //NOTE: we did not identify the top, right, left, button, so that i can adhere to the justifyContent and alignItems style of center for its container (styles.top) 
        borderRadius: 3,
        shadowColor: "#000", //black
        shadowOpacity: 0.1,
        shadowOffset: { x: 0, y: 0 },
        shadowRadius: 5,
        borderWidth: 1,
        borderColor: "#FFF",
    },
    lowerText: {
        flex: 1,
        backgroundColor: "#FFF",
        padding: 5,
    },
    image: {
        width: null, //null means we an apply a flex property to the view to ahere to fhe flex height
        height: null, //null means we an apply a flex property to the view to ahere to fhe flex width
        borderRadius: 2,
        flex: 3,
    },
});

export function KittenCardsOptions(){
    return {
        title: Strings.component_Kitten_cards,
        headerTintColor: Colors.back,
        headerStyle: { 
            backgroundColor: Colors.theme_primary,
        },
    }
}