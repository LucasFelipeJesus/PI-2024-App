import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Dimensions } from 'react-native';
import { Card, Title, Paragraph, ActivityIndicator } from 'react-native-paper';

const CatalogoProfissionais = () => {
    interface Professional {
        _id: string;
        name: string;
        city: string;
        state: string;
        Image?: string;
    }

    const [profissionais, setProfissionais] = useState<Professional[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://api-bckend.onrender.com/api/professional'); // Substitua pela URL real da sua API
                const data = await response.json();
                setProfissionais(data); // A API deve retornar uma lista de profissionais
            } catch (error) {
                console.error('Erro ao buscar os profissionais:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <ActivityIndicator animating={true} size="large" style={styles.loading} />;
    }

    return (
        <FlatList
            data={profissionais}
            numColumns={3}
            contentContainerStyle={styles.container}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
                <Card style={styles.card}>
                    <Card.Cover source={{ uri: item.Image || 'https://via.placeholder.com/150' }} style={styles.cardImage} />
                    <Card.Content style={styles.cardContent}>
                        <Title style={styles.cardName}>{item.name}</Title>
                        <Paragraph style={styles.cardCity}>{item.city}, {item.state}</Paragraph>
                    </Card.Content>
                </Card>
            )}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        width: Dimensions.get('window').width / 3.5, // Divisão da largura da tela para cada card
        margin: 8,
        backgroundColor: '#f8f8f8',
        borderRadius: 10,
        overflow: 'hidden',
    },
    cardImage: {
        height: 150,
    },
    cardContent: {
        alignItems: 'center',
        paddingVertical: 5,
    },
    cardName: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#444',
    },
    cardCity: {
        fontSize: 12,
        color: '#666',
    },
});

export default CatalogoProfissionais;
