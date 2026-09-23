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
