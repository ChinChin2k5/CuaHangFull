import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AuthWrapper from '../components/AuthWrapper';
import BackButton from '../components/BackButton';
import AppTextInput from '../components/AppTextInput';
import FloatingNextButton from '../components/FloatingNextButton';

export default function VerificationScreen({ navigation }) {
  return (
    <AuthWrapper>
      <View style={styles.container}>
        
        <BackButton onPress={() => navigation.goBack()} />

        <View style={styles.content}>
          <Text style={styles.title}>Enter your 4-digit code</Text>
          
          
          <AppTextInput 
            label="Code" 
            placeholder="- - - -"
            keyboardType="number-pad" 
            maxLength={4} 
          />
        </View>

        
        <View style={styles.bottomRow}>
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.resendText}>Resend Code</Text>
          </TouchableOpacity>
          
          <FloatingNextButton onPress={() => navigation.navigate('Select')} />
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
    flex: 1, // Đẩy cái bottomRow xuống dưới
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#181725',
    marginBottom: 30,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Đẩy 2 thành phần ra 2 mép trái phải
    alignItems: 'center', // Căn giữa theo chiều dọc
    paddingBottom: 40, // Cách đáy màn hình 1 chút
  },
  resendText: {
    fontSize: 18,
    color: '#53B175', // Màu xanh đặc trưng
    fontWeight: '500',
  }
});