import { Slot, Stack } from "expo-router"
import { PaperProvider } from "react-native-paper"
import { AuthProvider } from "../context/auth"
import { SafeAreaProvider } from "react-native-safe-area-context"

export default function Layout() {
    return (
        <PaperProvider>
            <AuthProvider>
                <SafeAreaProvider>
                    <Slot />
                </SafeAreaProvider>
            </AuthProvider>
        </PaperProvider>
    )
}
