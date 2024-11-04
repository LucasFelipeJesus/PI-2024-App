import { useEffect, useState } from "react"
import { View, StyleSheet, ScrollView } from "react-native"
import { Text } from "react-native-paper"
import { useAuth } from "../../context/auth"
import { Link } from "expo-router"
import { Button } from "react-native-paper"
import { router } from "expo-router"
import * as SecureStore from "expo-secure-store"
import { SafeAreaView } from "react-native-safe-area-context"
import CatalogoProfissionais from "../components/catalogo_professionals"

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
            <View>


                <Text variant="displaySmall">Teste Customer</Text>
                <Text variant="headlineSmall">Olá, {auth.user.email}</Text>
                <Text variant="headlineSmall">Type: {auth.user.type}</Text>
                <Text>Token: {token}</Text>

                <Text variant="displayMedium">Catalogo de Profissionais</Text>

                <CatalogoProfissionais />

                <Button
                    mode="elevated"
                    style={styles.mt20}
                    onPress={() => {
                        router.push("./")
                    }}
                >
                    Welcomes
                </Button>
                <Button mode="elevated" style={styles.mt20} onPress={auth.handleLogout}>
                    Logout
                </Button>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 20,
    },
    mt20: {
        marginTop: 20,
    },
})
