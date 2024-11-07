import React from "react"
import { View, Text } from "react-native"
import { TextInput as Input } from "react-native-paper"
import { StyleSheet } from "react-native"

import { colors } from "../colors/colors"

interface TextInputProps {
    errorText?: string
    description?: string
    [key: string]: any
}

export default function TextInput({ errorText, description, ...props }: TextInputProps) {
    return (
        <View style={styles.container}>
            <Input
                style={styles.input}
                selectionColor={colors.blue[100]}
                underlineColor="transparent"
                mode="outlined"
                {...props}
            />
            {description && !errorText ? (
                <Text style={styles.description}>{description}</Text>
            ) : null}
            {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        marginVertical: 5,
    },
    input: {
        backgroundColor: colors.white,
        fontSize: 14,
    },
    description: {
        fontSize: 13,
        color: colors.gray[300],
        paddingTop: 8,
    },
    error: {
        fontSize: 13,
        color: colors.red[100],
        paddingTop: 8,
    },
})
