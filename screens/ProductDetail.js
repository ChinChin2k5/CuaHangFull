import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, FontAwesome } from "@expo/vector-icons";

export default function ProductDetail({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="chevron-left" size={28} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Feather name="share" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.imageBox}>
          <Image
            source={require("../assets/Apple.png")}
            style={styles.productImage}
          />
          <View style={styles.pagination}>
            <View style={[styles.dot, styles.activeDot]} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
        </View>
        <View style={styles.titleRow}>
          <View>
            <Text style={styles.productTitle}>Naturel Red Apple</Text>
            <Text style={styles.productSubTitle}>1kg, Price</Text>
          </View>
          <TouchableOpacity>
            <Feather name="heart" size={24} color="#7C7C7C" />
          </TouchableOpacity>
        </View>
        <View style={styles.priceRow}>
          <View style={styles.quantityBox}>
            <TouchableOpacity>
              <Feather name="minus" size={24} color="#B3B3B3" />
            </TouchableOpacity>
            <View style={styles.quantityDisplay}>
              <Text style={styles.quantityText}>1</Text>
            </View>
            <TouchableOpacity>
              <Feather name="plus" size={24} color="#53B175" />
            </TouchableOpacity>
          </View>
          <Text style={styles.priceText}>$4.99</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.sectionBlock}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Product Detail</Text>
            <Feather name="chevron-down" size={24} color="black" />
          </View>
          <Text style={styles.sectionContent}>
            Apples Are Nutritious. Apples May Be Good For Weight Loss. Apples
            May Be Good For Your Heart. As Part Of A Healthful And Varied Diet.
          </Text>
        </View>

        <View style={styles.divider} />
        <View style={styles.sectionBlock}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Nutritions</Text>
            <View style={styles.nutritionBadgeRow}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>100gr</Text>
              </View>
              <Feather name="chevron-right" size={24} color="black" />
            </View>
          </View>
        </View>

        <View style={styles.divider} />
        <View style={styles.sectionBlock}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Review</Text>
            <View style={styles.starRow}>
              <FontAwesome name="star" size={16} color="#F3603F" />
              <FontAwesome name="star" size={16} color="#F3603F" />
              <FontAwesome name="star" size={16} color="#F3603F" />
              <FontAwesome name="star" size={16} color="#F3603F" />
              <FontAwesome name="star" size={16} color="#F3603F" />
              <Feather
                name="chevron-right"
                size={24}
                color="black"
                style={{ marginLeft: 8 }}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.basketButton}>
          <Text style={styles.basketButtonText}>Add To Basket</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  scrollContent: { paddingBottom: 20 },
  imageBox: {
    alignItems: "center",
    backgroundColor: "#F2F3F2",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingBottom: 20,
  },
  productImage: {
    width: 250,
    height: 200,
    resizeMode: "contain",
    marginTop: 20,
  },
  pagination: { flexDirection: "row", marginTop: 15 },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#B3B3B3",
    marginHorizontal: 3,
  },
  activeDot: { width: 15, backgroundColor: "#53B175" },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  productTitle: { fontSize: 24, fontWeight: "bold", color: "#181725" },
  productSubTitle: { fontSize: 16, color: "#7C7C7C", marginTop: 5 },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  quantityBox: { flexDirection: "row", alignItems: "center" },
  quantityDisplay: {
    width: 45,
    height: 45,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#E2E2E2",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 15,
  },
  quantityText: { fontSize: 18, fontWeight: "bold", color: "#181725" },
  priceText: { fontSize: 24, fontWeight: "bold", color: "#181725" },
  divider: {
    height: 1,
    backgroundColor: "#E2E2E2",
    marginHorizontal: 20,
    marginVertical: 20,
  },
  sectionBlock: { paddingHorizontal: 20 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: { fontSize: 16, fontWeight: "bold", color: "#181725" },
  sectionContent: {
    fontSize: 13,
    color: "#7C7C7C",
    lineHeight: 21,
    marginTop: 10,
  },
  nutritionBadgeRow: { flexDirection: "row", alignItems: "center" },
  badge: {
    backgroundColor: "#EBEBEB",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 15,
  },
  badgeText: { fontSize: 9, color: "#7C7C7C", fontWeight: "600" },
  starRow: { flexDirection: "row", alignItems: "center" },
  footer: { padding: 20, backgroundColor: "#FFF" },
  basketButton: {
    backgroundColor: "#53B175",
    borderRadius: 19,
    paddingVertical: 20,
    alignItems: "center",
  },
  basketButtonText: { color: "#FFF", fontSize: 18, fontWeight: "600" },
});
