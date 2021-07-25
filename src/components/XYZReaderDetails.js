import React from "react"
import { Platform, Image, ScrollView, Text, StyleSheet, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons as Icon } from "@expo/vector-icons"
import { Colors } from "../values"


export default function XYZReaderDetails({ route, navigation }){
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
                <Image source={{uri: item.photo}} style={styles.image}/>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.subtitle}>{item.published_date+" by "+item.author}</Text>
            </View>
                <Text style={styles.text}>
                    {item.body}
                </Text>
            </ScrollView>
        </SafeAreaView>
    )
}

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
        resizeMode: "cover",
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
    },
    subtitle: {
        color: Colors.back,
        fontSize: 16,
    }
})

export function XYZReaderDetailsOptions(){
    return{
        headerShown: false,
    }
}