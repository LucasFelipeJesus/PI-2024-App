import { View, StyleSheet } from "react-native";
import { Text, Button, Divider } from "react-native-paper";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import CatalogoProfissionais from "../catalogo_professionals";

export default function Inicio() {

    const router = useRouter();

    return (
        <SafeAreaView style={styles.container}>
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


