import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, AntDesign } from "@expo/vector-icons";

import productsData from "../data";

export default function MyCart() {
  const cartItems = productsData.filter((item) => item.isCart);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * (item.qty || 1),
    0
  );

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={item.image} style={styles.itemImage} />

      <View style={styles.itemDetails}>
        <View style={styles.titleRow}>
          <Text style={styles.itemName}>{item.name}</Text>
          <TouchableOpacity>
            <Feather name="x" size={20} color="#B3B3B3" />
          </TouchableOpacity>
        </View>

        <Text style={styles.itemSub}>{item.quantity}</Text>

        <View style={styles.actionRow}>
          <View style={styles.qtyContainer}>
            <TouchableOpacity style={styles.qtyButton}>
              <AntDesign name="minus" size={16} color="#B3B3B3" />
            </TouchableOpacity>
            <Text style={styles.qtyText}>{item.qty || 1}</Text>
            <TouchableOpacity style={styles.qtyButton}>
              <AntDesign name="plus" size={16} color="#53B175" />
            </TouchableOpacity>
          </View>
          <Text style={styles.itemPrice}>${item.price}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Cart</Text>
      </View>

      <FlatList
        data={cartItems}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={styles.listContent}
      />

      <View style={styles.footer}>
        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutText}>Go to Checkout</Text>
          <View style={styles.totalPriceBadge}>
            {/* In cái tổng tiền tự động đã làm tròn 2 chữ số thập phân ra đây */}
            <Text style={styles.totalPriceText}>${totalPrice.toFixed(2)}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  header: {
    alignItems: "center",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E2E2",
  },
  headerTitle: { fontSize: 20, fontWeight: "bold", color: "#181725" },
  listContent: { paddingHorizontal: 20, paddingBottom: 20 },
  cartItem: { flexDirection: "row", alignItems: "center", paddingVertical: 20 },
  itemImage: { width: 70, height: 70, resizeMode: "contain", marginRight: 20 },
  itemDetails: { flex: 1 },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemName: { fontSize: 16, fontWeight: "bold", color: "#181725" },
  itemSub: { fontSize: 14, color: "#7C7C7C", marginTop: 4, marginBottom: 12 },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  qtyContainer: { flexDirection: "row", alignItems: "center" },
  qtyButton: {
    width: 35,
    height: 35,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E2E2",
    justifyContent: "center",
    alignItems: "center",
  },
  qtyText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#181725",
    marginHorizontal: 15,
  },
  itemPrice: { fontSize: 18, fontWeight: "bold", color: "#181725" },
  separator: { height: 1, backgroundColor: "#E2E2E2" },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#E2E2E2",
    backgroundColor: "#FFF",
  },
  checkoutButton: {
    backgroundColor: "#53B175",
    borderRadius: 19,
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  checkoutText: { color: "#FFF", fontSize: 18, fontWeight: "600" },
  totalPriceBadge: {
    position: "absolute",
    right: 20,
    backgroundColor: "#489E67",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  totalPriceText: { color: "#FFF", fontSize: 12, fontWeight: "600" },
});
