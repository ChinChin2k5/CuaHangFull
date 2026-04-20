import { View, Image, StyleSheet } from 'react-native';
import React, { useEffect } from 'react'; 
import { storageService } from '../services/storageService';

export default function Splash({navigation}) {
    useEffect(() => {
        const checkAutoLogin = async () => {
          setTimeout(async () => {
            const user = await storageService.getUser();
            
            if (user) {
              navigation.replace('MainTabs'); 
            } else {
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

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#53B175', justifyContent: 'center', alignItems: 'center' },
  logo: { width: 200, height: 60 }
});