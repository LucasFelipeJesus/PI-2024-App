import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'react-native';

export default function Tab() {
    return (
        <View style={styles.container}>

            <Image
                style={styles.image}
                source={require('../../../assets/bbq2.jpg')}
            />
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
        height: '30%',
    },
});