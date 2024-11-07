import { View, Image, Text, TouchableOpacity } from "react-native"
import { StyleSheet } from "react-native"
import { Feather } from "@expo/vector-icons"
import { useAuth } from "@/context/auth"
import * as SecureStore from "expo-secure-store"
import { useEffect, useState } from "react"

import { colors } from "@/app/colors/colors"
import { Badge } from "react-native-paper"

export function Header() {
    const auth = useAuth()
    const [userToken, setUserToken] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [userType, setUserType] = useState("")

    useEffect(() => {
        async function getUserToken() {
            const token = await SecureStore.getItemAsync("token")
            if (token) setUserToken(token)
            return
        }
        getUserToken()
    }, [])

    useEffect(() => {
        async function getUserEmail() {
            const email = await SecureStore.getItemAsync("email")
            if (email) setUserEmail(email)
            return
        }
        getUserEmail()
    }, [])

    useEffect(() => {
        async function getUserType() {
            const type = await SecureStore.getItemAsync("type")
            if (type) setUserType(type)
            return
        }
        getUserType()
    }, [])

    const userTypeName = userType === "customer" ? "Cliente" : "Churrasqueiro"

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={{ uri: "https://github.com/luisgaspari.png" }} />
            <View style={styles.user}>
                <Text style={styles.name}>{userToken}</Text>
                <Text style={styles.email}>{userEmail}</Text>
            </View>
            <Badge style={styles.badge}>{userTypeName}</Badge>

            <TouchableOpacity>
                <Feather name="more-vertical" size={22} color={colors.gray[800]} />
            </TouchableOpacity>
        </View>
    )
}

export const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        padding: 20,
        borderBottomWidth: 0.5,
        borderBottomColor: colors.gray[400],
    },
    image: {
        width: 42,
        height: 42,
    },
    user: {
        flex: 1,
    },
    name: {
        color: colors.gray[600],
        fontWeight: "500",
        fontSize: 16,
    },
    email: {
        color: colors.gray[300],
        fontSize: 14,
    },
    badge: {
        backgroundColor: colors.yellow[300],
        color: colors.black,
        alignSelf: "flex-end",
    },
})
