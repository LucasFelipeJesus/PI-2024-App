import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Checkbox } from 'react-native-paper';

export default function Tab() {
    const [isServiceChecked, setIsServiceChecked] = useState(false);
    const [isProfessionalChecked, setIsProfessionalChecked] = useState(false);

    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={require('../../../assets/bbq3.jpg')}
            />

            <View style={styles.checkboxContainer}>
                <Checkbox
                    status={isServiceChecked ? 'checked' : 'unchecked'}
                    onPress={() => {
                        setIsServiceChecked(!isServiceChecked);
                    }}
                />
                <Text style={styles.label}>Procuro o serviço</Text>
            </View>

            <View style={styles.checkboxContainer}>
                <Checkbox
                    status={isProfessionalChecked ? 'checked' : 'unchecked'}
                    onPress={() => {
                        setIsProfessionalChecked(!isProfessionalChecked);
                    }}
                />
                <Text style={styles.label}>Sou profissional</Text>
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
    checkboxContainer: {
        flexDirection: 'row',
        marginVertical: 10,
        alignItems: 'center',
    },
    label: {
        marginLeft: 8,
        fontSize: 16,
    },
});






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