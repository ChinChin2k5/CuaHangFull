#Dương Tiến Chiến - 23810310176 - D18CNPM4
## MÔ TẢ CHỨC NĂNG 
Dự án này là phiên bản nâng cấp của Nectar App, tập trung vào việc quản lý trạng thái (State Management) và lưu trữ dữ liệu cục bộ (Local Storage) bằng `@react-native-async-storage/async-storage` 

Hệ thống bao gồm 3 luồng chức năng chính:

### 1. Luồng Xác thực (Authentication Flow)
* **Đăng nhập giả lập (Mock Login):** Cho phép người dùng đăng nhập và khởi tạo dữ liệu phiên làm việc. (Minh chứng: `23810310176 _ 01 _ Mock Login`)
  <img width="1220" height="2712" alt="image" src="https://github.com/user-attachments/assets/d057c717-5fd1-4f9a-a60d-c6ff3bc24a9d" />


* **Tự động đăng nhập (Auto-Login):** Trạng thái đăng nhập được mã hóa (AES Encryption) và lưu sâu vào ổ cứng. Khi tắt (kill) app và mở lại, hệ thống tự động bypass màn hình Auth để vào thẳng Main UI. (Minh chứng: `23810310176 _ 02 _ Auto Login`)
* <img width="1220" height="2712" alt="image" src="https://github.com/user-attachments/assets/2f6869ff-e4c5-47b0-8ae0-9e6f1bc91326" />

  

* **Đăng xuất an toàn:** Chức năng Logout dọn dẹp sạch sẽ toàn bộ token và dữ liệu (User, Cart, Orders) khỏi thiết bị, điều hướng an toàn về màn hình khởi tạo. (Minh chứng: `23810310176 _ 03 _ Logout`)
  <img width="1220" height="2712" alt="image" src="https://github.com/user-attachments/assets/f7fe5065-d1f0-407a-9614-f89ad1ef1fcd" />



### 2. Luồng Giỏ hàng (Cart Management)
* **Thêm vào giỏ (Add to Cart):** Thuật toán tự động nhận diện sản phẩm: thêm mới nếu chưa có, hoặc cộng dồn số lượng nếu đã tồn tại trong giỏ. (Minh chứng: `23810310176 _ 04 _ Cart`)
<img width="1220" height="2712" alt="image" src="https://github.com/user-attachments/assets/af6cc915-24bd-4711-9c75-73986c0530bc" />


* **Bền bỉ dữ liệu (Persistence):** Toàn bộ giỏ hàng được đồng bộ hóa với AsyncStorage. Tắt ứng dụng mở lại, giỏ hàng vẫn được giữ nguyên 100%. (Minh chứng: `23810310176 _ 05 _ Cart Remaining`)
<img width="1220" height="2712" alt="image" src="https://github.com/user-attachments/assets/76b9f03f-212f-4a0d-bdd0-51a7eb5319aa" />


* **Tương tác trực tiếp:** Cho phép tăng/giảm số lượng (không được giảm dưới 1) hoặc xóa hẳn sản phẩm khỏi giỏ, tổng tiền cập nhật realtime. (Minh chứng: `23810310176 _ 06 _ Up&Down`)
* <img width="1220" height="2712" alt="image" src="https://github.com/user-attachments/assets/ddd9b0c8-ad61-4fca-8b7b-59b620fa45a6" />



### 3. Luồng Đơn hàng (Order & Checkout)
* **Chốt đơn (Checkout):** Chuyển đổi toàn bộ dữ liệu giỏ hàng hiện tại thành một Hóa đơn hoàn chỉnh (kèm Mã đơn Random, Tổng tiền và Thời gian đặt hàng `vi-VN`). Lập tức làm sạch giỏ hàng. (Minh chứng: `23810310176 _ 07 _ CheckOut`)
* <img width="1220" height="2712" alt="image" src="https://github.com/user-attachments/assets/3878e159-54d5-4a8a-8776-56b2a920ce18" />

* **Lịch sử mua hàng:** Màn hình `Orders` truy xuất dữ liệu từ ổ cứng, hiển thị danh sách các đơn hàng đã đặt một cách trực quan. (Minh chứng: `23810310176 _ 08 _ Order`)
* <img width="1220" height="2712" alt="image" src="https://github.com/user-attachments/assets/573c4c38-64b0-404a-9b92-852191184105" />

* **Lưu trữ vĩnh viễn:** Lịch sử đơn hàng được bảo toàn tuyệt đối kể cả khi Reload hay Kill App. (Minh chứng: `23810310176 _ 09 _ Order Remaining`)
<img width="1220" height="2712" alt="image" src="https://github.com/user-attachments/assets/527d8056-51a0-4bd3-8ba7-5efe184c4463" />

---
1. AsyncStorage hoạt động như thế nào?

Bản chất: AsyncStorage là một hệ thống lưu trữ dữ liệu dạng Key-Value (Khóa - Giá trị), hoạt động bất đồng bộ (Asynchronous) và có tính chất cục bộ (Local/Persistent) trên thiết bị di động.

Cơ chế lưu trữ: Nó không lưu trên RAM mà ghi trực tiếp xuống phân vùng ổ cứng của ứng dụng (Thường sử dụng SQLite hoặc RocksDB trên Android, và file Dictionary (Manifest) trên iOS).

Định dạng: AsyncStorage chỉ chấp nhận lưu trữ dữ liệu dưới dạng Chuỗi (String). Do đó, để lưu các cấu trúc phức tạp như Object hay Array (ví dụ: Giỏ hàng, Thông tin User), ta bắt buộc phải dùng JSON.stringify() để ép kiểu thành chuỗi trước khi lưu, và dùng JSON.parse() để dịch ngược lại khi lấy ra.

Tính bất đồng bộ: Các thao tác đọc/ghi (getItem, setItem) tốn thời gian xử lý nên trả về một Promise. Ta phải dùng async/await để đảm bảo luồng giao diện (UI Thread) của ứng dụng không bị đơ/giật lag trong lúc chờ ổ cứng phản hồi.

2. Vì sao dùng AsyncStorage thay vì biến state (useState)?

Vòng đời của State (RAM): Biến state được lưu trên bộ nhớ tạm (RAM). Khi component bị unmount, màn hình bị đóng, hoặc người dùng tắt ứng dụng (Kill App), toàn bộ dữ liệu trong state sẽ bị hệ điều hành dọn dẹp và mất trắng.

Vòng đời của AsyncStorage (Ổ cứng): Dữ liệu được ghi thẳng vào bộ nhớ vật lý của thiết bị. Khi tắt ứng dụng hay khởi động lại điện thoại, dữ liệu vẫn tồn tại.

Kết luận: Ta dùng state cho những dữ liệu mang tính "tạm thời" (ví dụ: đang gõ text vào ô input, cờ đóng/mở modal). Ta dùng AsyncStorage cho những dữ liệu mang tính "sống còn" và cần giữ lại giữa các phiên sử dụng (ví dụ: Token đăng nhập, Lịch sử đơn hàng, Cài đặt giao diện Dark/Light mode).

3. So sánh AsyncStorage với Context API (Redux / Zustand)

Mặc dù cả hai đều giúp giải quyết bài toán quản lý dữ liệu, nhưng chúng phục vụ hai mục đích hoàn toàn khác nhau và thường được kết hợp cùng nhau thay vì thay thế nhau:

Về nơi lưu trữ và Tính lâu bền: Context API lưu trữ dữ liệu trên bộ nhớ tạm (RAM), do đó nó mang tính chất "Volatile" (dễ bay hơi) – nghĩa là mọi dữ liệu sẽ mất sạch ngay khi bạn Reload hoặc tắt hoàn toàn ứng dụng. Ngược lại, AsyncStorage lưu trữ dữ liệu trực tiếp xuống ổ cứng vật lý của thiết bị (ROM/Local Storage), mang tính "Persistent" (bền bỉ) – dữ liệu sẽ tồn tại vĩnh viễn cho đến khi bạn chủ động xóa nó đi.

Về tốc độ truy xuất: Do dữ liệu nằm sẵn trên RAM, Context API cho tốc độ truy xuất cực kỳ nhanh và hoạt động đồng bộ (Synchronous). Trong khi đó, AsyncStorage phải thực hiện thao tác đọc/ghi xuống ổ cứng nên tốc độ chậm hơn và bắt buộc phải xử lý bất đồng bộ bằng async/await (Asynchronous).

Về mục đích sử dụng chính: Context API sinh ra để giải quyết bài toán "Prop Drilling" (tránh việc phải truyền dữ liệu thủ công qua quá nhiều lớp Component) và giúp chia sẻ State toàn cục (Global State) một cách mượt mà trên UI. Còn AsyncStorage sinh ra để giải quyết bài toán "Persistence" (duy trì trạng thái giữa các phiên sử dụng hoặc các lần mở ứng dụng khác nhau).

Chiến thuật kết hợp trong thực tế: Trong các dự án thực tế, hai công cụ này bù trừ cho nhau rất hoàn hảo. Khi ứng dụng vừa khởi động, hệ thống sẽ thực hiện thao tác chậm là đọc dữ liệu gốc từ AsyncStorage. Sau đó, nó "bơm" toàn bộ dữ liệu này vào Context API. Kể từ thời điểm đó, giao diện UI sẽ chỉ lấy dữ liệu từ Context API để hiển thị với tốc độ cực nhanh, và mỗi khi có thay đổi (thêm/xóa giỏ hàng), hệ thống sẽ update trên Context API đồng thời ghi âm thầm (backup) xuống AsyncStorage.

## ⚙️ HƯỚNG DẪN CÀI ĐẶT VÀ CHẠY APP

Để chạy dự án này trên môi trường Local, vui lòng thực hiện theo các bước sau:

**Bước 1: Clone mã nguồn**
\`\`\`bash
git clone https://github.com/ChinChin2k5/CuaHangFull
cd CuaHangTraiCay
\`\`\`

**Bước 2: Cài đặt các thư viện (Dependencies)**
Dự án sử dụng một số thư viện Native, vui lòng chạy lệnh sau để tải về:
\`\`\`bash
npm install
\`\`\`
*Lưu ý: Đảm bảo các thư viện lõi như `@react-native-async-storage/async-storage`,, và `react-native-get-random-values` đã được cài đặt.*

**Bước 3: Khởi động Server Expo**
Nên khởi động kèm cờ `-c` để xóa cache,
\`\`\`bash
npx expo start -c
\`\`\`

**Bước 4:**
* Mở ứng dụng **Expo Go** trên điện thoại (iOS/Android).
* Quét mã QR hiện trên Terminal để tiến hành Build và chạy App.
  Link Video Minh Chứng: https://drive.google.com/file/d/1B4n8Xhar8d-qfvSnylOgdu9gtAfN_EqX/view?usp=sharing

<img width="1220" height="2712" alt="image" src="https://github.com/user-attachments/assets/7f738a8f-d3cb-4e21-a270-cd06340ab50a" />
<img width="1220" height="2712" alt="image" src="https://github.com/user-attachments/assets/52a1ef76-d55f-4726-a9c6-a104c6cae1c6" />
<img width="1220" height="2712" alt="image" src="https://github.com/user-attachments/assets/88b83bd9-37db-4a2c-9384-965d9ae65dc3" />
<img width="1220" height="2712" alt="image" src="https://github.com/user-attachments/assets/84184730-1cc6-4579-a579-a68939e7798c" />
<img width="1220" height="2712" alt="image" src="https://github.com/user-attachments/assets/2793b1bc-7b64-4899-92f3-87dd8063ea75" />
<img width="1220" height="2712" alt="image" src="https://github.com/user-attachments/assets/0ac1ebcc-31a6-459f-b58a-9dd61dd349fb" />
<img width="1220" height="2712" alt="image" src="https://github.com/user-attachments/assets/4694e80c-de04-42c3-a61c-401819a4a677" />
<img width="1220" height="2712" alt="image" src="https://github.com/user-attachments/assets/51736e71-b61b-4d5b-a39d-603595a47159" />
<img width="1220" height="2712" alt="image" src="https://github.com/user-attachments/assets/11c39ee9-b4de-45e2-9c99-c6c817772ca1" />










