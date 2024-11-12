import { router } from "expo-router"
import { useState } from "react"
import { Text, SafeAreaView, StyleSheet } from "react-native"
import { ActivityIndicator, TextInput } from "react-native-paper"

import { colors } from "@/app/colors/colors"
import Background from "../components/background"
import BackButton from "../components/backbutton"
import Button from "../components/button"

export default function Register() {
    const [name, setName] = useState("")
    const [cep, setCep] = useState("")
    const [phone, setPhone] = useState("")
    const [document, setDocument] = useState("")
    const [birthdate, setBirthdate] = useState("")

    const onSignUpPressed = () => {
        router.push("provider/services")
    }

    return (
        <SafeAreaView style={styles.container}>
            <Background>
                <BackButton />
                <Text style={styles.title}>Informações pessoais</Text>
                <Text style={styles.text}>
                    Precisamos de mais alguns dados para finalizar o seu cadastro. Por favor,
                    preencha todos os campos abaixo.
                </Text>

                <TextInput
                    label="Nome"
                    returnKeyType="next"
                    keyboardType="default"
                    underlineColor="transparent"
                    mode="outlined"
                    style={styles.input}
                    onChangeText={(text) => setName(text)}
                />

                <TextInput
                    label="CEP"
                    returnKeyType="next"
                    keyboardType="numeric"
                    underlineColor="transparent"
                    mode="outlined"
                    style={styles.input}
                    onChangeText={(text) => setCep(text)}
                />

                <TextInput
                    label="Telefone"
                    returnKeyType="next"
                    keyboardType="phone-pad"
                    underlineColor="transparent"
                    mode="outlined"
                    style={styles.input}
                    onChangeText={(text) => setPhone(text)}
                />

                <TextInput
                    label="CPF ou CNPJ"
                    returnKeyType="next"
                    keyboardType="number-pad"
                    underlineColor="transparent"
                    mode="outlined"
                    style={styles.input}
                    onChangeText={(text) => setDocument(text)}
                />

                <TextInput
                    label="Data de Nascimento"
                    returnKeyType="next"
                    textContentType="birthdate"
                    keyboardType="decimal-pad"
                    underlineColor="transparent"
                    mode="outlined"
                    style={styles.input}
                    onChangeText={(text) => setBirthdate(text)}
                />

                <Button mode="contained" onPress={onSignUpPressed} style={{ marginTop: 24 }}>
                    Continuar
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
