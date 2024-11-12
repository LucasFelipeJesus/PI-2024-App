import { useEffect, useState } from "react"
import { StyleSheet, ScrollView } from "react-native"
import { Appbar, Text } from "react-native-paper"
import { useAuth } from "../context/auth"
import { router } from "expo-router"
import * as SecureStore from "expo-secure-store"
import { SafeAreaView } from "react-native-safe-area-context"
import { colors } from "./colors/colors"
import Button from "./components/button"

export default function Teste() {
    const auth = useAuth()
    const [token, setToken] = useState("")
    useEffect(() => {
        async function getToken() {
            const token = await SecureStore.getItemAsync("token")
            if (token) setToken(token)
        }
        getToken()
    }, [])

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
                <Text variant="displaySmall">Teste</Text>
                <Text variant="headlineSmall">Olá, {auth.user.email}</Text>
                {/* <Text variant="headlineSmall">Type: {auth.user.type}</Text> */}
                <Text>Token: {token}</Text>
                <Button
                    mode="contained"
                    onPress={() => {
                        router.push("./")
                    }}
                >
                    Welcome
                </Button>
                <Button mode="contained" onPress={auth.handleLogout}>
                    Logout
                </Button>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    mt20: {
        marginTop: 20,
    },
    header: {
        backgroundColor: "transparent",
        color: "white",
    },
    contentContainer: {
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
})
