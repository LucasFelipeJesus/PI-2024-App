import {
    View,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    StatusBar,
    TouchableOpacity,
} from "react-native"
import { TextInput, Text, Appbar } from "react-native-paper"
import { useAuth } from "../../context/auth"
import * as SecureStore from "expo-secure-store"
import { useEffect, useState } from "react"
import { useLocalSearchParams, router } from "expo-router"

import { colors } from "../colors/colors"
import Button from "../components/button"

export default function Register() {
    const auth = useAuth()
    const [token, setToken] = useState("")

    useEffect(() => {
        async function getToken() {
            const token = await SecureStore.getItemAsync("token")
            if (token) setToken(token)
            return
        }
        getToken()
    }, [])

    const userTypeName = "Churrasqueiro"

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
                    <Button mode="contained" onPress={auth.handleLogin}>
                        Entrar
                    </Button>
                    <View style={styles.row}>
                        <Text>Ainda não tem uma conta? </Text>
                        <TouchableOpacity
                            onPress={() => {
                                router.push("./signup")
                            }}
                        >
                            <Text style={styles.link}>Cadastre-se</Text>
                        </TouchableOpacity>
                    </View>
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
    row: {
        flexDirection: "row",
        marginTop: 4,
    },
    link: {
        fontWeight: "bold",
        color: colors.blue[300],
    },
})
