import { View, StyleSheet } from "react-native"
import { Text } from "react-native-paper"
import { Button } from "react-native-paper"
import { router } from "expo-router"
import { useAuth } from "../../../context/auth"

export default function Home() {
    const auth = useAuth()
    return (
        <View style={styles.container}>
            <Text variant="displaySmall">Customer Home</Text>
            <Button mode="elevated" style={styles.mt20} onPress={() => router.replace("home")}>
                Voltar para Home
            </Button>
            <Button mode="elevated" style={styles.mt20} onPress={auth.handleLogout}>
                Logout
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    mt20: {
        marginTop: 20,
        width: 310,
    },
})
