import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Button } from 'react-native-paper';

export default function Tab() {
    const [selectedOption, setSelectedOption] = useState<null | 'service' | 'professional'>(null);

    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={require('../../../assets/bbq3.jpg')}
            />

            <View style={styles.buttonContainer}>
                <Button
                    mode={selectedOption === 'service' ? 'contained' : 'outlined'}
                    onPress={() => setSelectedOption('service')}
                >
                    Procuro o serviço
                </Button>
            </View>

            <View style={styles.buttonContainer}>
                <Button
                    mode={selectedOption === 'professional' ? 'contained' : 'outlined'}
                    onPress={() => setSelectedOption('professional')}
                >
                    Sou profissional
                </Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '90%',
        height: '40%',
    },
    buttonContainer: {
        marginVertical: 10,
        width: '80%',
    },
});





//código anterior
// import { View, Text, StyleSheet } from 'react-native';
// import { Image } from 'react-native';

// export default function Tab() {
//     return (
//         <View style={styles.container}>

//             <Image
//                 style={styles.image}
//                 source={require('../../../assets/bbq3.jpg')}
//             />
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     image: {
//         width: '90%',
//         height: '40%',
//     },
// });