import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AuthWrapper from '../components/AuthWrapper'; 
import BackButton from '../components/BackButton';
import AppTextInput from '../components/AppTextInput';
import FloatingNextButton from '../components/FloatingNextButton';

export default function Number({ navigation }) {
  return (
    <AuthWrapper>
      <View style={styles.container}>
        
        
        <BackButton onPress={() => navigation.goBack()} />

        <View style={styles.content}>
          <Text style={styles.title}>Enter your mobile number</Text>
          
          
          <AppTextInput 
            label="Mobile Number" 
            placeholder="+880"
            keyboardType="phone-pad" 
          />

          
          <FloatingNextButton onPress={() => navigation.navigate('Verification')} />
        </View>

      </View>
    </AuthWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50, 
  },
  content: {
    marginTop: 50, 
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#181725',
  }
});