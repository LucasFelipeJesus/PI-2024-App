import React, { useState } from "react"
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    Platform,
    Alert,
} from "react-native"
import { TextInput } from "react-native-paper"
import * as ImagePicker from "expo-image-picker"
import * as SecureStore from "expo-secure-store"
import { router } from "expo-router"

import { colors } from "@/app/colors/colors"
import Background from "../components/background"
import BackButton from "../components/backbutton"
import Button from "../components/button"

interface ServiceData {
    especialities: string
    Image?: string
}

export default function Services() {
    const [especialities, setEspecialities] = useState("")
    const [image, setImage] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const requestCameraPermission = async () => {
        if (Platform.OS !== "web") {
            const { status } = await ImagePicker.requestCameraPermissionsAsync()
            return status === "granted"
        }
        return true
    }

    const pickImageFromCamera = async () => {
        const hasPermission = await requestCameraPermission()
        if (!hasPermission) {
            Alert.alert("Permissão necessária", "Precisamos de permissão para acessar a câmera")
            return
        }

        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.7,
            base64: true,
        })

        if (!result.canceled) {
            setImage(`data:image/jpeg;base64,${result.assets[0].base64}`)
            // Safely image profile information
            await SecureStore.setItemAsync(
                "image",
                `data:image/jpeg;base64,${result.assets[0].base64}` || ""
            )
        }
    }

    const pickImageFromGallery = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.7,
            base64: true,
        })

        if (!result.canceled) {
            setImage(`data:image/jpeg;base64,${result.assets[0].base64}`)
            // Safely image profile information
            await SecureStore.setItemAsync(
                "image",
                `data:image/jpeg;base64,${result.assets[0].base64}` || ""
            )
        }
    }

    const handleSaveService = async () => {
        // Basic validation
        if (!especialities) {
            Alert.alert("Erro", "Por favor preencha todos os campos")
            return
        }

        setIsLoading(true)

        try {
            const token = await SecureStore.getItemAsync("token")
            const email = await SecureStore.getItemAsync("email")

            if (!token || !email) {
                Alert.alert("Erro", "Usuário não autenticado")
                return
            }

            const serviceData: ServiceData = {
                especialities,
                Image: image || undefined,
            }

            const response = await fetch(
                `https://api-bckend.onrender.com/api/professional/${token}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        ...serviceData,
                        email,
                        token,
                    }),
                }
            )

            const responseData = await response.json()

            if (response.ok) {
                Alert.alert("Sucesso", "Serviço cadastrado com sucesso")
                router.push("provider/welcome")
            } else {
                Alert.alert("Erro", responseData.message || "Erro ao salvar serviço")
            }
        } catch (error) {
            console.error("Erro ao salvar serviço:", error)
            Alert.alert("Erro", "Não foi possível salvar o serviço")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Background>
                <BackButton />
                <Text style={styles.title}>Descreva seus serviços</Text>
                <Text style={styles.text}>
                    Para finalizar, precisamos que você detalhe os seus serviços. Utilize o campo de
                    Descrição para informar o que você oferece, e o campo de Preço para informar o
                    valor do serviço.
                </Text>

                <TextInput
                    label="Descrição do Serviço"
                    value={especialities}
                    onChangeText={setEspecialities}
                    style={styles.input}
                    mode="outlined"
                    multiline
                    numberOfLines={3}
                    disabled={isLoading}
                />

                <View style={styles.imageUploadContainer}>
                    <TouchableOpacity
                        style={styles.imageButton}
                        onPress={pickImageFromCamera}
                        disabled={isLoading}
                    >
                        <Text style={styles.imageButtonText}>Tirar Foto</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.imageButton}
                        onPress={pickImageFromGallery}
                        disabled={isLoading}
                    >
                        <Text style={styles.imageButtonText}>Galeria</Text>
                    </TouchableOpacity>
                </View>

                {image && <Image source={{ uri: image }} style={styles.previewImage} />}

                <Button
                    mode="contained"
                    onPress={handleSaveService}
                    style={styles.saveButton}
                    loading={isLoading}
                    disabled={isLoading}
                >
                    {isLoading ? "Salvando..." : "Finalizar o cadastro"}
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
        fontSize: 22,
        fontWeight: "bold",
        color: colors.blue[500],
        marginVertical: 20,
        textAlign: "center",
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
    imageUploadContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 15,
    },
    imageButton: {
        flex: 1,
        marginHorizontal: 5,
        padding: 10,
        backgroundColor: colors.blue[100],
        borderRadius: 5,
        alignItems: "center",
    },
    imageButtonText: {
        color: colors.white,
        fontWeight: "bold",
    },
    previewImage: {
        width: "100%",
        height: 200,
        resizeMode: "cover",
        marginVertical: 15,
        borderRadius: 10,
    },
    saveButton: {
        marginTop: 20,
    },
})
