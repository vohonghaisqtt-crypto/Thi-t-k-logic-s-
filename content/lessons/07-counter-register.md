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
