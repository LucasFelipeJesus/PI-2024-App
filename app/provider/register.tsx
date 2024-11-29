import React, { useState } from "react"
import {
    Text,
    SafeAreaView,
    StyleSheet,
    View,
    Modal,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
} from "react-native"
import { TextInput, Button as PaperButton } from "react-native-paper"
import { router } from "expo-router"

import { colors } from "@/app/colors/colors"
import Background from "../components/background"
import BackButton from "../components/backbutton"
import Button from "../components/button"

// Interface for address data
interface AddressData {
    erro?: any
    logradouro?: string
    bairro?: string
    localidade?: string
    uf?: string
}

export default function Register() {
    // State variables with explicit types
    const [name, setName] = useState<string>("")
    const [cep, setCep] = useState<string>("")
    const [phone, setPhone] = useState<string>("")
    const [cpfCnpj, setCpfCnpj] = useState<string>("")
    const [address, setAddress] = useState<string>("")
    const [district, setDistrict] = useState<string>("")
    const [city, setCity] = useState<string>("")
    const [state, setState] = useState<string>("")
    const [addressView, setAddressView] = useState<string>("")

    // Modal state
    const [isCepModalVisible, setIsCepModalVisible] = useState<boolean>(false)
    const [searchCep, setSearchCep] = useState<string>("")
    const [addressData, setAddressData] = useState<AddressData | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    // CEP search function
    const handleCepSearch = async () => {
        // Remove non-numeric characters
        const cleanedCep = searchCep.replace(/\D/g, "")

        if (cleanedCep.length !== 8) {
            alert("CEP inválido. Digite 8 dígitos.")
            return
        }

        setIsLoading(true)
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cleanedCep}/json/`)
            const data: AddressData = await response.json()

            if (data.erro) {
                alert("CEP não encontrado")
                return
            }

            // Update address fields
            setAddress(data.logradouro || "")
            setDistrict(data.bairro || "")
            setCity(data.localidade || "")
            setState(data.uf || "")
            setCep(cleanedCep)
            setAddressView(data.bairro || "")

            // Close modal
            setIsCepModalVisible(false)
        } catch (error) {
            console.error("Erro ao buscar CEP:", error)
            alert("Erro ao buscar CEP. Tente novamente.")
        } finally {
            setIsLoading(false)
        }
    }

    const onSignUpPressed = () => {
        // Basic validation
        if (!name || !cep || !phone || !cpfCnpj) {
            alert("Por favor, preencha todos os campos")
            return
        }
        router.push("provider/services")
    }

    const renderCepModal = () => (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isCepModalVisible}
            onRequestClose={() => setIsCepModalVisible(false)}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Buscar CEP</Text>
                        <TextInput
                            label="Digite o CEP"
                            value={searchCep}
                            onChangeText={setSearchCep}
                            keyboardType="numeric"
                            maxLength={8}
                            mode="outlined"
                            style={styles.input}
                        />
                        <View style={styles.modalButtonContainer}>
                            <TouchableOpacity
                                style={styles.modalCancelButton}
                                onPress={() => setIsCepModalVisible(false)}
                            >
                                <Text style={styles.modalCancelButtonText}>Cancelar</Text>
                            </TouchableOpacity>
                            <PaperButton
                                mode="contained"
                                onPress={handleCepSearch}
                                loading={isLoading}
                                disabled={isLoading}
                            >
                                Buscar
                            </PaperButton>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )

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
                    value={name}
                    returnKeyType="next"
                    keyboardType="default"
                    underlineColor="transparent"
                    mode="outlined"
                    style={styles.input}
                    onChangeText={setName}
                />
                <TextInput
                    label="CEP"
                    value={cep}
                    returnKeyType="next"
                    keyboardType="numeric"
                    underlineColor="transparent"
                    mode="outlined"
                    style={styles.input}
                    //editable={false}
                    onFocus={() => setIsCepModalVisible(true)}
                />
                <TextInput
                    label="Endereço"
                    value={addressView}
                    returnKeyType="next"
                    underlineColor="transparent"
                    multiline={true}
                    mode="outlined"
                    style={styles.input}
                    editable={false}
                />
                <TextInput
                    label="Telefone"
                    value={phone}
                    returnKeyType="next"
                    keyboardType="numeric"
                    underlineColor="transparent"
                    mode="outlined"
                    style={styles.input}
                    onChangeText={setPhone}
                />
                <TextInput
                    label="CPF ou CNPJ"
                    value={cpfCnpj}
                    returnKeyType="next"
                    keyboardType="numeric"
                    underlineColor="transparent"
                    mode="outlined"
                    style={styles.input}
                    onChangeText={setCpfCnpj}
                />
                <Button mode="contained" onPress={onSignUpPressed} style={{ marginTop: 24 }}>
                    Continuar
                </Button>

                {renderCepModal()}
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
    input: {
        width: "100%",
        marginTop: 10,
        backgroundColor: colors.white,
        fontSize: 14,
    },
    // Modal styles
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContent: {
        width: "90%",
        backgroundColor: colors.white,
        borderRadius: 10,
        padding: 20,
        alignItems: "center",
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 15,
        color: colors.blue[500],
    },
    modalButtonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginTop: 15,
    },
    modalCancelButton: {
        justifyContent: "center",
        paddingRight: 15,
    },
    modalCancelButtonText: {
        color: colors.blue[500],
        fontWeight: "bold",
    },
})
