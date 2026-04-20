import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export default function AppTextInput({ label, ...props }) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      
      <TextInput
        style={styles.input}
        placeholderTextColor="#B3B3B3"
        {...props} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    width: '100%',
  },
  label: {
    fontSize: 16,
    color: '#7C7C7C',
    fontWeight: '600',
    marginBottom: 10,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
    paddingVertical: 10,
    fontSize: 18,
    color: '#181725',
  }
});