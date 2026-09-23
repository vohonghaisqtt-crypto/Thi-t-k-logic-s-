# LESSON 05 — MẠCH SỐ HỌC, COMPARATOR VÀ PARITY

**Slug:** `mach-so-hoc`  
**Nguồn chính:** C3, trang 81–99.

## 1. Half Adder

Half Adder cộng hai bit thấp nhất, nơi chưa có carry-in từ cột thấp hơn.

Input:

```text
A, B
```

Output:

```text
S = A⊕B
C = A·B
```

Truth table:

| A | B | S | C |
|---:|---:|---:|---:|
| 0 | 0 | 0 | 0 |
| 0 | 1 | 1 | 0 |
| 1 | 0 | 1 | 0 |
| 1 | 1 | 0 | 1 |

C3 gọi đây là “cộng bán phần” vì chưa xử lý carry từ phép cộng trước.

---

## 2. Full Adder

Full Adder có 3 input:

```text
A, B, Cin
```

Output:

```text
S    = A⊕B⊕Cin
Cout = A·B + Cin(A⊕B)
```

Nguồn C3 có truth table đầy đủ 8 tổ hợp.

### Tư duy

- XOR trả lời “bit tổng khác nhau theo parity như thế nào”.
- Cout = 1 khi có đủ điều kiện tạo carry sang cột cao hơn.

---

## 3. Bộ cộng nhiều bit

C3 minh họa ghép nhiều FA để cộng 4 bit.

Carry lan theo chuỗi:

```text
FA0 → carry → FA1 → carry → FA2 → carry → FA3
```

Ví dụ nguồn:

```text
A = 1111
B = 1001
```

Kết quả được hình thành từ chuỗi sum/carry qua bốn tầng FA.

Ở đợt C1–C4 chỉ cần hiểu cấu trúc bộ cộng song song/ripple theo slide; chưa thêm carry-lookahead nếu chưa có nguồn bổ sung.

---

## 4. Half Subtractor

Input:

```text
A, B
```

Output:

```text
D      = A⊕B
Borrow = ¬A·B
```

Ý nghĩa `Borrow=1`: tại cột này A không đủ để trừ B nên phải mượn từ cột cao hơn.

---

## 5. Full Subtractor

Input:

```text
A, B, Bin
```

Output:

```text
D = A⊕B⊕Bin
```

C3 cho biểu thức borrow-out theo ba input và truth table đầy đủ.

Điểm học chính là vai trò của `Bin` tương tự vai trò `Cin` trong Full Adder, nhưng về **mượn** thay vì **nhớ**.

---

## 6. Comparator

### 6.1. Comparator 1 bit

Ba quan hệ cần tạo:

```text
A>B
A=B
A<B
```

Với 1 bit:

```text
A>B : A·¬B
A<B : ¬A·B
A=B : A XNOR B
```

### 6.2. Comparator nhiều bit

C3 cho ví dụ 3 bit và bài thiết kế 2 bit.

Nguyên tắc tư duy:

1. so bit MSB trước;
2. nếu MSB khác nhau, kết quả đã xác định;
3. chỉ khi chúng bằng nhau mới xét bit thấp hơn.

Bài 2 bit cần làm đủ:

```text
sơ đồ khối
→ bảng trạng thái
→ rút gọn output A>B, A=B, A<B
→ vẽ mạch
```

---

## 7. Parity

Mục đích của parity trong C3 là hỗ trợ kiểm tra lỗi đơn giản khi truyền dữ liệu.

### 7.1. Even parity

Tổng số bit `1` của data + parity bit phải là số chẵn.

### 7.2. Odd parity

Tổng số bit `1` của data + parity bit phải là số lẻ.

### 7.3. Parity generator

Với ba bit dữ liệu theo nguồn C3:

```text
P_even = d0 ⊕ d1 ⊕ d2
P_odd  = ¬P_even
```

### 7.4. Parity checker

Phía nhận phải tính trên **toàn bộ từ mã, kể cả parity bit**.

Đây là bẫy rất thường gặp: chỉ XOR data mà quên parity bit thì chưa kiểm được tính nhất quán của từ mã nhận.

---

## 8. ALU — giới hạn nguồn

C3 có mục:

```text
3.9. Đơn vị số học và logic (ALU)
```

nhưng nội dung thực tế ở cuối file gần như chỉ có tiêu đề `3.9.1` mà không có bài giảng đầy đủ.

Vì vậy trong master content C1–C4:

- chỉ ghi nhận ALU như điểm nối tiếp của các mạch số học/logic;
- **không tự dựng một chương ALU chi tiết từ nguồn này**.

ALU sẽ chỉ được mở rộng khi có nguồn tiếp theo hoặc khi thống nhất phần bổ sung ngoài giáo trình.

---

## 9. Bẫy — Lesson 05

1. Half Adder không có `Cin`.
2. Full Adder phải xét `Cin`.
3. Carry khác Borrow.
4. Comparator nhiều bit không thể so từng bit độc lập rồi cộng kết quả tùy ý; phải ưu tiên từ MSB.
5. Parity bit là một phần của từ mã khi kiểm tra.
6. Không coi parity là cơ chế phát hiện mọi loại lỗi.

---

## 10. Practice ladder — Lesson 05

### Level A

1. Lập truth table HA.
2. Lập truth table HS.
3. Xác định output comparator 1 bit cho bốn tổ hợp.

### Level B

1. Từ truth table FA, rút công thức `S` và `Cout`.
2. Ghép bốn FA thành bộ cộng 4 bit và theo dõi carry.
3. Tạo even parity cho một từ 4 bit.

### Level C

1. Thiết kế comparator 2 bit từ đầu đến mạch.
2. Thiết kế parity generator/checker cho một số bit dữ liệu cho trước.
3. So sánh cấu trúc HA/FA và HS/FS theo input, output và mục đích.

---

## 11. Mastery check — Lesson 05

```text
□ Tôi hiểu và tự lập lại được HA/FA.
□ Tôi hiểu và tự lập lại được HS/FS.
□ Tôi theo dõi được carry/borrow qua nhiều cột.
□ Tôi thiết kế được comparator nhỏ.
□ Tôi tạo và kiểm tra được parity.
□ Tôi biết phần ALU chưa đủ nguồn trong C3 và không tự suy diễn nội dung.
```
