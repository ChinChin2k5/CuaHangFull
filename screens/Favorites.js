import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Alert
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";

import productsData from "../data";
import { storageService } from "../services/storageService";

export default function Favorites() {
  const favoriteItems = productsData.filter((item) => item.isFavorite);

  const handleAddAllToCart = async () => {
    try {
      const currentCart = await storageService.getCart();
      let updatedCart = [...currentCart];

      favoriteItems.forEach(favItem => {
        const existingIndex = updatedCart.findIndex(cartItem => cartItem.id === favItem.id);
        
        if (existingIndex > -1) {
          updatedCart[existingIndex].cartQuantity += 1;
        } else {
          updatedCart.push({ ...favItem, cartQuantity: 1 });
        }
      });

      await storageService.saveCart(updatedCart);
      Alert.alert("Thành công!", "Đã ném toàn bộ đồ yêu thích vào giỏ hàng!");
    } catch (error) {
      console.error("Lỗi thêm tất cả:", error);
    }
  };

  const renderFavoriteItem = ({ item }) => (
    <TouchableOpacity style={styles.favoriteItem}>
      <Image source={item.image} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemSub}>{item.quantity}</Text>
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.itemPrice}>${item.price}</Text>
        <MaterialIcons name="keyboard-arrow-right" size={24} color="#181725" />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Favorites</Text>
      </View>

      <FlatList
        data={favoriteItems}
        renderItem={renderFavoriteItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={styles.listContent}
      />

      <View style={styles.footer}>
        <TouchableOpacity style={styles.addAllButton} onPress={handleAddAllToCart}>
          <Text style={styles.addAllText}>Add All To Cart</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  header: { alignItems: "center", paddingVertical: 20, borderBottomWidth: 1, borderBottomColor: "#E2E2E2" },
  headerTitle: { fontSize: 20, fontWeight: "bold", color: "#181725" },
  listContent: { paddingHorizontal: 20, paddingBottom: 20 },
  favoriteItem: { flexDirection: "row", alignItems: "center", paddingVertical: 20 },
  itemImage: { width: 55, height: 55, resizeMode: "contain", marginRight: 20 },
  itemDetails: { flex: 1 },
  itemName: { fontSize: 16, fontWeight: "bold", color: "#181725", marginBottom: 4 },
  itemSub: { fontSize: 14, color: "#7C7C7C" },
  priceContainer: { flexDirection: "row", alignItems: "center" },
  itemPrice: { fontSize: 16, fontWeight: "bold", color: "#181725", marginRight: 15 },
  separator: { height: 1, backgroundColor: "#E2E2E2" },
  footer: { padding: 20, borderTopWidth: 1, borderTopColor: "#E2E2E2", backgroundColor: "#FFF" },
  addAllButton: { backgroundColor: "#53B175", borderRadius: 19, paddingVertical: 20, alignItems: "center" },
  addAllText: { color: "#FFF", fontSize: 18, fontWeight: "600" },
});
