import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

export default function Filters({ navigation, route }) {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedBrand, setSelectedBrand] = useState(null);

    const toggleCategory = (cat) => setSelectedCategory(prev => prev === cat ? null : cat);
    const toggleBrand = (brand) => setSelectedBrand(prev => prev === brand ? null : brand);


    const CheckboxItem = ({ label, isSelected, onPress }) => (
        <TouchableOpacity style={styles.checkboxContainer} onPress={onPress}>
            <MaterialCommunityIcons 
                name={isSelected ? "checkbox-marked" : "checkbox-blank-outline"} 
                size={24} 
                color={isSelected ? "#53B175" : "#B3B3B3"} 
            />
            <Text style={[styles.checkboxLabel, isSelected && styles.checkboxLabelActive]}>
                {label}
            </Text>
        </TouchableOpacity>
    );


    const handleApply = () => {

        if (route.params && route.params.onApply) {

            route.params.onApply(selectedCategory, selectedBrand);
        }
        
        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Feather name="x" size={28} color="#181725" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Filters</Text>
                <View style={{ width: 28 }} /> 
            </View>

            <View style={styles.mainContainer}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    
                    <Text style={styles.sectionTitle}>Categories</Text>
                    <CheckboxItem label="Eggs" isSelected={selectedCategory === 'Eggs'} onPress={() => toggleCategory('Eggs')} />
                    <CheckboxItem label="Noodles & Pasta" isSelected={selectedCategory === 'Noodles & Pasta'} onPress={() => toggleCategory('Noodles & Pasta')} />
                    <CheckboxItem label="Chips & Crisps" isSelected={selectedCategory === 'Chips & Crisps'} onPress={() => toggleCategory('Chips & Crisps')} />
                    <CheckboxItem label="Beverages" isSelected={selectedCategory === 'Beverages'} onPress={() => toggleCategory('Beverages')} />

                    <Text style={[styles.sectionTitle, { marginTop: 30 }]}>Brand</Text>
                    <CheckboxItem label="Individual Collection" isSelected={selectedBrand === 'Individual Collection'} onPress={() => toggleBrand('Individual Collection')} />
                    <CheckboxItem label="Cocola" isSelected={selectedBrand === 'Cocola'} onPress={() => toggleBrand('Cocola')} />
                    <CheckboxItem label="Ifad" isSelected={selectedBrand === 'Ifad'} onPress={() => toggleBrand('Ifad')} />
                    <CheckboxItem label="Kazi Farmas" isSelected={selectedBrand === 'Kazi Farmas'} onPress={() => toggleBrand('Kazi Farmas')} />

                </ScrollView>

                <View style={styles.footer}>
                    
                    <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
                        <Text style={styles.applyText}>Apply Filter</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#F2F3F2' },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 15 },
    headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#181725' },
    mainContainer: { flex: 1, backgroundColor: '#FFF', borderTopLeftRadius: 30, borderTopRightRadius: 30, overflow: 'hidden' },
    scrollContent: { padding: 20, paddingBottom: 40 },
    sectionTitle: { fontSize: 24, fontWeight: '600', color: '#181725', marginBottom: 20 },
    checkboxContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
    checkboxLabel: { fontSize: 16, color: '#181725', marginLeft: 12 },
    checkboxLabelActive: { color: '#53B175', fontWeight: '500' },
    footer: { padding: 20, backgroundColor: '#FFF', paddingBottom: 30 },
    applyButton: { backgroundColor: '#53B175', borderRadius: 19, paddingVertical: 20, alignItems: 'center' },
    applyText: { color: '#FFF', fontSize: 18, fontWeight: '600' }
});
