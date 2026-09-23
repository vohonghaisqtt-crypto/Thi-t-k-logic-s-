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
