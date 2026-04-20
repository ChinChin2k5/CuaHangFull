import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { AntDesign, Ionicons, Feather } from '@expo/vector-icons';
import AuthWrapper from '../components/AuthWrapper';
import BackButton from '../components/BackButton';
import AppTextInput from '../components/AppTextInput';
import PrimaryButton from '../components/PrimaryButton';

export default function SignUpScreen({ navigation }) {
  const [securePassword, setSecurePassword] = useState(true);

  return (
    <AuthWrapper>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 120 }}>
        
        <BackButton onPress={() => navigation.goBack()} />

        <View style={styles.content}>
          <Image 
            source={require('../assets/carrot-logo.png')} 
            style={styles.logo} 
            resizeMode="contain"
          />
          
          <Text style={styles.title}>Sign Up</Text>
          <Text style={styles.subtitle}>Enter your credentials to continue</Text>

          <AppTextInput label="Username" placeholder="Afsar Hassen Shuvo" />

          <View style={styles.inputContainer}>
            <View style={{ flex: 1 }}>
              <AppTextInput 
                label="Email" 
                placeholder="imshuvo97@gmail.com"
                keyboardType="email-address" 
              />
            </View>
            <View style={styles.iconRightWrapper}>
              <Feather name="check" size={22} color="#53B175" />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <View style={{ flex: 1 }}>
              <AppTextInput 
                label="Password" 
                placeholder="********"
                secureTextEntry={securePassword} 
              />
            </View>
            <TouchableOpacity 
              style={styles.iconRightWrapper} 
              onPress={() => setSecurePassword(!securePassword)}
              activeOpacity={0.6}
            >
              <Ionicons 
                name={securePassword ? 'eye-off-outline' : 'eye-outline'} 
                size={24} 
                color="#7C7C7C" 
              />
            </TouchableOpacity>
          </View>

          <View style={styles.termsWrapper}>
            <Text style={styles.termsText}>
              By continuing you agree to our 
              <Text style={styles.linkText}> Terms of Service </Text>
              and 
              <Text style={styles.linkText}> Privacy Policy.</Text>
            </Text>
          </View>
          
          <PrimaryButton title="Sign Up" onPress={() => console.log('Đang đăng ký...')} />

          <View style={styles.footerRow}>
            <Text style={styles.footerText}>Already have an account?</Text>
            <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('LogIn')}>
                <Text style={styles.logInLink}> Log In</Text>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
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
    alignItems: 'center', 
    marginTop: 30,
    flex: 1,
  },
  logo: {
    width: 50,
    height: 60,
    marginBottom: 60,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#181725',
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  subtitle: {
    color: '#7C7C7C',
    fontSize: 16,
    marginBottom: 40,
    alignSelf: 'flex-start',
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-end', 
  },
  iconRightWrapper: {
    position: 'absolute',
    right: 0,
    bottom: 12, 
  },
  termsWrapper: {
    marginTop: 20,
    marginBottom: 30,
    width: '100%',
  },
  termsText: {
    fontSize: 14,
    color: '#7C7C7C',
    lineHeight: 22,
  },
  linkText: {
    color: '#53B175',
    fontWeight: '500',
  },
  footerRow: {
    flexDirection: 'row',
    marginTop: 25,
  },
  footerText: {
    fontSize: 14,
    color: '#181725',
    fontWeight: '600',
  },
  logInLink: {
    fontSize: 14,
    color: '#53B175',
    fontWeight: '600',
  }
});