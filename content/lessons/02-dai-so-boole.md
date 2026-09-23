# LESSON 02 — ĐẠI SỐ BOOLE VÀ CỔNG LOGIC

**Slug:** `dai-so-boole`  
**Nguồn chính:** C2, trang 3–19 và 26–28, 44–64.

## 1. Vai trò của đại số Boole

Boolean là cầu nối giữa:

```text
mức logic 0/1
↔ biểu thức toán
↔ cổng logic
↔ mạch thực
```

Một hàm Boolean chỉ nhận và cho ra các giá trị logic `0` hoặc `1`.

Ba phép toán nền tảng:

```text
AND: A·B
OR : A+B
NOT: ¬A
```

---

## 2. Bảng chân trị ba phép cơ bản

### AND

| A | B | A·B |
|---:|---:|---:|
| 0 | 0 | 0 |
| 0 | 1 | 0 |
| 1 | 0 | 0 |
| 1 | 1 | 1 |

### OR

| A | B | A+B |
|---:|---:|---:|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 1 |

### NOT

| A | ¬A |
|---:|---:|
| 0 | 1 |
| 1 | 0 |

---

## 3. Các định lý và định luật cơ bản

### 3.1. Đồng nhất

```text
A·1 = A
A+0 = A
```

### 3.2. Phần tử 0/1

```text
A·0 = 0
A+1 = 1
```

### 3.3. Bù

```text
A·¬A = 0
A+¬A = 1
```

### 3.4. Bất biến

```text
A·A = A
A+A = A
```

### 3.5. Hấp thụ

```text
A + A·B = A
A(A+B) = A
```

### 3.6. Hoàn nguyên

```text
¬(¬A) = A
```

### 3.7. DeMorgan

```text
¬(A·B·C...) = ¬A + ¬B + ¬C + ...
¬(A+B+C+...) = ¬A·¬B·¬C·...
```

### 3.8. Hoán vị, kết hợp, phân phối

```text
A·B = B·A
A+B = B+A

A(BC) = (AB)C
A+(B+C) = (A+B)+C

A(B+C) = AB+AC
(A+B)(A+C) = A+BC
```

---

## 4. Ba quy tắc biến đổi trong C2

### 4.1. Quy tắc thay thế

Nếu một đẳng thức Boolean đúng, có thể thay một biến trong đó bằng một hàm Boolean và đẳng thức vẫn giữ tính đúng.

Nguồn C2 dùng DeMorgan làm ví dụ để cho thấy quy tắc này cho phép mở rộng định lý từ biến đơn sang biểu thức.

### 4.2. Quy tắc tìm đảo của hàm

Theo C2, khi tìm hàm đảo:

- đổi AND ↔ OR;
- đổi 0 ↔ 1;
- đổi biến thường ↔ biến đảo;
- xử lý dấu đảo của biểu thức theo DeMorgan.

### 4.3. Quy tắc đối ngẫu

Đối ngẫu **không phải cùng khái niệm với phủ định**.

Khi lập biểu thức đối ngẫu theo quy tắc của C2:

- đổi `·` ↔ `+`;
- đổi `0` ↔ `1`;
- không tự động đảo biến chỉ vì đang lấy đối ngẫu.

---

## 5. Thứ tự ưu tiên

Theo C2:

```text
( )
→ NOT
→ AND
→ OR
```

Khi biểu thức phức tạp, luôn thêm ngoặc nếu có khả năng gây nhập nhằng.

---

## 6. Tối giản bằng đại số

C2 không chỉ yêu cầu nhớ luật mà dùng chúng để giảm số hạng.

### Worked Example — dạng rút gọn trực tiếp

Nếu có:

```text
Y = A·B·C + A·B·¬C
```

đặt nhân tử chung `A·B`:

```text
Y = A·B(C+¬C)
  = A·B·1
  = A·B
```

Điểm cần học: nhận ra **hai số hạng chỉ khác đúng một biến** và sử dụng quan hệ `C+¬C=1`.

### Tư duy khi tối giản đại số

1. tìm nhân tử chung;
2. tìm cặp biến bù nhau;
3. dùng hấp thụ;
4. dùng DeMorgan nếu cần đổi dạng;
5. kiểm tra xem số hạng nào trở nên thừa.

---

## 7. Từ biểu thức đến cổng logic

### Cổng cơ bản

- AND thực hiện phép nhân logic.
- OR thực hiện phép cộng logic.
- NOT đảo logic.

### Cổng ghép

- NAND = NOT(AND).
- NOR = NOT(OR).
- BUFFER giữ nguyên trạng thái logic.
- XOR = 1 khi hai đầu vào khác nhau.
- XNOR = 1 khi hai đầu vào giống nhau.

### XOR

```text
A ⊕ B = ¬A·B + A·¬B
```

Một số tính chất C2 nhấn mạnh:

```text
A⊕B = B⊕A
(A⊕B)⊕C = A⊕(B⊕C)
```

---

## 8. NAND và NOR là cổng đa chức năng

C2 dành nhiều slide cho việc xây cấu trúc **toàn NAND** và **toàn NOR**.

Ý tưởng:

- dùng DeMorgan để biến dạng biểu thức;
- thay các khối AND/OR/NOT bằng tổ hợp chỉ một loại cổng.

Người học không chỉ cần nhớ “NAND/NOR là universal gate”, mà phải làm được ít nhất một bài biến đổi biểu thức thành mạng NAND-only hoặc NOR-only.

---

## 9. Bẫy — Lesson 02

1. `+` trong Boolean là OR, không phải cộng số học thông thường.
2. `A+A = A`, không phải `2A`.
3. Đối ngẫu không đồng nghĩa với phủ định.
4. DeMorgan phải đổi cả phép toán và trạng thái phủ định của các toán hạng.
5. XOR khác OR.
6. Không kết luận hai biểu thức tương đương chỉ vì “trông giống”; có thể kiểm chứng bằng truth table.

---

## 10. Practice ladder — Lesson 02

### Level A

1. Lập truth table cho `Y=A+B`.
2. Lập truth table cho `Y=A⊕B`.
3. Tính `¬(A+B)` bằng DeMorgan.

### Level B

1. Rút gọn `AB+AB̅`.
2. Rút gọn `A+AB`.
3. Chuyển một biểu thức AND-OR đơn giản sang dạng NAND-only.

### Level C

1. Cho hai biểu thức khác hình thức, chứng minh chúng tương đương bằng truth table.
2. Từ yêu cầu bằng lời, viết một hàm Boolean rồi vẽ mạng cổng cơ bản.

---

## 11. Mastery check — Lesson 02

```text
□ Tôi dùng đúng các định luật Boolean.
□ Tôi phân biệt phủ định và đối ngẫu.
□ Tôi rút gọn được biểu thức bằng đại số.
□ Tôi đọc được biểu thức thành mạng cổng.
□ Tôi giải thích được vì sao NAND/NOR có thể tạo các cổng khác.
```
