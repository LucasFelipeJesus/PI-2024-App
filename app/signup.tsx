import { Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useState } from "react"
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

export default function SignUp() {
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
            auth.handleSignup()
        }
    }

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
                    label="E-mail"
                    returnKeyType="next"
                    value={email.value}
                    onChangeText={(text: string) => setEmail({ value: text, error: "" })}
                    error={!!email.error}
                    errorText={email.error}
                    autoCapitalize="none"
                    autoCompleteType="email"
                    textContentType="emailAddress"
                    keyboardType="email-address"
                />
                <TextInput
                    label="Senha"
                    returnKeyType="done"
                    value={password.value}
                    onChangeText={(text: string) => setPassword({ value: text, error: "" })}
                    error={!!password.error}
                    errorText={password.error}
                    secureTextEntry
                />
                <Button mode="contained" onPress={onLoginPressed}>
                    Continuar
                </Button>
                <View style={styles.row}>
                    <Text>Já tem uma conta? </Text>
                    <TouchableOpacity
                        onPress={() => {
                            router.push("signin")
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
        paddingVertical: 12,
    },
    text: {
        width: "100%",
        fontSize: 15,
        lineHeight: 21,
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
