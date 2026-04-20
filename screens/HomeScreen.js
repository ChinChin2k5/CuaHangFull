import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
  Alert
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, FontAwesome5 } from "@expo/vector-icons";

import { storageService } from "../services/storageService";

const exclusiveOffers = [
  { id: "eo1", name: "Organic Bananas", sub: "7pcs, Priceg", price: "$4.99", img: require("../assets/Banana.png") },
  { id: "eo2", name: "Red Apple", sub: "1kg, Priceg", price: "$4.99", img: require("../assets/Apple.png") },
];

const bestSelling = [
  { id: "bs1", name: "Bell Pepper Red", sub: "1kg, Price", price: "$4.99", img: require("../assets/Pepper.png") },
  { id: "bs2", name: "Ginger", sub: "250gm, Price", price: "$4.99", img: require("../assets/Ginger.png") },
];

const groceries = [
  { id: "g1", name: "Pulses", color: "#F8A44C26", img: require("../assets/Pulses.png") },
  { id: "g2", name: "Rice", color: "#53B17526", img: require("../assets/Rice.png") },
];

export default function HomeScreen({ navigation }) {
  
  const handleAddToCart = async (product) => {
    try {
      const currentCart = await storageService.getCart();
      const existingIndex = currentCart.findIndex(item => item.id === product.id);

      let numericPrice = typeof product.price === 'string' 
        ? parseFloat(product.price.replace('$', '')) 
        : product.price;

      let updatedCart = [...currentCart];

      if (existingIndex > -1) {
        updatedCart[existingIndex].cartQuantity += 1;
      } else {
        updatedCart.push({ 
          ...product, 
          price: numericPrice, 
          image: product.img || product.image, 
          cartQuantity: 1 
        });
      }

      await storageService.saveCart(updatedCart);
      Alert.alert("Thành công!", `Đã thêm ${product.name} vào giỏ hàng.`);
    } catch (error) {
      console.error("Lỗi khi thêm ở Home:", error);
    }
  };

  const renderProductItem = ({ item }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => navigation.navigate("ProductDetail", { item: item })}
    >
      <Image source={item.img} style={styles.productImage} />
      <Text style={styles.productTitle} numberOfLines={1}>{item.name}</Text>
      <Text style={styles.productSub}>{item.sub}</Text>

      <View style={styles.priceRow}>
        <Text style={styles.productPrice}>{item.price}</Text>
        
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => handleAddToCart(item)}  
        >
          <Feather name="plus" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderGroceryItem = ({ item }) => (
    <TouchableOpacity style={[styles.groceryCard, { backgroundColor: item.color }]}>
      <Image source={item.img} style={styles.groceryImage} />
      <Text style={styles.groceryTitle}>{item.name}</Text>
    </TouchableOpacity>
  );

  const SectionHeader = ({ title }) => (
    <View style={styles.sectionHeaderRow}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <TouchableOpacity>
        <Text style={styles.seeAllText}>See all</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.topHeader}>
          <FontAwesome5 name="carrot" size={30} color="#F3603F" />
          <View style={styles.locationRow}>
            <Feather name="map-pin" size={16} color="#4C4F4D" />
            <Text style={styles.locationText}>Dhaka, Banassre</Text>
          </View>
        </View>

        <View style={styles.searchContainer}>
          <Feather name="search" size={20} color="#181725" style={styles.searchIcon} />
          <TextInput style={styles.searchInput} placeholder="Search Store" placeholderTextColor="#7C7C7C" />
        </View>

        <Image source={require("../assets/banner.png")} style={styles.bannerImage} />

        <SectionHeader title="Exclusive Offer" />
        <FlatList
          data={exclusiveOffers}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalListContent}
        />

        <SectionHeader title="Best Selling" />
        <FlatList
          data={bestSelling}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalListContent}
        />

        <SectionHeader title="Groceries" />
        <FlatList
          data={groceries}
          renderItem={renderGroceryItem}
          keyExtractor={(item) => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalListContent}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  scrollContent: { paddingBottom: 80 },
  topHeader: { alignItems: "center", marginTop: 10, marginBottom: 15 },
  locationRow: { flexDirection: "row", alignItems: "center", marginTop: 5 },
  locationText: { fontSize: 16, color: "#4C4F4D", fontWeight: "600", marginLeft: 5 },
  searchContainer: { flexDirection: "row", alignItems: "center", backgroundColor: "#F2F3F2", marginHorizontal: 20, marginBottom: 20, borderRadius: 15, paddingHorizontal: 15, height: 50 },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, fontSize: 15, color: "#181725" },
  bannerImage: { width: "90%", height: 115, alignSelf: "center", borderRadius: 15, marginBottom: 25, backgroundColor: "#F2F3F2" },
  sectionHeaderRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 20, marginBottom: 15 },
  sectionTitle: { fontSize: 22, fontWeight: "bold", color: "#181725" },
  seeAllText: { fontSize: 16, color: "#53B175", fontWeight: "600" },
  horizontalListContent: { paddingLeft: 20, paddingRight: 5, marginBottom: 25 },
  productCard: { width: 150, height: 230, borderWidth: 1, borderColor: "#E2E2E2", borderRadius: 18, padding: 15, marginRight: 15, backgroundColor: "#FFF" },
  productImage: { width: "100%", height: 75, resizeMode: "contain", marginBottom: 10 },
  productTitle: { fontSize: 16, fontWeight: "bold", color: "#181725", marginBottom: 5 },
  productSub: { fontSize: 14, color: "#7C7C7C", marginBottom: 15 },
  priceRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: "auto" },
  productPrice: { fontSize: 18, fontWeight: "bold", color: "#181725" },
  addButton: { width: 40, height: 40, backgroundColor: "#53B175", borderRadius: 14, justifyContent: "center", alignItems: "center" },
  groceryCard: { flexDirection: "row", alignItems: "center", width: 230, height: 90, borderRadius: 18, paddingHorizontal: 15, marginRight: 15 },
  groceryImage: { width: 60, height: 60, resizeMode: "contain", marginRight: 15 },
  groceryTitle: { fontSize: 18, fontWeight: "bold", color: "#3E423F" },
});
