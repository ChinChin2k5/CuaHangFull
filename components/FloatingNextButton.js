import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 

export default function FloatingNextButton({ onPress }) {
  return (
    <TouchableOpacity style={styles.btnCircle} onPress={onPress}>
      <AntDesign name="right" size={24} color="white" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btnCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#53B175',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end', 
    marginTop: 20,
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 3,
  }
});