import { View, StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import { Gyroscope, Accelerometer } from 'expo-sensors'
import { useState } from 'react'
import { Button } from "react-native-paper"
import { router } from "expo-router"

export default function Sensors() {
    const [gData, setGyroscopeData] = useState({ x: 0, y: 0, z: 0 })
    const [aData, setAccelerometerData] = useState({ x: 0, y: 0, z: 0 })

    Gyroscope.setUpdateInterval(1000) // 1 segundo = tempo de atualização
    Gyroscope.addListener((data) => {
        setGyroscopeData(data)
    })

    Accelerometer.setUpdateInterval(1000) // 1 segundo = tempo de atualização   
    Accelerometer.addListener((data) => {
        setAccelerometerData(data)
    })

    return (
        <View style={styles.container}>
            <Text>Sensor: Gyroscope</Text>
            <Text>{`x: ${gData.x.toFixed(4)}`}</Text>
            <Text>{`y: ${gData.y.toFixed(4)}`}</Text>
            <Text>{`z: ${gData.z.toFixed(4)}`}</Text>

            <Text>Sensor: Accelerometer</Text>
            <Text>{`x: ${aData.x.toFixed(4)}`}</Text>
            <Text>{`y: ${aData.y.toFixed(4)}`}</Text>
            <Text>{`z: ${aData.z.toFixed(4)}`}</Text>

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
        backgroundColor: '#fff',
        padding: 20,
    },
    mt20: {
        marginTop: 20,
    },
})