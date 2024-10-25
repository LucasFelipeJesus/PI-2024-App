import { View, StyleSheet } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import { useAuth } from '../context/auth'
import * as SecureStore from 'expo-secure-store'
import { useEffect } from 'react'
import { router } from 'expo-router'

export default function Login() {
    const auth = useAuth()

    // useEffect(() => {
    //     async function getToken() {
    //         const token = await SecureStore.getItemAsync('token')
    //         if (token) router.push('home')
    //     }
    //     getToken()
    // }, [])

    return (
        <View style={styles.container}>
            <TextInput
                label="Email"
                style={styles.mt20}
                onChangeText={(text) => auth.setUser({ ...auth.user, email: text })}
            />
            <TextInput
                label="Senha"
                secureTextEntry={true}
                style={styles.mt20}
                onChangeText={(text) => auth.setUser({ ...auth.user, password: text })}
            />
            <Button mode="contained" style={styles.mt20} onPress={auth.handleLogin}>
                Entrar
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        // alignItems: "center",
        backgroundColor: '#fff',
        padding: 20,
    },
    mt20: {
        marginTop: 20,
    },
})