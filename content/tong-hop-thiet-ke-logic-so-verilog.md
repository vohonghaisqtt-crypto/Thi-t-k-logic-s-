# TỔNG HỢP THIẾT KẾ LOGIC SỐ VÀ VERILOG HDL

> Tài liệu học nhanh được cấu trúc lại từ bộ tài liệu đã cung cấp: Chương 1-4 Điện tử số, Lecture 1-6 Thiết kế logic số với Verilog HDL, và hướng dẫn mô phỏng bằng ISE Xilinx 14.7.

---

## Mục lục

1. [Bản đồ khung xương](#1-bản-đồ-khung-xương)
2. [Từ điển khái niệm cốt lõi](#2-từ-điển-khái-niệm-cốt-lõi)
3. [Bẫy hay nhầm lẫn](#3-bẫy-hay-nhầm-lẫn)
4. [Lộ trình học cấp tốc](#4-lộ-trình-học-cấp-tốc)
5. [Nguồn tài liệu](#5-nguồn-tài-liệu)

---

# 1. Bản đồ khung xương

```text
I. NỀN TẢNG BIỂU DIỄN THÔNG TIN
│
├─ 1. Hệ đếm
│   ├─ Nhị phân / thập phân / bát phân / thập lục phân
│   ├─ Chuyển đổi cơ số
│   ├─ BCD, Excess-3, Gray
│   └─ Số có dấu: bit dấu, bù 1, bù 2
│
└─ 2. Đại số Boole
    ├─ AND, OR, NOT
    ├─ Định luật Boole, DeMorgan
    ├─ SOP, POS, minterm, maxterm
    ├─ Karnaugh
    └─ NAND/NOR/XOR/XNOR
             │
             ▼
II. THIẾT KẾ MẠCH SỐ
│
├─ 3. Mạch logic tổ hợp = KHÔNG NHỚ
│   ├─ Phân tích ↔ thiết kế
│   ├─ Encoder / Decoder
│   ├─ MUX / DEMUX
│   ├─ Bộ cộng / bộ trừ
│   ├─ Comparator
│   ├─ Parity
│   └─ ALU
│
└─ 4. Mạch logic tuần tự = CÓ NHỚ
    ├─ Trạng thái hiện tại / trạng thái kế tiếp
    ├─ Flip-Flop RS, JK, T, D
    ├─ Bộ đếm
    ├─ Thanh ghi
    └─ Moore / Mealy
             │
             ▼
III. CHUYỂN MẠCH SỐ THÀNH HDL
│
├─ 5. Tổng quan thiết kế số bằng HDL
├─ 6. Verilog cơ bản: module, I/O, wire, reg, assign
├─ 7. Toán tử Verilog
├─ 8. Cấu trúc module
├─ 9. Mô tả hành vi: always, initial, if, case, =, <=
└─ 10. FSM
             │
             ▼
IV. KIỂM CHỨNG
    └─ ISE Xilinx
        ├─ Tạo project
        ├─ Viết module
        ├─ Viết testbench
        └─ Behavioral simulation / waveform
```

## 1.1. Mối liên hệ logic

### Hệ đếm → mạch số học
Không hiểu nhị phân, số có dấu, bù 1 và bù 2 thì rất dễ sai khi học bộ cộng, bộ trừ và biểu diễn số trong Verilog.

### Boolean → mạch tổ hợp

```text
Bảng chân trị → Hàm Boolean → Karnaugh → Cổng logic → Mạch tổ hợp
```

### Mạch tổ hợp → mạch tuần tự
- **Tổ hợp:** đầu ra chỉ phụ thuộc đầu vào hiện tại.
- **Tuần tự:** đầu ra còn phụ thuộc trạng thái bên trong, tức có nhớ.

### Flip-Flop → bộ đếm / thanh ghi / FSM

```text
Flip-Flop
├─ Thanh ghi
├─ Bộ đếm
└─ Máy trạng thái hữu hạn FSM
```

### Mạch số → Verilog → mô phỏng

```text
Yêu cầu
→ Sơ đồ khối
→ Bảng chân trị / bảng trạng thái
→ Biểu thức logic
→ Thiết kế mạch
→ Verilog
→ Testbench
→ Waveform
→ Kiểm tra
```

> **Câu xương sống:** Yêu cầu → bảng chân trị/trạng thái → biểu thức logic → tối giản → cấu trúc mạch → Verilog → mô phỏng kiểm tra.

---

# 2. Từ điển khái niệm cốt lõi

## 2.1. Hệ đếm và biểu diễn số

| Hệ | Cơ số | Ký số |
|---|---:|---|
| Nhị phân | 2 | 0, 1 |
| Bát phân | 8 | 0...7 |
| Thập phân | 10 | 0...9 |
| Thập lục phân | 16 | 0...9, A...F |

Giá trị số cơ số `r`:

```text
N = Σ aᵢ × rⁱ
```

- **bit:** binary digit.
- **LSB:** bit trọng số nhỏ nhất.
- **MSB:** bit trọng số lớn nhất.
- `n` bit không dấu có `2^n` giá trị, từ `0` đến `2^n - 1`.
- 1 byte = 8 bit.

### Chuyển đổi

**Thập phân nguyên → cơ số r:** chia liên tiếp cho `r`, lấy dư, viết dư từ dưới lên.

**Phần thập phân → cơ số r:** nhân liên tiếp với `r`, lấy phần nguyên theo đúng thứ tự xuất hiện.

**Binary ↔ Octal:** nhóm 3 bit.  
**Binary ↔ Hex:** nhóm 4 bit.

### BCD
Mỗi **chữ số thập phân** mã bằng 4 bit.

```text
25₁₀ → BCD = 0010 0101
```

### Excess-3

```text
Excess-3 = BCD + 0011
```

### Gray
Hai từ mã kế tiếp chỉ khác nhau đúng 1 bit.

## 2.2. Số có dấu

### Bit dấu
- MSB = 0: dương.
- MSB = 1: âm.

### Bù 1
Số âm: đảo từng bit `0 ↔ 1`. Khi cộng bù 1, carry vượt ngoài quay lại cộng vào LSB.

### Bù 2

```text
Bù 2 = Bù 1 + 1
A - B = A + bù 2 của B
```

Carry vượt quá độ rộng từ được bỏ đi.

## 2.3. Đại số Boole

Ba phép cơ bản:
- AND: `A·B`
- OR: `A+B`
- NOT: `¬A`

| Tên | Công thức |
|---|---|
| Đồng nhất | `A·1=A`, `A+0=A` |
| Phần tử 0/1 | `A·0=0`, `A+1=1` |
| Bù | `A·¬A=0`, `A+¬A=1` |
| Bất biến | `A·A=A`, `A+A=A` |
| Hấp thụ | `A+A·B=A`, `A(A+B)=A` |
| Hoàn nguyên | `¬(¬A)=A` |
| Hoán vị | `AB=BA`, `A+B=B+A` |
| Kết hợp | `(AB)C=A(BC)` |
| Phân phối | `A(B+C)=AB+AC` |
| DeMorgan 1 | `¬(AB)=¬A+¬B` |
| DeMorgan 2 | `¬(A+B)=¬A·¬B` |

Thứ tự ưu tiên:

```text
( ) → NOT → AND → OR
```

### Đối ngẫu
Đổi `AND ↔ OR`, `0 ↔ 1`; không tự động đảo biến.

## 2.4. SOP, POS, minterm, maxterm

### SOP

```text
F = ¬A·B + A·C
```

### POS

```text
F = (A+B)(¬A+C)
```

### Minterm
- Tích chứa đủ biến.
- Bit 1 → biến thường.
- Bit 0 → biến đảo.

Ví dụ `ABC=101`:

```text
m5 = A·¬B·C
F = Σm(các hàng có F=1)
```

### Maxterm
- Tổng chứa đủ biến.
- Bit 0 → biến thường.
- Bit 1 → biến đảo.

```text
M5 = ¬A+B+¬C
F = ΠM(các hàng có F=0)
```

## 2.5. Karnaugh

1. Ô sắp theo mã Gray.
2. SOP → nhóm số 1.
3. POS → nhóm số 0.
4. Nhóm có `1, 2, 4, 8, 16...` ô.
5. Nhóm càng lớn càng tốt.
6. Mép đối diện được xem là kề nhau.
7. Don't-care `X` chỉ dùng khi giúp tối giản hơn.

Nếu nhóm có `2^k` ô thì `k` biến được loại.

## 2.6. Cổng logic

| Cổng | Công thức |
|---|---|
| AND | `Y=A·B` |
| OR | `Y=A+B` |
| NOT | `Y=¬A` |
| NAND | `Y=¬(AB)` |
| NOR | `Y=¬(A+B)` |
| XOR | `Y=A⊕B=¬A·B+A·¬B` |
| XNOR | `Y=¬(A⊕B)=AB+¬A·¬B` |
| BUFFER | `Y=A` |

XOR:

```text
A⊕0=A
A⊕1=¬A
A⊕A=0
A⊕¬A=1
```

- XOR nhiều input = 1 khi số bit 1 là lẻ.
- XNOR nhiều input = 1 khi số bit 1 là chẵn.
- NAND và NOR là cổng vạn năng.

## 2.7. Mạch logic tổ hợp

```text
Y = f(X)
```

**Phân tích:** `Mạch → biểu thức → bảng trạng thái → rút gọn → mạch tối ưu`  
**Thiết kế:** `Yêu cầu → I/O → bảng chân trị → hàm Boolean → Karnaugh → mạch`


## 2.8. Encoder và Decoder

### Encoder

```text
2^n input → n bit output
```

Encoder thường giả thiết một input hoạt động. Nếu nhiều input có thể cùng hoạt động, dùng **priority encoder**.

### Decoder

```text
n input → tối đa 2^n output
```

Decoder 2→4 active-high:

| I1 | I0 | Q3 | Q2 | Q1 | Q0 |
|---:|---:|---:|---:|---:|---:|
| 0 | 0 | 0 | 0 | 0 | 1 |
| 0 | 1 | 0 | 0 | 1 | 0 |
| 1 | 0 | 0 | 1 | 0 | 0 |
| 1 | 1 | 1 | 0 | 0 | 0 |

- Active-high: trạng thái kích hoạt = 1.
- Active-low: trạng thái kích hoạt = 0.
- LED 7 đoạn common cathode thường sáng bằng 1.
- LED 7 đoạn common anode thường sáng bằng 0.

## 2.9. Binary ↔ Gray

### Binary → Gray

```text
G2 = B2
G1 = B2 ⊕ B1
G0 = B1 ⊕ B0
```

### Gray → Binary

```text
B2 = G2
B1 = B2 ⊕ G1
B0 = B1 ⊕ G0
```

## 2.10. MUX và DEMUX

### MUX

```text
2^n data inputs
n select inputs
1 output
```

MUX 2:1:

```text
Y = ¬S·I0 + S·I1
```

MUX 4:1:

```text
Y = ¬S1¬S0·I0
  + ¬S1S0·I1
  + S1¬S0·I2
  + S1S0·I3
```

### DEMUX

```text
1 data input
n select inputs
2^n outputs
```

## 2.11. Mạch số học

### Half Adder

```text
S = A⊕B
C = A·B
```

### Full Adder

```text
S = A⊕B⊕Cin
Cout = A·B + Cin(A⊕B)
```

### Half Subtractor

```text
D = A⊕B
Borrow = ¬A·B
```

### Full Subtractor

```text
D = A⊕B⊕Bin
Bout = ¬A·B + ¬A·Bin + B·Bin
```

## 2.12. Comparator

Với 1 bit:

```text
A > B : A·¬B
A < B : ¬A·B
A = B : A XNOR B
```

Với nhiều bit, so từ MSB xuống.

## 2.13. Parity

```text
P_even = D0⊕D1⊕D2...
P_odd = ¬(D0⊕D1⊕D2...)
```

Khi kiểm tra parity phải tính cả parity bit.

## 2.14. Mạch logic tuần tự

Đầu ra phụ thuộc input hiện tại và trạng thái trong.

### Moore

```text
Output = f(State)
```

### Mealy

```text
Output = f(State, Input)
```

### Đồng bộ / không đồng bộ
- Đồng bộ: các phần tử trạng thái chịu tác động clock đồng thời.
- Không đồng bộ: các phần tử không cùng chịu tác động clock đồng thời.

## 2.15. Flip-Flop

### RS

```text
Q+ = S + ¬R·Q
```

| S | R | Q+ |
|---:|---:|---|
| 0 | 0 | giữ |
| 0 | 1 | 0 |
| 1 | 0 | 1 |
| 1 | 1 | cấm / X |

### JK

```text
Q+ = J·¬Q + ¬K·Q
```

| J | K | Hành vi |
|---:|---:|---|
| 0 | 0 | giữ |
| 0 | 1 | reset |
| 1 | 0 | set |
| 1 | 1 | toggle |

### T

```text
Q+ = T⊕Q
```

### D

```text
Q+ = D
```

### Bảng kích thích

> Trong tài liệu có chỗ trình bày FF-RS theo thứ tự **R,S**.

| Qn → Qn+1 | (R,S) | (J,K) | D | T |
|---|---|---|---:|---:|
| 0→0 | X0 | 0X | 0 | 0 |
| 0→1 | 01 | 1X | 1 | 1 |
| 1→0 | 10 | X1 | 0 | 1 |
| 1→1 | 0X | X0 | 1 | 0 |

`X` = don't-care.

### PRE / CLR
- PRE đặt Q = 1.
- CLR đặt Q = 0.
- Là input trực tiếp/không đồng bộ.

## 2.16. Bộ đếm

Counter Mod-M có M trạng thái.

```text
số trạng thái tối đa = 2^n
2^(n-1) < M ≤ 2^n
```

### Ripple counter
- Clock lan qua các FF.
- Có trễ lan truyền.

### Synchronous counter
- Các FF dùng chung clock.

Quy trình:

```text
M → chọn số FF → bảng trạng thái → bảng kích FF → Karnaugh → mạch
```

## 2.17. Thanh ghi

| Loại | Ý nghĩa |
|---|---|
| SISO | Serial In Serial Out |
| SIPO | Serial In Parallel Out |
| PISO | Parallel In Serial Out |
| PIPO | Parallel In Parallel Out |

## 2.18. Quy trình thiết kế bằng HDL

```text
Ý tưởng / đặc tả
→ RTL
→ Functional Simulation
→ Synthesis
→ Implementation
→ Timing Simulation
→ Programming / Hardware
```

- Top-down: hệ lớn → module nhỏ.
- Bottom-up: module nhỏ → hệ lớn.

## 2.19. Verilog cơ bản

### Module

```verilog
module ten_module (port_list);

    input ...;
    output ...;

    // mô tả phần cứng

endmodule
```

### wire
Dùng cho net/kết nối, thường được drive bởi `assign`, gate hoặc module khác.

### reg
Nhận giá trị trong procedural block như `always` hoặc `initial`.

> `reg` không có nghĩa tự động sinh Flip-Flop.

### assign

```verilog
assign Y = A & B;
```

Continuous assignment nằm ngoài `always`/`initial`.

## 2.20. Biểu diễn số trong Verilog

```text
0 : logic 0
1 : logic 1
x : không xác định
z : high impedance
```

Cú pháp:

```text
<size>'<base><value>
```

Ví dụ:

```verilog
4'd10
8'hC5
1'b1
6'hF
```

Base: `b`, `o`, `d`, `h`.

## 2.21. Toán tử Verilog

| Nhóm | Toán tử |
|---|---|
| Số học | `+ - * / %` |
| Quan hệ | `< <= > >=` |
| Equality | `== !=` |
| Case equality | `=== !==` |
| Logic | `&& || !` |
| Bitwise | `~ & | ^ ~^` |
| Reduction | `& ~& | ~| ^ ~^` |
| Shift | `<< >>` |
| Conditional | `?:` |
| Concatenation | `{A,B}` |
| Replication | `{n{A}}` |

- `&&` khác `&`.
- Reduction nhận một vector và cho ra một bit.
- `==`/`!=` khác `===`/`!==` khi xuất hiện `x/z`.

## 2.22. Module con

### Theo thứ tự

```verilog
child u0(A, B, Y);
```

### Theo tên

```verilog
child u0(
    .a(A),
    .b(B),
    .y(Y)
);
```

Named connection an toàn hơn khi module nhiều cổng.

## 2.23. Mô tả hành vi

### initial
Dùng nhiều trong testbench để tạo stimulus.

### always tổ hợp

```verilog
always @(*) begin
    ...
end
```

### always theo clock

```verilog
always @(posedge clk) begin
    Q <= D;
end
```

### Blocking

```verilog
a = b;
```

Quy tắc học: logic tổ hợp → ưu tiên `=`.

### Non-blocking

```verilog
Q <= D;
```

Quy tắc học: logic tuần tự theo clock → ưu tiên `<=`.

### if / case

```verilog
if (condition) begin
    ...
end else begin
    ...
end
```

```verilog
case (selector)
    ...
    default: ...
endcase
```

Loop: `forever`, `repeat`, `while`, `for`.

## 2.24. FSM

```text
Input
  ↓
Next-state logic
  ↓
next_state
  ↓
State Register ← Clock
  ↓
current_state
  ├─→ Next-state logic
  └─→ Output logic
```

Skeleton:

```verilog
parameter S0 = ..., S1 = ...;

always @(posedge clk or negedge rst_n) begin
    if (!rst_n)
        current_state <= S0;
    else
        current_state <= next_state;
end

always @(*) begin
    case (current_state)
        default: next_state = S0;
    endcase
end

always @(*) begin
    // output logic
end
```

## 2.25. Mô phỏng bằng ISE Xilinx 14.7

```text
1. Vẽ sơ đồ khối
2. Lập bảng trạng thái
3. Tạo project
4. Tạo Verilog Module
5. Khai báo I/O
6. Viết design
7. Tạo testbench
8. Sinh stimulus
9. Behavioral simulation
10. Đọc waveform và đối chiếu
```

Design module và testbench là hai vai trò khác nhau.

---

# 3. Bẫy hay nhầm lẫn

| # | Bẫy | Cách nhớ đúng |
|---:|---|---|
| 1 | Đổi phần nguyên và phần lẻ giống nhau | Nguyên: chia; lẻ: nhân |
| 2 | Binary→octal/hex nhóm sai | Octal 3 bit, hex 4 bit |
| 3 | BCD = binary | BCD mã từng chữ số |
| 4 | Bit dấu = bù 1 = bù 2 | Ba cách khác nhau |
| 5 | Carry bù 1 và bù 2 giống nhau | Bù 1 quay carry; bù 2 bỏ carry ngoài |
| 6 | `1+1=2` trong Boolean | OR: `1+1=1` |
| 7 | Đối ngẫu = lấy bù | Không giống nhau |
| 8 | Minterm/maxterm cùng quy tắc | Quy tắc literal đảo nhau |
| 9 | SOP nhóm 0 | SOP nhóm 1; POS nhóm 0 |
| 10 | K-map không nối qua mép | Mép đối diện kề nhau |
| 11 | Nhóm 3 hoặc 6 ô | Chỉ `2^k` ô |
| 12 | Don't-care bắt buộc dùng | Chỉ dùng khi có lợi |
| 13 | Mạch tổ hợp có nhớ | Có nhớ → tuần tự |
| 14 | Encoder thường xử lý nhiều input | Cần priority encoder |
| 15 | Active-low đọc như active-high | Kích hoạt có thể là 0 |
| 16 | Common-anode/cathode giống nhau | Thường anode active-low |
| 17 | MUX/DEMUX đảo chiều | MUX nhiều→một; DEMUX một→nhiều |
| 18 | Half Adder = Full Adder | Full Adder có Cin |
| 19 | Parity chỉ đếm data | Kiểm tra phải tính parity bit |
| 20 | RS luôn cấm cùng một mức | Xem active-high/active-low |
| 21 | PRE/CLR chờ clock | Là ngõ không đồng bộ |
| 22 | JK J=K=1 bị cấm | Toggle |
| 23 | D FF đảo input | `Q+=D` |
| 24 | T=1 → Q=1 | T=1 → đảo Q |
| 25 | Moore/Mealy chỉ khác hình vẽ | Khác hàm output |
| 26 | Mod-M cần M FF | Chọn n sao cho `2^n ≥ M` |
| 27 | Ripple = synchronous | Khác cách nhận clock |
| 28 | x = z | x unknown; z high impedance |
| 29 | `&&` = `&` | Logic khác bitwise |
| 30 | reduction `&A` = `A&B` | Reduction: vector → 1 bit |
| 31 | `==` = `===` | Khác khi có x/z |
| 32 | `<=` luôn là so sánh | Có thể là non-blocking assignment |
| 33 | `reg` chắc chắn tạo FF | Phụ thuộc cách mô tả |
| 34 | `assign` đặt trong `always` | Continuous assign nằm ngoài |
| 35 | Positional port đảo thứ tự được | Không |
| 36 | Sensitivity list thiếu signal vẫn ổn | Có thể mô phỏng sai |
| 37 | Clocked logic dùng blocking tùy ý | Học theo quy tắc sequential → `<=` |
| 38 | `initial` là logic chính của design | Chủ yếu dùng testbench trong tài liệu |
| 39 | FSM chỉ cần state register | Cần thêm next-state và output logic |
| 40 | Design module = testbench | Hai vai trò khác nhau |

---

# 4. Lộ trình học cấp tốc

## 4.1. Lộ trình 18-20 giờ

| Giai đoạn | Nội dung | Thời gian | Chuẩn đầu ra |
|---|---|---:|---|
| 0 | Nhìn toàn môn | 20 phút | Hiểu quan hệ các chương |
| 1 | Hệ đếm | 1.5 giờ | Đổi cơ số, bù 2 |
| 2 | Boolean + cổng | 1.5 giờ | Rút gọn cơ bản |
| 3 | Karnaugh | 1.5 giờ | Truth table→K-map |
| 4 | Mạch tổ hợp | 2.5 giờ | Decoder, MUX, adder... |
| 5 | Flip-Flop | 2 giờ | RS/JK/T/D |
| 6 | Counter + Register | 1.5 giờ | Counter cơ bản |
| 7 | Verilog nền tảng | 2 giờ | Module, wire/reg, assign |
| 8 | Module + behavioral | 2 giờ | always, if/case, `=`/`<=` |
| 9 | FSM | 2 giờ | State diagram→Verilog |
| 10 | ISE + testbench | 1 giờ | Mô phỏng waveform |
| 11 | Ôn bẫy + đề | 1.5-2 giờ | Giảm lỗi nhầm khái niệm |

## 4.2. Nếu còn 3 ngày

### Ngày 1
`Hệ đếm → Boolean → SOP/POS → Karnaugh → Cổng logic → Decoder/Encoder → MUX/DEMUX → Adder/Subtractor → Comparator/Parity`

### Ngày 2
`Mạch tuần tự → Flip-Flop → Counter → Register → Module → wire/reg → assign → Toán tử`

### Ngày 3
`always/initial → blocking/non-blocking → if/case → FSM → testbench → waveform → ôn bẫy`

## 4.3. Chu kỳ học mỗi chủ đề

```text
20% đọc lý thuyết
30% tự viết lại công thức/bảng
30% giải bài bằng tay
20% viết Verilog hoặc kiểm waveform
```

> Luôn hỏi: **Đoạn Verilog này đang mô tả phần cứng nào?**

## 4.4. Checklist

### Hệ đếm
- [ ] Decimal ↔ binary.
- [ ] Binary ↔ octal/hex.
- [ ] BCD vs binary.
- [ ] Bù 1/bù 2.
- [ ] Trừ bằng bù 2.

### Boolean
- [ ] DeMorgan.
- [ ] Hấp thụ.
- [ ] SOP/POS.
- [ ] Minterm/maxterm.
- [ ] Karnaugh.

### Mạch tổ hợp
- [ ] Decoder/Encoder.
- [ ] MUX/DEMUX.
- [ ] Half/Full Adder.
- [ ] Subtractor.
- [ ] Comparator.
- [ ] Parity.

### Mạch tuần tự
- [ ] RS/JK/T/D.
- [ ] Bảng kích thích.
- [ ] Moore/Mealy.
- [ ] Counter async/sync.
- [ ] Register.

### Verilog
- [ ] module/input/output.
- [ ] wire/reg.
- [ ] assign.
- [ ] bitwise/logical/reduction.
- [ ] `==`/`===`.
- [ ] module instantiation.
- [ ] `always @(*)`.
- [ ] `always @(posedge clk)`.
- [ ] `=` vs `<=`.
- [ ] if/case.
- [ ] FSM.
- [ ] testbench/waveform.

---

# 5. Nguồn tài liệu

1. `C1- He diem.pdf`
2. `C2-Ham Boole va cong Logic.pdf`
3. `C3-Mach Logic to hop.pdf`
4. `C4-Mach Logic tuan tu.pdf`
5. `Lecture_1-Tong quan ve Thiet ke so voi HDL.pdf`
6. `Lecture_2-Tổng quan về Verilog HDL.pdf`
7. `Lecture_3-Toan tu trong Verilog.pdf`
8. `Lecture_4-Cau truc module.pdf`
9. `Lecture_5-Mô tả hành vi.pdf`
10. `Lecture_6-May trang thai FSM.pdf`
11. `Huong dan mo phong mach dung ISE Xilinx 14.7.docx`

> Nếu ký hiệu hoặc quy ước trong tài liệu môn học khác quy ước phổ biến bên ngoài, ưu tiên đọc đúng quy ước mà tài liệu gốc sử dụng.
