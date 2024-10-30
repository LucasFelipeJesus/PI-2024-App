import { View, StyleSheet } from 'react-native';
import { Text } from "react-native-paper"
import { Button } from "react-native-paper"
import { router } from "expo-router"


export default function Configuration() {
  return (
    <View style={styles.container}>
      <Text variant="displaySmall">Tab Configuration</Text>
      <Button mode="elevated" style={styles.mt20} onPress={() => router.replace('home')}>
        Voltar para Home
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mt20: {
    marginTop: 20,
    width: 310,
  },
});