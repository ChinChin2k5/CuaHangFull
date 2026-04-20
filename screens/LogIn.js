import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AuthWrapper from '../components/AuthWrapper';
import BackButton from '../components/BackButton';
import AppTextInput from '../components/AppTextInput';
import PrimaryButton from '../components/PrimaryButton';
import { storageService } from '../services/storageService';

export default function LogInScreen({ navigation }) {
  const [securePassword, setSecurePassword] = useState(true);
  
  // ĐẠI CA THÊM: Tạo 2 biến state để hứng chữ em gõ vào
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // HÀM ĐĂNG NHẬP GIẢ LẬP (MOCK LOGIN)
  const handleLogin = async () => {
    // 1. Validate sương sương (Không cho bỏ trống)
    if (email === '' || password === '') {
      Alert.alert("Lỗi", "Ê Kỹ sư! Nhập bừa email và password vào chứ đừng để trống!");
      return;
    }

    try {
      // 2. TẠO FAKE DATA (Lấy luôn cái email em vừa gõ bừa)
      // Lưu ý: Đề bài yêu cầu có hiển thị Tên/MSSV khi quay video, mình nhét luôn vào đây!
      const fakeUser = { 
        email: email,
        name: "Dương Tiến Chiến - MSSV12345", // Sửa lại đúng MSSV của em
        token: "nectar-fake-token-abcxyz" 
      };
      
      // 3. Lưu cục Fake Data này vào ổ cứng
      await storageService.saveUser(fakeUser);
      
      // 4. Thông báo và ĐÁ VĂNG vào màn hình Home
      Alert.alert("Thành công", "Đăng nhập giả lập thành công!");
      navigation.replace("MainTabs"); 

    } catch (error) {
      console.log("Lỗi: ", error);
    }
  };

  return (
    <AuthWrapper>
      <View style={styles.container}>
        <BackButton onPress={() => navigation.goBack()} />
        <View style={styles.content}>
          <Image source={require('../assets/carrot-logo.png')} style={styles.logo} resizeMode="contain" />
          <Text style={styles.title}>Log In</Text>
          <Text style={styles.subtitle}>Enter your emails and password</Text>

          {/* ĐẠI CA SỬA: Gắn state email vào ô Input */}
          <AppTextInput 
            label="Email" 
            placeholder="imshuvo97@gmail.com"
            keyboardType="email-address" 
            value={email}
            onChangeText={setEmail} // Bắt sự kiện gõ phím
          />

          <View style={styles.passwordContainer}>
            <View style={{ flex: 1 }}>
              {/* ĐẠI CA SỬA: Gắn state password vào ô Input */}
              <AppTextInput 
                label="Password" 
                placeholder="********"
                secureTextEntry={securePassword} 
                value={password}
                onChangeText={setPassword} // Bắt sự kiện gõ phím
              />
            </View>
            <TouchableOpacity 
              style={styles.iconEyewrapper} 
              onPress={() => setSecurePassword(!securePassword)}
            >
              <Ionicons name={securePassword ? 'eye-off-outline' : 'eye-outline'} size={24} color="#7C7C7C" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.forgotBtn} activeOpacity={0.7}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>
          
          {/* Nút Log In sẽ gọi hàm handleLogin */}
          <PrimaryButton title="Log In" onPress={handleLogin} />

          <View style={styles.footerRow}>
            <Text style={styles.footerText}>Don't have an account?</Text>
            <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('SignUp')}>
                <Text style={styles.signUpLink}> Signup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </AuthWrapper>
  );
}

// ... (Giữ nguyên phần StyleSheet ở dưới của em)

// ... (Giữ nguyên toàn bộ phần StyleSheet của em ở dưới, không thay đổi gì cả)
const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 50 },
  content: { alignItems: 'center', marginTop: 30, flex: 1 },
  logo: { width: 50, height: 60, marginBottom: 60 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#181725', marginBottom: 10, alignSelf: 'flex-start' },
  subtitle: { color: '#7C7C7C', fontSize: 16, marginBottom: 40, alignSelf: 'flex-start' },
  passwordContainer: { width: '100%', flexDirection: 'row', alignItems: 'flex-end' },
  iconEyewrapper: { position: 'absolute', right: 0, bottom: 12 },
  forgotBtn: { alignSelf: 'flex-end', marginVertical: 20, marginBottom: 30 },
  forgotText: { fontSize: 14, color: '#181725' },
  footerRow: { flexDirection: 'row', marginTop: 25 },
  footerText: { fontSize: 14, color: '#181725', fontWeight: '600' },
  signUpLink: { fontSize: 14, color: '#53B175', fontWeight: '600' }
});