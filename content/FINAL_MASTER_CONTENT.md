# FINAL MASTER CONTENT — THIẾT KẾ LOGIC SỐ & VERILOG HDL

> **Trạng thái:** Bản canonical master đã hợp nhất toàn bộ 11 lesson của app.  
> **Nguồn:** C1–C4 Điện tử số (297 trang) + Lecture 1–6 Thiết kế logic số (139 trang) + Hướng dẫn ISE Xilinx 14.7 (10 trang) = **446 trang nguồn**.  
> **Mục tiêu:** phục hồi đường học đầy đủ cho người lâu không sử dụng, ưu tiên hiểu bản chất → làm từng bước → thiết kế → mô tả HDL → kiểm chứng; không biến bài học thành cheat-sheet.

---

# 0. CÁCH HỌC TOÀN MÔN

Toàn bộ 11 lesson là một chuỗi phụ thuộc, không phải 11 bài rời nhau:

```text
01 Hệ đếm & biểu diễn thông tin
        ↓
02 Đại số Boole & cổng logic
        ↓
03 SOP/POS, minterm/maxterm, Karnaugh
        ↓
04 Mạch tổ hợp: encoder/decoder/MUX/DEMUX
        ↓
05 Mạch số học, comparator, parity
        ↓
06 Mạch tuần tự & Flip-Flop
        ↓
07 Counter & Shift Register
        ↓
08 Quy trình HDL & Verilog cơ bản
        ↓
09 Mô tả hành vi trong Verilog
        ↓
10 FSM bằng Verilog
        ↓
11 ISE Xilinx 14.7: DUT → testbench → waveform
```

Chuỗi năng lực xuyên suốt:

```text
Yêu cầu
→ biểu diễn dữ liệu
→ truth/state table
→ Boolean/K-map
→ cấu trúc mạch
→ Verilog/RTL
→ testbench
→ waveform
→ đối chiếu lại yêu cầu
```

Quy tắc học của master content:

1. Không bỏ qua bước trung gian chỉ để nội dung ngắn hơn.
2. Công thức phải gắn với trực giác, bảng/sơ đồ và worked example.
3. Code Verilog phải được đọc ngược thành phần cứng hoặc vai trò kiểm chứng.
4. Trap đặt gần khái niệm dễ sai; trang trap/flashcard/quiz chỉ là lớp ôn lại.
5. Nội dung nguồn chưa hỗ trợ đủ phải được ghi rõ ranh giới, không tự lấp bằng kiến thức ngoài giáo trình.
6. Một lesson chỉ coi là hoàn thành khi đạt `Mastery check`, không phải khi cuộn hết trang.

---

# PHẦN I — ĐIỆN TỬ SỐ: C1–C4

**Nguồn chính:** `C1- He diem`, `C2-Ham Boole va cong Logic`, `C3-Mach Logic to hop`, `C4-Mach Logic tuan tu` — tổng 297 trang.

Phần I xây nền từ bit và biểu diễn số đến Boolean, mạch tổ hợp, mạch tuần tự, bộ đếm và thanh ghi. Đây là phần phải chắc trước khi coi Verilog là một công cụ mô tả phần cứng thay vì chỉ là cú pháp.

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

---

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

---

# LESSON 03 — SOP, POS, MINTERM, MAXTERM VÀ KARNAUGH

**Slug:** `karnaugh`  
**Nguồn chính:** C2, trang 11–25 và 29–43.

## 1. Ba cách biểu diễn một hàm Boolean

C2 giới thiệu ba cách:

1. bảng trạng thái/truth table;
2. biểu thức đại số;
3. bìa Karnaugh.

Ba dạng này phải được nhìn như ba biểu diễn **cùng một hàm**, không phải ba bài khác nhau.

---

## 2. Truth table

Hàm `n` biến có:

```text
2^n tổ hợp đầu vào
```

và bảng có:

- `n` cột input;
- 1 hoặc nhiều cột output;
- `2^n` dòng tổ hợp nếu hàm được định nghĩa đầy đủ.

---

## 3. Minterm và SOP

Minterm là tích chứa đủ các biến.

Quy ước theo C2:

- bit `0` → biến đảo;
- bit `1` → biến thường.

Ví dụ `A B C = 1 0 1`:

```text
m5 = A·¬B·C
```

Dạng chuẩn SOP lấy các minterm tại những dòng `F=1`:

```text
F = Σm(...)
```

---

## 4. Maxterm và POS

Maxterm là tổng chứa đủ biến.

Quy ước:

- bit `0` → biến thường;
- bit `1` → biến đảo.

Dạng chuẩn POS lấy các maxterm tại những dòng `F=0`:

```text
F = ΠM(...)
```

---

## 5. Don't-care

Một số tổ hợp input có thể không được sử dụng. C2 ký hiệu chúng bằng `X`/don't-care.

Khi tối giản:

- có thể coi `X` là 1 nếu giúp tạo nhóm lớn hơn trong SOP;
- có thể coi `X` là 0 nếu giúp tạo nhóm lớn hơn trong POS;
- không bắt buộc phải sử dụng mọi `X`.

---

## 6. Vì sao K-map dùng thứ tự Gray?

Các ô kề nhau phải chỉ khác **một biến**. Vì vậy hàng/cột được sắp theo Gray:

```text
00, 01, 11, 10
```

Không được sắp:

```text
00, 01, 10, 11
```

nếu điều đó làm mất quan hệ một-bit-khác-nhau giữa các ô kề.

---

## 7. K-map 2, 3, 4 và 5 biến trong nguồn

C2 minh họa:

- 2 biến;
- 3 biến;
- 4 biến;
- 5 biến.

Phần thực hành cốt lõi của app nên tập trung 2–4 biến. Bìa 5 biến giữ như phần nhận biết/nguồn tham khảo.

---

## 8. Quy tắc nhóm

Theo C2:

- nhóm số ô là lũy thừa của 2;
- nhóm 2 ô loại 1 biến;
- nhóm 4 ô loại 2 biến;
- nhóm 8 ô loại 3 biến;
- nhóm càng lớn càng tốt;
- mỗi ô cần được phủ ít nhất một lần;
- một ô có thể tham gia nhiều nhóm nếu có lợi;
- mép đối diện được xem là kề nhau.

### SOP

Nhóm các ô `1`.

### POS

Nhóm các ô `0`.

---

## 9. Quy trình rút gọn K-map

C2 đưa ra ba bước:

```text
B1. Đưa hàm lên K-map.
B2. Khoanh các nhóm ô kề theo quy tắc.
B3. Viết biểu thức từ các nhóm và kết hợp lại.
```

Để tự học chắc hơn, khi thực hiện B2 cần tự hỏi:

1. nhóm lớn nhất có thể tạo là bao nhiêu ô?
2. có nhóm qua biên không?
3. có ô nào chỉ có một cách nhóm lớn hợp lệ không?
4. có cần nhóm chồng không?
5. don't-care có giúp tăng kích thước nhóm không?

---

## 10. Worked Example nguồn — `F(A,B,C)=Σ(0,1,3,4,5)`

Nguồn C2 trang 39–40 giải cả SOP và POS.

Cách học bài này:

1. dựng K-map 3 biến;
2. đánh `1` ở các minterm `0,1,3,4,5`;
3. với SOP, nhóm các `1` thành nhóm lớn nhất;
4. viết tích tương ứng cho từng nhóm;
5. với POS, nhìn các ô `0` còn lại và nhóm theo quy tắc POS;
6. đối chiếu hai biểu thức bằng truth table nếu cần.

Mục tiêu của worked example là nhìn thấy **cùng một hàm có thể rút theo SOP hoặc POS**.

---

## 11. Worked Example nguồn — K-map có don't-care

Nguồn C2:

```text
F(A,B,C,D)
= Σ(0,1,2,3,6,8)
+ Σd(10,11,12,13,14,15)
```

Tư duy:

1. đánh `1` cho các minterm thực;
2. đánh `X` cho don't-care;
3. thử coi các `X` như `1` ở những vị trí giúp tạo nhóm lớn;
4. không cần buộc dùng tất cả `X`;
5. mục tiêu là biểu thức tối giản nhưng vẫn đúng trên tất cả tổ hợp **được định nghĩa**.

---

## 12. Bẫy — Lesson 03

1. SOP nhóm `1`; POS nhóm `0`.
2. Gray order là điều kiện cấu trúc, không phải trang trí.
3. Ô ở hai mép đối diện có thể kề nhau.
4. Không nhóm 3, 5, 6, 7 ô.
5. Nhóm nhỏ trước khi nhìn nhóm lớn thường dẫn tới kết quả không tối giản.
6. Don't-care không phải input “luôn bằng X” trong phần cứng; nó là tổ hợp không quan trọng đối với đặc tả đang xét.

---

## 13. Practice ladder — Lesson 03

### Level A

1. Viết `m0…m7` của hàm 3 biến.
2. Viết `M0…M7` của hàm 3 biến.
3. Chuyển một truth table thành `Σm` và `ΠM`.

### Level B

1. Rút K-map 3 biến theo SOP.
2. Rút cùng hàm đó theo POS.
3. Rút K-map 4 biến có nhóm qua biên.

### Level C

1. Rút hàm 4 biến có don't-care.
2. Từ biểu thức tối giản, vẽ mạng cổng.
3. Kiểm chứng biểu thức rút gọn bằng truth table.

---

## 14. Mastery check — Lesson 03

```text
□ Tôi chuyển được truth table ↔ SOP/POS.
□ Tôi viết đúng minterm và maxterm.
□ Tôi đặt đúng thứ tự Gray trên K-map.
□ Tôi nhóm được 2/4/8 ô, kể cả qua biên.
□ Tôi biết dùng don't-care khi có lợi.
□ Tôi giải thích được vì sao một biến bị loại khi nhóm các ô kề.
```

---

# LESSON 04 — MẠCH LOGIC TỔ HỢP, ENCODER/DECODER, MUX/DEMUX

**Slug:** `mach-to-hop`  
**Nguồn chính:** C3, trang 3–80.

## 1. Mạch tổ hợp là gì?

C3 chia hệ logic thành:

- hệ tổ hợp;
- hệ dãy/tuần tự.

Mạch tổ hợp:

```text
Output hiện tại = f(Input hiện tại)
```

Nó không có trạng thái nhớ nội bộ theo nghĩa của mạch tuần tự.

---

## 2. Phân tích và thiết kế là hai chiều ngược nhau

### Phân tích

```text
Mạch có sẵn
→ biểu thức/bảng trạng thái
→ hiểu quan hệ vào-ra
→ rút gọn
→ mạch tối ưu
```

### Thiết kế

Nguồn C3 nêu 5 bước:

```text
1. Từ yêu cầu xác định input/output, vẽ sơ đồ khối.
2. Lập bảng trạng thái.
3. Viết hàm output theo SOP hoặc POS.
4. Rút gọn hàm.
5. Vẽ mạch thực hiện.
```

Đây là quy trình xương sống của cả chapter.

---

## 3. Worked Example — bài toán 3 input, 2 output

C3 cho ví dụ:

- 3 input `A,B,C`, A là MSB;
- output thứ nhất = 1 khi số bit `1` nhiều hơn số bit `0`;
- output thứ hai = 1 khi giá trị thập phân của input lớn hơn 1 và nhỏ hơn 6.

Cách giải cần giữ đủ:

1. định nghĩa ý nghĩa A/B/C;
2. liệt kê 8 tổ hợp input;
3. tính từng output theo yêu cầu bằng lời;
4. viết hàm SOP/POS;
5. rút gọn;
6. vẽ mạch.

Không rút ví dụ này xuống thành mỗi “quy trình 5 bước”.

---

## 4. Encoder

Encoder biến một trong nhiều đường input thành mã nhị phân ở output.

Dạng khái quát:

```text
2^n input → n output bit
```

Encoder cơ bản thường giả thiết một input hoạt động tại một thời điểm.

### Decimal → BCD encoder

C3 trình bày bộ mã hóa decimal sang BCD 8421.

Nếu input đại diện chữ số `6`, output BCD phải là:

```text
0110
```

### Priority Encoder

Nếu nhiều input có thể cùng tác động, encoder thường không còn xác định duy nhất. Priority encoder giải quyết bằng cách định nghĩa mức ưu tiên.

C3 có cả ví dụ encoder ưu tiên decimal→BCD và IC encoder ưu tiên.

---

## 5. Decoder

Decoder làm chiều ngược về ý tưởng:

```text
n input → tối đa 2^n output
```

C3 phân biệt:

- output active-high;
- output active-low;
- decoder có input enable.

### Active-high vs active-low

- active-high: đường được chọn có mức `1`.
- active-low: đường được chọn có mức `0`.

Đây là một trong các bẫy lớn khi đọc IC và LED 7 đoạn.

---

## 6. BCD → 7-segment

C3 có hẳn phần decoder 7 đoạn và bài thiết kế BCD→7 đoạn.

Khi học phần này cần nối được ba lớp:

```text
BCD input
→ pattern a,b,c,d,e,f,g
→ loại LED (common anode/common cathode)
```

Không chỉ học thuộc một bảng segment.

---

## 7. Bộ biến mã Binary ↔ Gray

C3 tiếp tục dùng logic tổ hợp để xây bộ biến mã.

Với 3 bit, quan hệ thường được trình bày theo chuỗi XOR giữa các bit kề. Khi tích hợp app, giữ bảng chuyển đổi từ nguồn và cho người học tự suy ra phương trình trước khi xem đáp án.

---

## 8. Multiplexer — MUX

MUX chọn **một** trong nhiều input dữ liệu đưa ra một output.

```text
2^n data input
n select input
1 output
```

### MUX 2:1

```text
Y = ¬S·D0 + S·D1
```

### MUX 4:1

Hai select bit chọn một trong `D0…D3`.

---

## 9. Demultiplexer — DEMUX

DEMUX phân một input dữ liệu tới một trong nhiều output theo select.

```text
1 data input
n select input
2^n output
```

MUX và DEMUX phải học bằng sơ đồ đường dữ liệu, không chỉ bằng định nghĩa “nhiều vào một ra / một vào nhiều ra”.

---

## 10. MUX như một công cụ thực hiện hàm Boolean

Đây là phần quan trọng bị lược nhiều trong bản cũ.

### Trường hợp 1 — MUX `2^n:1` thực hiện hàm n biến

- nối các biến vào select;
- đưa giá trị `0/1` của hàm ở từng tổ hợp vào `D0…D(2^n-1)`.

### Trường hợp 2 — MUX nhỏ hơn thực hiện hàm nhiều hơn một biến

Nguồn C3 có ví dụ:

```text
F(C,B,A)=Σ(0,1,4,7)
```

thực hiện bằng MUX 4:1 và NOT.

Tư duy nguồn:

1. chọn `C,B` làm select;
2. chia truth table thành bốn cặp theo `CB`;
3. xét F như hàm của biến còn lại `A` trong từng cặp;
4. suy ra các data input dạng `0`, `1`, `A`, hoặc `¬A`;
5. nối mạch.

Đây là ví dụ bắt buộc vì nó biến MUX từ “thiết bị chọn kênh” thành **khối logic lập trình được bằng wiring**.

---

## 11. Bẫy — Lesson 04

1. Encoder và decoder không phải cùng một chiều biến đổi.
2. Encoder thường cần điều kiện “một input active”; nếu không, phải xét priority.
3. Active-low làm đảo trực giác “được chọn = 1”.
4. MUX select không phải data input.
5. DEMUX không phải decoder, dù sơ đồ khối có thể nhìn tương tự.
6. Khi dùng MUX để thực hiện hàm, phải nhất quán thứ tự MSB/LSB ở select.

---

## 12. Practice ladder — Lesson 04

### Level A

1. MUX 8:1 cần bao nhiêu select bit?
2. Decoder 3→8 có bao nhiêu output?
3. Phân biệt active-high và active-low.

### Level B

1. Viết phương trình MUX 4:1.
2. Lập truth table decoder 2→4.
3. Từ BCD, xác định segment cần sáng cho một chữ số.

### Level C

1. Thiết kế một mạch tổ hợp từ đặc tả bằng lời theo đủ 5 bước.
2. Thực hiện hàm 3 biến bằng MUX 8:1.
3. Thực hiện hàm 3 biến bằng MUX 4:1 với một biến còn lại đi vào data input.

---

## 13. Mastery check — Lesson 04

```text
□ Tôi phân tích và thiết kế được mạch tổ hợp theo quy trình 5 bước.
□ Tôi phân biệt encoder, priority encoder và decoder.
□ Tôi đọc được active-high/active-low.
□ Tôi hiểu BCD→7-segment là một bài decoder cụ thể.
□ Tôi dùng được MUX/DEMUX.
□ Tôi thực hiện được một hàm Boolean bằng MUX.
```

---

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

---

# LESSON 06 — MẠCH TUẦN TỰ VÀ FLIP-FLOP

**Slug:** `mach-tuan-tu`  
**Nguồn chính:** C4, trang 3–61.

## 1. Tại sao mạch tuần tự khác mạch tổ hợp?

Mạch tổ hợp:

```text
Y = f(X hiện tại)
```

Mạch tuần tự còn có **trạng thái trong**.

Nguồn C4 mô tả ba phần:

```text
Next-state combinational logic
→ State memory
→ Output combinational logic
```

Vì vậy một output có thể phụ thuộc không chỉ input hiện tại mà cả lịch sử đã được nén vào state.

---

## 2. Đồng bộ và không đồng bộ

C4 phân loại theo tác động clock:

- **đồng bộ:** các phần tử trạng thái chịu tác động clock đồng thời;
- **không đồng bộ:** không phải các phần tử cùng thay đổi theo một clock chung tại cùng thời điểm.

Khái niệm này sẽ quay lại rất rõ ở ripple counter và synchronous counter.

---

## 3. Mô hình FSM — Mealy và Moore

### Mealy

```text
Next State = Fs(State, Input)
Output     = Fy(State, Input)
```

### Moore

```text
Next State = Fs(State, Input)
Output     = Fy(State)
```

Điểm khác cốt lõi nằm ở **hàm output**.

---

## 4. Các cách mô tả state

C4 dùng:

1. bảng chuyển trạng thái;
2. bảng output;
3. bảng state/output gộp;
4. state diagram.

### Mealy diagram

- node: state;
- edge: `input/output`.

### Moore diagram

- node: `state/output`;
- edge: input.

---

## 5. Worked Example — bộ cộng nhị phân liên tiếp

C4 dùng serial binary adder để minh họa cả Mealy và Moore.

Điểm quan trọng:

- state biểu diễn thông tin “có nhớ/carry hay không”;
- cùng input hiện tại nhưng output có thể khác nếu state khác;
- đây là ví dụ trực tiếp cho câu “mạch tuần tự có nhớ”.

Khi đưa vào app, nên trình bày theo bốn bước:

```text
1. Xác định Input set X.
2. Xác định State set S.
3. Lập next-state function Fs.
4. Lập output function Fy và vẽ state diagram.
```

---

## 6. Latch và Flip-Flop

C4 đi từ latch tới FF, không nên bỏ qua bước này.

### Latch

Mạch có khả năng cài và giữ trạng thái.

### Flip-Flop

Nguồn mô tả ý tưởng:

```text
Latch + clock → Flip-Flop
```

FF là phần tử nhớ một bit và thay đổi trạng thái theo điều kiện kích hoạt xác định.

---

## 7. Các kiểu kích hoạt clock trong C4

Nguồn có ba nhóm minh họa:

- theo mức;
- theo cạnh/sườn;
- theo xung.

Trong edge-triggered:

- cạnh lên: `0→1`;
- cạnh xuống: `1→0`.

Cần đọc ký hiệu clock trên symbol để biết FF tác động ở cạnh nào.

---

## 8. RS latch

C4 trình bày hai loại:

### 8.1. RS active-high bằng NOR

- `R=S=0` → giữ;
- `S=1` → set;
- `R=1` → reset;
- trạng thái hai input cùng active là trạng thái cấm.

### 8.2. RS active-low bằng NAND

Logic kích hoạt đảo lại vì input active ở mức 0.

Bẫy: không bê nguyên bảng của NOR latch sang NAND latch mà quên đổi active level.

---

## 9. FF-RS

Nguồn C4 cho characteristic equation:

```text
Q⁺ = S + ¬R·Q
```

với điều kiện tránh trạng thái cấm của RS.

Bảng hành vi cốt lõi:

| S | R | Q⁺ |
|---:|---:|---|
| 0 | 0 | Q |
| 0 | 1 | 0 |
| 1 | 0 | 1 |
| 1 | 1 | X/cấm |

---

## 10. FF-JK

JK bổ sung trường hợp `J=K=1` thành **toggle**, tránh trạng thái cấm kiểu RS.

```text
Q⁺ = J·¬Q + ¬K·Q
```

| J | K | Hành vi |
|---:|---:|---|
| 0 | 0 | giữ |
| 0 | 1 | reset |
| 1 | 0 | set |
| 1 | 1 | toggle |

---

## 11. FF-T

T có một input.

```text
T=0 → giữ
T=1 → toggle
```

Characteristic equation:

```text
Q⁺ = T⊕Q
```

T rất tự nhiên cho counter vì “có cần lật bit ở clock này hay không” được mã hóa trực tiếp bằng T.

---

## 12. FF-D

D cũng chỉ có một input.

```text
Q⁺ = D
```

Ý nghĩa: ở cạnh clock hoạt động, giá trị D được chốt thành state mới.

Đây là FF trực quan nhất khi xây state register.

---

## 13. PRE và CLR

C4 mô tả PRE/CLR là các input trực tiếp/không đồng bộ có ưu tiên cao.

- PRE đặt Q về 1.
- CLR đặt Q về 0.

Cần xác định chúng active-high hay active-low từ symbol/datasheet.

Nguồn nhấn mạnh:

- không kích đồng thời PRE và CLR ở trạng thái cấm;
- khi không sử dụng phải đặt chúng ở mức không active.

---

## 14. Characteristic table và excitation table

Hai bảng trả lời hai câu hỏi khác nhau.

### Characteristic

> Biết input FF và Q hiện tại → Q kế tiếp là gì?

### Excitation

> Muốn Q hiện tại chuyển thành Q kế tiếp → input FF phải là gì?

C4 cho bảng excitation:

| Qn→Qn+1 | RS | JK | D | T |
|---|---|---|---:|---:|
| 0→0 | X0 | 0X | 0 | 0 |
| 0→1 | 01 | 1X | 1 | 1 |
| 1→0 | 10 | X1 | 0 | 1 |
| 1→1 | 0X | X0 | 1 | 0 |

**Lưu ý:** C4 trình bày cặp RS theo thứ tự `R,S` ở một số bảng/slide. Khi đưa vào app phải ghi rõ thứ tự cột ngay trên bảng để tránh đảo nghĩa.

---

## 15. Chuyển đổi giữa các FF

C4 nêu hai phương pháp:

1. dùng characteristic equation;
2. dùng excitation table.

Nguồn có worked example chuyển **RS → JK**:

1. lập bảng tương quan chuyển trạng thái;
2. coi `Qn,J,K` là biến;
3. coi `S,R` là hàm cần tìm;
4. đưa S và R lên K-map;
5. rút gọn;
6. vẽ mạch ghép phía trước FF-RS để nó hành xử như JK.

Đây là một bài tổng hợp quan trọng vì nối:

```text
FF + excitation table + K-map + combinational logic
```

---

## 16. Bẫy — Lesson 06

1. Latch và edge-triggered FF không giống nhau.
2. Active-low làm đảo điều kiện kích hoạt.
3. Characteristic table khác excitation table.
4. `Q⁺` là state kế tiếp, không phải phủ định Q.
5. RS có trạng thái cấm; JK dùng toggle để xử lý trường hợp tương ứng.
6. PRE/CLR có thể bỏ qua clock khi active.
7. Moore/Mealy khác nhau ở output dependence, không phải chỉ ở cách vẽ sơ đồ.

---

## 17. Practice ladder — Lesson 06

### Level A

1. Điền bảng hành vi RS/JK/T/D.
2. Cho T và Q, tính Q⁺.
3. Cho D, tính Q⁺.

### Level B

1. Từ một chuỗi input, đọc waveform của D-FF cạnh lên.
2. Điền excitation input để đạt các chuyển `0→1`, `1→0`, v.v.
3. Chuyển một state table nhỏ thành Mealy/Moore diagram.

### Level C

1. Chuyển một loại FF sang loại khác bằng excitation + K-map.
2. Từ yêu cầu FSM nhỏ, xác định state, next-state và output.

---

## 18. Mastery check — Lesson 06

```text
□ Tôi giải thích được vì sao mạch tuần tự có state.
□ Tôi phân biệt Moore và Mealy.
□ Tôi đọc được state table và state diagram.
□ Tôi phân biệt latch và FF.
□ Tôi hiểu RS/JK/T/D cả characteristic lẫn excitation.
□ Tôi hiểu PRE/CLR và active-high/active-low.
□ Tôi thực hiện được bài chuyển đổi FF bằng bảng kích + K-map.
```

---

# LESSON 07 — COUNTER VÀ SHIFT REGISTER

**Slug:** `counter-register`  
**Nguồn chính:** C4, trang 62–100.

## 1. Counter là gì?

C4 định nghĩa counter là mạch tuần tự dùng để đếm xung clock.

Ngoài ý nghĩa “đếm số xung”, counter còn có tác dụng chia tần.

### Modulo M

`M` là số trạng thái khác nhau trong vòng đếm.

Với `n` FF:

```text
M ≤ 2^n
```

Để chọn số FF cho Mod-M:

```text
2^(n-1) < M ≤ 2^n
```

(tài liệu dùng dạng bất đẳng thức tương đương trong các ví dụ).

---

## 2. Ripple counter — bộ đếm bất đồng bộ

Đặc điểm:

- clock chỉ đi trực tiếp vào FF đầu;
- output FF trước làm clock cho FF sau;
- thay đổi lan truyền qua chuỗi.

C4 dùng FF T hoặc các FF khác được cấu hình để có chức năng toggle.

### Up counter M=2^n

Nguồn cho quy tắc kết nối khác nhau tùy FF tác động cạnh lên hay cạnh xuống.

Điểm quan trọng: không được chỉ học “Q nối vào clock sau”; phải xét **polarity của edge**.

### Down counter

Nguyên lý tương tự nhưng chọn Q hoặc Q̅ cho đường clock sao cho chuỗi trạng thái giảm.

### Up/Down counter

C4 dùng một tín hiệu điều khiển chiều đếm `C` và đưa ra quan hệ chọn giữa Q/Q̅ tùy chiều.

---

## 3. Counter Mod-M không phải lũy thừa 2

Ví dụ `M=5`:

```text
2² < 5 < 2³
→ cần 3 FF
```

C4 trình bày cách:

1. dựng counter có khả năng 3 bit;
2. xác định trạng thái cần reset;
3. dùng PRE/CLR để quay về trạng thái ban đầu.

### Worked Example nguồn — Mod-5 bằng FF T

Điều kiện:

- clock cạnh xuống;
- PRE/CLR active-high;
- đếm lên Mod-5;
- bắt đầu từ 0.

Nguồn xác định:

```text
CLR = Q2·Q0
```

để reset ở trạng thái tương ứng theo thiết kế của slide.

Điểm cần học là cách **giải mã trạng thái không mong muốn** để tạo tín hiệu reset.

---

## 4. Synchronous counter

Tất cả FF dùng chung clock.

Thiết kế tập trung vào:

```text
state hiện tại
→ state kế tiếp
→ excitation cần thiết
→ hàm input FF
```

### Quy trình theo C4

1. xác định số FF;
2. lập bảng state hiện tại/state kế;
3. dùng excitation table suy ra input FF;
4. tối giản các hàm input bằng K-map;
5. vẽ mạch.

---

## 5. Worked Example — chu trình tùy ý

Nguồn C4 dùng FF-T cho chu trình:

```text
00 → 10 → 01 → 00
```

Bảng nguồn:

| Q1Q0 hiện tại | Q1'Q0' kế | T1 | T0 |
|---|---|---:|---:|
| 00 | 10 | 1 | 0 |
| 01 | 00 | 0 | 1 |
| 10 | 01 | 1 | 1 |
| 11 | XX | X | X |

Sau đó đưa `T1`, `T0` lên K-map để tìm hàm kích và vẽ mạch.

Đây là worked example rất quan trọng vì cho thấy counter không nhất thiết phải đếm `0,1,2,3,...`.

---

## 6. Counter IC trong nguồn

C4 liệt kê nhiều IC counter đồng bộ và không đồng bộ như 74160–74193, 7490, 7492, 7493, v.v.

Trong app:

- giữ bảng này như **reference**, không bắt người học thuộc toàn bộ mã IC;
- dùng nó để minh họa rằng các chức năng up/down, preset, clear có thể được đóng gói trong IC thực.

---

## 7. Shift Register

C4 mô tả shift register là chuỗi FF D đồng bộ có khả năng:

```text
lưu dữ liệu
+ dịch dữ liệu theo clock
```

Mỗi FF lưu một bit. Khi nhiều FF nối chuỗi, ta lưu được một từ nhiều bit.

---

## 8. Dịch phải và dịch trái

### Dịch phải

Theo C4:

```text
D(i+1) = Q(i)
```

output tầng trước đi vào D của tầng sau.

### Dịch trái

```text
D(i) = Q(i+1)
```

Các FF dùng chung clock.

---

## 9. Worked Example — dịch dữ liệu `1001`

Nguồn C4 mô tả thanh ghi 4 bit:

1. clear các output về 0;
2. đưa dữ liệu nối tiếp vào FF đầu;
3. mỗi cạnh clock, một bit dịch sang tầng tiếp;
4. sau đủ số clock, cả từ dữ liệu nằm trong register;
5. nếu lấy nối tiếp ở FF cuối, cần tiếp tục clock để từng bit đi ra.

Nguồn còn đưa bảng trạng thái clock cho các bit `D1,D2,D3,D4` để thấy dữ liệu di chuyển qua Q1–Q4.

Đây là phần phải làm trực quan trong app, ví dụ bằng bảng từng clock hoặc animation nhẹ nếu UI hiện có hỗ trợ.

---

## 10. Phân loại register trong C4

Theo cách vào/ra:

| Loại | Input | Output |
|---|---|---|
| SISO | Serial | Serial |
| SIPO | Serial | Parallel |
| PISO | Parallel | Serial |
| PIPO | Parallel | Parallel |

Theo chiều dịch:

- shift-left;
- shift-right;
- bidirectional.

Theo số bit:

- 4 bit, 5 bit, 8 bit, 16 bit, ...

---

## 11. Parallel register và serial register

C4 có sơ đồ:

- bộ ghi dịch song song 4 bit;
- bộ ghi dịch nối tiếp 4 bit.

Cần giải thích bằng luồng dữ liệu:

### Parallel load

Một clock có thể nạp đồng thời nhiều bit vào các FF tương ứng.

### Serial load

Mỗi clock đưa thêm một bit vào chuỗi; cần nhiều clock để nạp hết từ.

---

## 12. Ứng dụng shift register theo C4

Nguồn liệt kê:

- tạo trễ;
- serial → parallel;
- parallel → serial;
- ring counter;
- twisted-ring/Johnson counter;
- bộ phát xung tuần tự.

Ở đợt này chỉ mô tả đúng mức C4. Phần thiết kế ring/Johnson chi tiết có thể bổ sung sau nếu có nguồn tiếp.

---

## 13. Ripple vs synchronous counter

| Đặc điểm | Ripple / async | Synchronous |
|---|---|---|
| Clock | lan từ FF trước sang FF sau | chung cho tất cả FF |
| Thiết kế | đơn giản hơn | cần logic excitation |
| Chuyển state | không đồng thời tuyệt đối | cùng cạnh clock |
| Chu trình tùy ý | khó hơn | thiết kế thuận lợi bằng state table |

Cần hiểu bảng này từ cấu trúc mạch, không học thuộc như so sánh lý thuyết.

---

## 14. Bẫy — Lesson 07

1. `M` là số trạng thái trong vòng đếm, không mặc định bằng `2^n`.
2. Ripple counter phải chú ý edge polarity.
3. Synchronous counter không nối clock nối tiếp qua Q từng FF.
4. Khi thiết kế custom counter, phải xử lý cả trạng thái không dùng (`X/don't-care`) có chủ ý.
5. SISO/SIPO/PISO/PIPO mô tả **cách vào/ra**, không mô tả hướng dịch trái/phải.
6. Register lưu bit; counter là một cấu trúc state machine có chuỗi trạng thái đếm — hai thứ đều dùng FF nhưng mục đích khác nhau.

---

## 15. Practice ladder — Lesson 07

### Level A

1. Mod-10 cần tối thiểu bao nhiêu FF?
2. Phân biệt ripple và synchronous counter.
3. Giải thích SISO/SIPO/PISO/PIPO.

### Level B

1. Vẽ state sequence của counter Mod-5.
2. Theo dõi dữ liệu `1011` qua shift register 4 bit theo từng clock.
3. Cho một counter ripple, xác định Q nào làm clock của FF kế tiếp theo loại edge cho trước.

### Level C

1. Thiết kế synchronous counter theo một chu trình tùy ý bằng FF T.
2. Dùng excitation table + K-map để tìm input FF.
3. Thiết kế luồng serial→parallel và giải thích số clock cần thiết.

---

## 16. Mastery check — Lesson 07

```text
□ Tôi xác định được số FF từ Mod-M.
□ Tôi giải thích được ripple counter và ảnh hưởng của cách mắc clock.
□ Tôi thiết kế được synchronous counter từ state table.
□ Tôi dùng được excitation table và K-map cho counter.
□ Tôi hiểu shift register dịch dữ liệu theo từng clock.
□ Tôi phân biệt SISO/SIPO/PISO/PIPO.
□ Tôi giải thích được ứng dụng cơ bản của shift register.
```

---

# 8. BẢN ĐỒ NĂNG LỰC SAU C1–C4

Sau khi hoàn thành bảy lesson trên, người học phải tự làm được các nhiệm vụ sau mà không chỉ tra công thức.

## A. Biểu diễn dữ liệu

```text
Decimal/Binary/Octal/Hex
↔ chuyển đổi
↔ mã BCD/Gray
↔ signed representation
↔ bù 1/bù 2
```

## B. Mô tả logic

```text
Truth table
↔ Boolean expression
↔ SOP/POS
↔ Karnaugh
↔ gate network
```

## C. Thiết kế tổ hợp

```text
Requirement
→ I/O
→ truth table
→ function
→ simplify
→ gates / decoder / MUX
```

## D. Mạch số học

```text
HA/FA
→ multi-bit addition
HS/FS
Comparator
Parity
```

## E. Mạch có trạng thái

```text
State
→ Mealy/Moore
→ state table/diagram
→ FF characteristic/excitation
→ counter/register
```

Đây là nền để chuyển sang phần tiếp theo:

```text
Mạch số
→ mô tả bằng HDL/Verilog
→ testbench
→ waveform
→ triển khai/mô phỏng
```

---

---

# PHẦN II — HDL, VERILOG, FSM & KIỂM CHỨNG ISE

**Nguồn chính:** Lecture 1–6 + hướng dẫn mô phỏng ISE Xilinx 14.7 — tổng 149 trang.

Phần II không thay thế C1–C4; nó chuyển mô hình mạch đã hiểu sang HDL, tổ chức module, mô tả hành vi/FSM và kiểm chứng bằng testbench + waveform.

## Cầu nối — từ mạch số sang HDL

Ở C1–C4, ta đã đi theo đường:

```text
Yêu cầu
→ biểu diễn dữ liệu
→ bảng chân trị / bảng trạng thái
→ hàm Boolean
→ tối giản
→ sơ đồ mạch
```

Từ đây, HDL không thay thế tư duy đó. HDL là cách **mô tả phần cứng đã được hiểu về mặt chức năng** bằng ngôn ngữ mà công cụ thiết kế có thể mô phỏng và tổng hợp.

Đường học của đợt này:

```text
Mạch cần thiết kế
→ chọn mức mô tả
→ viết module Verilog
→ kiểm tra chức năng
→ ghép module nếu hệ lớn
→ mô tả hành vi tuần tự/FSM khi cần
→ viết testbench
→ đọc waveform
```

Câu hỏi xương sống trong toàn bộ phần này là:

> **Đoạn Verilog này đang mô tả phần cứng nào hoặc đang làm nhiệm vụ gì trong quá trình kiểm chứng?**

Nếu chỉ nhớ cú pháp mà không trả lời được câu đó, kiến thức vẫn chưa chắc.

---

# LESSON 08 — QUY TRÌNH HDL & VERILOG CƠ BẢN

**Slug:** `verilog-co-ban`  
**Nguồn chính:** Lecture 1 trang 3–20; Lecture 2 trang 3–21; Lecture 3 trang 3–34; Lecture 4 trang 3–18.

---

## 1. Sau bài này phải làm được gì?

Sau lesson 08, người học phải:

- hiểu vì sao thiết kế lớn không thể chỉ dựa vào schematic thủ công;
- đọc được flow từ đặc tả đến mô phỏng/tổng hợp/nạp thiết bị;
- viết được một `module` Verilog đơn giản;
- khai báo input/output/bus;
- phân biệt `wire` và `reg` trong phạm vi tài liệu môn;
- viết continuous assignment bằng `assign`;
- đọc đúng literal số có size/base;
- phân biệt các nhóm toán tử quan trọng;
- nhận diện dataflow, behavioral và structural modeling;
- instantiate module con theo thứ tự hoặc theo tên;
- hiểu một hệ lớn được ghép từ các module nhỏ như thế nào.

---

## 2. Tại sao phải chuyển từ schematic sang HDL?

Lecture 1 nêu hai cách cơ bản để mô tả vi mạch số:

```text
1. Schematic — sơ đồ logic
2. HDL — Hardware Description Language
```

### 2.1. Schematic

Cách schematic ghép trực tiếp các phần tử logic để tạo mạch.

Ưu điểm theo slide:

- dễ hình dung với mạch nhỏ;
- có thể mô phỏng sơ đồ để kiểm tra chức năng.

Nhược điểm:

- biểu diễn hệ thống chủ yếu như mạng kết nối phần tử;
- chuyển yêu cầu → Boolean → sơ đồ phần lớn thủ công;
- khó mở rộng khi thiết kế lớn.

Với một decoder 2→4 hoặc Half Adder, sơ đồ vẫn dễ đọc. Nhưng khi hệ thống có nhiều module, nhiều bus và nhiều trạng thái, việc vẽ từng kết nối không còn hiệu quả.

### 2.2. HDL

Lecture 1 trình bày HDL như phương pháp dùng để mô tả các phần tử logic lập trình từ PLD đơn giản đến CPLD/FPGA.

Hai HDL được slide nhắc đến là:

- VHDL;
- Verilog.

Điểm quan trọng không phải “code ngắn hơn hình vẽ”. Điểm quan trọng là thiết kế có thể:

- mô tả ở mức trừu tượng hơn;
- mô phỏng sớm;
- chia thành module;
- sửa lỗi trước khi đưa xuống phần cứng.

---

## 3. Quy trình thiết kế số

### 3.1. Quy trình tạo IC số trong Lecture 1

Slide chia thành bốn chặng lớn:

```text
Phân tích thiết kế
→ Kiểm tra và sửa lỗi
→ Thiết kế vật lý
→ Chế tạo / sản xuất
```

#### Phân tích thiết kế

Gồm:

- phân tích cấu trúc;
- mô tả RTL code.

Phân tích cấu trúc dựa trên:

- yêu cầu thiết kế;
- sơ đồ khối;
- tín hiệu giao tiếp;
- mạch nguyên lý;
- giản đồ định thời.

Kết quả cần có:

- phân tích mạch;
- RTL source;
- tài liệu mô tả thiết kế.

#### Kiểm tra và sửa lỗi

Lecture 1 phân biệt hai mức mô phỏng:

#### Mô phỏng RTL

```text
Kiểm tra chức năng
không tính đầy đủ timing/delay vật lý
```

#### Mô phỏng mức cổng

```text
Sau tổng hợp / sau layout
→ kiểm tra chức năng có xét timing/delay theo mô hình tương ứng
```

#### Thiết kế vật lý

Slide giới thiệu:

```text
RTL code
→ Synthesis
→ Netlist
→ Layout
```

`Synthesis` biên dịch RTL trên thư viện/công nghệ xác định để tạo netlist.

`Layout` dùng netlist để bố trí phần tử logic thành thiết kế vật lý.

---

### 3.2. Flow FPGA/CPLD trong Lecture 1

Hình ở trang 17 cho chuỗi:

```text
Design Idea / Specifications
        ↓
Detailed (RTL) Design
        ↓
Functional Simulation
        ↓
Synthesis & Implementation
        ↓
Timing Simulation
        ↓
Device Programming
```

Các mũi tên phản hồi trên sơ đồ cho thấy đây không phải đường một chiều tuyệt đối. Nếu simulation hoặc bước sau phát hiện vấn đề, phải quay lại RTL/thiết kế để sửa.

#### Cách đọc flow

**Design Idea / Specifications**  
Ta xác định mạch phải làm gì.

**Detailed RTL Design**  
Ta chuyển chức năng thành cấu trúc RTL/module/logic cụ thể.

**Functional Simulation**  
Ta hỏi: *logic có đúng yêu cầu không?*

**Synthesis & Implementation**  
Công cụ biến mô tả thành cấu trúc có thể ánh xạ lên thiết bị.

**Timing Simulation**  
Ta kiểm tra hành vi có liên quan đến timing của kết quả implementation theo phạm vi slide.

**Device Programming**  
Thiết kế được đưa xuống FPGA/CPLD.

---

## 4. Top-down và Bottom-up

Lecture 1 và Lecture 4 cùng nhắc lại hai hệ phương pháp.

### 4.1. Top-down

```text
Top-Level
├─ Sub-Block 1
│  └─ Leaf cell
└─ Sub-Block 2
   └─ Leaf cell
```

Ta bắt đầu từ hệ thống lớn, xác định các khối con, rồi tiếp tục chia nhỏ đến khi gặp khối lá.

#### Ví dụ tư duy

Muốn xây một hệ thống xử lý:

```text
TOP
├─ input decoder
├─ datapath
├─ controller FSM
└─ output encoder
```

Không cần viết toàn bộ trong một module khổng lồ.

### 4.2. Bottom-up

Bắt đầu từ các khối đã có:

```text
leaf cell
→ macro cell
→ block lớn hơn
→ top-level
```

Ví dụ nguồn ở Lecture 4 rất phù hợp:

```text
1-bit full adder
→ ghép 4 instance
→ 4-bit adder
```

---

## 5. Verilog là gì?

Theo Lecture 2, Verilog là ngôn ngữ mô tả phần cứng dùng cho thiết kế hệ thống số và mạch tích hợp.

Nguồn nhấn mạnh Verilog có thể mô tả ở nhiều mức:

- gate level;
- register-transfer level (RTL);
- algorithmic/behavioral description.

Điều cần tránh:

> Không nhìn Verilog như một ngôn ngữ phần mềm chạy từng dòng trên CPU.

Các câu lệnh Verilog có thể mô tả những phần cứng hoạt động đồng thời.

---

## 6. Những quy tắc cú pháp nền tảng

### 6.1. Whitespace

Whitespace dùng để ngăn từ và tăng khả năng đọc code.

Một lệnh có thể trải qua nhiều dòng.

Dòng lệnh thường kết thúc bằng `;`.

#### Không nên

```verilog
module addbit(a,b,ci,sum,co); input a,b,ci; output sum,co;
```

#### Nên trình bày

```verilog
module addbit (
    a,
    b,
    ci,
    sum,
    co
);
    input a;
    input b;
    input ci;
    output sum;
    output co;
endmodule
```

---

### 6.2. Comment

Một dòng:

```verilog
// day la comment
```

Nhiều dòng:

```verilog
/*
   comment nhieu dong
*/
```

Comment phải giải thích **ý nghĩa thiết kế**, không lặp lại đúng câu lệnh.

---

### 6.3. Identifier

Theo Lecture 2:

- identifier do người dùng đặt;
- có thể dùng cho biến, module, block...;
- bắt đầu bằng chữ hoặc `_`;
- không bắt đầu bằng chữ số;
- Verilog phân biệt chữ hoa/chữ thường.

Ví dụ:

```verilog
reg example;
```

`reg` là keyword. `example` là identifier.

> **Cạm bẫy:** `input` và `INPUT` không giống nhau.

---

## 7. Anatomy của một module

Khung tổng quát:

```verilog
module ten_module (port_list);

    // khai bao port
    // khai bao wire/reg/parameter neu can

    // mo ta mach

endmodule
```

Một module là **building block** của thiết kế Verilog.

---

## 8. Port và bus

### 8.1. Scalar port

```verilog
input A;
input B;
output Y;
```

Mặc định một port không khai báo range là 1 bit.

### 8.2. Bus

```verilog
input  [7:0] I;
output [2:0] Y;
```

`[7:0]` biểu diễn một vector 8 bit.

Ví dụ:

```text
I[7] ... I[0]
```

### 8.3. Nhiều port cùng range

```verilog
input [3:0] A, B;
```

---

## 9. Worked example — Half Adder từ C3 sang Verilog

Trong C3:

```text
SUM   = A XOR B
CARRY = A AND B
```

Verilog dataflow:

```verilog
module halfadd (
    input  A,
    input  B,
    output SUM,
    output CARRY
);
    assign SUM   = A ^ B;
    assign CARRY = A & B;
endmodule
```

### 9.1. Đọc thành phần cứng

```text
A ─┬─ XOR ─→ SUM
B ─┘

A ─┬─ AND ─→ CARRY
B ─┘
```

Hai `assign` là hai quan hệ phần cứng hoạt động đồng thời.

Không nên nghĩ:

```text
máy chạy dòng SUM trước
rồi mới chạy dòng CARRY
```

---

## 10. Continuous assignment — `assign`

Lecture 2 mô tả `assign` là phép gán liên tục:

```verilog
assign ten_bien = bieu_thuc;
```

Các đặc điểm trong nguồn:

- đặt ngoài `always`/`initial`;
- dùng để drive net/wire trong cách trình bày của khóa học;
- khi RHS thay đổi, giá trị logic của LHS được cập nhật theo biểu thức.

Ví dụ:

```verilog
assign Y = A & B;
```

#### Hardware reading

Đây là một cổng AND logic giữa `A` và `B` tạo `Y`.

---

## 11. `wire` và `reg`

Lecture 2 chia kiểu dữ liệu sử dụng chủ yếu thành net và register.

### 11.1. `wire`

Nguồn mô tả `wire` là đường kết nối trong mạch.

```verilog
wire enable;
wire [7:0] bus;
```

Dùng phổ biến để:

- nối cổng;
- nối module;
- nhận kết quả continuous assignment.

### 11.2. `reg`

Nguồn mô tả `reg` là đối tượng nhận giá trị từ procedural assignment trong hàm/khối thủ tục.

```verilog
reg FF1, FF2;
reg [3:0] COUNT;
```

> **Cạm bẫy rất quan trọng:** `reg` không đồng nghĩa “chắc chắn sinh flip-flop”.

Lecture 5 dùng `reg` cho cả decoder tổ hợp và D flip-flop tuần tự. Phần cứng sinh ra phụ thuộc **cách mô tả**, không chỉ tên kiểu.

---

## 12. Biểu diễn số trong Verilog

Lecture 3 nêu bốn giá trị logic:

| Giá trị | Ý nghĩa theo nguồn |
|---|---|
| `0` | logic 0 / false |
| `1` | logic 1 / true |
| `x` hoặc `X` | không xác định |
| `z` hoặc `Z` | high impedance |

### 12.1. Cú pháp literal

```text
<size>'<base><value>
```

Base:

- `b`: binary;
- `o`: octal;
- `d`: decimal;
- `h`: hexadecimal.

Ví dụ từ Lecture 3:

```verilog
4'b1011
5'd30
4'd10
1'b1
8'hC5
6'hF
```

#### Đọc từng phần

```text
8'hC5
│ │ └─ value
│ └─── hexadecimal
└───── 8 bit
```

### 12.2. Độ rộng rất quan trọng

Nguồn cho ví dụ:

```verilog
6'hF0
```

Chỉ có 6 bit nên giá trị biểu diễn theo 6 bit cuối.

Trong khi:

```verilog
6'hF
```

được mở rộng trong 6 bit.

> Khi đọc code Verilog, luôn hỏi: **vector rộng bao nhiêu bit?**

---

## 13. Toán tử số học

Lecture 3:

```text
+  cộng
-  trừ
*  nhân
/  chia
%  chia lấy dư
```

Ví dụ nguồn nhấn mạnh nếu toán hạng chứa `x/z` trong phép số học, kết quả có thể trở thành `x`.

```verilog
4'b10x1 + 4'b0111
```

→ nguồn cho kết quả `4'bxxxx`.

---

## 14. Toán tử quan hệ

```text
>
<
>=
<=
```

Trả về kết quả logic so sánh.

Ví dụ:

```text
a = 4
b = 3

a > b  → 1
a <= b → 0
```

> **Cạm bẫy:** ký hiệu `<=` ở đây là **so sánh nhỏ hơn hoặc bằng**. Trong procedural assignment, `<=` còn được dùng cho **non-blocking assignment**. Phải đọc theo ngữ cảnh.

---

## 15. Equality và case equality

### 15.1. Logic equality

```text
==
!=
```

### 15.2. Case equality

```text
===
!==
```

Lecture 3 dùng case equality để so sánh từng bit, bao gồm cách xử lý `x/z` khác với `==/!=`.

Ví dụ nguồn:

```text
x = 4'b1010
z = 4'b0xxz

x == z  → x
```

Trong khi case equality có thể cho kết quả xác định khi so sánh mẫu bit cụ thể.

> Không được học thuộc `==` và `===` là “cùng nghĩa”.

---

## 16. Toán tử logic

```text
&&  logical AND
||  logical OR
!   logical NOT
```

Kết quả là một giá trị logic đơn.

Ví dụ:

```text
a = 3  → xem như true vì khác 0
b = 0  → false

a && b → 0
a || b → 1
!a     → 0
```

---

## 17. Bitwise operators

Bitwise làm việc **từng bit**.

```text
~   NOT
&   AND
~&  NAND
|   OR
~|  NOR
^   XOR
~^  XNOR
```

Ví dụ từ Lecture 3:

```text
x = 4'b1010
y = 4'b1101

~x     = 0101
x & y  = 1000
x | y  = 1111
x ^ y  = 0111
x ~^ y = 1000
```

### 17.1. `&&` khác `&`

```text
&& → nhìn cả toán hạng như điều kiện logic
&  → AND từng bit
```

Ví dụ:

```verilog
4'b1010 & 4'b1101
```

→ `4'b1000`.

Không thể thay bằng `&&` nếu muốn kết quả vector 4 bit.

---

## 18. Reduction operators

Reduction dùng một vector và giảm về 1 bit.

Ví dụ khái niệm:

```verilog
&A
```

nếu `A` là vector, toán tử AND toàn bộ bit của `A` để cho một bit kết quả.

Khác hoàn toàn:

```verilog
A & B
```

là bitwise giữa hai vector.

#### Liên hệ C3

Reduction XOR là cách tự nhiên để mô tả parity của một vector trong Verilog.

Phần liên hệ này dùng đúng nhóm toán tử reduction của Lecture 3 và khái niệm parity đã học ở C3.

---

## 19. Shift operators

Lecture 3:

```text
<<  dịch trái
>>  dịch phải
```

Nguồn trình bày shift logic với bit trống được điền `0`.

Ví dụ:

```text
x = 4'b1100

x >> 1 → 0110
x << 1 → 1000
x << 2 → 0000
```

Luôn theo dõi **độ rộng vector**: bit bị đẩy ra ngoài sẽ mất.

---

## 20. Conditional operator `?:`

Cú pháp:

```verilog
condition ? when_true : when_false
```

Ví dụ:

```verilog
assign y = sel ? d1 : d0;
```

#### Hardware reading

Đây chính là cách mô tả hành vi kiểu MUX 2→1:

```text
sel=0 → y=d0
sel=1 → y=d1
```

---

## 21. Concatenation

Ghép nhiều toán hạng thành vector lớn:

```verilog
{a, b}
```

Ví dụ từ Lecture 3:

```verilog
wire [1:0] a, b;
wire [3:0] y;

assign y = {a, b};
```

Thứ tự bit:

```text
y[3:2] = a
 y[1:0] = b
```

Ví dụ đảo hai nibble:

```verilog
assign d = {d[3:0], d[7:4]};
```

> **Cạm bẫy:** concat không tự “biết ý định”. Thứ tự trong `{}` chính là thứ tự bit của vector kết quả.

---

## 22. Replication

Cú pháp:

```verilog
{n{item}}
```

Ví dụ nguồn:

```verilog
{4{2'b10}}
```

→

```text
10101010
```

Khác với concat thường ở chỗ cùng một mẫu được lặp nhiều lần.

---

## 23. Ba mô hình mô tả mạch trong Verilog

Lecture 3 trình bày ba mô hình:

```text
Dataflow
Behavioral
Structural
```

---

### 23.1. Dataflow

Câu lệnh cốt lõi là `assign`.

Nguồn decoder 2→4:

```verilog
module decoder_2x4 (
    output [3:0] out,
    input in0,
    input in1
);
    assign out[0] = ~in0 & ~in1;
    assign out[1] =  in0 & ~in1;
    assign out[2] = ~in0 &  in1;
    assign out[3] =  in0 &  in1;
endmodule
```

Hoặc ghép vector:

```verilog
assign out = {
    in0 & in1,
    ~in0 & in1,
    in0 & ~in1,
    ~in0 & ~in1
};
```

#### Tư duy

```text
Boolean equation
→ assign expression
```

Đây là cầu nối trực tiếp từ C2/C3 sang Verilog.

---

### 23.2. Behavioral

Nguồn mô tả bằng cấu trúc thủ tục như `always` và `initial`.

Ví dụ Half Adder:

```verilog
module half_add (
    output reg S,
    output reg C,
    input A,
    input B
);
    always @(A or B) begin
        S = A ^ B;
        C = A & B;
    end
endmodule
```

Phần behavioral sẽ được học sâu ở lesson 09.

---

### 23.3. Structural / gate-level

Dùng cổng hoặc module để ghép thành hệ lớn.

Ví dụ cổng cơ bản:

```verilog
or  U1 (out, in1, in2, in3);
and U2 (y, x1, x2);
```

Ví dụ nguồn:

```verilog
module example (
    input a, b, c, d,
    output y
);
    wire w1, w2, w3;

    xor x1 (w1, b, c);
    and a1 (w2, a, w1);
    and a2 (w3, d, w1);
    or  o1 (y, w2, w3);
endmodule
```

#### Hardware reading

Code structural gần với schematic:

```text
các instance cổng
+ dây nội bộ
+ kết nối
```

---

## 24. Module hierarchy

Lecture 4 dùng ví dụ `addbit` để xây adder 4 bit.

### 24.1. Module con 1-bit

Nguồn:

```verilog
module addbit (
    input a,
    input b,
    input ci,
    output sum,
    output co
);
    assign {co, sum} = a + b + ci;
endmodule
```

Đây là một full-adder 1 bit dưới dạng dataflow.

---

## 25. Instantiate module con

Có hai cách trong Lecture 4.

### 25.1. Theo thứ tự port

```verilog
addbit u0 (A[0], B[0], cin, S[0], c1);
```

Thứ tự phải khớp:

```text
(a, b, ci, sum, co)
```

Nếu đảo thứ tự, kết nối phần cứng thay đổi.

### 25.2. Theo tên port

```verilog
addbit u0 (
    .a   (A[0]),
    .b   (B[0]),
    .ci  (cin),
    .sum (S[0]),
    .co  (c1)
);
```

Thứ tự dòng không quan trọng, nhưng tên `.a`, `.b`, `.ci`... phải đúng tên port của module con.

---

## 26. Worked example — ghép adder 4 bit

```verilog
module adder4 (
    input  [3:0] A,
    input  [3:0] B,
    input        cin,
    output [3:0] S,
    output       cout
);
    wire c1, c2, c3;

    addbit u0 (.a(A[0]), .b(B[0]), .ci(cin), .sum(S[0]), .co(c1));
    addbit u1 (.a(A[1]), .b(B[1]), .ci(c1),  .sum(S[1]), .co(c2));
    addbit u2 (.a(A[2]), .b(B[2]), .ci(c2),  .sum(S[2]), .co(c3));
    addbit u3 (.a(A[3]), .b(B[3]), .ci(c3),  .sum(S[3]), .co(cout));
endmodule
```

### 26.1. Đọc phần cứng

```text
A0,B0,cin → FA0 → S0,c1
A1,B1,c1  → FA1 → S1,c2
A2,B2,c2  → FA2 → S2,c3
A3,B3,c3  → FA3 → S3,cout
```

`c1,c2,c3` là dây carry nội bộ.

Đây chính là ripple carry structure đã gặp trong tư duy mạch số.

---

## 27. Quy định kết nối port theo Lecture 4

Nguồn nêu:

- input: kết nối bên trong là net; phía ngoài có thể được drive từ net hoặc reg theo ngữ cảnh module cha;
- output: phía ngoài được nối qua net; phía trong có thể là net hoặc reg tùy cách mô tả;
- có thể để port không kết nối.

Ví dụ nguồn với DFF:

```verilog
module dff (
    output reg q,
    output q_not,
    input clk,
    input d,
    input rst,
    input pre
);
    assign q_not = ~q;

    always @(posedge clk) begin
        if (rst == 1'b1)
            q <= 1'b0;
        else if (pre == 1'b1)
            q <= 1'b1;
        else
            q <= d;
    end
endmodule
```

Named connection có thể để trống:

```verilog
dff u0 (
    .q(q),
    .q_not(),
    .clk(clk),
    .d(d),
    .rst(rst),
    .pre(pre)
);
```

---

## 28. Các bẫy của lesson 08

### Bẫy 1 — “Verilog chạy từ trên xuống như C/Python”

Sai tư duy.

Nhiều cấu trúc mô tả phần cứng hoạt động đồng thời.

### Bẫy 2 — `reg` chắc chắn là register vật lý

Không đủ thông tin.

Phải xem nó được gán trong khối nào và với điều kiện nào.

### Bẫy 3 — `&&` và `&` giống nhau

Không.

### Bẫy 4 — `==` và `===` giống nhau

Không khi có `x/z`.

### Bẫy 5 — concat tự đảo đúng theo ý mình

Không. Thứ tự trong `{}` quyết định vị trí bit.

### Bẫy 6 — positional mapping có thể đổi thứ tự tùy thích

Không.

### Bẫy 7 — module instance chỉ là “gọi hàm”

Cách nghĩ đó dễ gây sai. Instance biểu diễn một **khối phần cứng con** trong hierarchy.

---

## 29. Practice ladder — Lesson 08

> Các bài sau được biên soạn từ đúng khái niệm của Lecture 1–4, không thêm chủ đề mới.

### A. Đọc code

Cho:

```verilog
assign y = a ? d1 : d0;
```

Hỏi:

1. Đây là mô hình dataflow hay behavioral?
2. Mạch gần tương đương khối nào đã học ở C3?
3. Khi `a=0`, `y` nhận gì?

### B. Phân biệt toán tử

Cho:

```text
A = 4'b1010
B = 4'b1101
```

Tự tính:

```text
A & B
A | B
A ^ B
```

Sau đó giải thích tại sao `A && B` không phải vector 4 bit tương tự.

### C. Concatenation

Với:

```verilog
wire [3:0] H = 4'b1010;
wire [3:0] L = 4'b0011;
wire [7:0] X;
assign X = {H, L};
```

Tự viết giá trị `X`.

### D. Hierarchy

Viết lại instance sau bằng named mapping:

```verilog
addbit u0 (A[0], B[0], cin, S[0], c1);
```

### E. Tìm lỗi tư duy

> “Output khai báo `reg`, vậy output đó chắc chắn đến từ Flip-Flop.”

Giải thích vì sao kết luận này sai dựa trên decoder behavioral ở Lecture 5.

---

## 30. Mastery check — Lesson 08

- [ ] Tôi giải thích được flow FPGA/CPLD.
- [ ] Tôi biết RTL simulation khác mục tiêu timing simulation theo slide ở đâu.
- [ ] Tôi viết được module + port.
- [ ] Tôi đọc được bus `[msb:lsb]`.
- [ ] Tôi phân biệt wire/reg trong phạm vi khóa học.
- [ ] Tôi viết được `assign`.
- [ ] Tôi đọc đúng literal số.
- [ ] Tôi phân biệt logical/bitwise/reduction.
- [ ] Tôi dùng concat/replication.
- [ ] Tôi nhận diện dataflow/behavioral/structural.
- [ ] Tôi instantiate module theo thứ tự và theo tên.

---

# LESSON 09 — MÔ TẢ HÀNH VI TRONG VERILOG

**Slug:** `verilog-behavioral`  
**Nguồn chính:** Lecture 5 trang 3–28; liên hệ ví dụ từ Lecture 3.

---

## 31. Mục tiêu lesson 09

Sau bài này phải đọc được quan hệ giữa:

```text
initial
always
sensitivity list
begin/end
fork/join
blocking/non-blocking
if/case
loop
```

và biết cấu trúc nào đang dùng cho:

- mô phỏng/testbench;
- logic tổ hợp;
- logic cập nhật theo clock.

---

## 32. `initial`

Lecture 5:

- `initial` thực thi một lần từ lúc bắt đầu quá trình mô phỏng;
- tài liệu dùng `initial` cho testbench;
- nhiều câu lệnh cần `begin/end` hoặc `fork/join`.

Cú pháp:

```verilog
initial begin
    statement_1;
    statement_2;
end
```

Ví dụ nguồn testbench decoder:

```verilog
initial begin
    I = 2'b00;
end
```

#### Tư duy

Trong chuỗi môn học này, `initial` trước hết được dùng để **tạo điều kiện ban đầu/stimulus cho mô phỏng**, không phải khối logic chính mà ta mặc định dùng để mô tả DUT.

---

## 33. `always`

Lecture 5:

- `always` thực hiện lặp lại;
- có thể có sensitivity list;
- mạch tổ hợp: sensitivity liên quan các tín hiệu đọc;
- mạch tuần tự: thường nhạy theo clock và tín hiệu điều khiển phù hợp.

Cú pháp:

```verilog
always @(sensitivity_list) begin
    ...
end
```

---

## 34. Sensitivity list

### 34.1. Dạng `or`

```verilog
always @(A or B)
```

### 34.2. Dạng dấu phẩy

Lecture 5 ghi Verilog-2001 có thể dùng:

```verilog
always @(A, B)
```

### 34.3. `@*`

Nguồn dùng:

```verilog
always @(*)
```

để liệt kê các tín hiệu/biến được đọc trong mạch tổ hợp.

### 34.4. Edge

```text
posedge
negedge
```

Ví dụ:

```verilog
always @(posedge clk)
```

---

## 35. Worked example — decoder 2→4 behavioral

```verilog
module decoder_2to4 (
    input  [1:0] I,
    output [3:0] Y
);
    reg [3:0] Y_TAM;

    always @(*) begin
        case (I)
            2'b00: Y_TAM = 4'b0001;
            2'b01: Y_TAM = 4'b0010;
            2'b10: Y_TAM = 4'b0100;
            2'b11: Y_TAM = 4'b1000;
        endcase
    end

    assign Y = Y_TAM;
endmodule
```

#### Đọc thành phần cứng

- `I` là 2-bit selector/input.
- `case` chọn đúng một mẫu output.
- mọi tổ hợp `I` đều được bao phủ.
- đây là mạch tổ hợp.

#### Liên hệ C3

Bảng chân trị:

| I1 | I0 | Y3 | Y2 | Y1 | Y0 |
|---:|---:|---:|---:|---:|---:|
| 0 | 0 | 0 | 0 | 0 | 1 |
| 0 | 1 | 0 | 0 | 1 | 0 |
| 1 | 0 | 0 | 1 | 0 | 0 |
| 1 | 1 | 1 | 0 | 0 | 0 |

Đây chính là cùng một mạch, chỉ đổi **cách mô tả**.

---

## 36. Worked example — DEMUX behavioral

Nguồn Lecture 5:

```verilog
module demux1to4 (
    input D,
    input [1:0] S,
    output reg [3:0] Y
);
    always @(D or S) begin
        case (S)
            2'b00: Y = {3'b000, D};
            2'b01: Y = {2'b00, D, 1'b0};
            2'b10: Y = {1'b0, D, 2'b00};
            2'b11: Y = {D, 3'b000};
        endcase
    end
endmodule
```

#### Học được gì từ ví dụ?

- `Y` là `reg` vì được gán trong `always`.
- nhưng đây vẫn là **mạch tổ hợp**, không phải vì `reg` mà tự sinh FF.
- concat được dùng để đặt `D` vào đúng vị trí output.

---

## 37. Clocked `always` — D Flip-Flop

Nguồn:

```verilog
module DFlipFlop (
    input D,
    input clk,
    input sync_reset,
    output reg Q
);
    always @(posedge clk) begin
        if (sync_reset == 1'b1)
            Q <= 1'b0;
        else
            Q <= D;
    end
endmodule
```

### 37.1. Hardware reading

Khác decoder:

```text
Decoder:
input đổi → output tổ hợp đổi theo logic

DFF:
chỉ tại posedge clk → Q được cập nhật
```

`sync_reset` trong ví dụ chỉ được kiểm tra bên trong `posedge clk`, nên hành vi reset trong ví dụ là reset đồng bộ.

---

## 38. `begin/end`

Lecture 5 gọi đây là sequential block:

```verilog
begin
    statement_1;
    statement_2;
end
```

Các statement trong block được thực thi theo trình tự procedural của khối.

Dùng khi một nhánh `if` hoặc một khối `always` có nhiều câu lệnh.

---

## 39. `fork/join`

Lecture 5 giới thiệu parallel block:

```verilog
fork
    statement_1;
    statement_2;
join
```

Ví dụ nguồn dùng delay khác nhau để minh họa các statement song song trong mô phỏng.

Trong app, mục tiêu phần này là **đọc được khái niệm** và nhận ra nó khác `begin/end`; không cần biến thành bài nâng cao về scheduler.

---

## 40. Procedural assignment

Lecture 5 chia hai dạng:

```verilog
x = expression;   // blocking
x <= expression;  // non-blocking
```

Nguồn dạy quy tắc thực hành:

```text
Blocking      → thường dùng cho mạch tổ hợp
Non-blocking  → thường dùng cho mạch tuần tự
```

---

## 41. Blocking `=`

Trong mạch tổ hợp của bài decoder:

```verilog
Y_TAM = 4'b0001;
```

Phù hợp với cách Lecture 5 dạy.

#### Cần nhớ

`=` trong procedural block không phải continuous `assign`.

Hai thứ này khác:

```verilog
assign Y = A & B;
```

và:

```verilog
always @(*) begin
    Y = A & B;
end
```

Cả hai có thể mô tả logic tổ hợp trong các ví dụ khóa học, nhưng thuộc hai mô hình/cơ chế cú pháp khác nhau.

---

## 42. Non-blocking `<=`

Trong DFF:

```verilog
Q <= D;
```

Nguồn sử dụng non-blocking cho logic tuần tự theo clock.

> **Cạm bẫy:** `<=` cũng là toán tử “nhỏ hơn hoặc bằng” trong biểu thức quan hệ. Phải nhìn vị trí cú pháp.

---

## 43. Continuous vs procedural assignment

Theo bảng Lecture 5:

| Procedural | Continuous |
|---|---|
| bên trong `always`/`initial` | ở mức module |
| drive biến procedural kiểu `reg` trong cách dạy của slide | drive net/wire |
| dùng `=` hoặc `<=` | dùng `assign ... = ...` |
| không có keyword `assign` | có keyword `assign` |

---

## 44. `if`

Dạng cơ bản:

```verilog
if (condition)
    statement;
```

Lecture 5 có ví dụ latch:

```verilog
module if_1 (
    input E,
    input din,
    output reg latch
);
    always @(E or din)
        if (E)
            latch <= din;
endmodule
```

#### Đọc hành vi

Khi `E=1`, output nhận `din`.

Khi `E=0`, không có nhánh gán mới trong khối này, nên output cần giữ trạng thái trước — đúng với module được nguồn đặt tên là `latch`.

---

## 45. `if-else`

Nguồn DFF:

```verilog
always @(posedge clk)
    if (reset)
        dff <= 1'b0;
    else
        dff <= din;
```

Đọc:

```text
mỗi posedge clk:
    nếu reset → Q=0
    nếu không → Q=din
```

---

## 46. `else if` — counter example

Lecture 5 dùng ví dụ counter 4 bit:

```verilog
always @(posedge clk)
begin
    if (reset == 1'b0)
        counter <= 4'b0000;
    else if (E == 1'b1 && up_en == 1'b1)
        counter <= counter + 1'b1;
    else if (E == 1'b1 && down_en == 1'b1)
        counter <= counter - 1'b1;
    else
        counter <= counter;
end
```

#### Liên hệ C4

Đây là mô tả hành vi của counter có:

- reset active-low;
- enable;
- hướng up/down.

#### Thứ tự ưu tiên

Chuỗi `if / else if` có thứ tự quyết định.

Nếu nhiều điều kiện cùng đúng, nhánh xuất hiện trước trong chuỗi sẽ được chọn.

---

## 47. `case`

Cú pháp nguồn:

```verilog
case (expression)
    case_1: statement;
    case_2: statement;
    default: statement;
endcase
```

Nguồn mô tả:

- `case`: so sánh biểu thức với các lựa chọn;
- `casez`: dùng trong ngữ cảnh có Z theo cách trình bày của slide;
- `casex`: dùng trong ngữ cảnh có X/Z theo cách trình bày của slide.

Ví dụ MUX 2→1:

```verilog
module mux2_1 (
    input din_0,
    input din_1,
    input sel,
    output reg y
);
    always @(sel or din_0 or din_1) begin
        case (sel)
            1'b0: y = din_0;
            1'b1: y = din_1;
        endcase
    end
endmodule
```

#### Hardware reading

`case(sel)` chọn đường dữ liệu tương ứng → MUX.

---

## 48. Khi nào nhìn `if`, khi nào nhìn `case`?

Trong các ví dụ của khóa học:

- `if/else` phù hợp khi điều kiện mang tính ưu tiên/điều kiện logic;
- `case` phù hợp khi selector/state có nhiều giá trị rời rạc.

Đây không phải luật cú pháp tuyệt đối, mà là cách đọc các ví dụ của tài liệu.

---

## 49. Loop — `forever`

Lecture 5:

```verilog
initial begin
    Clk = 0;
    forever
        #50 Clk = !Clk;
end
```

Đây là mẫu tạo clock trong mô phỏng.

#### Timeline

```text
t=0   Clk=0
50    toggle
100   toggle
150   toggle
...
```

---

## 50. Loop — `repeat`

```verilog
repeat (5)
    A = A + ~B;
```

Nguồn: thực thi statement số lần cố định.

---

## 51. Loop — `while`

```verilog
while (Nmbr) begin
    Cnt = Cnt + 1;
    Nmbr = Nmbr >> 1;
end
```

Lặp trong khi biểu thức còn true.

---

## 52. Loop — `for`

```verilog
for (I = 0; I < 16; I = I + 2)
    Memory[I] = D;
```

Cấu trúc:

```text
initial assignment
→ condition
→ body
→ step
→ lặp
```

Nguồn dùng để dạy cú pháp procedural loop; chưa mở sang `generate-for` trong Lecture 5.

---

## 53. Các bẫy của lesson 09

### Bẫy 1 — `always` = vòng lặp phần mềm

Không nên hiểu như vậy. `always` mô tả hành vi phần cứng/mô phỏng theo sensitivity/event.

### Bẫy 2 — combinational `always` quên input trong sensitivity list

Với style liệt kê tay, thiếu tín hiệu có thể làm mô phỏng không phản ứng như mong đợi. Nguồn giới thiệu `@*` cho mạch tổ hợp để liệt kê các tín hiệu đọc.

### Bẫy 3 — mọi `reg` là FF

Decoder behavioral dùng `reg` nhưng là mạch tổ hợp.

### Bẫy 4 — `=` và `<=` thay tùy ý

Trong khóa học:

```text
combinational → blocking
sequential    → non-blocking
```

### Bẫy 5 — `initial` thay cho clocked logic DUT

Trong tài liệu, `initial` được dùng chủ yếu cho testbench/stimulus.

### Bẫy 6 — `case` không cần nghĩ đến độ phủ lựa chọn

Phải xem selector có những giá trị nào và các nhánh có bao phủ mục tiêu thiết kế không.

---

## 54. Practice ladder — Lesson 09

### A. Nhận diện phần cứng

Cho:

```verilog
always @(posedge clk)
    q <= d;
```

Hỏi: đây là tổ hợp hay cập nhật theo clock?

### B. Sửa sensitivity

Cho:

```verilog
always @(A) begin
    Y = A & B;
end
```

Trong cách viết tổ hợp theo Lecture 5, tín hiệu nào đang bị thiếu nếu liệt kê tay?

### C. Chọn assignment

Điền ký hiệu phù hợp theo quy tắc khóa học:

```verilog
always @(*)
    y __ a & b;
```

và:

```verilog
always @(posedge clk)
    q __ d;
```

### D. Đọc counter

Với `E=1`, `up_en=1`, `down_en=1`, nhánh nào của chuỗi `if/else if` trong ví dụ nguồn được chọn trước?

### E. Viết MUX bằng `case`

Dùng đúng pattern của Lecture 5 để viết MUX 2→1.

---

## 55. Mastery check — Lesson 09

- [ ] Tôi phân biệt `initial`/`always`.
- [ ] Tôi đọc được sensitivity list.
- [ ] Tôi hiểu `posedge/negedge`.
- [ ] Tôi phân biệt `begin/end` và `fork/join` ở mức nguồn dạy.
- [ ] Tôi phân biệt continuous/procedural assignment.
- [ ] Tôi dùng `=` cho combinational example theo khóa học.
- [ ] Tôi dùng `<=` cho clocked example theo khóa học.
- [ ] Tôi đọc được `if/else if` có ưu tiên.
- [ ] Tôi đọc/viết `case` cơ bản.
- [ ] Tôi nhận ra `forever/repeat/while/for`.

---

# LESSON 10 — MÁY TRẠNG THÁI HỮU HẠN FSM BẰNG VERILOG

**Slug:** `fsm`  
**Nguồn chính:** Lecture 6 trang 2–18; prerequisite từ C4 và Lesson 09.

---

## 56. Vì sao FSM phải học sau mạch tuần tự và behavioral Verilog?

FSM không phải một cú pháp riêng của Verilog.

FSM là **mô hình của mạch tuần tự**.

Để viết FSM, phải hiểu:

```text
state hiện tại
→ input
→ state kế tiếp
→ clock cập nhật state
→ output
```

và phải biết dùng:

- `always @(*)` cho logic tổ hợp;
- `always @(posedge clk ...)` cho state register;
- `case` cho chuyển trạng thái.

---

## 57. Định nghĩa FSM

Lecture 6:

- Finite State Machine mô tả hoạt động của mạch tuần tự;
- có số trạng thái hữu hạn;
- hai mô hình chính:
  - Moore;
  - Mealy.

---

## 58. Moore và Mealy

Từ Lecture 6/C4:

### Moore

```text
Output = f(State)
```

### Mealy

```text
Output = f(State, Input)
```

Điểm quyết định nằm ở **logic tạo output**.

> Lecture 6 nhắc cả hai loại nhưng worked RTL example đầy đủ là Moore FSM phát hiện chuỗi `001`.

---

## 59. Ba khối cơ bản của FSM

Lecture 6 trang 4:

```text
                ┌────────────────────────┐
Input + State → │ Next-state combinational│ → NEXT
                └────────────────────────┘
                             ↓
                         State register
                         (Flip-Flops)
                             ↓
                           CURRENT
                             ↓
                ┌────────────────────────┐
                │ Output combinational    │ → Output
                └────────────────────────┘
```

Ba phần:

1. logic xác định trạng thái kế tiếp;
2. thanh ghi trạng thái;
3. logic xác định output.

---

## 60. Quy trình viết FSM theo Lecture 6

Nguồn cho bốn bước:

```text
B1. Mã hóa trạng thái
B2. Viết next-state logic
B3. Viết state register
B4. Viết output logic
```

Đây là xương sống của lesson 10.

---

## 61. Worked example — Moore FSM phát hiện `001`

Lecture 6 dùng bài:

> Thiết kế bộ phát hiện và báo hiệu sự xuất hiện chuỗi bit `001` liên tiếp theo mô hình Moore.

Nguồn có bốn trạng thái:

```text
IDLE
D0
D00
D001
```

Ý nghĩa tên state có thể đọc trực quan:

```text
IDLE  : chưa giữ prefix phù hợp
D0    : vừa có chuỗi phù hợp kết thúc bằng 0
D00   : đã thấy 00
D001  : đã thấy 001 → state phát hiện
```

Phần diễn giải này là cách đọc tên state của chính ví dụ nguồn.

---

## 62. Bước 1 — Mã hóa trạng thái

Có 4 state → nguồn dùng 2 bit:

```verilog
parameter IDLE = 2'b00;
parameter D0   = 2'b01;
parameter D00  = 2'b10;
parameter D001 = 2'b11;
```

Khai báo state register:

```verilog
reg [1:0] CURRENT;
reg [1:0] NEXT;
```

#### Tư duy

Tên state giúp code dễ đọc; giá trị nhị phân là encoding mà phần cứng lưu trong state register.

---

## 63. Bước 2 — Next-state logic

Dựa trên ảnh code của Lecture 6 trang 11:

```verilog
always @(*) begin
    case (CURRENT)
        IDLE: begin
            if (in == 1'b0)
                NEXT = D0;
            else
                NEXT = CURRENT;
        end

        D0: begin
            if (in == 1'b0)
                NEXT = D00;
            else
                NEXT = IDLE;
        end

        D00: begin
            if (in == 1'b1)
                NEXT = D001;
            else
                NEXT = CURRENT;
        end

        D001: begin
            if (in == 1'b1)
                NEXT = IDLE;
            else
                NEXT = D0;
        end

        default: NEXT = IDLE;
    endcase
end
```

### 63.1. Đọc từng state

#### `IDLE`

```text
in=0 → D0
in=1 → IDLE
```

#### `D0`

```text
in=0 → D00
in=1 → IDLE
```

#### `D00`

```text
in=0 → D00 (CURRENT)
in=1 → D001
```

> **Đối chiếu nguồn:** sơ đồ trạng thái và waveform ở Lecture 6 trang 8 thể hiện rõ `D00 --0→ D00` và `D00 --1→ D001`. Ảnh code next-state ở trang 11 lại hiển thị điều kiện ngược ở nhánh `D00`. Canonical lesson ưu tiên **sơ đồ trạng thái + waveform của chính tài liệu** làm đặc tả chức năng và ghi rõ sự khác nhau này, thay vì âm thầm chép lỗi.

#### `D001`

```text
in=1 → IDLE
in=0 → D0
```

---

## 64. Chuyển code thành state transition table

Từ code nguồn:

| CURRENT | in=0 | in=1 |
|---|---|---|
| IDLE | D0 | IDLE |
| D0 | D00 | IDLE |
| D00 | D00 | D001 |
| D001 | D0 | IDLE |

Đây là kỹ năng quan trọng:

```text
state diagram ↔ state table ↔ next-state code
```

Không nên học ba biểu diễn như ba bài khác nhau.

---

## 65. Bước 3 — State register

Ảnh Lecture 6 trang 12:

```verilog
always @(posedge clk or negedge rst_n) begin
    if (rst_n == 1'b0)
        CURRENT <= IDLE;
    else
        CURRENT <= NEXT;
end
```

### 65.1. Đọc phần cứng

- `CURRENT` là state đang lưu.
- tại `posedge clk`, nếu không reset, state mới được nhận từ `NEXT`.
- `rst_n` active-low.
- vì `negedge rst_n` nằm trong sensitivity list, reset của code mẫu có thể tác động bất đồng bộ với clock.

#### Liên hệ C4

Đây là nơi flip-flop/state memory từ C4 xuất hiện trực tiếp trong RTL.

---

## 66. Bước 4 — Output logic

Lecture 6 trang 13 cho hai cách.

### 66.1. Behavioral

```verilog
always @(*) begin
    if (CURRENT == D001)
        out = 1'b1;
    else
        out = 1'b0;
end
```

### 66.2. Dataflow

```verilog
assign out = (CURRENT == D001) ? 1'b1 : 1'b0;
```

Đây là Moore output vì output chỉ nhìn `CURRENT`.

---

## 67. Canonical code hoàn chỉnh

Code dưới đây chuẩn hóa theo chính quy tắc Lecture 5:

- combinational → blocking `=`;
- state register → non-blocking `<=`.

```verilog
module MOORE_FSM (
    input  in,
    input  rst_n,
    input  clk,
    output reg out
);
    parameter IDLE = 2'b00;
    parameter D0   = 2'b01;
    parameter D00  = 2'b10;
    parameter D001 = 2'b11;

    reg [1:0] CURRENT;
    reg [1:0] NEXT;

    // 1. Next-state logic
    always @(*) begin
        case (CURRENT)
            IDLE: begin
                if (in == 1'b0)
                    NEXT = D0;
                else
                    NEXT = CURRENT;
            end

            D0: begin
                if (in == 1'b0)
                    NEXT = D00;
                else
                    NEXT = IDLE;
            end

            D00: begin
                if (in == 1'b0)
                    NEXT = D001;
                else
                    NEXT = CURRENT;
            end

            D001: begin
                if (in == 1'b1)
                    NEXT = IDLE;
                else
                    NEXT = D0;
            end

            default: NEXT = IDLE;
        endcase
    end

    // 2. State register
    always @(posedge clk or negedge rst_n) begin
        if (rst_n == 1'b0)
            CURRENT <= IDLE;
        else
            CURRENT <= NEXT;
    end

    // 3. Moore output logic
    always @(*) begin
        case (CURRENT)
            IDLE:   out = 1'b0;
            D0:     out = 1'b0;
            D00:    out = 1'b0;
            D001:   out = 1'b1;
            default: out = 1'bx;
        endcase
    end
endmodule
```

> **Ghi chú nguồn:** ảnh code hoàn chỉnh trang 14 dùng `<=` trong output combinational case; trang 13 lại dùng `=` hoặc `assign`. Canonical chọn `=` ở logic tổ hợp để thống nhất với quy tắc Lecture 5.

---

## 68. Trace FSM trước khi mô phỏng

Giả sử reset đưa state về `IDLE`.

Ta đưa chuỗi input theo từng clock:

```text
0, 0, 1
```

Dùng transition table:

```text
IDLE --0→ D0
D0   --0→ D00
D00  --1→ D001
```

Khi vào `D001`, Moore output lên `1`.

### 68.1. Tại sao phải trace?

Trace buộc ta kiểm tra bốn lớp của cùng một thiết kế:

```text
spec
↔ state diagram
↔ transition code
↔ waveform
```

Lecture 6 trang 8 cho cả state diagram và waveform của detector `001`; đây là cơ sở để phát hiện nhánh `D00` trên ảnh code trang 11 bị đảo điều kiện. Canonical dùng transition đúng theo **state diagram + waveform** và ghi lại sai khác nguồn để người học không bị nhầm.

---

## 69. Moore vs Mealy trong code

### Moore pattern

```verilog
out = f(CURRENT);
```

### Mealy pattern

Về định nghĩa nguồn:

```text
out = f(CURRENT, input)
```

Lecture 6 không cung cấp worked RTL Mealy hoàn chỉnh tương đương ví dụ `001`.

Vì vậy app không nên tự tạo một “mẫu chính thức của Lecture 6” rồi trình bày như thể nằm trong slide.

Có thể thêm sau dưới nhãn:

```text
BỔ SUNG NGOÀI TÀI LIỆU GỐC
```

---

## 70. Ba lỗi tư duy FSM phổ biến

### Lỗi 1 — FSM chỉ là một `case`

Sai.

`case` mới chỉ thường mô tả next-state hoặc output logic.

FSM còn cần state register.

### Lỗi 2 — `CURRENT` và `NEXT` là một

Không.

```text
CURRENT = trạng thái đang lưu
NEXT    = kết quả logic dự kiến cho lần cập nhật tiếp theo
```

### Lỗi 3 — state đổi ngay khi input đổi

Trong FSM đồng bộ mẫu:

- input có thể làm `NEXT` thay đổi qua logic tổ hợp;
- `CURRENT` chỉ cập nhật tại clock edge hoặc reset theo code register.

---

## 71. Bài tập nguồn của Lecture 6

Nguồn đưa các bài:

1. detector chuỗi `1011`;
2. vending machine giá 15 xu, nhận 5/10/15 xu theo sơ đồ state cho sẵn;
3. output=1 khi có 3 input liên tiếp bằng `1`, hoạt động ở cạnh xuống;
4. bài tương tự hoạt động ở cạnh lên.

### Cách làm thống nhất

Mỗi bài đều phải đi theo:

```text
1. Đọc state diagram
2. Liệt kê state
3. Mã hóa state
4. Viết next-state logic
5. Viết state register
6. Viết output logic
7. Trace vài input
8. Sau đó mới mô phỏng
```

---

## 72. Practice ladder — Lesson 10

### A. State encoding

Có 4 state. Tối thiểu cần bao nhiêu bit nếu dùng binary encoding như ví dụ nguồn?

### B. Read transition

Trong state `D0`, theo code nguồn:

- `in=0` → ?
- `in=1` → ?

### C. Read reset

Trong:

```verilog
always @(posedge clk or negedge rst_n)
```

reset tác động theo mức logic nào?

### D. Moore output

Vì sao `out = (CURRENT == D001)` là Moore?

### E. Debug tư duy

Nếu `NEXT` thay đổi nhưng chưa có `posedge clk`, `CURRENT` có phải lập tức đổi theo không?

---

## 73. Mastery check — Lesson 10

- [ ] Tôi định nghĩa được FSM.
- [ ] Tôi phân biệt Moore/Mealy.
- [ ] Tôi kể được 3 khối FSM.
- [ ] Tôi mã hóa state.
- [ ] Tôi đọc được next-state case.
- [ ] Tôi hiểu state register.
- [ ] Tôi đọc được reset active-low trong ví dụ.
- [ ] Tôi viết được output Moore.
- [ ] Tôi trace state bằng tay.
- [ ] Tôi biết phải đối chiếu spec ↔ state diagram ↔ RTL ↔ waveform.

---

# LESSON 11 — MÔ PHỎNG VỚI ISE XILINX 14.7

**Slug:** `mo-phong-ise`  
**Nguồn chính:** `Huong dan mo phong mach dung ISE Xilinx 14.7(1).docx`, 10 trang.

---

## 74. Mục tiêu của bài thực hành

Tài liệu ISE không bắt đầu từ một code ngẫu nhiên. Nó đi từ bài toán logic:

> Thiết kế decoder 2 đường sang 4 đường, output active-high.

Rồi thực hiện chuỗi:

```text
Sơ đồ khối
→ bảng trạng thái
→ DUT Verilog
→ syntax check
→ testbench
→ simulation
→ waveform
```

Đây chính là điểm nối hoàn chỉnh từ C3 sang Verilog và verification.

---

## 75. Bước 1 — Sơ đồ khối

Decoder 2→4:

```text
       ┌─────────────┐
I[1:0] │ decoder 2→4 │ → Q[3:0]
       └─────────────┘
```

Hai input chọn một trong bốn output active-high.

---

## 76. Bước 2 — Bảng trạng thái

Theo guide:

| I1 | I0 | Q3 | Q2 | Q1 | Q0 |
|---:|---:|---:|---:|---:|---:|
| 0 | 0 | 0 | 0 | 0 | 1 |
| 0 | 1 | 0 | 0 | 1 | 0 |
| 1 | 0 | 0 | 1 | 0 | 0 |
| 1 | 1 | 1 | 0 | 0 | 0 |

Tự kiểm trước khi mở ISE:

```text
I=00 → Q=0001
I=01 → Q=0010
I=10 → Q=0100
I=11 → Q=1000
```

---

## 77. Bước 3 — Tạo project ISE

Theo guide:

1. mở ISE Design Suite 14.7;
2. `File → New Project`;
3. nhập `Name`;
4. chọn `Project Location`;
5. chọn `Top-level source type`;
6. `Next`;
7. chọn các thông số project theo bài thực hành;
8. `Finish`.

Sau đó:

```text
Project → New Source
```

chọn:

```text
Verilog Module
```

và tạo source cho DUT.

---

## 78. Khai báo I/O trong wizard

Bài có:

```text
2 input : I1, I0
4 output: Q3, Q2, Q1, Q0
```

Guide lưu ý có thể khai báo từng chân hoặc theo bus.

Canonical dùng bus vì khớp code nguồn:

```verilog
input  [1:0] I;
output [3:0] Q;
```

---

## 79. DUT từ tài liệu

Nguồn dùng:

```verilog
module decoder_2to4 (
    input  [1:0] I,
    output [3:0] Q
);
    reg [3:0] Y_TAM;

    always @(I) begin
        case (I)
            2'b00: Y_TAM = 4'b0001;
            2'b01: Y_TAM = 4'b0010;
            2'b10: Y_TAM = 4'b0100;
            2'b11: Y_TAM = 4'b1000;
        endcase
    end

    assign Q = Y_TAM;
endmodule
```

### 79.1. Đọc code trước khi chạy

```text
I=00 → Y_TAM=0001
I=01 → Y_TAM=0010
I=10 → Y_TAM=0100
I=11 → Y_TAM=1000
Q = Y_TAM
```

Nếu chưa dự đoán được bốn trường hợp này thì chưa nên chuyển thẳng sang waveform.

---

## 80. Check Syntax

Guide chỉ dẫn:

```text
Implementation
→ Implement Design
→ Synthesize
→ XST
→ Check Syntax
```

Sau đó Run/Rerun.

Mục tiêu bước này:

```text
code có lỗi cú pháp không?
```

Dấu tích xanh trong guide biểu thị kiểm tra cú pháp thành công.

> Syntax đúng chưa có nghĩa chức năng đúng. Vì thế còn phải mô phỏng.

---

## 81. Bước 4 — Tạo testbench

Theo guide:

```text
New Source
→ Verilog Test Fixture
→ đặt File name
→ Next
→ Finish
```

Testbench có hai vai trò:

```text
1. tạo input stimulus
2. quan sát output DUT
```

Testbench **không phải DUT**.

---

## 82. DUT/UUT là gì trong bài này?

DUT/UUT là module đang được kiểm thử.

Nếu module thiết kế là:

```verilog
module decoder_2to4 (...)
```

thì testbench cần instantiate module đó.

Canonical dùng tên nhất quán:

```verilog
decoder_2to4 uut (
    .I(I),
    .Q(Q)
);
```

> **Ghi chú nguồn:** guide ở trang testbench ghi `GM24 uut (...)` dù phần DUT trước đó có tên `decoder_2to4`. Khi học, phải hiểu tên module instantiate phải khớp module thực tế trong project. Canonical thống nhất về `decoder_2to4` để tránh học sai do tên ví dụ không đồng nhất.

---

## 83. Testbench canonical bám guide

```verilog
module TB;
    // Inputs
    reg [1:0] I;

    // Outputs
    wire [3:0] Q;

    // Unit Under Test
    decoder_2to4 uut (
        .I(I),
        .Q(Q)
    );

    initial begin
        I = 2'b00;
        #100;
    end

    always #100 I[0] = ~I[0];
    always #200 I[1] = ~I[1];
endmodule
```

Đây là phiên bản giữ logic stimulus của guide và chỉ chuẩn hóa tên DUT cho nhất quán.

---

## 84. Đọc stimulus theo timeline

Khởi đầu:

```text
t=0: I=00
```

`I[0]` toggle mỗi 100 ns.

`I[1]` toggle mỗi 200 ns.

Dự đoán:

| Thời gian | I1 I0 | Q mong đợi |
|---:|---|---|
| 0 | 00 | 0001 |
| 100 ns | 01 | 0010 |
| 200 ns | 10 | 0100 |
| 300 ns | 11 | 1000 |
| 400 ns | 00 | 0001 |

Chu kỳ sau lặp lại.

#### Vì sao testbench này hay cho bài decoder?

Hai bit input tự tạo bộ đếm nhị phân thời gian:

```text
00 → 01 → 10 → 11 → 00 ...
```

nên quét hết bốn tổ hợp.

---

## 85. Chạy Behavioral Simulation

Guide:

```text
Simulation
→ Behavioral Check Syntax
```

sau khi hết lỗi:

```text
Simulate Behavioral Model
```

Run/Rerun để mở kết quả waveform.

---

## 86. Đọc waveform đúng cách

Không chỉ hỏi “có sóng hiện lên không?”.

Phải kiểm tra từng khoảng:

```text
I=00 → Q0=1
I=01 → Q1=1
I=10 → Q2=1
I=11 → Q3=1
```

Ba câu hỏi:

1. input có chạy đúng stimulus không?
2. output có khớp bảng trạng thái không?
3. bit order trên waveform có đúng với `[3:0]` và `[1:0]` không?

---

## 87. Nếu waveform không đúng, kiểm tra theo thứ tự

Phần dưới đây là checklist biên soạn trực tiếp từ flow của guide, không mở rộng sang debug tool nâng cao.

### 87.1. Kiểm tra spec

Bảng trạng thái có đúng bài không?

### 87.2. Kiểm tra DUT

- module name;
- port name;
- width;
- case mapping.

### 87.3. Kiểm tra testbench

- instance có đúng module không;
- named port mapping có đúng không;
- input có được initialize không;
- stimulus có thực sự thay đổi không.

### 87.4. Kiểm tra simulation mode

Đang chạy Behavioral Simulation đúng source/testbench chưa?

---

## 88. Sự khác nhau giữa DUT và testbench

| DUT | Testbench |
|---|---|
| mạch cần thiết kế | môi trường kiểm tra |
| có input/output chức năng | tạo stimulus và quan sát |
| được viết để mô tả phần cứng của bài | theo tài liệu, dùng cấu trúc mô phỏng như `initial`, delay |
| decoder 2→4 | module `TB` |

> **Cạm bẫy:** “testbench cũng là design module vì đều viết bằng Verilog” → sai về vai trò trong bài học.

---

## 89. Liên hệ toàn môn qua bài ISE

Bài decoder 2→4 nhỏ nhưng nối gần như toàn bộ chuỗi:

```text
C1
bit / binary
    ↓
C2
Boolean / truth table
    ↓
C3
decoder 2→4
    ↓
Lecture 2–5
Verilog module + case
    ↓
ISE
DUT + testbench + waveform
```

Đây là lý do app không nên tách phần mô phỏng thành “10 bước click phần mềm” không liên quan đến kiến thức trước đó.

---

## 90. Practice ladder — Lesson 11

### A. Predict before simulation

Không mở waveform. Điền output:

```text
I=00 → Q=?
I=01 → Q=?
I=10 → Q=?
I=11 → Q=?
```

### B. Tìm lỗi kết nối

DUT:

```verilog
module decoder_2to4(input [1:0] I, output [3:0] Q);
```

TB:

```verilog
decoder_2to4 uut (
    .I(Q),
    .Q(I)
);
```

Chỉ ra lỗi port mapping.

### C. Timeline

Từ hai dòng:

```verilog
always #100 I[0] = ~I[0];
always #200 I[1] = ~I[1];
```

viết `I` tại:

```text
0, 100, 200, 300, 400 ns
```

### D. Phân loại lỗi

- typo trong `endmodule` → syntax hay functional?
- case map `2'b10` thành `0010` → syntax hay functional?

### E. Đối chiếu waveform

Nếu `I=10` nhưng `Q=0010`, hãy quay lại dòng `case` nào trước tiên?

---

## 91. Mastery check — Lesson 11

- [ ] Tôi phân biệt DUT/UUT và testbench.
- [ ] Tôi biết flow tạo project/source theo guide.
- [ ] Tôi biết Check Syntax không đồng nghĩa chức năng đúng.
- [ ] Tôi đọc được DUT decoder.
- [ ] Tôi instantiate đúng module trong TB.
- [ ] Tôi hiểu hai dòng `always #...` đang tạo stimulus gì.
- [ ] Tôi dự đoán được timeline 00→01→10→11.
- [ ] Tôi chạy Behavioral Simulation theo guide.
- [ ] Tôi đối chiếu waveform với truth table.
- [ ] Tôi biết kiểm tra tên module/port khi TB không kết nối đúng.

---

# 92. BẢN ĐỒ KIẾN THỨC PHẦN II

```text
LECTURE 1
WHY HDL + DESIGN FLOW
│
├─ schematic vs HDL
├─ RTL simulation
├─ synthesis / netlist
├─ implementation
├─ timing simulation
└─ top-down / bottom-up
        │
        ▼
LECTURE 2
VERILOG BASICS
│
├─ module
├─ port / bus
├─ wire
├─ reg
└─ assign
        │
        ▼
LECTURE 3
OPERATORS + MODELING
│
├─ numbers / x / z
├─ arithmetic / relation / equality
├─ logical / bitwise / reduction
├─ shift / conditional
├─ concatenation / replication
└─ dataflow / behavioral / structural
        │
        ▼
LECTURE 4
MODULE HIERARCHY
│
├─ instantiate
├─ positional mapping
├─ named mapping
└─ 1-bit adder → 4-bit adder
        │
        ▼
LECTURE 5
BEHAVIORAL
│
├─ initial / always
├─ sensitivity
├─ blocking / non-blocking
├─ if / case
└─ loops
        │
        ▼
LECTURE 6
FSM
│
├─ state encoding
├─ next-state
├─ state register
└─ output logic
        │
        ▼
ISE 14.7
VERIFICATION
│
├─ DUT
├─ syntax check
├─ testbench
├─ stimulus
└─ waveform
```

---

# 93. BẢNG “THẤY CODE → NGHĨ PHẦN CỨNG/VAI TRÒ”

| Khi thấy | Nghĩ ngay |
|---|---|
| `module ... endmodule` | một khối thiết kế |
| `input/output` | giao tiếp của khối |
| `wire` | kết nối/net trong cách dạy của khóa học |
| `reg` | biến nhận procedural assignment; chưa đủ kết luận FF |
| `assign` | continuous/dataflow relation |
| `always @(*)` | procedural combinational description |
| `always @(posedge clk)` | cập nhật theo cạnh clock |
| `=` trong combinational example | blocking assignment |
| `<=` trong clocked example | non-blocking assignment |
| `case(selector)` | lựa chọn nhiều nhánh / decode/mux/state logic |
| module instance | một khối phần cứng con |
| `.port(signal)` | named port connection |
| `CURRENT/NEXT` | current state / next-state result |
| `initial`, `#100` trong TB | stimulus/timing simulation theo guide |
| waveform | bằng chứng để đối chiếu hành vi với spec |

---

# 94. BẢNG BẪY TRỌNG TÂM PHẦN II

| Sai lầm | Cách hiểu đúng trong khóa học |
|---|---|
| Verilog chạy như chương trình tuần tự | Verilog mô tả phần cứng/mô phỏng; nhiều cấu trúc đồng thời |
| `reg` = FF | phụ thuộc cách gán và cấu trúc logic |
| `wire` = biến phần mềm | wire là net/kết nối theo tài liệu |
| `assign` đặt trong `always` | continuous assign nằm ngoài procedural block |
| `&&` = `&` | logical khác bitwise |
| reduction `&A` = `A&B` | reduction: nhiều bit → 1 bit |
| `==` = `===` | khác cách xử lý `x/z` |
| positional port đổi thứ tự được | phải khớp thứ tự module con |
| named mapping cần đúng thứ tự | không; cần đúng tên port |
| `always @(*)` = clocked block | không; thường dùng combinational |
| `posedge clk` = input đổi là chạy | chỉ phản ứng ở cạnh lên clock |
| `=` và `<=` giống nhau | khóa học phân biệt combinational/sequential usage |
| FSM = state register | còn next-state + output logic |
| NEXT = CURRENT mọi lúc | NEXT là logic dự kiến; CURRENT là state lưu |
| Moore output nhìn input trực tiếp | Moore output phụ thuộc state |
| DUT = TB | DUT là mạch; TB là môi trường kiểm tra |
| Check Syntax xong là thiết kế đúng | còn phải simulation và đối chiếu waveform |

---

# 95. LỘ TRÌNH HỌC VERILOG/FSM/ISE CHO NGƯỜI MẤT GỐC

Không nên học Lecture 2–5 theo thứ tự “nhớ toàn bộ cú pháp rồi mới code”.

Dùng vòng:

```text
1. Chọn mạch đã biết ở C3/C4
2. Viết biểu diễn đơn giản nhất
3. Đọc code thành mạch
4. Dự đoán output
5. Mô phỏng
6. So sánh waveform
```

## Chặng A — Mạch tổ hợp

```text
Half Adder
→ assign
→ Decoder
→ case
→ MUX
→ conditional operator
```

## Chặng B — Hierarchy

```text
1-bit adder
→ module instance
→ 4-bit adder
```

## Chặng C — Mạch tuần tự

```text
DFF
→ posedge
→ non-blocking
→ counter
```

## Chặng D — FSM

```text
state diagram
→ encoding
→ NEXT
→ CURRENT
→ output
```

## Chặng E — Verification

```text
DUT
→ TB
→ stimulus
→ waveform
```

---

# 96. Mini project xuyên suốt đề xuất trong app

Không cần thêm feature. Chỉ cần dùng lại các lesson hiện có để cho người học thấy một đường xuyên suốt.

## Project A — Decoder 2→4

Đi qua:

```text
C2 truth table
→ C3 decoder
→ Lecture 3 dataflow
→ Lecture 5 case behavioral
→ ISE testbench/waveform
```

## Project B — Adder 4 bit

Đi qua:

```text
C3 Full Adder
→ Lecture 4 addbit
→ 4 instances
→ carry chain
```

## Project C — FSM detector

Đi qua:

```text
C4 state machine
→ Lecture 6 encoding
→ next-state
→ register
→ output
→ simulation
```

Ba project này đủ để biến phần học từ “đọc cú pháp” thành “xây phần cứng”.

---

# 97. Điều không nên tự thêm vào lesson chính ở đợt này

Các chủ đề sau không nằm đầy đủ trong nguồn Phần II:

- SystemVerilog `logic`;
- `always_comb` / `always_ff`;
- UVM;
- assertion/coverage;
- formal verification;
- CDC;
- timing constraint chuyên sâu;
- setup/hold/metastability chuyên sâu;
- state encoding one-hot/Gray optimization;
- testbench file I/O nâng cao;
- regression automation.

Nếu sau này cần, thêm dưới nhãn:

```text
BỔ SUNG NGOÀI TÀI LIỆU MÔN HỌC
```

Không trộn vào canonical hiện tại.

---

# 98. CHECKLIST PHẦN II

## Thiết kế flow

- [ ] Schematic vs HDL.
- [ ] RTL design.
- [ ] Functional simulation.
- [ ] Synthesis/implementation.
- [ ] Timing simulation.
- [ ] Device programming.
- [ ] Top-down/bottom-up.

## Verilog nền tảng

- [ ] module.
- [ ] port/bus.
- [ ] wire/reg.
- [ ] assign.
- [ ] literal số.
- [ ] `0/1/x/z`.

## Operator

- [ ] arithmetic.
- [ ] relational.
- [ ] equality/case equality.
- [ ] logical.
- [ ] bitwise.
- [ ] reduction.
- [ ] shift.
- [ ] conditional.
- [ ] concatenation.
- [ ] replication.

## Modeling / hierarchy

- [ ] dataflow.
- [ ] behavioral.
- [ ] structural.
- [ ] module instance.
- [ ] positional mapping.
- [ ] named mapping.

## Behavioral

- [ ] initial.
- [ ] always.
- [ ] sensitivity.
- [ ] begin/end.
- [ ] fork/join.
- [ ] `=` vs `<=`.
- [ ] if/else.
- [ ] case/casez/casex.
- [ ] loops.

## FSM

- [ ] Moore/Mealy.
- [ ] encoding.
- [ ] next-state.
- [ ] state register.
- [ ] output logic.
- [ ] trace state.

## ISE

- [ ] project.
- [ ] design source.
- [ ] Check Syntax.
- [ ] Verilog Test Fixture.
- [ ] DUT/UUT.
- [ ] stimulus.
- [ ] Behavioral Simulation.
- [ ] waveform verification.

---

---

# 99. CHUẨN ĐẦU RA TOÀN MÔN

Sau master content này, người học phải nhìn và làm được toàn bộ chuỗi:

```text
SỐ / BIT
↓
BOOLEAN
↓
KARNAUGH
↓
MẠCH TỔ HỢP / MẠCH SỐ HỌC
↓
FLIP-FLOP / COUNTER / REGISTER
↓
HDL DESIGN FLOW
↓
VERILOG MODULE / OPERATOR / HIERARCHY
↓
BEHAVIORAL VERILOG
↓
FSM
↓
TESTBENCH
↓
WAVEFORM
↓
KIỂM TRA LẠI YÊU CẦU BAN ĐẦU
```

Checklist năng lực cuối:

- [ ] Đổi cơ số, BCD, bù 1/bù 2 và đọc đúng độ rộng bit.
- [ ] Biến truth table thành SOP/POS, rút gọn bằng Boolean/K-map.
- [ ] Thiết kế/đọc encoder, decoder, MUX/DEMUX, adder/subtractor, comparator, parity.
- [ ] Đọc state table/state diagram; phân biệt Moore/Mealy; dùng RS/JK/T/D và excitation table.
- [ ] Phân tích ripple/synchronous counter, Mod-M và shift register.
- [ ] Viết/đọc `module`, port, bus, `wire/reg`, `assign`, toán tử và module instance.
- [ ] Phân biệt dataflow/behavioral/structural; dùng `always`, `initial`, `if/case`, `=`/`<=` đúng ngữ cảnh theo giáo trình.
- [ ] Chuyển FSM thành state encoding → next-state → state register → output logic.
- [ ] Tạo DUT/testbench, dự đoán stimulus, chạy Behavioral Simulation và đọc waveform để xác minh thiết kế.

Master content này là **source học tập cấp canonical** cho 11 lesson; summary, glossary, traps, flashcards và quiz phải được sinh từ đây, không được dùng bản tóm tắt cũ để suy ngược bài giảng.


# 100. GHI CHÚ NGUỒN VÀ CHUẨN HÓA

**Phần I — C1–C4:** giữ trình tự và ví dụ cốt lõi của bốn slide; các cách ghi có khả năng gây nhầm được chú thích thay vì âm thầm sửa. C3 chỉ nêu tiêu đề ALU ở cuối nên master không tự phát triển một chương ALU đầy đủ từ nguồn này. Các chủ đề như carry-lookahead, hazard, setup/hold chuyên sâu hoặc timing closure không được coi là nội dung gốc nếu chưa có nguồn bổ sung.

**Phần II — Lecture/ISE:**

1. Nội dung học thuật được giữ theo Lecture 1–6 và guide ISE.
2. Code trong file được chuẩn hóa indentation và keyword chữ thường khi cần để dễ học/chạy.
3. Những khác biệt trong chính nguồn được ghi chú thay vì âm thầm xóa:
   - tên `GM24` trong testbench ISE so với `decoder_2to4` ở DUT;
   - nhánh `D00` của next-state code trang 11 không khớp state diagram + waveform trang 8; canonical ưu tiên state diagram/waveform cho chức năng detector `001` và ghi rõ việc chuẩn hóa;
   - assignment style trong output logic của FSM giữa trang 13 và code tổng hợp trang 14.
4. Phần lịch sử chuẩn Verilog trong Lecture 2 chỉ nên trình bày với nhãn “theo slide” vì mốc tài liệu không phải thông tin cập nhật hiện hành.
5. Không tự biến câu hỏi/bài tập nguồn thành lời giải chính thức nếu chưa đối chiếu đầy đủ sơ đồ/hình đi kèm.

---

> **Câu xương sống Phần II:**  
> **Đừng hỏi “cú pháp này viết thế nào?” trước. Hãy hỏi “mạch nào cần được mô tả, state/data nào phải chuyển, và waveform nào sẽ chứng minh nó đúng?”**
