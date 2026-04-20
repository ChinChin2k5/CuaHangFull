import AsyncStorage from '@react-native-async-storage/async-storage';

// Định nghĩa các Key lưu trữ để không bị gõ sai chính tả
const KEYS = {
  USER: '@nectar_user',
  CART: '@nectar_cart',
  ORDERS: '@nectar_orders',
};

export const storageService = {
  // ==========================================
  // 1. TÍNH NĂNG AUTH (XÁC THỰC)
  // ==========================================
  saveUser: async (userData) => {
    try {
      const jsonValue = JSON.stringify(userData);
      await AsyncStorage.setItem(KEYS.USER, jsonValue);
      console.log('Đã lưu User thành công!');
    } catch (e) {
      console.error('Lỗi khi lưu User:', e);
    }
  },

  getUser: async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(KEYS.USER);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.error('Lỗi khi lấy User:', e);
      return null;
    }
  },

  logout: async () => {
    try {
      // Đề bài yêu cầu: Xóa toàn bộ dữ liệu liên quan
      await AsyncStorage.multiRemove([KEYS.USER, KEYS.CART, KEYS.ORDERS]);
      console.log('Đã đăng xuất và xóa sạch dữ liệu!');
    } catch (e) {
      console.error('Lỗi khi Logout:', e);
    }
  },

  // ==========================================
  // 2. TÍNH NĂNG GIỎ HÀNG (CART)
  // ==========================================
  saveCart: async (cartData) => {
    try {
      const jsonValue = JSON.stringify(cartData);
      await AsyncStorage.setItem(KEYS.CART, jsonValue);
    } catch (e) {
      console.error('Lỗi khi lưu Giỏ hàng:', e);
    }
  },

  getCart: async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(KEYS.CART);
      return jsonValue != null ? JSON.parse(jsonValue) : []; // Trả về mảng rỗng nếu chưa có gì
    } catch (e) {
      console.error('Lỗi khi lấy Giỏ hàng:', e);
      return [];
    }
  },

  // ==========================================
  // 3. TÍNH NĂNG ĐƠN HÀNG (ORDERS)
  // ==========================================
  saveOrder: async (newOrder) => {
    try {
      // Lấy danh sách đơn hàng cũ ra trước
      const existingOrders = await storageService.getOrders();
      
      // Nhét đơn hàng mới vào đầu danh sách
      const updatedOrders = [newOrder, ...existingOrders];
      
      const jsonValue = JSON.stringify(updatedOrders);
      await AsyncStorage.setItem(KEYS.ORDERS, jsonValue);
      console.log('Đã lưu Đơn hàng mới!');
    } catch (e) {
      console.error('Lỗi khi lưu Đơn hàng:', e);
    }
  },

  getOrders: async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(KEYS.ORDERS);
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
      console.error('Lỗi khi lấy Danh sách Đơn hàng:', e);
      return [];
    }
  }
};