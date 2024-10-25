import { View, StyleSheet } from "react-native"
import { Button, TextInput, Text } from "react-native-paper"
import { useAuth } from "../context/auth"
import * as SecureStore from "expo-secure-store"
import { useEffect, useState } from "react"
import { router } from "expo-router"

interface Props {
    type?: "provider" | "customer" | undefined
}

export default function Login({ type }: Props) {
    const auth = useAuth()
    const typeUser = type || "provider"

    const onLoginPressed = () => {
        // const emailError = emailValidator(email.value)
        // const passwordError = passwordValidator(password.value)
        // if (emailError || passwordError) {
        //     setEmail({ ...email, error: emailError })
        //     setPassword({ ...password, error: passwordError })
        //     return
        // }
        console.log(auth.user)
        auth.handleLogin
    }

    const [token, setToken] = useState("")
    useEffect(() => {
        async function getToken() {
            const token = await SecureStore.getItemAsync("token")
            if (token) setToken(token)
        }
        getToken()
    }, [])

    useEffect(() => {
        async function getToken() {
            const token = await SecureStore.getItemAsync("token")
            if (token) router.push("teste")
        }
        getToken()
    }, [])

    return (
        <View style={styles.container}>
            <Text>Teste</Text>
            <Text>Olá, {auth.user.email}</Text>
            <Text>Token: {token}</Text>
            <TextInput
                label={"Email"}
                returnKeyType="next"
                keyboardType="email-address"
                error={!!auth.user.error}
                style={styles.mt20}
                onChangeText={(text) => auth.setUser({ ...auth.user, email: text, error: text })}
            />
            <TextInput
                label="Senha"
                returnKeyType="done"
                secureTextEntry={true}
                error={!!auth.user.error}
                style={styles.mt20}
                onChangeText={(text) => auth.setUser({ ...auth.user, password: text, error: text })}
            />
            <Button mode="contained" style={styles.mt20} onPress={auth.handleLogin}>
                Entrar
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        // alignItems: "center",
        backgroundColor: "#fff",
        padding: 20,
    },
    mt20: {
        marginTop: 20,
    },
})
