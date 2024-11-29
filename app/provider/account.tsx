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
    const [isLoading, setIsLoading] = useState(false)

    const handleSignup = async () => {
        setIsLoading(true)
        try {
            await auth.handleSignup()
        } catch (error) {
            console.error("Signup error:", error)
        } finally {
            setIsLoading(false)
        }
    }

    const renderLoadingOverlay = () => {
        if (!isLoading) return null

        return (
            <View style={styles.loadingOverlay}>
                <ActivityIndicator size="large" color={colors.blue[500]} />
                <Text style={styles.loadingText}>Carregando...</Text>
            </View>
        )
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
                    label={"Email"}
                    returnKeyType="next"
                    keyboardType="email-address"
                    underlineColor="transparent"
                    mode="outlined"
                    style={styles.input}
                    onChangeText={(text) => auth.setUser({ ...auth.user, email: text })}
                    disabled={isLoading}
                />

                <TextInput
                    label="Senha"
                    returnKeyType="done"
                    secureTextEntry={true}
                    underlineColor="transparent"
                    mode="outlined"
                    style={styles.input}
                    onChangeText={(text) => auth.setUser({ ...auth.user, password: text })}
                    disabled={isLoading}
                />

                <Button
                    mode="contained"
                    onPress={handleSignup}
                    style={{ marginTop: 24 }}
                    disabled={isLoading}
                >
                    {isLoading ? "Carregando..." : "Continuar"}
                </Button>

                <View style={styles.row}>
                    <Text>Já tem uma conta? </Text>
                    <TouchableOpacity
                        onPress={() => {
                            router.push("provider")
                        }}
                        disabled={isLoading}
                    >
                        <Text style={styles.link}>Entrar</Text>
                    </TouchableOpacity>
                </View>

                {renderLoadingOverlay()}
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
    loadingOverlay: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(255,255,255,0.7)",
        zIndex: 1000,
    },
    loadingText: {
        marginTop: 10,
        color: colors.blue[500],
        fontSize: 16,
    },
})
