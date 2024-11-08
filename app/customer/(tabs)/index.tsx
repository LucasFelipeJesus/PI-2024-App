import { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text, Button, Divider } from "react-native-paper";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/context/auth";
import CatalogoProfissionais from "@/app/components/catalogo_professionals";


export default function Teste() {
    const auth = useAuth();
    const [token, setToken] = useState("");
    const router = useRouter();

    useEffect(() => {
        async function getToken() {
            const token = await SecureStore.getItemAsync("token");
            if (token) setToken(token);
        }
        getToken();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            {auth.user && (
                <View style={styles.userInfo}>
                    <Text style={styles.welcomeText}>Olá, {auth.user.email}</Text>
                    <Text style={styles.userType}>Tipo: {auth.user.type}</Text>
                </View>
            )}

            <Divider style={styles.divider} />
            <Text style={styles.tokenText}>Token: {token}</Text>
            <Text style={styles.catalogTitle}>Catálogo de Profissionais</Text>

            <CatalogoProfissionais />

            <View style={styles.buttonContainer}>
                <Button
                    mode="elevated"
                    style={styles.button}
                    onPress={() => router.push("/")}
                >
                    Página Principal
                </Button>
                <Button mode="elevated" style={styles.button} onPress={auth.handleLogout}>
                    Logout
                </Button>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f9f9f9",
        padding: 20,
    },
    userInfo: {
        marginBottom: 20,
    },
    welcomeText: {
        fontSize: 20,
        fontWeight: "600",
        color: "#333",
    },
    userType: {
        fontSize: 16,
        color: "#666",
    },
    divider: {
        marginVertical: 10,
        backgroundColor: "#ddd",
    },
    tokenText: {
        fontSize: 14,
        color: "#888",
        marginBottom: 20,
    },
    catalogTitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 15,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
    },
    button: {
        flex: 1,
        marginHorizontal: 5,
    },
});
