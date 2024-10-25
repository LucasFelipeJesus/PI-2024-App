import { useEffect, useState } from "react"
import { View, StyleSheet, ScrollView } from "react-native"
import { Text } from "react-native-paper"
import { useAuth } from "../context/auth"
import { Link } from "expo-router"
import { Button } from "react-native-paper"
import { router } from "expo-router"
import * as SecureStore from 'expo-secure-store'


interface IPost {
    id: number
    title: string
    status: string
}

export default function Home() {
    const auth = useAuth()
    // const [posts, setPosts] = useState<IPost[]>([])
    const [token, setToken] = useState('')
    useEffect(() => {
        // fetch('https://jsonplaceholder.org/posts')
        //     .then(response => response.json())
        //     .then(json => setPosts(json))
        async function getToken() {
            const token = await SecureStore.getItemAsync('token')
            if (token) setToken(token)
        }
        getToken()
    }, [])

    return (
        <ScrollView style={styles.container}>
            <Button mode="elevated" style={styles.mt20} onPress={() => router.replace('profile')}>
                Profile - Tabs
            </Button>
            <Text variant="headlineSmall">Olá {auth.user.email}</Text>
            <Text variant="headlineSmall">Token: {token}</Text>
            <Text variant="displaySmall">Posts</Text>
            {/* {posts.map(post => (
                <View key={post.id} style={styles.mt20}>
                    <Text variant="titleMedium">{post.id}</Text>
                    <Text variant="bodyMedium">{post.title}</Text>
                    <Text variant="labelLarge">{post.status}</Text>
                </View>
            ))} */}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    mt20: {
        marginTop: 20,
    },
})