import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

const DetailsProfessional = () => {
    const route = useRoute();
    const { token } = route.params as { token: string };  // Pegando o token (ID) do profissional passado pela navegação

    const [professional, setProfessional] = useState<any>(null);  // Estado para armazenar os dados
    const [loading, setLoading] = useState(true);  // Indicador de carregamento

    useEffect(() => {
        const fetchProfessionalDetails = async () => {
            try {
                const response = await fetch(`https://api-bckend.onrender.com/api/professional/${token}`);
                const data = await response.json();
                setProfessional(data);  // Armazenar os dados do profissional
            } catch (error) {
                console.error('Erro ao buscar os detalhes do profissional:', error);
            } finally {
                setLoading(false);  // Finaliza o carregamento
            }
        };

        fetchProfessionalDetails();  // Chama a função de buscar dados
    }, [token]);  // Refaz a busca caso o token mude

    if (loading) {
        return <ActivityIndicator animating={true} size="large" style={styles.loading} />;
    }

    if (!professional) {
        return <Text style={styles.error}>Profissional não encontrado.</Text>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.name}>{professional.name}</Text>
            <Text>CPF: {professional.cpf}</Text>
            <Text>Email: {professional.email}</Text>
            <Text>Telefone: {professional.phone}</Text>
            <Text>Endereço: {professional.address}</Text>
            <Text>Cidade: {professional.city}</Text>
            <Text>Estado: {professional.state}</Text>
            <Text>Especialidades: {professional.especialidades}</Text>
            {/* Renderizar outros detalhes conforme necessário */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
        flex: 1,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
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
    },
});

export default DetailsProfessional;
