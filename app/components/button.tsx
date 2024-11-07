import { Button as PaperButton } from "react-native-paper"
import { StyleSheet } from "react-native"
import React from "react"

import { colors } from "../colors/colors"

interface ButtonProps {
    mode: "text" | "outlined" | "contained"
    style?: object
    [propName: string]: any
}

export default function Button({ mode, style, ...props }: ButtonProps) {
    return (
        <PaperButton
            children={undefined}
            style={[styles.button, mode === "outlined" && { backgroundColor: colors.white }, style]}
            labelStyle={styles.text}
            mode={mode}
            {...props}
        />
    )
}

const styles = StyleSheet.create({
    button: {
        width: "100%",
        marginVertical: 10,
        paddingVertical: 2,
        backgroundColor: colors.blue[100],
        borderRadius: 5,
    },
    text: {
        fontWeight: "bold",
        fontSize: 15,
        lineHeight: 26,
    },
})
