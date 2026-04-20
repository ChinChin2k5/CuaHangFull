import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { storageService } from '../services/storageService';

export default function Account({ navigation }) {
  
  const handleLogout = async () => {
    await storageService.logout();
    navigation.replace('LogIn');
  };

  return (
    <View style={styles.main}>
      <Text style={styles.title}>Tài khoản của Chiến</Text>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Đăng xuất (Logout)</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  logoutButton: {
    backgroundColor: '#F2F3F2',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#53B175'
  },
  logoutText: {
    color: '#53B175',
    fontSize: 18,
    fontWeight: 'bold'
  }
});
