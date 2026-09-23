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
