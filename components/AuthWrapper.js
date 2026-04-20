import React from 'react';
import { 
  ImageBackground, 
  StyleSheet, 
  KeyboardAvoidingView, 
  Platform, 
  TouchableWithoutFeedback, 
  Keyboard,
  View, 
  Text  
} from 'react-native';

export default function AuthWrapper({ children }) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ImageBackground
          source={require('../assets/bg.png')} 
          style={styles.background}
          resizeMode="cover"
        >
          <View style={styles.watermarkContainer}>
            <Text style={styles.watermarkText}>
              Họ Và Tên: Dương Tiến Chiến - MSV: 23810310176
            </Text>
          </View>

          {children}
        </ImageBackground>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  // 🛠️ CSS cho cái Dấu bản quyền nổi lềnh phềnh
  watermarkContainer: {
    position: 'absolute', // Trôi nổi độc lập, không đẩy các layout khác xuống
    top: 35, // Cách mép trên (tránh cái tai thỏ của iPhone)
    width: '100%',
    alignItems: 'center',
    zIndex: 99, // Ưu tiên hiển thị trên cùng để không bị thằng nào đè lên
  },
  watermarkText: {
    backgroundColor: 'rgba(249, 168, 38, 0.9)', // Nền màu cam hơi trong suốt cho xịn
    color: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
    fontSize: 12,
    fontWeight: 'bold',
    overflow: 'hidden',
  }
});