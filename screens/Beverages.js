import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';

const products = [
    { id: '1', name: 'Diet Coke', sub: '355ml, Price', price: '$1.99', img: 'https://i.ibb.co/L86v3fX/red-apple-isolated-on-white-background-free-photo-removebg-preview.png' },
    { id: '2', name: 'Sprite Can', sub: '325ml, Price', price: '$1.50', img: 'https://i.ibb.co/L86v3fX/red-apple-isolated-on-white-background-free-photo-removebg-preview.png' },
    { id: '3', name: 'Apple & Grape\nJuice', sub: '2L, Price', price: '$15.99', img: 'https://i.ibb.co/L86v3fX/red-apple-isolated-on-white-background-free-photo-removebg-preview.png' },
    { id: '4', name: 'Orange Juice', sub: '2L, Price', price: '$15.99', img: 'https://i.ibb.co/L86v3fX/red-apple-isolated-on-white-background-free-photo-removebg-preview.png' },
    { id: '5', name: 'Coca Cola Can', sub: '325ml, Price', price: '$4.99', img: 'https://i.ibb.co/L86v3fX/red-apple-isolated-on-white-background-free-photo-removebg-preview.png' },
    { id: '6', name: 'Pepsi Can', sub: '330ml, Price', price: '$4.99', img: 'https://i.ibb.co/L86v3fX/red-apple-isolated-on-white-background-free-photo-removebg-preview.png' },
];

export default function Beverages({navigation}) {
    
    const renderProductItem = ({ item }) => (
        <View style={styles.productCard}>
            <Image source={{ uri: item.img }} style={styles.productImage} />
            
            <View style={styles.productInfo}>
                <Text style={styles.productTitle} numberOfLines={2}>{item.name}</Text>
                <Text style={styles.productSub}>{item.sub}</Text>
            </View>

            <View style={styles.priceRow}>
                <Text style={styles.productPrice}>{item.price}</Text>
                <TouchableOpacity style={styles.addButton}>
                    <Feather name="plus" size={20} color="#FFF" />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity>
                    <Feather name="chevron-left" size={28} color="#181725" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Beverages</Text>
                <TouchableOpacity>
                    <Feather name="sliders" size={24} color="#181725" />
                </TouchableOpacity>
            </View>

            <FlatList
                data={products}
                renderItem={renderProductItem}
                keyExtractor={item => item.id}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                columnWrapperStyle={styles.row}
                contentContainerStyle={styles.listContent}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFF' },
    header: { 
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', 
        paddingHorizontal: 20, paddingTop: 10, paddingBottom: 20 
    },
    headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#181725' },
    listContent: { paddingHorizontal: 20, paddingBottom: 20 },
    row: { justifyContent: 'space-between' },
    
    productCard: {
        width: '47%',
        height: 250,
        borderWidth: 1,
        borderColor: '#E2E2E2',
        borderRadius: 18,
        padding: 15,
        marginBottom: 15,
        backgroundColor: '#FFF'
    },
    productImage: { width: '100%', height: 80, resizeMode: 'contain', marginBottom: 15 },
    productInfo: { flex: 1 },
    productTitle: { fontSize: 16, fontWeight: 'bold', color: '#181725', marginBottom: 5 },
    productSub: { fontSize: 14, color: '#7C7C7C' },
    priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
    productPrice: { fontSize: 18, fontWeight: 'bold', color: '#181725' },
    
    addButton: {
        width: 45, height: 45, backgroundColor: '#53B175',
        borderRadius: 15, justifyContent: 'center', alignItems: 'center'
    }
});