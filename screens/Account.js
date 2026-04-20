import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
// ĐẠI CA THÊM: Import storageService
import { storageService } from '../services/storageService';

export default function Account({ navigation }) {
  
  // ĐẠI CA THÊM: Hàm xử lý Đăng xuất
  const handleLogout = async () => {
    // Xóa sạch ổ cứng
    await storageService.logout();
    // Quay về màn hình LogIn
    navigation.replace('LogIn');
  };

  return (
    <View style={styles.main}>
      <Text style={styles.title}>Tài khoản của Chiến</Text>

      {/* ĐẠI CA THÊM: Nút Đăng xuất */}
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
  // Style cho nút Logout
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
