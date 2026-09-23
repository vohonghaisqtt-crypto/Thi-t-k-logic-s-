# LESSON 01 — HỆ ĐẾM VÀ BIỂU DIỄN THÔNG TIN

**Slug:** `he-dem`  
**Nguồn chính:** C1, trang 3–34.

## 1. Vì sao phải học phần này?

Mạch số không xử lý “số 13” theo cách con người viết `13`. Nó xử lý các mức logic, sau đó ta **quy ước** các chuỗi bit có ý nghĩa gì. Vì vậy trước khi học bộ cộng, bộ đếm, thanh ghi hay Verilog, phải chắc ba việc:

1. một chuỗi chữ số có giá trị như thế nào;
2. đổi giữa các hệ đếm ra sao;
3. số âm được mã hóa thế nào trong một số bit hữu hạn.

Nếu ba phần này yếu, lỗi thường xuất hiện về sau ở adder/subtractor, counter và biểu diễn số trong HDL.

---

## 2. Cơ số, ký số, trọng số và giá trị

### 2.1. Cơ số

Cơ số `r` là số lượng ký số dùng trong hệ đếm.

| Hệ | Cơ số | Ký số |
|---|---:|---|
| Nhị phân | 2 | `0,1` |
| Bát phân | 8 | `0…7` |
| Thập phân | 10 | `0…9` |
| Thập lục phân | 16 | `0…9,A…F` |

### 2.2. Trọng số

Mỗi vị trí có trọng số:

```text
trọng số = r^(vị trí)
```

Vị trí bên trái dấu chấm có số mũ `0,1,2,...`; bên phải có số mũ `-1,-2,-3,...`.

Ví dụ theo C1:

```text
123.456₁₀
= 1×10² + 2×10¹ + 3×10⁰ + 4×10⁻¹ + 5×10⁻² + 6×10⁻³
```

Tương tự:

```text
110.011₂
= 1×2² + 1×2¹ + 0×2⁰ + 0×2⁻¹ + 1×2⁻² + 1×2⁻³
```

### 2.3. Công thức giá trị tổng quát

```text
N = Σ(aᵢ × rⁱ)
```

Đây không phải công thức chỉ để nhớ. Nó giải thích tại sao chuyển một số bất kỳ về thập phân chỉ cần nhân từng ký số với trọng số tương ứng rồi cộng lại.

---

## 3. Hệ nhị phân

### 3.1. Bit, MSB, LSB

- `bit` = binary digit.
- `LSB` = bit có trọng số nhỏ nhất, nằm ngoài cùng bên phải của phần nguyên.
- `MSB` = bit có trọng số lớn nhất, nằm ngoài cùng bên trái.

Số nhị phân `n` bit không dấu có `2^n` tổ hợp, từ:

```text
0 → 2^n - 1
```

Một nhận xét nhanh từ C1:

- LSB = 0 → số chẵn.
- LSB = 1 → số lẻ.

### 3.2. Đơn vị bit

Theo slide C1:

```text
1 Byte = 8 bit
1 kB = 2^10 B
1 MB = 2^20 B
1 GB = 2^30 B
1 TB = 2^40 B
```

---

## 4. Phép toán cơ bản trong các hệ đếm

### 4.1. Cộng nhị phân

Các trường hợp cơ sở:

```text
0 + 0 = 0
1 + 0 = 1
1 + 1 = 0, nhớ 1
```

Nguồn C1 minh họa cả số nguyên và số có phần lẻ. Điều cần hiểu là phép cộng vẫn đi theo từng cột trọng số; khi tổng vượt khả năng biểu diễn của một bit thì phát sinh carry sang cột kế tiếp.

### 4.2. Trừ nhị phân

```text
0 - 0 = 0
1 - 1 = 0
1 - 0 = 1
0 - 1 = 1, mượn 1 từ cột kế tiếp
```

### 4.3. Octal và Hex

Trong octal, khi tổng một cột lớn hơn 7 thì chia cho 8:

- số dư ghi tại cột hiện tại;
- thương nhớ sang cột kế tiếp.

Trong hex, nguyên tắc tương tự nhưng cơ số là 16.

---

## 5. Quan hệ giữa Binary, Octal và Hex

Một chữ số octal tương đương **3 bit** nhị phân.

Một chữ số hex tương đương **4 bit** nhị phân.

Đây là lý do đổi `binary ↔ octal/hex` không cần qua decimal.

### Worked Example — Binary → Octal

Nguồn C1 trang 24:

```text
110111.0111₂
```

Nhóm từ dấu chấm ra hai phía theo 3 bit:

```text
110 111 . 011 100
 6   7      3   4
```

Kết quả:

```text
110111.0111₂ = 67.34₈
```

### Worked Example — Binary → Hex

Nhóm 4 bit. Nếu nhóm đầu/cuối thiếu bit thì bổ sung `0` ở phía ngoài để đủ nhóm.

---

## 6. Các mã nhị phân trong C1

### 6.1. BCD

BCD dùng **4 bit cho từng chữ số thập phân**, không phải đổi cả số thập phân thành một số nhị phân duy nhất.

Ví dụ nguồn:

```text
9267₁₀
9 → 1001
2 → 0010
6 → 0110
7 → 0111

BCD = 1001 0010 0110 0111
```

**Bẫy:**

```text
25₁₀ ở binary ≠ 25₁₀ ở BCD
```

BCD của 25 là:

```text
0010 0101
```

### 6.2. Excess-3

Theo C1, với từng chữ số thập phân:

```text
Excess-3 = giá trị BCD + 3
```

### 6.3. Gray

Đặc trưng của Gray:

```text
hai tổ hợp mã liên tiếp chỉ khác nhau đúng 1 bit
```

C1 có bảng so sánh decimal với BCD, Excess-3, Gray, Gray dư 3, Johnson và mã vòng.

### 6.4. Johnson và mã vòng

C1 giới thiệu:

- **Johnson:** dùng 5 bit để biểu diễn 10 trạng thái; số bit `1` tăng dần rồi giảm dần.
- **Mã vòng:** dùng 10 bit cho 10 trạng thái; mỗi từ mã có một bit `1` chạy vòng.

Phần này cần nhận biết bản chất; thiết kế counter Johnson/ring sẽ gặp lại ở phần tuần tự.

---

## 7. Chuyển đổi từ Decimal sang cơ số khác

### 7.1. Phần nguyên

Quy tắc từ C1:

1. chia liên tiếp phần nguyên cho cơ số đích;
2. ghi lại số dư;
3. dừng khi thương bằng 0;
4. đọc số dư **từ dưới lên**.

### Worked Example — `35₁₀ → octal`

```text
35 / 8 = 4 dư 3
 4 / 8 = 0 dư 4
```

Đọc ngược:

```text
35₁₀ = 43₈
```

### 7.2. Phần thập phân

1. nhân phần phân số với cơ số đích;
2. lấy phần nguyên của kết quả theo đúng thứ tự;
3. tiếp tục với phần phân số còn lại.

Ví dụ nguồn C1:

```text
0.375 × 8 = 3.0 → lấy 3
0.0   × 8 = 0   → kết thúc
```

Slide ghi kết quả `0.30₈`; về mặt thao tác, chữ số có ý nghĩa đầu tiên là `3`.

---

## 8. Chuyển từ cơ số bất kỳ về Decimal

Dùng trực tiếp trọng số.

### Ví dụ nguồn

```text
10110₂
= 1×2⁴ + 0×2³ + 1×2² + 1×2¹ + 0×2⁰
= 22₁₀
```

```text
215₈
= 2×8² + 1×8¹ + 5×8⁰
= 141₁₀
```

```text
76A₁₆
= 7×16² + 6×16¹ + 10×16⁰
= 1898₁₀
```

---

## 9. Số nhị phân có dấu

C1 trình bày ba cách:

1. bit dấu;
2. bù 1;
3. bù 2.

### 9.1. Bit dấu

- `0` → dương.
- `1` → âm.

Ví dụ nguồn:

```text
+13 → 0 1101
-13 → 1 1101
```

### 9.2. Bù 1

- số dương giữ nguyên;
- số âm: đảo các bit của biểu diễn dương trong cùng độ rộng.

Ví dụ C1 với 9:

```text
+9 → 0.0001001
-9 → 1.1110110   (bù 1)
```

### 9.3. Bù 2

```text
bù 2 = bù 1 + 1
```

Ví dụ nguồn:

```text
+9 → 0.0001001
-9 → 1.1110111   (bù 2)
```

C1 nhấn mạnh bù 2 là phương pháp phổ biến nhất trong ba cách.

---

## 10. Cộng/trừ với bù 1

### 10.1. Quy trình cộng

1. biểu diễn cả hai toán hạng theo bù 1 cùng độ rộng;
2. cộng nhị phân bình thường;
3. nếu có carry ngoài cùng, **đưa carry đó quay lại cộng vào LSB**.

### Worked Example — `-5 + -7`, 8 bit

Nguồn C1 trang 29:

- đổi `-5`, `-7` sang bù 1;
- cộng;
- xuất hiện bit tràn;
- cộng bit tràn trở lại kết quả;
- thu được biểu diễn bù 1 của `-12`.

Điểm cần nhớ ở đây không phải đáp số `-12`, mà là quy tắc **end-around carry** của biểu diễn bù 1.

### 10.2. Phép trừ

Để tính:

```text
A - B
```

lấy bù 1 của `B`, sau đó thực hiện như phép cộng bù 1.

---

## 11. Cộng/trừ với bù 2

### 11.1. Quy trình cộng

1. biểu diễn cả hai toán hạng theo bù 2 trong cùng độ rộng;
2. cộng nhị phân bình thường;
3. carry vượt ngoài độ rộng từ **bỏ đi**.

### Worked Example — `+11 + -7`, 8 bit

Nguồn C1:

```text
+11 = 00001011
-7  = 11111001
----------------
     1 00000100
```

Bỏ carry ngoài 8 bit:

```text
00000100 = +4
```

### Worked Example — `-11 + +7`

Nguồn cho kết quả biểu diễn bù 2 của `-4`.

### 11.2. Phép trừ

```text
A - B = A + (bù 2 của B)
```

---

## 12. Bẫy phải tránh — Lesson 01

1. **BCD không phải binary thông thường.**
2. Khi đổi phần lẻ decimal, phải **nhân**, không chia.
3. Binary → octal nhóm 3 bit; binary → hex nhóm 4 bit.
4. Bù 1 và bù 2 không dùng cùng quy tắc xử lý carry.
5. Khi làm số có dấu, phải cố định độ rộng bit trước khi đảo bit/lấy bù.
6. Không nhầm MSB nói chung với “bit dấu” trong mọi cách biểu diễn; bit dấu chỉ mang nghĩa dấu khi đang dùng một quy ước signed cụ thể.

---

## 13. Practice ladder — Lesson 01

### Level A

1. Viết trọng số của từng bit trong `10110.011₂`.
2. Đổi `101101₂` sang decimal.
3. Đổi `3A₁₆` sang decimal.
4. Mã hóa `572₁₀` theo BCD.

### Level B

1. Đổi `73₁₀` sang binary, octal và hex.
2. Đổi `0.625₁₀` sang binary.
3. Đổi `11010111.101₂` sang octal và hex bằng nhóm bit.
4. Viết `-18` theo bù 1 và bù 2 trong 8 bit.

### Level C

1. Thực hiện `+23 + (-9)` bằng bù 2, 8 bit.
2. Thực hiện `-12 + (-5)` bằng bù 1, 8 bit, xử lý end-around carry nếu có.
3. Giải thích bằng lời vì sao BCD của `25` khác binary của `25`.

---

## 14. Mastery check — Lesson 01

```text
□ Tôi giải thích được cơ số, trọng số và giá trị.
□ Tôi đổi được decimal ↔ binary/octal/hex.
□ Tôi xử lý được cả phần nguyên và phần phân số.
□ Tôi phân biệt được BCD, Excess-3 và Gray ở mức nền tảng.
□ Tôi biểu diễn được số âm bằng bit dấu, bù 1 và bù 2.
□ Tôi cộng/trừ được số bù 1 và bù 2 theo đúng quy tắc.
```
