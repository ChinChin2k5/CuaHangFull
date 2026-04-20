import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import AuthWrapper from '../components/AuthWrapper';
import BackButton from '../components/BackButton';
import PrimaryButton from '../components/PrimaryButton';

const DropdownField = ({ label, value, placeholder, options, onSelect }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.dropdownContainer}>
      <Text style={styles.dropdownLabel}>{label}</Text>
      
      <TouchableOpacity style={styles.dropdownBox} activeOpacity={0.7} onPress={() => setModalVisible(true)}>
        <Text style={value ? styles.dropdownValue : styles.dropdownPlaceholder}>
          {value ? value : placeholder}
        </Text>
        <AntDesign name="down" size={20} color="#7C7C7C" />
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select {label}</Text>
            
            <FlatList
              data={options}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalOption}
                  onPress={() => {
                    onSelect(item); 
                    setModalVisible(false); 
                  }}
                >
                  <Text style={styles.modalOptionText}>{item}</Text>
                </TouchableOpacity>
              )}
            />

            <TouchableOpacity style={styles.closeModalBtn} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeModalText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </View>
  );
};

export default function SelectLocationScreen({ navigation }) {
  const [selectedZone, setSelectedZone] = useState('');
  const [selectedArea, setSelectedArea] = useState('');

  const zoneOptions = ['Banasree', 'Gulshan', 'Dhanmondi', 'Mirpur', 'Uttara'];
  const areaOptions = ['Block A', 'Block B', 'Block C', 'Block D', 'Main Road'];

  return (
    <AuthWrapper>
      <View style={styles.container}>
        <BackButton onPress={() => navigation.goBack()} />

        <View style={styles.content}>
          <Image 
            source={require('../assets/location.png')} 
            style={styles.mapImage}
            resizeMode="contain"
          />
          
          <Text style={styles.title}>Select Your Location</Text>
          <Text style={styles.subtitle}>
            Switch on your location to stay in tune with{'\n'}what's happening in your area
          </Text>

          <DropdownField 
            label="Your Zone" 
            value={selectedZone} 
            placeholder="Select your zone" 
            options={zoneOptions} 
            onSelect={(item) => setSelectedZone(item)} 
          />

          <DropdownField 
            label="Your Area" 
            value={selectedArea}
            placeholder="Types of your area" 
            options={areaOptions}
            onSelect={(item) => setSelectedArea(item)}
          />

          <View style={styles.btnWrapper}>
          <PrimaryButton title="Submit" onPress={() => navigation.navigate('LogIn')} />
          </View>
        </View>
      </View>
    </AuthWrapper>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 50 },
  content: { alignItems: 'center', marginTop: 20, flex: 1 },
  mapImage: { width: '80%', height: 170, marginBottom: 30 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#181725', marginBottom: 15 },
  subtitle: { textAlign: 'center', color: '#7C7C7C', fontSize: 16, lineHeight: 22, marginBottom: 40 },
  dropdownContainer: { width: '100%', marginBottom: 20 },
  dropdownLabel: { fontSize: 16, color: '#7C7C7C', fontWeight: '600', marginBottom: 10 },
  dropdownBox: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#E2E2E2', paddingVertical: 10 },
  dropdownValue: { fontSize: 18, color: '#181725', fontWeight: '500' },
  dropdownPlaceholder: { fontSize: 18, color: '#B3B3B3' },
  btnWrapper: { width: '100%', marginTop: 30, paddingBottom: 20 },

  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end', 
    backgroundColor: 'rgba(0,0,0,0.5)', 
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    maxHeight: '50%', 
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalOption: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F3F2',
  },
  modalOptionText: {
    fontSize: 18,
    color: '#181725',
    textAlign: 'center',
  },
  closeModalBtn: {
    marginTop: 20,
    paddingVertical: 15,
    backgroundColor: '#F2F3F2',
    borderRadius: 15,
  },
  closeModalText: {
    fontSize: 18,
    color: '#181725',
    fontWeight: 'bold',
    textAlign: 'center',
  }
});