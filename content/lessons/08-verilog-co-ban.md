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
