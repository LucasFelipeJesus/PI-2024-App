import { Text } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"
import { router } from "expo-router"
import { StyleSheet } from "react-native"

import { colors } from "../colors/colors"
import Background from "../components/background"
import Logo from "../components/logo"
import Button from "../components/button"
import BackButton from "../components/backbutton"

export default function Welcome() {
    return (
        <SafeAreaView style={styles.container}>
            <Background>
                <BackButton />
                <Logo />
                <Text style={styles.title}>Seja muito bem-vindo ao Churrasqueiro Já!</Text>
                <Text style={styles.text}>
                    Agora você faz parte da comunidade de profissionais churrasqueiros que procuram
                    ampliar sua carteira de clientes e fazer bons negócios.
                </Text>
                <Button
                    mode="contained"
                    onPress={() => {
                        router.push("provider/(tabs)")
                    }}
                >
                    Continuar
                </Button>
            </Background>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    title: {
        width: "100%",
        fontSize: 21,
        color: colors.blue[500],
        fontWeight: "bold",
        paddingVertical: 12,
    },
    text: {
        width: "100%",
        fontSize: 15,
        lineHeight: 21,
        marginBottom: 12,
    },
})
