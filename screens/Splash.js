import { View, Image, StyleSheet } from 'react-native';
import React, { useEffect } from 'react'; 
// ĐẠI CA THÊM: Import storageService
import { storageService } from '../services/storageService';

export default function Splash({navigation}) {
    useEffect(() => {
        const checkAutoLogin = async () => {
          // Vẫn giữ lại timer 2.5s để hiện logo cho đẹp
          setTimeout(async () => {
            // Kiểm tra xem trong ổ cứng có User không
            const user = await storageService.getUser();
            
            if (user) {
              // Có user -> Đã đăng nhập trước đó -> Bay thẳng vào Home
              navigation.replace('MainTabs'); 
            } else {
              // Không có -> Bắt đầu luồng bình thường
              navigation.replace('Onboarding'); 
            }
          }, 2500);
        };

        checkAutoLogin();
      }, []);

  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/logo-white.png')} 
        style={styles.logo} 
        resizeMode="contain" 
      />
    </View>
  );
}

// ... (Giữ nguyên Styles của em)
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#53B175', justifyContent: 'center', alignItems: 'center' },
  logo: { width: 200, height: 60 }
});