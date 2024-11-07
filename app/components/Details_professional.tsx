import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native';


import { RouteProp } from '@react-navigation/native';

type RouteParams = {
    params: {
        profissionalId: string;
    };
};

type Profissional = {
    Image: string;
    name: string;
    city: string;
    state: string;
    email: string;
    phone: string;
};

const DetalhesProfissional = ({ route }: { route: RouteProp<RouteParams, 'params'> }) => {
    const { profissionalId } = route.params;
    const [profissional, setProfissional] = useState<Profissional | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfessionalDetails = async () => {
            try {
                const response = await fetch(`https://api-bckend.onrender.com/api/professional/${profissionalId}`);
                const data = await response.json();
                setProfissional(data);
            } catch (error) {
                console.error('Erro ao buscar detalhes do profissional:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfessionalDetails();
    }, [profissionalId]);

    if (loading) {
        return <ActivityIndicator animating={true} size="large" style={styles.loading} />;
    }

    if (!profissional) {
        return <Text style={styles.error}>Não foi possível carregar os detalhes.</Text>;
    }

    return (
        <View style={styles.container}>
            <Image source={{ uri: profissional.Image || 'https://via.placeholder.com/150' }} style={styles.image} />
            <Text style={styles.name}>{profissional.name}</Text>
            <Text style={styles.details}>Cidade: {profissional.city}</Text>
            <Text style={styles.details}>Estado: {profissional.state}</Text>
            <Text style={styles.details}>Email: {profissional.email}</Text>
            <Text style={styles.details}>Telefone: {profissional.phone}</Text>
            {/* Adicione mais detalhes conforme necessário */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 15,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    details: {
        fontSize: 16,
        color: '#333',
        marginBottom: 5,
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    error: {
        textAlign: 'center',
        color: 'red',
    },
});

export default DetalhesProfissional;
