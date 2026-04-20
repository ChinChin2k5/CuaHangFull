import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';

export default function Onboarding({navigation}) {
  return (
    <ImageBackground
      source={require('../assets/onboarding-bg.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.contentContainer}>
        
        <Image source={require('../assets/carrot-white.png')} style={styles.icon} />
        
        <Text style={styles.title}>Welcome{'\n'}to our store</Text>
        
        <Text style={styles.subtitle}>Get your groceries in as fast as one hour</Text>

        <PrimaryButton 
            title="Get Started" 
            onPress={() => navigation.navigate('SignIn')} 
        />
        
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-end', 
  },
  contentContainer: {
    paddingHorizontal: 30, 
    paddingBottom: 50,     
    alignItems: 'center',  
  },
  icon: {
    width: 48,
    height: 48,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  title: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.7)', 
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  }
});