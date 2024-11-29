import { View, StyleSheet, ScrollView, Image } from "react-native"
import { router } from "expo-router"
import { useAuth } from "../../../context/auth"
import { SafeAreaView } from "react-native-safe-area-context"

import { Header } from "@/app/components/header"
import { colors } from "@/app/colors/colors"
import Button from "@/app/components/button"

export default function Home() {
    const auth = useAuth()

    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <View style={styles.viewImage}>
                    <Image style={styles.image} source={require("@/app/assets/disponiveis.png")} />
                </View>
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
        justifyContent: "space-between",
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
    image: {
        width: 350,
        height: 500,
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
