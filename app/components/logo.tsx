import { StyleSheet } from "react-native"
import { Image } from "react-native"

export default function Logo() {
    return <Image source={require("../../assets/logo.png")} style={styles.logo} />
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    logo: {
        marginBottom: 8,
        width: 300,
        height: 300,
    },
})
