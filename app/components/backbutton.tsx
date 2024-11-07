import React from "react"
import { router } from "expo-router"
import { TouchableOpacity, Image } from "react-native"
import { Feather } from "@expo/vector-icons"
import { StyleSheet } from "react-native"

import { colors } from "../colors/colors"

export default function BackButton() {
    return (
        <TouchableOpacity
            onPress={() => {
                router.back()
            }}
            style={styles.container}
        >
            <Feather style={styles.icon} name="chevron-left" size={25} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: 10,
        left: 4,
    },
    icon: {
        width: 24,
        height: 24,
        color: colors.black,
    },
})
