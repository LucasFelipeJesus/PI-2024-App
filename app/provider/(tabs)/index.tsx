import { View, StyleSheet, ScrollView } from "react-native"
import { Appbar, Avatar, Text } from "react-native-paper"
import { router } from "expo-router"
import { useAuth } from "../../../context/auth"
import { SafeAreaView } from "react-native-safe-area-context"
import * as SecureStore from "expo-secure-store"
import { useEffect, useState } from "react"

import { Header } from "@/app/components/header"
import { colors } from "@/app/colors/colors"
import Button from "@/app/components/button"

export default function Home() {
    const auth = useAuth()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [image, setImage] = useState("")
    const [token, setToken] = useState("")

    useEffect(() => {
        async function getToken() {
            const name = await SecureStore.getItemAsync("name")
            const email = await SecureStore.getItemAsync("email")
            const image = await SecureStore.getItemAsync("image")
            const token = await SecureStore.getItemAsync("token")
            if (name) setName(name)
            if (email) setEmail(email)
            if (image) setImage(image)
            if (token) setToken(token)
        }
        getToken()
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <View style={styles.viewImage}>
                    {image && (
                        <Avatar.Image
                            style={{ marginTop: 20 }}
                            size={200}
                            source={{ uri: image }}
                        />
                    )}
                </View>
                <Text variant="displaySmall">Início</Text>
                <Text variant="headlineSmall">Olá, {name}</Text>
                <Text>E-mail: {email}</Text>
                <Text>Token: {token}</Text>
            </ScrollView>
            <View style={styles.viewButton}>
                <Button mode="contained" onPress={() => router.replace("../../")}>
                    Welcome
                </Button>
                <Button mode="contained" onPress={auth.handleLogout}>
                    Logout
                </Button>
            </View>
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
        width: 310,
    },
    header: {
        backgroundColor: "transparent",
        color: "white",
    },
    contentContainer: {
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    viewImage: {
        flex: 1,
        alignItems: "center",
    },
    viewButton: {
        flex: 1,
        height: "100%",
        marginHorizontal: 20,
        justifyContent: "flex-end",
    },
})
