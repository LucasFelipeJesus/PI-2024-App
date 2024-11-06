import { useState } from "react"
import { Text } from "react-native-paper"
import { router } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import { StyleSheet } from "react-native"

import { colors } from "./colors/colors"
import { NameValidator } from "./utils/nameValidator"
import { CepValidator } from "./utils/cepValidator"
import { PhoneValidator } from "./utils/phoneValidator"
import { DocumentValidator } from "./utils/documentValidator"
import { BirthdateValidator } from "./utils/birthdateValidator"
import Background from "./components/background"
import BackButton from "./components/backbutton"
import TextInput from "./components/textinput"
import Button from "./components/button"

export default function Register() {
    const [name, setName] = useState({ value: "", error: "" })
    const [cep, setCep] = useState({ value: "", error: "" })
    const [phone, setPhone] = useState({ value: "", error: "" })
    const [document, setDocument] = useState({ value: "", error: "" })
    const [birthdate, setBirthdate] = useState({ value: "", error: "" })

    const onSignUpPressed = () => {
        const nameError = NameValidator(name.value)
        const cepError = CepValidator(cep.value)
        const phoneError = PhoneValidator(phone.value)
        const documentError = DocumentValidator(document.value)
        const birthdateError = BirthdateValidator(birthdate.value)
        // if (nameError || cepError || phoneError || documentError || birthdateError) {
        //     setName({ ...name, error: nameError })
        //     setCep({ ...cep, error: cepError })
        //     setPhone({ ...phone, error: phoneError })
        //     setDocument({ ...document, error: documentError })
        //     setBirthdate({ ...birthdate, error: birthdateError })
        //     return
        // }
        router.push("services")
    }

    return (
        <SafeAreaView style={styles.container}>
            <Background>
                <BackButton />
                <Text style={styles.title}>Informações pessoais</Text>
                <Text style={styles.text}>
                    Precisamos de mais alguns dados para finalizar o seu cadastro. Por favor,
                    preencha todos os campos abaixo.
                </Text>
                <TextInput
                    label="Nome"
                    returnKeyType="next"
                    value={name.value}
                    onChangeText={(text: string) => setName({ value: text, error: "" })}
                    error={!!name.error}
                    errorText={name.error}
                />
                <TextInput
                    label="CEP"
                    returnKeyType="next"
                    value={cep.value}
                    onChangeText={(text: string) => setCep({ value: text, error: "" })}
                    textContentType="postalCode"
                    keyboardType="numeric"
                    error={!!cep.error}
                    errorText={cep.error}
                />
                <TextInput
                    label="Telefone"
                    returnKeyType="next"
                    value={phone.value}
                    onChangeText={(text: string) => setPhone({ value: text, error: "" })}
                    textContentType="telephoneNumber"
                    keyboardType="phone-pad"
                    error={!!phone.error}
                    errorText={phone.error}
                />
                <TextInput
                    label="CPF ou CNPJ"
                    returnKeyType="next"
                    value={document.value}
                    onChangeText={(text: string) => setDocument({ value: text, error: "" })}
                    keyboardType="number-pad"
                    error={!!document.error}
                    errorText={document.error}
                />
                <TextInput
                    label="Data de Nascimento"
                    returnKeyType="next"
                    value={birthdate.value}
                    onChangeText={(text: string) => setBirthdate({ value: text, error: "" })}
                    textContentType="birthdate"
                    keyboardType="decimal-pad"
                    error={!!birthdate.error}
                    errorText={birthdate.error}
                />
                <Button mode="contained" onPress={onSignUpPressed} style={{ marginTop: 24 }}>
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
        paddingTop: 30,
        paddingVertical: 20,
    },
    text: {
        width: "100%",
        fontSize: 15,
        lineHeight: 21,
        marginBottom: 12,
    },
    forgotPassword: {
        width: "100%",
        alignItems: "flex-end",
        marginBottom: 24,
    },
    row: {
        flexDirection: "row",
        marginTop: 4,
    },
    forgot: {
        fontSize: 13,
        color: colors.gray[300],
    },
    link: {
        fontWeight: "bold",
        color: colors.blue[300],
    },
})
