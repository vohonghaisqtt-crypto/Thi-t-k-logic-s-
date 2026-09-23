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
