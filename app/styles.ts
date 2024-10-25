import { StyleSheet } from "react-native"
import { colors } from "./colors/colors"

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    logo: {
        alignItems: "center",
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 8,
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
