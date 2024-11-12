import { StyleSheet, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { router } from "expo-router"
import { Text } from "react-native-paper"
import { Icon } from "react-native-paper"

import { colors } from "./colors/colors"
import Logo from "./components/logo"
import Background from "./components/background"

export default function Welcome() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.logo}>
                <Logo />
            </View>
            <Text style={styles.title}>Olá!</Text>
            <Text>
                A maneira mais fácil de começar com seu aplicativo incrível! Escolha o que deseja
                fazer:
            </Text>
            <View style={styles.touchable}>
                <TouchableOpacity
                    style={styles.gotocustomer}
                    activeOpacity={0.7}
                    onPress={() => {
                        // router.push("login?type=customer")
                        router.push("customer")
                    }}
                >
                    <View style={styles.cover}>
                        <Text style={styles.subtitle1}>Sou Cliente</Text>
                        <Text style={styles.textwhite}>
                            Quero contratar um churrasqueiro para o meu evento.
                        </Text>
                    </View>
                    <View style={styles.icon1}>
                        <Icon source="arrow-right" size={45} color={colors.white} />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.touchable}>
                <TouchableOpacity
                    style={styles.gotoprovider}
                    activeOpacity={0.7}
                    onPress={() => {
                        // router.push("login?type=provider")
                        router.push("provider")
                        // router.push("signin")
                    }}
                >
                    <View style={styles.cover}>
                        <Text style={styles.subtitle2}>Sou Churrasqueiro</Text>
                        <Text>Quero receber solicitações de serviços para eventos.</Text>
                    </View>
                    <View style={styles.icon2}>
                        <Icon source="arrow-right" size={45} color={colors.black} />
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    logo: {
        alignItems: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginTop: 20,
    },
    touchable: {
        alignItems: "center",
        justifyContent: "center",
    },
    gotocustomer: {
        width: "100%",
        height: 150,
        backgroundColor: colors.blue[200],
        marginTop: 20,
        justifyContent: "center",
        padding: 20,
        borderRadius: 10,
    },
    gotoprovider: {
        width: "100%",
        height: 150,
        backgroundColor: colors.yellow[300],
        marginTop: 20,
        justifyContent: "center",
        padding: 20,
        borderRadius: 10,
    },
    cover: {
        width: "60%",
    },
    icon1: {
        flex: 1,
        height: 150,
        width: "40%",
        position: "absolute",
        right: 0,
        backgroundColor: colors.blue[100],
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    icon2: {
        flex: 1,
        height: 150,
        width: "40%",
        position: "absolute",
        right: 0,
        backgroundColor: colors.yellow[200],
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    subtitle1: {
        fontSize: 18,
        fontWeight: "bold",
        color: colors.white,
    },
    subtitle2: {
        fontSize: 18,
        fontWeight: "bold",
        color: colors.black,
    },
    textwhite: {
        color: colors.white,
    },
})
