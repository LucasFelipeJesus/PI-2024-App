import React, { useState } from "react"
import { Text, ActivityIndicator, TextInput } from "react-native-paper"
import { router } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import { StyleSheet } from "react-native"

import { colors } from "../colors/colors"
import { NameValidator } from "../utils/nameValidator"
import Background from "../components/background"
import BackButton from "../components/backbutton"
import Button from "../components/button"

export default function Services() {
    const [description, setDescription] = useState("")

    const onSignUpPressed = () => {
        router.push("provider/welcome")
    }

    return (
        <SafeAreaView style={styles.container}>
            <Background>
                <BackButton />
                <Text style={styles.title}>Descreva seus serviços</Text>
                <Text style={styles.text}>
                    Para finalizar, precisamos que você detalhe os seus serviços. Utilize o campo de
                    Descrição para informar o que você oferece, e o campo de Preço para informar o
                    valor do serviço.
                </Text>
                <TextInput
                    label="Descrição dos Serviços"
                    returnKeyType="next"
                    keyboardType="default"
                    underlineColor="transparent"
                    mode="outlined"
                    style={styles.input}
                    multiline={true}
                    onChangeText={(text) => setDescription(text)}
                />
                <Button mode="contained" onPress={onSignUpPressed} style={{ marginTop: 24 }}>
                    Finalizar o cadastro
                </Button>
            </Background>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    title: {
        width: "100%",
        fontSize: 21,
        color: colors.blue[500],
        fontWeight: "bold",
        paddingTop: 30,
        paddingVertical: 20,
    },
    text: {
        width: "100%",
        fontSize: 15,
        lineHeight: 21,
        marginBottom: 12,
    },
    input: {
        width: "100%",
        marginTop: 10,
        backgroundColor: colors.white,
        fontSize: 14,
    },
    forgotPassword: {
        width: "100%",
        alignItems: "flex-end",
        marginBottom: 24,
    },
    row: {
        flexDirection: "row",
        marginTop: 4,
    },
    forgot: {
        fontSize: 13,
        color: colors.gray[300],
    },
    link: {
        fontWeight: "bold",
        color: colors.blue[300],
    },
})
