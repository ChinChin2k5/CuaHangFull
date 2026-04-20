import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import AuthWrapper from '../components/AuthWrapper'; 
import AppTextInput from '../components/AppTextInput';

const SocialButton = ({ title, icon, bgColor, onPress }) => (
    <TouchableOpacity 
      style={[styles.socialBtn, { backgroundColor: bgColor }]} 
      onPress={onPress} 
      activeOpacity={0.8}
    >
      <View style={styles.iconWrapper}>{icon}</View>
      <Text style={styles.socialText}>{title}</Text>
    </TouchableOpacity>
  );

export default function SignIn({ navigation }) {
  return (
    <AuthWrapper>
      <View style={styles.container}>
        
        <Image 
          source={require('../assets/groceries.png')} 
          style={styles.headerImage} 
          resizeMode="contain" 
        />

        <View style={styles.content}>
          <Text style={styles.title}>Get your groceries{'\n'}with nectar</Text>
          
          <AppTextInput 
            placeholder="+880"
            keyboardType="phone-pad" 
          />

          <Text style={styles.dividerText}>Or connect with social media</Text>

          <SocialButton 
            title="Continue with Google" 
            bgColor="#5383EC" 
            icon={<AntDesign name="google" size={24} color="white" />} 
            onPress={() => navigation.navigate('Number')} 
          />
          
          <SocialButton 
            title="Continue with Facebook" 
            bgColor="#4A66AC" 
            icon={<FontAwesome5 name="facebook-f" size={24} color="white" />} 
            onPress={() => navigation.navigate('Number')} 
          />
        </View>

      </View>
    </AuthWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
  headerImage: {
    width: '100%',
    height: '45%', 
  },
  
  content: {
    flex: 1, 
    paddingHorizontal: 20,
    justifyContent: 'flex-start', 
    paddingTop: 10, 
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#181725',
    marginBottom: 30,
  },
  dividerText: {
    textAlign: 'center',
    color: '#828282',
    marginVertical: 30,
    fontSize: 14,
  },
  socialBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 15,
    marginBottom: 15,
  },
  iconWrapper: {
    paddingLeft: 30,
    width: '25%',
  },
  socialText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
  }
});