# Hệ Thống Học Tập: Thiết Kế Logic Số & Verilog HDL

Ứng dụng web học tập chuyên sâu và tương tác về **Điện tử số**, **Đại số Boole**, **Mạch tổ hợp**, **Mạch tuần tự**, **Ngôn ngữ mô tả phần cứng Verilog HDL**, **Máy trạng thái hữu hạn (FSM)** và **Mô phỏng ISE Xilinx**.

Được xây dựng với kiến trúc sư phạm nhận thức (Cognitive Pedagogical Architecture) và trải nghiệm đọc sâu chuẩn UI/UX Pro Max.

---

## 🌟 Các Tính Năng Cốt Lõi

1. **Giáo trình 11 Module Chuẩn Hóa**:
   - Khung tư duy 60 giây và mục tiêu nhận thức đầu bài học.
   - Thẻ ghi chú 4 tầng màu sắc: Khái niệm cốt lõi, Cạm bẫy thiết kế, Mẹo thi cử, và Tư duy phần cứng Verilog synthesizable.
   - Thanh tiến trình đọc trực quan (Reading Progress Bar).

2. **Ôn Tập Thẻ Nhớ 3D (Active Recall Flashcards)**:
   - Kho 36+ thẻ nhớ tương tác 3 chiều với hiệu ứng lật mượt mà.
   - Lọc thông minh theo từng module bài học, danh mục và trạng thái ghi nhớ.

3. **Luyện Tập Đánh Giá (Interactive Quiz)**:
   - Bộ 31+ câu hỏi thực chiến với 4 định dạng: Trắc nghiệm 4 lựa chọn, Đúng/Sai, Đọc hiểu mã Verilog, và Điền từ.
   - Chế độ Luyện tập theo module và Chế độ Thi thử tính giờ có giải thích cặn kẽ.

4. **Bản Đồ Tri Thức (Knowledge Mindmap)**:
   - 25 nodes tri thức mô phỏng trực quan chuỗi liên kết logic từ Cổng cơ bản đến FSM & RTL.
   - Trục xương sống (Core Spine) định vị nhanh kiến thức và mối quan hệ phụ thuộc.

5. **Bộ Công Cụ Bổ Trợ**:
   - **33 Cạm bẫy thiết kế (Traps)**: Đối chiếu sai lầm phần cứng kinh điển (Latch ngoài ý muốn, race condition, active-low).
   - **Từ điển thuật ngữ (Glossary)**: Tra cứu nhanh định nghĩa và công thức toán học.
   - **Quản lý tiến độ**: Tự động lưu trữ tiến trình học tập, bookmark, và hỗ trợ Export/Import dữ liệu JSON.
   - **Command Palette (`Ctrl + K`)**: Tìm kiếm tức thì bài học, thuật ngữ và cạm bẫy.

---

## 🛠️ Công Nghệ Sử Dụng

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, Static Site Generation - SSG).
- **Ngôn ngữ**: TypeScript 5, React 18.
- **Styling**: Tailwind CSS, CSS Variables Semantic Tokens.
- **Typography**: `Plus Jakarta Sans` (UI & văn bản hỗ trợ chuẩn tiếng Việt) và `JetBrains Mono` (bảng chân trị & code).
- **Icons**: Lucide Icons.
- **Nền tảng Deploy**: Netlify / Vercel (Cấu hình sẵn `netlify.toml`).

---

## 🚀 Hướng Dẫn Cài Đặt & Chạy Cục Bộ

### 1. Yêu cầu hệ thống
- Node.js 18.17 trở lên.
- Trình quản lý gói `npm`, `yarn` hoặc `pnpm`.

### 2. Cài đặt dependencies
```bash
npm install
```

### 3. Chạy môi trường phát triển (Dev)
```bash
npm run dev
```
Mở trình duyệt tại [http://localhost:3000](http://localhost:3000) để trải nghiệm.

### 4. Đóng gói Production
```bash
npm run build
```

---

## 🌐 Triển Khai Lên Netlify

Dự án đã được cấu hình sẵn file [`netlify.toml`](./netlify.toml) chuẩn cho Next.js 14 App Router:

1. Đẩy mã nguồn lên kho lưu trữ GitHub của bạn.
2. Đăng nhập vào [Netlify](https://www.netlify.com/) và chọn **Import from Git**.
3. Chọn repository và Netlify sẽ tự động nhận diện:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
   - **Plugins**: `@netlify/plugin-nextjs` (tự động cấu hình)
4. Nhấn **Deploy Site**.
