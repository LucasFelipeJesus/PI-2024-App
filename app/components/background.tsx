import { ReactNode } from "react"
import { StyleSheet } from "react-native"
import { ImageBackground, KeyboardAvoidingView, ScrollView } from "react-native"

import { colors } from "../colors/colors"

interface BackgroundProps {
    children: ReactNode
}

export default function Background({ children }: BackgroundProps) {
    return (
        <ScrollView
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
        >
            <ImageBackground
                source={require("../../assets/background.png")}
                resizeMode="repeat"
                style={styles.background}
            >
                <KeyboardAvoidingView style={styles.container} behavior="padding">
                    {children}
                </KeyboardAvoidingView>
            </ImageBackground>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: "100%",
        backgroundColor: colors.white,
    },
    container: {
        flex: 1,
        padding: 20,
        width: "100%",
        maxWidth: 340,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
    },
    scrollContainer: {
        paddingVertical: 20,
    },
})
