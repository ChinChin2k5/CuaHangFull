import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";


import HomeScreen from "./screens/HomeScreen";
import Explore from "./screens/Explore";
import Search from "./screens/Search";
import MyCart from "./screens/MyCart";
import Favorites from "./screens/Favorites";
import Filters from "./screens/Filters";
import Beverages from "./screens/Beverages";
import ProductDetail from "./screens/ProductDetail";
import Account from "./screens/Account";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const MainStack = createNativeStackNavigator();
const ExploreTabStack = createNativeStackNavigator(); // <--- Tạo Stack mới ở đây


function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Shop") iconName = "shopping-bag";
          else if (route.name === "Explore") iconName = "search";
          else if (route.name === "Cart") iconName = "shopping-cart";
          else if (route.name === "Favourite") iconName = "heart";
          else if (route.name === "Account") iconName = "user";
          return <Feather name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#53B175",
        tabBarInactiveTintColor: "#181725",
        headerShown: false,
        tabBarStyle: { height: 60, paddingBottom: 10, paddingTop: 5 },
      })}
    >
      <Tab.Screen name="Shop" component={HomeScreen} />
      
      {/* Gắn màn Search vào Tab Explore để có luôn thanh tìm kiếm */}
      <Tab.Screen name="Explore" component={ExploreTabFlow} />
      <Tab.Screen name="Cart" component={MyCart} />
      <Tab.Screen name="Favourite" component={Favorites} />
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  );
}
// App.js

function ExploreTabFlow() {
  return (
    <ExploreTabStack.Navigator screenOptions={{ headerShown: false }}>
      {/* 1. Màn hình đầu tiên: Explore (Giao diện danh mục) */}
      <ExploreTabStack.Screen name="ExploreRoot" component={Explore} />
      
      {/* 2. Màn hình thứ hai: Search (Kết quả tìm kiếm) */}
      <ExploreTabStack.Screen name="SearchFlow" component={Search} />
      
      {/* 3. Màn hình thứ ba: Chi tiết danh mục (Tái sử dụng Beverages.js) */}
      <ExploreTabStack.Screen name="CategoryProductsFlow" component={Beverages} />
      
      {/* 4. Màn hình thứ tư: Filters (Bộ lọc) - Nhảy ra từ Search */}
      <ExploreTabStack.Screen name="FiltersFlow" component={Filters} />
    </ExploreTabStack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Tab Bar luôn nằm ngoài cùng */}
        <Stack.Screen name="MainTabs" component={MainTabs} />

        {/* Các màn hình phụ nhảy vào từ Tab */}
        <Stack.Screen name="ExploreOld" component={Explore} />
        <Stack.Screen name="Beverages" component={Beverages} />
        <Stack.Screen name="ProductDetail" component={ProductDetail} />

        {/* Set presentation="modal" để màn hình Filter trượt từ dưới lên cho ngầu */}
        <Stack.Screen
          name="Filters"
          component={Filters}
          options={{ presentation: "modal" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
