import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { storageService } from '../services/storageService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Account({ navigation }) {
  
  const handleLogout = async () => {
    await storageService.logout();
    navigation.replace('LogIn');
  };

  const handleScanStorage = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const result = await AsyncStorage.multiGet(keys);
  
      console.log("\n\n======  BÁO CÁO NỘI SOI Ổ CỨNG ======");
      if (result.length === 0) {
        console.log("Ổ cứng đang trống rỗng!");
      } else {
        result.forEach(([key, value]) => {
          console.log(`\n Tên Key: ${key}`);
          const prettyJson = JSON.stringify(JSON.parse(value), null, 2); 
          console.log(`Dữ liệu JSON: \n${prettyJson}`);
        });
      }
      console.log("=========================================\n\n");
      
      alert("Đã scan! Kỹ sư hãy mở Terminal (chỗ chạy Expo) ra xem kết quả nhé!");
    } catch (error) {
      console.error("Lỗi nội soi: ", error);
    }
  };

  return (
    <View style={styles.main}>
      <Text style={styles.title}>Tài khoản của Chiến</Text>

      {/* ĐẠI CA THÊM: Nút xem Lịch sử Đơn Hàng */}
      <TouchableOpacity 
        style={styles.orderButton} 
        onPress={() => navigation.navigate('Orders')}
      >
        <Text style={styles.orderText}> Lịch sử Đơn hàng</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Đăng xuất (Logout)</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.hackButton} 
        onPress={handleScanStorage}
      >
        <Text style={styles.hackText}>
            Xem File JSON Ổ Cứng
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20, // Thêm padding cho đẹp
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  // ĐẠI CA THÊM: Style cho nút Đơn hàng màu xanh
  orderButton: {
    backgroundColor: '#53B175',
    width: '100%', // Nút kéo dài sang 2 bên
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 20, // Cách nút bên dưới 20px
  },
  orderText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold'
  },
  logoutButton: {
    backgroundColor: '#F2F3F2',
    width: '100%',
    paddingVertical: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#53B175',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoutText: {
    color: '#53B175',
    fontSize: 18,
    fontWeight: 'bold'
  },
  hackButton: {
    backgroundColor: '#000', 
    width: '100%',
    paddingVertical: 15, 
    borderRadius: 15, 
    alignItems: 'center',
    marginTop: 10,
  },
  hackText: {
    color: '#FFF', 
    fontSize: 16, 
    fontWeight: 'bold'
  }
});
