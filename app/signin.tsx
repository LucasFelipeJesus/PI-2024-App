import { Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useEffect, useState } from "react"
import { router } from "expo-router"
import { StyleSheet } from "react-native"
import { useAuth } from "../context/auth"

import { colors } from "./colors/colors"
import { EmailValidator } from "./utils/emailValidator"
import { PasswordValidator } from "./utils/passwordValidator"
import Background from "./components/background"
import Logo from "./components/logo"
import Button from "./components/button"
import BackButton from "./components/backbutton"
import TextInput from "./components/textinput"

export default function SignIn() {
    const auth = useAuth()
    const [email, setEmail] = useState({ value: "", error: "" })
    const [password, setPassword] = useState({ value: "", error: "" })

    const onLoginPressed = () => {
        const emailError = EmailValidator(email.value)
        const passwordError = PasswordValidator(password.value)
        if (emailError || passwordError) {
            setEmail({ ...email, error: emailError })
            setPassword({ ...password, error: passwordError })
            return
        }

        // Verificar porque o usuário, senha e tipo não estão sendo preenchidos com o auth.setUser
        auth.setUser({ email: email.value, password: password.value, type: "provider" })

        if (!auth.user || auth.user.email == "" || auth.user.password == "") {
            alert("Verificar: email e senha")
            return
        } else {
            auth.handleLogin()
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Background>
                <BackButton />
                <Logo />
                <Text style={styles.title}>Bem-vindo de volta!</Text>
                <TextInput
                    label="E-mail"
                    returnKeyType="next"
                    value={email.value}
                    onChangeText={(text: string) => setEmail({ value: text, error: "" })}
                    error={!!email.error}
                    errorText={email.error}
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect={false}
                    keyboardType="email-address"
                />
                <TextInput
                    label="Senha"
                    returnKeyType="next"
                    value={password.value}
                    onChangeText={(text: string) => setPassword({ value: text, error: "" })}
                    error={!!password.error}
                    errorText={password.error}
                    secureTextEntry
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
                <Button mode="contained" onPress={onLoginPressed}>
                    Entrar
                </Button>
                <View style={styles.row}>
                    <Text>Ainda não tem uma conta? </Text>
                    <TouchableOpacity
                        onPress={() => {
                            router.push("signup")
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
