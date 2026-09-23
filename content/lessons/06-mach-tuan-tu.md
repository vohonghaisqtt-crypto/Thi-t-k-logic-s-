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
