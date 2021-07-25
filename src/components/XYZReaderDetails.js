import React from "react"
import { Platform, Image, ScrollView, Text, StyleSheet, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons as Icon } from "@expo/vector-icons"
import { Colors } from "../values"
import { SharedElement } from "react-navigation-shared-element"


const XYZReaderDetails = ({ route, navigation }) => {
    const { item } = route.params
    return(
        <SafeAreaView  style={{ flex: 1}} edges={["bottom", "left", "right"]}>     
            <Icon
                name={Platform.OS === "android" ? "arrow-back" : "chevron-back"}
                size={28}
                style={{
                    padding: 12,
                    position: "absolute",
                    top: 30,
                    left: 0,
                    zIndex: 5,
                }}
                color={Colors.back}
                onPress={() => navigation.goBack()}
            />
            <ScrollView /*contentContainerStyle={{marginTop: 306}}*/>
            <View style={styles.bannerContainer}>
                <SharedElement id={`item.${item.id}.photo`} style={styles.image}>
                    <Image source={{uri: item.photo}} style={{ flex: 1, resizeMode:"cover"}}/>
                </SharedElement>
                <SharedElement id={`item.${item.id}.title`}>
                    <Text style={styles.title}>{item.title}</Text>
                </SharedElement>
                <SharedElement id={`item.${item.id}.subtitle`}>
                    <Text style={styles.subtitle}>{item.published_date+" by "+item.author}</Text>
                </SharedElement>              
            </View>
                <Text style={styles.text}>
                    {item.body}
                </Text>
            </ScrollView>
        </SafeAreaView>
    )
}

/**
 * Here we ids that we are sharing so that it can look for its counter parts 
 * in the screen that is pushed into the stack
 */
XYZReaderDetails.sharedElements = (route, otherRoute, showing) => {
    const { item } = route.params
    /**
    * Here we are specifying the SharedElements that we want to transition
    * 
    * The ID(s) specified mst be a string and not just a Key that is an integer because,
    * SharedElement transitions not just work for screens within your own app, You can
    * pubish the transition name you support and have SharedElement transition between 
    * different applications.
    */
    return [
        {id: `item.${item.id}.photo`},
        {id: `item.${item.id}.title`},
        {id: `item.${item.id}.subtitle`},
    ]  
}
export default XYZReaderDetails

const styles = StyleSheet.create({
    bannerContainer: {
        /*position: 'absolute',
        flex: 0, 
        top: 0,
        zIndex: 2, */
        height: 306, 
        width:  "100%", 
        justifyContent: "flex-end",
        alignItems: "flex-start",
        paddingHorizontal: 16,
        paddingVertical: 16

    },
    image: {
        ...StyleSheet.absoluteFillObject,
        width: undefined,
        height: undefined,
        aspectRatio: 3/2,
    },
    text: {
        margin: 24,
        fontSize: 16,
    },
    title: {
        fontSize: 22,
        color: Colors.back,
        fontWeight: 'bold',
        paddingRight: 14,
        position: "absolute",
        bottom: 20,
    },
    subtitle: {
        color: Colors.back,
        fontSize: 16,
        position:"absolute",
        bottom: 0,
    }
})

export function XYZReaderDetailsOptions(){
    return{
        headerShown: false,
    }
}