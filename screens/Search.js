import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  Alert 
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, Ionicons } from "@expo/vector-icons";

import productsData from "../data";
import { storageService } from '../services/storageService'; 

export default function Search({ navigation }) {
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState(productsData);

  const handleSearch = (text) => {
    setSearchText(text);
    if (text) {
      const newData = productsData.filter((item) => {
        const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
    } else {
      setFilteredData(productsData);
    }
  };

  const handleFilterApply = (category, brand) => {
    let newData = productsData;
    if (category) newData = newData.filter((item) => item.category === category);
    if (brand) newData = newData.filter((item) => item.brand === brand);
    setFilteredData(newData);
  };


  const handleAddToCart = async (product) => {
    try {
      const currentCart = await storageService.getCart();

      
      const existingItemIndex = currentCart.findIndex(item => item.id === product.id);

      let updatedCart = [...currentCart];

      if (existingItemIndex > -1) {
        updatedCart[existingItemIndex].cartQuantity += 1;
      } else {
        updatedCart.push({ ...product, cartQuantity: 1 });
      }

      await storageService.saveCart(updatedCart);

      Alert.alert("Thành công!", `Đã thêm ${product.name} vào giỏ hàng.`);
      
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ:", error);
    }
  };

  const renderProductCard = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.cardImage} />
      <Text style={styles.cardTitle}>{item.name}</Text>
      <Text style={styles.cardSub}>{item.quantity}</Text>
      <View style={styles.cardBottom}>
        <Text style={styles.price}>${item.price}</Text>
        
        {/* ĐẠI CA SỬA: Gắn hàm handleAddToCart vào nút bấm và truyền 'item' vào */}
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => handleAddToCart(item)}
        >
          <Feather name="plus" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.searchContainer}>
          <Feather name="search" size={20} color="#181725" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Store"
            value={searchText}
            onChangeText={(text) => handleSearch(text)}
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={() => handleSearch("")}>
              <Feather name="x-circle" size={20} color="#B3B3B3" style={styles.clearIcon} />
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity onPress={() => navigation.navigate("Filters", { onApply: handleFilterApply })}>
          <Ionicons name="options-outline" size={28} color="#181725" style={styles.filterIcon} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredData}
        renderItem={renderProductCard}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

// ... (Giữ nguyên toàn bộ phần StyleSheet của em ở dưới, không đổi gì cả)
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  headerRow: { flexDirection: "row", alignItems: "center", paddingHorizontal: 20, marginTop: 10, marginBottom: 20 },
  searchContainer: { flex: 1, flexDirection: "row", alignItems: "center", backgroundColor: "#F2F3F2", borderRadius: 15, paddingHorizontal: 15, height: 50 },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, fontSize: 15, color: "#181725", fontWeight: "600" },
  clearIcon: { marginLeft: 10 },
  filterIcon: { marginLeft: 15 },
  listContent: { paddingHorizontal: 15, paddingBottom: 20 },
  row: { justifyContent: "space-between", marginBottom: 15 },
  card: { width: "47%", backgroundColor: "#FFF", borderRadius: 18, borderWidth: 1, borderColor: "#E2E2E2", padding: 15 },
  cardImage: { width: "100%", height: 90, resizeMode: "contain", marginBottom: 15 },
  cardTitle: { fontSize: 16, fontWeight: "bold", color: "#181725", marginBottom: 4 },
  cardSub: { fontSize: 14, color: "#7C7C7C", marginBottom: 20 },
  cardBottom: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: "auto" },
  price: { fontSize: 18, fontWeight: "bold", color: "#181725" },
  addButton: { backgroundColor: "#53B175", width: 45, height: 45, borderRadius: 17, justifyContent: "center", alignItems: "center" },
});
