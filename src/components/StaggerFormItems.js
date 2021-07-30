import React from "react"
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
  Animated,
  KeyboardAvoidingView,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Colors, Strings } from "../values"


export default function StaggerFormItems(){
    return(
        <SafeAreaView style={styles.container} edges={["bottom", "left", "right"]}>
            <View style={styles.container}>
                <ImageBackground
                    source={require("../assets/avatars/karen.jpg")}
                    resizeMode="cover"
                    style={[StyleSheet.absoluteFill, { width: null, height: null }]}
                >
                    <View style={styles.container} />
                    <KeyboardAvoidingView style={styles.form/**command k on macbook to open up the simulator phone keyboard to see this work :)*/} behavior="padding">
                        <View style={styles.container}>
                            <Text style={styles.title}>Login</Text>
                            <TextInput
                                style={[styles.input]}
                                placeholder="Email"
                                keyboardType="email-address"
                            />
                            <TextInput
                                placeholder="Password"
                                style={[styles.input]}
                                secureTextEntry
                            />
                            <TouchableOpacity>
                                <View style={[styles.button]}>
                                    <Text style={styles.buttonText}>Login</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
                    <View style={styles.container} />
                </ImageBackground>
            </View>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    title: {
        fontSize: 30,
        color: "#FFF",
        backgroundColor: "transparent",
        textAlign: "center",
        marginBottom: 10,
    },
    form: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,.25)",
        paddingVertical: 10,
    },
    input: {
        width: 250,
        height: 35,
        paddingHorizontal: 10,
        marginVertical: 5,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#FFF",
        color: "#333",
        backgroundColor: "#FFF",
    },
    button: {
        marginTop: 10,
        backgroundColor: "tomato",
        paddingVertical: 10,
        paddingHorizontal: 5,
        borderRadius: 5,
    },
    buttonText: {
        textAlign: "center",
        color: "#FFF",
        fontSize: 16,
    },
})
  

export function StaggerFormItemsOptions(){
    return{
        title: Strings.component_stagger_form_items,
        headerTintColor: Colors.back,
        headerStyle: { 
            backgroundColor: Colors.theme_primary,
        },
    }
}