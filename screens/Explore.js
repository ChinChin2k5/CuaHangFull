import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";

const categories = [
  {
    id: "1",
    name: "Fresh Fruits\n& Vegetable",
    color: "#EEF8F2",
    borderColor: "#53B175",
    img: require("../assets/FreshFruit.png"),
  },
  {
    id: "2",
    name: "Cooking Oil\n& Ghee",
    color: "#FFF6EE",
    borderColor: "#F8A44C",
    img: require("../assets/CookingOil.png"),
  },
  {
    id: "3",
    name: "Meat & Fish",
    color: "#FDECEC",
    borderColor: "#F7A593",
    img: require("../assets/Meat&Fish.png"),
  },
  {
    id: "4",
    name: "Bakery & Snacks",
    color: "#F4EBF7",
    borderColor: "#D3B0E0",
    img: require("../assets/Bakery.png"),
  },
  {
    id: "5",
    name: "Dairy & Eggs",
    color: "#FFF8E5",
    borderColor: "#FDE598",
    img: require("../assets/Eggs.png"),
  },
  {
    id: "6",
    name: "Beverages",
    color: "#EDF7FC",
    borderColor: "#B7DFF5",
    img: require("../assets/Be.png"),
  },
];

export default function Explore({ navigation }) {
  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.card,
        { backgroundColor: item.color, borderColor: item.borderColor },
      ]}
      onPress={() => {
        if (item.name === "Beverages") {
          navigation.navigate("Beverages");
        }
      }}
    >
      <Image source={item.img} style={styles.cardImage} />
      <Text style={styles.cardTitle}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>Find Products</Text>
      <View style={styles.searchContainer}>
        <Feather
          name="search"
          size={20}
          color="#181725"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search Store"
          placeholderTextColor="#7C7C7C"
        />
      </View>
      <FlatList
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
    color: "#181725",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F3F2",
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 50,
  },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, fontSize: 15, color: "#181725" },
  listContent: { paddingHorizontal: 20, paddingBottom: 20 },
  row: { justifyContent: "space-between" },
  card: {
    width: "47%",
    height: 190,
    borderWidth: 1,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    padding: 15,
  },
  cardImage: { width: 90, height: 70, resizeMode: "contain", marginBottom: 20 },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#181725",
    textAlign: "center",
  },
});
