import { useState, useEffect } from 'react';

// Custom Hook nhận vào một hàm fetch (ví dụ: storageService.getCart)
export const useStorage = (fetchFunction) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = async () => {
    setIsLoading(true);
    try {
      // Dùng setTimeout giả lập mạng hơi chậm (800ms) để thầy nhìn rõ hiệu ứng Skeleton
      setTimeout(async () => {
        const result = await fetchFunction();
        setData(result);
        setIsLoading(false);
      }, 800); 
    } catch (error) {
      console.error("Lỗi trong useStorage:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Trả về data, trạng thái loading, và hàm reload để update lại UI
  return { data, setData, isLoading, reloadData: loadData };
};