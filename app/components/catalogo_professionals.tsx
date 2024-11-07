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

    const fetchData = async () => {
        try {
            const response = await fetch('https://api-bckend.onrender.com/api/professional');
            const data = await response.json();
            setProfissionais(data);
        } catch (error) {
            console.error('Erro ao buscar os profissionais:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        const intervalId = setInterval(fetchData, 10000); // Atualiza a cada 10 segundos

        return () => clearInterval(intervalId); // Limpa o intervalo ao desmontar o componente
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
                <Card style={styles.card} onPress={() => console.log('Detalhes do profissional:', item.name)}>
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
        paddingHorizontal: 3,
    },
    card: {
        width: Dimensions.get('window').width / 3 - 10,
        margin: 1,
        backgroundColor: '#f8f8f8',
        borderRadius: 5,
        overflow: 'hidden',
    },
    cardImage: {
        height: 180,

    },
    cardContent: {
        alignItems: 'center',
        paddingVertical: 7,
        paddingHorizontal: 5,
    },
    cardName: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#444',
    },
    cardCity: {
        fontSize: 11,
        color: '#666',
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default CatalogoProfissionais;
