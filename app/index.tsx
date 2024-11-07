import { StyleSheet, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { router } from "expo-router"
import { Button, Text } from "react-native-paper"
import { Icon } from "react-native-paper"
import * as SecureStore from "expo-secure-store"

import { colors } from "./colors/colors"
import { styles } from "./styles"
import Logo from "./components/logo"
import { useEffect } from "react"

export default function Welcome() {
    // useEffect(() => {
    //     async function getToken() {
    //         const token = await SecureStore.getItemAsync("token")
    //         // direcionar para a tela correta
    //         if (token) router.push("provider")
    //         return
    //     }
    //     getToken()
    // }, [])

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
                        router.push("login?type=provider")
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
