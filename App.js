import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";

// ==========================================
// 1. IMPORT CÁC MÀN HÌNH LUỒNG XÁC THỰC (AUTH)
// ==========================================
import Splash from './screens/Splash';
import Onboarding from './screens/Onboarding';
import SignIn from './screens/SignIn';
import Number from './screens/Number';
import Verification from './screens/Verification';
import Select from './screens/Select';
import LogIn from './screens/LogIn';
import SignUp from './screens/SignUp';

// ==========================================
// 2. IMPORT CÁC MÀN HÌNH LUỒNG CHÍNH (MAIN APP)
// ==========================================
import HomeScreen from "./screens/HomeScreen";
import Explore from "./screens/Explore";
import Search from "./screens/Search";
import MyCart from "./screens/MyCart";
import Favorites from "./screens/Favorites";
import Filters from "./screens/Filters";
import Beverages from "./screens/Beverages";
import ProductDetail from "./screens/ProductDetail";
import Account from "./screens/Account";
import Orders from "./screens/Orders";

// ==========================================
// 3. KHỞI TẠO CÁC BỘ ĐIỀU HƯỚNG (NAVIGATORS)
// ==========================================
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const ExploreTabStack = createNativeStackNavigator();

// --- ĐIỀU HƯỚNG CON CHO TAB EXPLORE ---
function ExploreTabFlow() {
  return (
    <ExploreTabStack.Navigator screenOptions={{ headerShown: false }}>
      <ExploreTabStack.Screen name="ExploreRoot" component={Explore} />
      <ExploreTabStack.Screen name="SearchFlow" component={Search} />
      <ExploreTabStack.Screen name="CategoryProductsFlow" component={Beverages} />
      <ExploreTabStack.Screen name="FiltersFlow" component={Filters} />
    </ExploreTabStack.Navigator>
  );
}

// --- ĐIỀU HƯỚNG BOTTOM TABS (GIAO DIỆN CHÍNH) ---
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
      <Tab.Screen name="Explore" component={ExploreTabFlow} />
      <Tab.Screen name="Cart" component={MyCart} />
      <Tab.Screen name="Favourite" component={Favorites} />
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  );
}

// ==========================================
// 4. ROOT STACK: HỢP THỂ TOÀN BỘ HỆ THỐNG
// ==========================================
export default function App() {
  return (
    <NavigationContainer>
      {/* initialRouteName="Splash" đảm bảo App mở lên là vào màn hình Splash đầu tiên */}
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        
        {/* --- KHU VỰC 1: LUỒNG CHƯA ĐĂNG NHẬP (AUTH FLOW) --- */}
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="Number" component={Number} />
        <Stack.Screen name="Verification" component={Verification} />
        <Stack.Screen name="Select" component={Select} />
        <Stack.Screen name="LogIn" component={LogIn} />
        <Stack.Screen name="SignUp" component={SignUp} />

        {/* --- KHU VỰC 2: LUỒNG SAU KHI ĐĂNG NHẬP THÀNH CÔNG --- */}
        {/* Điểm neo để nhảy vào Giao diện chính */}
        <Stack.Screen name="MainTabs" component={MainTabs} />

        {/* Các màn hình phụ nhảy vào từ Tab (có thể tái sử dụng ở nhiều nơi) */}
        <Stack.Screen name="ExploreOld" component={Explore} />
        <Stack.Screen name="Beverages" component={Beverages} />
        <Stack.Screen name="ProductDetail" component={ProductDetail} />

        {/* Màn hình Filter hiệu ứng trượt từ dưới lên (Modal) */}
        <Stack.Screen
          name="Filters"
          component={Filters}
          options={{ presentation: "modal" }}
        />
        <Stack.Screen name="Orders" component={Orders} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}