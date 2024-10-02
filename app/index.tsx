import { View, StyleSheet } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import { useAuth } from '../context/auth'


export default function Login() {
    const auth = useAuth()
    return (
        <View style={styles.container}>
            <TextInput label="Email" style={styles.mt20}
                onChangeText={(text) =>
                    auth.setUser({ ...auth.user, email: text })} />
            <TextInput label="Senha" secureTextEntry={true} style={styles.mt20}
                onChangeText={(text) => auth.setUser({ ...auth.user, password: text })} />
            <Button mode="contained"
                onPress={auth.handleLogin}
                style={styles.mt20}>Entrar</Button>


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff',
        padding: 20,
    },
    mt20: {
        marginTop: 20,
    },
})