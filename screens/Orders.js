import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { storageService } from "../services/storageService";

export default function Orders({ navigation }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      const storedOrders = await storageService.getOrders();
      setOrders(storedOrders);
    });
    return unsubscribe;
  }, [navigation]);

  const renderOrderItem = ({ item }) => (
    <View style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <Text style={styles.orderId}>Mã Đơn: {item.id}</Text>
        <Text style={styles.orderDate}>{item.date}</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.itemList}>
        {item.items.map((prod, index) => (
          <Text key={index} style={styles.prodItem}>
            • {prod.name} (x{prod.cartQuantity})
          </Text>
        ))}
      </View>

      <View style={styles.divider} />
      <View style={styles.orderFooter}>
        <Text style={styles.totalText}>Tổng tiền:</Text>
        <Text style={styles.priceText}>${item.total}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
        >
          <Feather name="arrow-left" size={24} color="#181725" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Lịch Sử Đơn Hàng</Text>
        <View style={{ width: 24 }} />
      </View>

      {orders.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Feather name="package" size={64} color="#B3B3B3" />
          <Text style={styles.emptyText}>Bạn chưa có đơn hàng nào!</Text>
        </View>
      ) : (
        <FlatList
          data={orders}
          renderItem={renderOrderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E2E2",
  },
  backBtn: { padding: 5 },
  headerTitle: { fontSize: 20, fontWeight: "bold", color: "#181725" },
  emptyContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyText: { fontSize: 16, color: "#7C7C7C", marginTop: 15 },
  listContent: { padding: 20 },
  orderCard: {
    backgroundColor: "#F2F3F2",
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E2E2E2",
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  orderId: { fontSize: 16, fontWeight: "bold", color: "#53B175" },
  orderDate: { fontSize: 14, color: "#7C7C7C" },
  divider: { height: 1, backgroundColor: "#E2E2E2", marginVertical: 10 },
  itemList: { marginVertical: 5 },
  prodItem: { fontSize: 15, color: "#181725", marginBottom: 4 },
  orderFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
  },
  totalText: { fontSize: 16, color: "#7C7C7C", fontWeight: "600" },
  priceText: { fontSize: 18, fontWeight: "bold", color: "#181725" },
});
