import React, { useCallback, useState } from "react"
import {
    Text,
    SafeAreaView,
    StyleSheet,
    View,
    Modal,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
    ActivityIndicator,
} from "react-native"
import { TextInput, Button as PaperButton } from "react-native-paper"
import { router } from "expo-router"
import * as SecureStore from "expo-secure-store"

import { colors } from "@/app/colors/colors"
import Background from "../components/background"
import BackButton from "../components/backbutton"
import Button from "../components/button"

// Interface for professional data
interface ProfessionalData {
    name: string
    cep: string
    phone: string
    cpf: string
    address: string
    district: string
    city: string
    state: string
}

// Interface for address data
interface AddressData {
    logradouro?: string
    bairro?: string
    localidade?: string
    uf?: string
    erro?: boolean
}

export default function Register() {
    // State variables with explicit types
    const [name, setName] = useState<string>("")
    const [cep, setCep] = useState<string>("")
    const [phone, setPhone] = useState<string>("")
    const [cpf, setCpfCnpj] = useState<string>("")
    const [address, setAddress] = useState<string>("")
    const [district, setDistrict] = useState<string>("")
    const [city, setCity] = useState<string>("")
    const [state, setState] = useState<string>("")
    const [addressView, setAddressView] = useState<string>("")
    const [globalLoading, setGlobalLoading] = useState<boolean>(false)

    // Modal state
    const [isCepModalVisible, setIsCepModalVisible] = useState<boolean>(false)
    const [searchCep, setSearchCep] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)

    // Format CEP with mask
    const formatCEP = (text: string) => {
        return text.replace(/\D/g, "").replace(/^(\d{5})(\d{3})$/, "$1-$2")
    }

    // CEP search function
    const handleCepSearch = async () => {
        // Remove non-numeric characters
        const cleanedCep = searchCep.replace(/\D/g, "")

        if (cleanedCep.length !== 8) {
            Alert.alert("CEP inválido. Digite 8 dígitos.")
            return
        }

        setIsLoading(true)
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cleanedCep}/json/`)
            const data: AddressData = await response.json()

            if (data.erro) {
                Alert.alert("CEP não encontrado", "Verifique o CEP digitado.")
                setIsLoading(false)
                return
            }

            // Update address fields
            setAddress(data.logradouro || "")
            setDistrict(data.bairro || "")
            setCity(data.localidade || "")
            setState(data.uf || "")
            setCep(formatCEP(cleanedCep))
            setAddressView(
                `${data.logradouro}, ${data.bairro}, ${data.localidade}, ${data.uf}` || ""
            )

            // Close modal
            setIsCepModalVisible(false)
        } catch (error) {
            console.error("Erro ao buscar CEP:", error)
            Alert.alert("Erro", "Não foi possível buscar o CEP. Tente novamente.")
        } finally {
            setIsLoading(false)
        }
    }

    // Save professional data to API
    const saveProfessionalData = useCallback(async () => {
        // Validate inputs
        if (!name || !cep || !phone || !cpf || !address) {
            Alert.alert("Campos Obrigatórios", "Por favor, preencha todos os campos.")
            return false
        }

        try {
            const token = await SecureStore.getItemAsync("token")
            const email = await SecureStore.getItemAsync("email")

            if (!token || !email) {
                Alert.alert("Erro", "Usuário não autenticado")
                return false
            }

            const professionalData: ProfessionalData = {
                name,
                cep,
                phone,
                cpf,
                address,
                district,
                city,
                state,
            }

            const response = await fetch(
                `https://api-bckend.onrender.com/api/professional/${token}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        // Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        ...professionalData,
                        email,
                        token,
                    }),
                }
            )

            // Log full response for debugging
            const responseText = await response.text()
            console.log("Full API Response:", responseText)

            // Check if response looks like JSON
            if (!responseText.trim().startsWith("{") && !responseText.trim().startsWith("[")) {
                throw new Error("Resposta do servidor não é um JSON válido")
            }

            try {
                const data = JSON.parse(responseText)

                // Additional checks if needed
                if (response.status !== 200) {
                    throw new Error(data.message || "Erro ao salvar dados")
                }

                return true
            } catch (parseError) {
                console.error("JSON Parse Error:", parseError)
                Alert.alert("Erro", "Não foi possível processar a resposta do servidor")
                return false
            }
        } catch (error) {
            console.error("Erro ao salvar dados do profissional:", error)
            Alert.alert(
                "Erro",
                "Não foi possível salvar seus dados. Verifique sua conexão ou tente novamente."
            )
            return false
        }
    }, [name, cep, phone, cpf, address, district, city, state])

    // Handle sign up process
    const onSignUpPressed = async () => {
        setGlobalLoading(true)
        try {
            const dataSaved = await saveProfessionalData()
            if (dataSaved) {
                router.push("provider/services")
            }
        } catch (error) {
            console.error("Signup error:", error)
        } finally {
            setGlobalLoading(false)
        }
    }

    const renderLoadingOverlay = () => {
        if (!globalLoading) return null

        return (
            <View style={styles.loadingOverlay}>
                <ActivityIndicator size="large" color={colors.blue[500]} />
                <Text style={styles.loadingText}>Carregando...</Text>
            </View>
        )
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
                    disabled={globalLoading}
                />
                <TextInput
                    label="CEP"
                    value={cep}
                    returnKeyType="next"
                    keyboardType="numeric"
                    underlineColor="transparent"
                    mode="outlined"
                    style={styles.input}
                    onFocus={() => setIsCepModalVisible(true)}
                    disabled={globalLoading}
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
                    disabled={globalLoading}
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
                    disabled={globalLoading}
                />
                <TextInput
                    label="CPF ou CNPJ"
                    value={cpf}
                    returnKeyType="next"
                    keyboardType="numeric"
                    underlineColor="transparent"
                    mode="outlined"
                    style={styles.input}
                    onChangeText={setCpfCnpj}
                    disabled={globalLoading}
                />
                <Button
                    mode="contained"
                    onPress={onSignUpPressed}
                    style={{ marginTop: 24 }}
                    disabled={globalLoading}
                >
                    {globalLoading ? "Carregando..." : "Continuar"}
                </Button>

                {renderCepModal()}
                {renderLoadingOverlay()}
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
    loadingOverlay: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(255,255,255,0.7)",
        zIndex: 1000,
    },
    loadingText: {
        marginTop: 10,
        color: colors.blue[500],
        fontSize: 16,
    },
})
