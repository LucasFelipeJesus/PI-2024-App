import { View, StyleSheet } from "react-native"
import { Text } from "react-native-paper"
import { Button } from "react-native-paper"
import { router } from "expo-router"
import { useAuth } from "../../../context/auth"
import { Header } from "@/app/components/header"
import { SafeAreaView } from "react-native-safe-area-context"

export default function Home() {
    const auth = useAuth()
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Header />
                <Text variant="displaySmall">Provider Home</Text>
                <Button
                    mode="elevated"
                    style={styles.mt20}
                    onPress={() => router.replace("../../")}
                >
                    Voltar para Home
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
        alignItems: "center",
    },
    mt20: {
        marginTop: 20,
        width: 310,
    },
})
