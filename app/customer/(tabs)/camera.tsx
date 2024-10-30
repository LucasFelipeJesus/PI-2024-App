import { useCameraPermissions, CameraView } from "expo-camera"
import { useEffect, useState } from "react"
import { View, StyleSheet } from "react-native"
import { Avatar, Button } from "react-native-paper"
import * as FileSystem from 'expo-file-system'
import { router } from "expo-router"

export default function Camera() {
    const [perm, reqPerm] = useCameraPermissions()
    const [photo, setPhoto] = useState<string | null>(null)
    const photoFileName = FileSystem.documentDirectory + 'photo.jpg'

    let camera: CameraView | null

    const takePicture = async () => {
        if (perm) {
            const photo = await camera?.takePictureAsync()
            if (photo?.uri) {
                setPhoto(photo.uri)
                await FileSystem.deleteAsync(photoFileName)
                await FileSystem.copyAsync({
                    from: photo.uri,
                    to: photoFileName
                })
            }
        }
    }

    const verificarFoto = async () => {
        const file = await FileSystem.getInfoAsync(photoFileName)
        if (file.exists) {
            setPhoto(file.uri)
        }
    }

    useEffect(() => {
        verificarFoto()
    }, [])

    if (!perm) return <></>

    return (
        <View style={styles.container}>
            <CameraView facing='front' ref={(ref) => { camera = ref }}
                style={{ width: 310, height: 310 }} />

            <Button mode="elevated" style={styles.mt20} onPress={takePicture}>
                Tirar Foto
            </Button>
            {photo && <Avatar.Image style={{ marginTop: 20 }} size={150} source={{ uri: photo }} />}
            <Button mode="elevated" style={styles.mt20} onPress={verificarFoto}>
                Verificar Foto
            </Button>
            <Button mode="elevated" style={styles.mt20} onPress={() => router.replace('home')}>
                Voltar para Home
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: '#fff',
        padding: 20,
    },
    mt20: {
        marginTop: 20,
        width: 310,
    },
})