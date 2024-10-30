import { View, StyleSheet, SafeAreaView, ScrollView, StatusBar } from "react-native"
import { Button, TextInput, Text, Appbar } from "react-native-paper"
import { useAuth } from "../context/auth"
import * as SecureStore from "expo-secure-store"
import { useEffect, useState } from "react"
import { useLocalSearchParams, router } from "expo-router"

import { colors } from "./colors/colors"

export default function Login() {
    const params = useLocalSearchParams<{ type?: string }>()
    const auth = useAuth()
    const [token, setToken] = useState("")
    const [userType, setUserType] = useState("")

    useEffect(() => {
        async function getToken() {
            const token = await SecureStore.getItemAsync("token")
            setUserType(params.type as string)
            if (token) setToken(token)
            if (token) router.push(userType)
            return
        }
        getToken()
    }, [])

    const userTypeName = userType === "customer" ? "Cliente" : "Churrasqueiro"

    return (
        <SafeAreaView style={styles.container}>
            <Appbar.Header style={styles.header}>
                <Appbar.BackAction
                    onPress={() => {
                        router.back()
                    }}
                />
                <Appbar.Content title="" />
                <Appbar.Action icon="menu" onPress={() => {}} />
            </Appbar.Header>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <View style={styles.viewArea}>
                    <Text style={styles.title}>Olá! {userTypeName}</Text>
                    <Text>Token: {token}</Text>
                    <TextInput
                        label={"Email"}
                        returnKeyType="next"
                        keyboardType="email-address"
                        underlineColor="transparent"
                        mode="outlined"
                        style={styles.input}
                        onChangeText={(text) =>
                            auth.setUser({ ...auth.user, email: text, type: userType })
                        }
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
                    <Button mode="contained" style={styles.button} onPress={auth.handleLogin}>
                        Entrar
                    </Button>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    viewArea: {
        flex: 1,
        width: "100%",
        padding: 20,
        backgroundColor: "transparent",
        justifyContent: "center",
    },
    contentContainer: {
        paddingVertical: 20,
    },
    header: {
        backgroundColor: "transparent",
        color: "white",
    },
    button: {
        width: "100%",
        borderRadius: 5,
        marginTop: 15,
        padding: 5,
        backgroundColor: colors.blue[200],
        color: colors.white,
    },
    input: {
        marginTop: 10,
        backgroundColor: colors.white,
        fontSize: 14,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginTop: 20,
    },
})
