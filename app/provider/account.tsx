import { router } from "expo-router"
import { useState } from "react"
import { Text, SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native"
import { ActivityIndicator, TextInput } from "react-native-paper"

import { useAuth } from "@/context/auth"
import { colors } from "@/app/colors/colors"
import Background from "../components/background"
import BackButton from "../components/backbutton"
import Button from "../components/button"
import Logo from "../components/logo"

export default function Account() {
    const auth = useAuth()
    // const [email, setEmail] = useState()
    // const [password, setPassword] = useState()

    return (
        <SafeAreaView style={styles.container}>
            <Background>
                <BackButton />
                <Logo />
                <Text style={styles.title}>Vamos começar criando sua conta!</Text>
                <Text style={styles.text}>
                    Informe o e-mail e senha que serão usados para entrar na sua conta futuramente.
                </Text>

                <TextInput
                    label={"Email"}
                    returnKeyType="next"
                    keyboardType="email-address"
                    underlineColor="transparent"
                    mode="outlined"
                    style={styles.input}
                    onChangeText={(text) => auth.setUser({ ...auth.user, email: text })}
                />

                <TextInput
                    label="Senha"
                    returnKeyType="done"
                    secureTextEntry={true}
                    underlineColor="transparent"
                    mode="outlined"
                    style={styles.input}
                    onChangeText={(text) => auth.setUser({ ...auth.user, password: text })}
                />

                <Button mode="contained" onPress={auth.handleSignup} style={{ marginTop: 24 }}>
                    Continuar
                </Button>

                <View style={styles.row}>
                    <Text>Já tem uma conta? </Text>
                    <TouchableOpacity
                        onPress={() => {
                            router.push("provider")
                        }}
                    >
                        <Text style={styles.link}>Entrar</Text>
                    </TouchableOpacity>
                </View>
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
