import { useAuth } from "@/context/auth"
import { useEffect, useState } from "react"
import { SafeAreaView } from "react-native"
import * as SecureStore from "expo-secure-store"
import { Text, TouchableOpacity, View, StyleSheet } from "react-native"

import { colors } from "@/app/colors/colors"
import Background from "../components/background"
import BackButton from "../components/backbutton"
import Logo from "../components/logo"
import { ActivityIndicator, TextInput } from "react-native-paper"
import Button from "../components/button"
import { router } from "expo-router"

export default function Login() {
    const auth = useAuth()
    const [token, setToken] = useState("")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function getToken() {
            const token = await SecureStore.getItemAsync("token")
            auth.setUser({ ...auth.user })
            if (token) setToken(token)
            if (token) router.push("./(tabs)")
            setLoading(false)
            return
        }
        getToken()
    }, [])

    if (loading) {
        return <ActivityIndicator animating={true} size="large" style={styles.loading} />
    }

    return (
        <SafeAreaView style={styles.container}>
            <Background>
                <BackButton />
                <Logo />
                <Text style={styles.title}>Bem-vindo de volta!</Text>

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

                <View style={styles.forgotPassword}>
                    <TouchableOpacity
                        onPress={() => {
                            console.log("Forgot password")
                            // router.push("./reset")
                        }}
                    >
                        <Text style={styles.forgot}>Esqueceu a sua senha?</Text>
                    </TouchableOpacity>
                </View>
                <Button mode="contained" onPress={auth.handleLogin}>
                    Entrar
                </Button>
                <View style={styles.row}>
                    <Text>Ainda não tem uma conta? </Text>
                    <TouchableOpacity
                        onPress={() => {
                            // router.push("provider/account")
                            router.push("provider/register")
                        }}
                    >
                        <Text style={styles.link}>Cadastre-se</Text>
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
        paddingVertical: 12,
    },
    text: {
        fontSize: 15,
        lineHeight: 21,
        textAlign: "center",
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
    loading: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
})
