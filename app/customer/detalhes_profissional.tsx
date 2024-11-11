import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Linking } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Se estiver usando AsyncStorage para persistência de sessão

// Função para abrir o WhatsApp
const openWhatsApp = (phoneNumber: string) => {
    const url = `whatsapp://send?phone=${phoneNumber}`;

    Linking.canOpenURL(url)
        .then((supported) => {
            if (supported) {
                Linking.openURL(url);
            } else {
                alert('WhatsApp não está instalado no dispositivo.');
            }
        })
        .catch((err) => console.error('Erro ao abrir o WhatsApp', err));
};

const DetailsProfessional = () => {
    const { token } = useLocalSearchParams();
    const [professional, setProfessional] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    // Função para buscar os detalhes do profissional
    const fetchProfessionalDetails = async () => {
        if (!token) return;

        try {
            const response = await fetch(`https://api-bckend.onrender.com/api/professional/${token}`);
            const data = await response.json();
            setProfessional(data);
        } catch (error) {
            console.error('Erro ao buscar os detalhes do profissional:', error);
        } finally {
            setLoading(false);
        }
    };

    // Função para realizar logout (limpeza da sessão)
    const logout = async () => {
        try {
            // Limpar dados da sessão (exemplo usando AsyncStorage)
            await AsyncStorage.removeItem('userToken');
            // Redireciona para a tela inicial ou login
            router.push('/');
        } catch (error) {
            console.error('Erro ao limpar sessão:', error);
        }
    };

    useEffect(() => {
        fetchProfessionalDetails();

        const interval = setInterval(fetchProfessionalDetails, 1000);

        return () => clearInterval(interval);
    }, [token]);

    if (loading) {
        return <ActivityIndicator animating={true} size="large" style={styles.loading} />;
    }

    if (!professional) {
        return <Text style={styles.error}>Profissional não encontrado.</Text>;
    }

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <Text style={styles.title}>Detalhes do Profissional</Text>
                {professional.Image && (
                    <Image
                        source={{ uri: professional.Image }}
                        style={styles.image}
                        resizeMode="cover"
                    />
                )}
                <View style={styles.card}>
                    <Text style={styles.name}>{professional.name}</Text>
                    <Text style={styles.field}>Email: <Text style={styles.value}>{professional.email}</Text></Text>
                    <Text style={styles.field}>Telefone:
                        <View style={styles.phoneContainer}>
                            <Text style={styles.value}>{professional.phone}</Text>
                            <TouchableOpacity onPress={() => openWhatsApp(professional.phone)} style={styles.whatsappIcon}>
                                <FontAwesome name="whatsapp" size={24} color="#25D366" />
                            </TouchableOpacity>
                        </View>
                    </Text>
                    <Text style={styles.field}>Cep: <Text style={styles.value}>{professional.cep}</Text></Text>
                    <Text style={styles.field}>Endereço: <Text style={styles.value}>{professional.address}</Text></Text>
                    <Text style={styles.field}>Bairro: <Text style={styles.value}>{professional.bairro}</Text></Text>
                    <Text style={styles.field}>Cidade: <Text style={styles.value}>{professional.city}</Text></Text>
                    <Text style={styles.field}>Estado: <Text style={styles.value}>{professional.state}</Text></Text>
                    <Text style={styles.field}>Especialidades: <Text style={styles.value}>{professional.especialities}</Text></Text>
                </View>

                {/* Botão de logout */}
                <TouchableOpacity style={styles.logoutButton} onPress={logout}>
                    <Text style={styles.logoutText}>Sair</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    container: {
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        color: '#4a90e2',
        marginBottom: 15,
        textAlign: 'center',
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 15,
        borderWidth: 3,
        borderColor: '#4a90e2',
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 15,
        padding: 20,
        width: '100%',
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 4,
        borderColor: '#ddd',
        borderWidth: 1,
        alignItems: 'center', // Centralizar conteúdo do cartão
    },
    name: {
        fontSize: 20,
        fontWeight: '700',
        color: '#333',
        marginBottom: 10,
    },
    field: {
        flexDirection: 'row', // Organiza ícone e texto lado a lado
        alignItems: 'center',
        fontSize: 16,
        color: '#666',
        marginBottom: 10,
    },
    value: {
        fontWeight: 'normal',
        color: '#444',
        marginLeft: 10,
        fontSize: 16,
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    error: {
        color: 'red',
        textAlign: 'center',
        fontSize: 16,
        marginTop: 20,
    },
    phoneContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    whatsappIcon: {
        marginLeft: 10,
    },
    logoutButton: {
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#ff4d4d',
        borderRadius: 5,
    },
    logoutText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});


export default DetailsProfessional;
