import React from 'react';
import { 
    StyleSheet, Text, View, Image, TouchableOpacity, ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, FontAwesome } from '@expo/vector-icons';

export default function ProductDetail() {
    return (
        
        <SafeAreaView style={styles.container}>
            
            
            <View style={styles.header}>
                <TouchableOpacity>
                    <Feather name="chevron-left" size={28} color="black" />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Feather name="share" size={24} color="black" />
                </TouchableOpacity>
            </View>

        
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <View style={styles.imageBox}>
                    <Image 
                        source={{ uri: 'https://i.ibb.co/L86v3fX/red-apple-isolated-on-white-background-free-photo-removebg-preview.png' }} 
                        style={styles.productImage} 
                    />
                    <View style={styles.pagination}>
                        <View style={[styles.dot, styles.activeDot]} />
                        <View style={styles.dot} />
                        <View style={styles.dot} />
                    </View>
                </View>
                <View style={styles.titleRow}>
                    <View>
                        <Text style={styles.productTitle}>Naturel Red Apple</Text>
                        <Text style={styles.productSubTitle}>1kg, Price</Text>
                    </View>
                    <TouchableOpacity>
                        <Feather name="heart" size={24} color="#7C7C7C" />
                    </TouchableOpacity>
                </View>
                <View style={styles.priceRow}>
                    <View style={styles.quantityBox}>
                        <TouchableOpacity>
                            <Feather name="minus" size={24} color="#B3B3B3" />
                        </TouchableOpacity>
                        <View style={styles.quantityDisplay}>
                            <Text style={styles.quantityText}>1</Text>
                        </View>
                        <TouchableOpacity>
                            <Feather name="plus" size={24} color="#53B175" />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.priceText}>$4.99</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.sectionBlock}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Product Detail</Text>
                        <Feather name="chevron-down" size={24} color="black" />
                    </View>
                    <Text style={styles.sectionContent}>
                        Apples Are Nutritious. Apples May Be Good For Weight Loss. Apples May Be Good For Your Heart. As Part Of A Healthful And Varied Diet.
                    </Text>
                </View>

                <View style={styles.divider} />
                <View style={styles.sectionBlock}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Nutritions</Text>
                        <View style={styles.nutritionBadgeRow}>
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>100gr</Text>
                            </View>
                            <Feather name="chevron-right" size={24} color="black" />
                        </View>
                    </View>
                </View>

                <View style={styles.divider} />
                <View style={styles.sectionBlock}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Review</Text>
                        <View style={styles.starRow}>
                            <FontAwesome name="star" size={16} color="#F3603F" />
                            <FontAwesome name="star" size={16} color="#F3603F" />
                            <FontAwesome name="star" size={16} color="#F3603F" />
                            <FontAwesome name="star" size={16} color="#F3603F" />
                            <FontAwesome name="star" size={16} color="#F3603F" />
                            <Feather name="chevron-right" size={24} color="black" style={{ marginLeft: 8 }} />
                        </View>
                    </View>
                </View>

            </ScrollView>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.basketButton}>
                    <Text style={styles.basketButtonText}>Add To Basket</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 10,
    },
    scrollContent: {
        paddingBottom: 30, 
    },
    imageBox: {
        backgroundColor: '#F2F3F2',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        alignItems: 'center',
        paddingVertical: 30,
        marginBottom: 20,
    },
    productImage: {
        width: 250,
        height: 200,
        resizeMode: 'contain',
    },
    pagination: {
        flexDirection: 'row',
        marginTop: 20,
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#B3B3B3',
        marginHorizontal: 3,
    },
    activeDot: {
        width: 18,
        backgroundColor: '#53B175',
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    productTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#181725',
    },
    productSubTitle: {
        fontSize: 16,
        color: '#7C7C7C',
        marginTop: 4,
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    quantityBox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantityDisplay: {
        width: 45,
        height: 45,
        borderWidth: 1,
        borderColor: '#E2E2E2',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 15,
    },
    quantityText: {
        fontSize: 18,
        fontWeight: '600',
    },
    priceText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#181725',
    },
    divider: {
        height: 1,
        backgroundColor: '#E2E2E2',
        marginHorizontal: 20,
        marginVertical: 15,
    },
    sectionBlock: {
        paddingHorizontal: 20,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#181725',
    },
    sectionContent: {
        fontSize: 13,
        color: '#7C7C7C',
        lineHeight: 21,
        marginTop: 10,
    },
    nutritionBadgeRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    badge: {
        backgroundColor: '#EBEBEB',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 5,
        marginRight: 10,
    },
    badgeText: {
        color: '#7C7C7C',
        fontSize: 12,
        fontWeight: '600',
    },
    starRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    footer: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#FFFFFF', 
    },
    basketButton: {
        backgroundColor: '#53B175',
        height: 60,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    basketButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
    }
});