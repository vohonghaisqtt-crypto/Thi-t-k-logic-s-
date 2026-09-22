import { Lesson, HeadingNode } from "@/lib/types";
import { curriculum } from "@/data/curriculum";

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[đĐ]/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export function extractHeadings(markdown: string): HeadingNode[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: HeadingNode[] = [];
  let match;

  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = slugify(text);
    headings.push({ id, text, level });
  }

  return headings;
}

const rawLessonsContent: Record<string, string> = {
  "he-dem": `## 1. Hệ đếm và Biểu diễn Số

Trong kỹ thuật số, thông tin được biểu diễn bằng các hệ đếm cơ số khác nhau:

| Hệ | Cơ số | Ký số |
|---|---:|---|
| Nhị phân (Binary) | 2 | 0, 1 |
| Bát phân (Octal) | 8 | 0...7 |
| Thập phân (Decimal) | 10 | 0...9 |
| Thập lục phân (Hexadecimal) | 16 | 0...9, A...F |

Giá trị số trong cơ số \`r\` bất kỳ:
\`\`\`text
N = Σ aᵢ × rⁱ
\`\`\`

- **bit (binary digit):** đơn vị đo thông tin nhị phân nhỏ nhất (0 hoặc 1).
- **LSB (Least Significant Bit):** bit có trọng số nhỏ nhất (bên phải cùng).
- **MSB (Most Significant Bit):** bit có trọng số lớn nhất (bên trái cùng).
- \`n\` bit không dấu biểu diễn được **\`2^n\` giá trị**, từ \`0\` đến \`2^n - 1\`.
- 1 byte = 8 bit.

---

## 2. Quy tắc Chuyển đổi Cơ số

### Chuyển đổi từ Thập phân sang Cơ số r
- **Phần nguyên:** Chia liên tiếp cho \`r\`, lấy số dư, viết kết quả dư từ dưới lên trên.
- **Phần thập phân (phần lẻ):** Nhân liên tiếp với \`r\`, lấy phần nguyên theo đúng thứ tự xuất hiện.

> **Mẹo nhớ:** Nguyên chia - Lẻ nhân.

### Chuyển đổi qua lại giữa Binary ↔ Octal ↔ Hex
- **Binary ↔ Octal:** Gom từng nhóm **3 bit** tính từ dấu phẩy nhị phân.
- **Binary ↔ Hex:** Gom từng nhóm **4 bit** tính từ dấu phẩy nhị phân.

---

## 3. Các Hệ Mã Đặc biệt

### Mã BCD (Binary-Coded Decimal)
Mỗi chữ số thập phân (0-9) được mã hóa riêng biệt bằng 4 bit nhị phân:
\`\`\`text
25₁₀ → BCD = 0010 0101
\`\`\`
> Cần phân biệt rõ: BCD mã hóa từng ký số, không đồng nhất với giá trị nhị phân thuần túy (\`25₁₀ = 11001₂\`).

### Mã Excess-3 (Dư 3)
Được tạo bằng cách cộng thêm \`0011₂\` (3 thập phân) vào mỗi nhóm mã BCD:
\`\`\`text
Excess-3 = BCD + 0011
\`\`\`

### Mã Gray (Mã phản chiếu)
Hai từ mã nhị phân liên tiếp nhau chỉ khác nhau **đúng 1 bit duy nhất**. Mã Gray giúp triệt tiêu hiện tượng xung nhiễu (glitch) khi chuyển trạng thái và là nền tảng của bìa Karnaugh.

---

## 4. Biểu diễn Số có Dấu

Trong máy tính, số âm có thể được biểu diễn bằng 3 phương pháp:

### Bit Dấu (Sign-Magnitude)
- Bit MSB làm bit dấu: \`MSB = 0\` là số dương, \`MSB = 1\` là số âm.
- Các bit còn lại thể hiện độ lớn.

### Số Bù 1 (One's Complement)
- Số dương: giữ nguyên dạng nhị phân.
- Số âm: đảo toàn bộ từng bit (\`0 ↔ 1\`).
- Khi thực hiện phép cộng bù 1, nếu xuất hiện bit nhớ (carry) vượt ra ngoài MSB, ta phải quay vòng (end-around carry) cộng tiếp vào LSB.

### Số Bù 2 (Two's Complement)
Đây là phương pháp chuẩn mực được dùng trong mọi bộ xử lý và ALU hiện đại:
\`\`\`text
Bù 2 = Bù 1 + 1
A - B = A + Bù 2 của B
\`\`\`
- Khi cộng bù 2, nếu xuất hiện bit nhớ carry vượt ra ngoài độ rộng từ bit quy định thì **bỏ đi**.
`,

  "dai-so-boole": `## 1. Ba Phép toán Logic Cơ bản

Đại số Boole hoạt động trên tập giá trị nhị phân \`{0, 1}\`:
- **Phép AND (Nhân logic):** \`Y = A · B\` (chỉ bằng 1 khi cả A và B đều bằng 1).
- **Phép OR (Cộng logic):** \`Y = A + B\` (bằng 1 khi có ít nhất một ngõ vào bằng 1).
- **Phép NOT (Đảo logic):** \`Y = ¬A\` hoặc \`A'\` (đảo trạng thái 0 thành 1, 1 thành 0).

---

## 2. Các Định luật Đại số Boole

| Tên định luật | Công thức phép AND | Công thức phép OR |
|---|---|---|
| Đồng nhất | \`A · 1 = A\` | \`A + 0 = A\` |
| Phần tử 0 / 1 | \`A · 0 = 0\` | \`A + 1 = 1\` |
| Phần tử bù | \`A · ¬A = 0\` | \`A + ¬A = 1\` |
| Bất biến (Đẳng lũy) | \`A · A = A\` | \`A + A = A\` |
| Hấp thụ | \`A + A·B = A\` | \`A·(A + B) = A\` |
| Hoàn nguyên (Đảo kép) | \`¬(¬A) = A\` | - |
| Hoán vị | \`A·B = B·A\` | \`A + B = B + A\` |
| Kết hợp | \`(A·B)·C = A·(B·C)\` | \`(A + B) + C = A + (B + C)\` |
| Phân phối | \`A·(B + C) = A·B + A·C\` | \`A + B·C = (A + B)·(A + C)\` |

---

## 3. Định luật DeMorgan

Định luật DeMorgan là công cụ cốt lõi để biến đổi giữa mạch AND-OR và mạch NAND-NOR:
\`\`\`text
DeMorgan 1: ¬(A · B) = ¬A + ¬B
DeMorgan 2: ¬(A + B) = ¬A · ¬B
\`\`\`

> **Quy tắc nhớ nhanh:** Bẻ gãy thanh đảo trên đầu, đổi dấu toán tử (\`AND ↔ OR\`).

### Thứ tự Ưu tiên Toán tử
\`\`\`text
( ) Ngoặc đơn → NOT → AND → OR
\`\`\`

### Nguyên lý Đối ngẫu (Dual)
Ta tìm hàm đối ngẫu bằng cách đổi \`AND ↔ OR\` và \`0 ↔ 1\`, nhưng **giữ nguyên các biến** (không tự ý đảo biến).

---

## 4. Các Cổng Logic Chuẩn

| Cổng logic | Biểu thức | Mô tả hành vi |
|---|---|---|
| **AND** | \`Y = A · B\` | Ra 1 khi tất cả vào bằng 1 |
| **OR** | \`Y = A + B\` | Ra 1 khi có ít nhất một vào bằng 1 |
| **NOT** | \`Y = ¬A\` | Đảo bit |
| **NAND** | \`Y = ¬(A · B)\` | Cổng vạn năng: Phủ định của AND |
| **NOR** | \`Y = ¬(A + B)\` | Cổng vạn năng: Phủ định của OR |
| **XOR** | \`Y = A ⊕ B = ¬A·B + A·¬B\` | Ra 1 khi số bit 1 ngõ vào là số LẺ |
| **XNOR** | \`Y = ¬(A ⊕ B) = A·B + ¬A·¬B\` | Ra 1 khi số bit 1 ngõ vào là số CHẴN |

### Tính chất Cổng XOR:
\`\`\`text
A ⊕ 0 = A
A ⊕ 1 = ¬A (cổng đảo điều khiển)
A ⊕ A = 0
A ⊕ ¬A = 1
\`\`\`
`,

  "karnaugh": `## 1. Dạng Chuẩn tắc SOP và POS

Mọi hàm logic đều có thể biểu diễn qua bảng chân trị dưới 2 dạng chuẩn:

### Dạng SOP (Sum of Products - Tổng các tích)
Biểu diễn hàm logic qua các tổ hợp ngõ ra bằng 1:
\`\`\`text
F = ¬A·B + A·C
\`\`\`
- Mỗi số hạng tích chứa đầy đủ các biến gọi là một **Minterm (m)**.
- Quy tắc Minterm: Bit 1 là biến thường (\`A\`), bit 0 là biến đảo (\`¬A\`).
\`\`\`text
Ví dụ ABC = 101 → m5 = A·¬B·C
F = Σm(các hàng có F = 1)
\`\`\`

### Dạng POS (Product of Sums - Tích các tổng)
Biểu diễn hàm logic qua các tổ hợp ngõ ra bằng 0:
\`\`\`text
F = (A + B) · (¬A + C)
\`\`\`
- Mỗi số hạng tổng chứa đầy đủ các biến gọi là một **Maxterm (M)**.
- Quy tắc Maxterm: Bit 0 là biến thường (\`A\`), bit 1 là biến đảo (\`¬A\`).
\`\`\`text
Ví dụ ABC = 101 → M5 = ¬A + B + ¬C
F = ΠM(các hàng có F = 0)
\`\`\`

---

## 2. Bìa Karnaugh (K-map)

Bìa Karnaugh là phương pháp đồ họa trực quan giúp rút gọn hàm logic lên đến 4-5 biến mà không cần dùng các phép biến đổi đại số rườm rà.

### Các Quy tắc Gom nhóm Bắt buộc:
1. **Các ô trên bìa được sắp xếp theo mã Gray:** Hai ô kề nhau chỉ đổi duy nhất 1 bit tọa độ (00 → 01 → 11 → 10).
2. **SOP:** Gom các ô số 1. **POS:** Gom các ô số 0.
3. **Kích thước nhóm:** Bắt buộc phải chứa số ô là lũy thừa của 2: \`1, 2, 4, 8, 16...\` ô. Tuyệt đối không gom nhóm 3 hay 6 ô.
4. **Nhóm càng lớn càng tốt:** Nhóm có \`2^k\` ô sẽ triệt tiêu được đúng \`k\` biến logic.
5. **Tính liên tục qua mép:** Mép trên kề mép dưới, mép trái kề mép phải, 4 góc của bảng được xem là kề nhau.
6. **Điều kiện tùy định (Don't care X):** Chỉ gom ô \`X\` khi nó giúp phóng to kích thước nhóm ô 1 (đối với SOP) hoặc ô 0 (đối với POS). Không gom nhóm chỉ chứa toàn ô X.
`,

  "mach-to-hop": `## 1. Bản chất Mạch Logic Tổ hợp

Mạch logic tổ hợp (Combinational Circuit) là mạch mà:
\`\`\`text
Y = f(X)
\`\`\`
> **Nguyên tắc:** Ngõ ra tại bất kỳ thời điểm nào CHỈ phụ thuộc vào tổ hợp ngõ vào tại chính thời điểm đó. Mạch tổ hợp **hoàn toàn không có phần tử nhớ**.

### Quy trình 5 bước Thiết kế Mạch Tổ hợp:
1. Xác định yêu cầu bài toán, đặt tên và số lượng ngõ vào / ngõ ra.
2. Lập bảng chân trị (Truth Table).
3. Viết biểu thức logic dạng SOP hoặc POS.
4. Dùng bìa Karnaugh hoặc định luật Boole để tối giản biểu thức.
5. Vẽ sơ đồ nguyên lý mạch dùng các cổng logic hoặc IC chức năng.

---

## 2. Bộ Mã hóa (Encoder) và Bộ Giải mã (Decoder)

### Bộ Mã hóa (Encoder)
- Chuyển đổi từ \`2^n\` đường ngõ vào thành \`n\` bit mã nhị phân ngõ ra.
- Nếu có khả năng nhiều ngõ vào cùng tích cực, bắt buộc phải dùng **Priority Encoder (Bộ mã hóa ưu tiên)** để chọn ngõ vào có trọng số cao nhất.

### Bộ Giải mã (Decoder)
- Chuyển đổi từ \`n\` bit ngõ vào thành tối đa \`2^n\` đường ngõ ra.
- Ví dụ Decoder 2→4 Active-High:

| I1 | I0 | Q3 | Q2 | Q1 | Q0 |
|---:|---:|---:|---:|---:|---:|
| 0 | 0 | 0 | 0 | 0 | 1 |
| 0 | 1 | 0 | 0 | 1 | 0 |
| 1 | 0 | 0 | 1 | 0 | 0 |
| 1 | 1 | 1 | 0 | 0 | 0 |

> **Lưu ý:**
> - **Active-High:** Mức tích cực kích hoạt là mức 1.
> - **Active-Low:** Mức tích cực kích hoạt là mức 0 (thường có dấu tròn đảo ở chân IC).
> - LED 7 đoạn Anode chung (Common Anode) thường tích cực mức 0; Cathode chung tích cực mức 1.

---

## 3. Bộ Ghép kênh (MUX) và Bộ Phân kênh (DEMUX)

### MUX (Multiplexer)
Cho phép truyền 1 trong \`2^n\` đường dữ liệu ngõ vào đến 1 ngõ ra duy nhất nhờ \`n\` đường chọn (Select):
\`\`\`text
MUX 2:1: Y = ¬S·I0 + S·I1
MUX 4:1: Y = ¬S1¬S0·I0 + ¬S1S0·I1 + S1¬S0·I2 + S1S0·I3
\`\`\`

### DEMUX (Demultiplexer)
Nhận 1 đường dữ liệu ngõ vào và phân phối tới 1 trong \`2^n\` ngõ ra theo giá trị của \`n\` đường chọn.
`,

  "mach-so-hoc": `## 1. Mạch Cộng và Trừ Nhị phân

### Half Adder (Bộ nửa cộng)
Thực hiện cộng 2 bit \`A\` và \`B\`, không có ngõ vào nhớ \`Cin\`:
\`\`\`text
S = A ⊕ B
C = A · B
\`\`\`

### Full Adder (Bộ cộng toàn phần)
Thực hiện cộng 2 bit \`A\`, \`B\` cùng bit nhớ tầng trước \`Cin\`:
\`\`\`text
S = A ⊕ B ⊕ Cin
Cout = A·B + Cin·(A ⊕ B)
\`\`\`

### Half Subtractor (Bộ nửa trừ)
Trừ 2 bit \`A - B\`:
\`\`\`text
Hiệu: D = A ⊕ B
Mượn: Borrow = ¬A · B
\`\`\`

### Full Subtractor (Bộ trừ toàn phần)
Trừ 3 bit \`A - B - Bin\`:
\`\`\`text
D = A ⊕ B ⊕ Bin
Bout = ¬A·B + ¬A·Bin + B·Bin
\`\`\`

---

## 2. Mạch So sánh (Comparator)

Mạch so sánh 2 số nhị phân \`A\` và \`B\`:
Đối với 1 bit:
\`\`\`text
A > B : A · ¬B
A < B : ¬A · B
A = B : A XNOR B = A·B + ¬A·¬B
\`\`\`
Với số nhiều bit, tiến hành so sánh tuần tự bắt đầu từ bit có trọng số cao nhất (MSB) xuống LSB.

---

## 3. Mạch Kiểm tra Chẵn Lẻ (Parity)

Dùng để phát hiện lỗi 1 bit trong quá trình truyền dữ liệu:
- **Bit chẵn (Even Parity):** \`P_even = D0 ⊕ D1 ⊕ D2 ⊕ ...\`
- **Bit lẻ (Odd Parity):** \`P_odd = ¬(D0 ⊕ D1 ⊕ D2 ⊕ ...)\`

> **Lưu ý kiểm tra phía thu:** Khi phía thu kiểm tra lỗi, phải tính phép XOR trên tất cả các bit dữ liệu VÀ cả bit parity.
`,

  "mach-tuan-tu": `## 1. Khái niệm Mạch Logic Tuần tự

Khác với mạch tổ hợp, mạch logic tuần tự (Sequential Circuit) là mạch **có bộ nhớ trạng thái**:
- Ngõ ra phụ thuộc vào cả ngõ vào hiện tại và trạng thái trong quá khứ của mạch.
- **Mô hình Moore:** Ngõ ra chỉ phụ thuộc vào trạng thái hiện tại: \`Output = f(State)\`.
- **Mô hình Mealy:** Ngõ ra phụ thuộc cả trạng thái hiện tại và ngõ vào: \`Output = f(State, Input)\`.

---

## 2. Các Loại Flip-Flop Cơ bản

Flip-Flop (FF) là phần tử nhớ 1 bit đồng bộ theo xung nhịp (Clock):

### RS Flip-Flop
Phương trình đặc trưng: \`Q+ = S + ¬R·Q\` (Điều kiện cấm: \`S·R = 0\`).
| S | R | Q(next) | Hành vi |
|---:|---:|---|---|
| 0 | 0 | Q | Giữ nguyên trạng thái cũ |
| 0 | 1 | 0 | Reset về 0 |
| 1 | 0 | 1 | Set lên 1 |
| 1 | 1 | X | **Trạng thái cấm** |

### JK Flip-Flop
Khắc phục trạng thái cấm của RS FF: \`Q+ = J·¬Q + ¬K·Q\`.
| J | K | Q(next) | Hành vi |
|---:|---:|---|---|
| 0 | 0 | Q | Giữ nguyên |
| 0 | 1 | 0 | Reset về 0 |
| 1 | 0 | 1 | Set lên 1 |
| 1 | 1 | ¬Q | **Toggle (Đảo trạng thái)** |

### D Flip-Flop (Data FF)
Loại FF quan trọng nhất trong FPGA/ASIC:
\`\`\`text
Q+ = D
\`\`\`
Trạng thái kế tiếp bám sát ngõ vào D tại thời điểm cạnh xung Clock.

### T Flip-Flop (Toggle FF)
\`\`\`text
Q+ = T ⊕ Q
\`\`\`
- Khi \`T = 0\`: giữ nguyên trạng thái.
- Khi \`T = 1\`: đảo trạng thái ngõ ra.

---

## 3. Bảng Kích thích (Excitation Table)

Bảng kích thích cho biết cần đặt tín hiệu ngõ vào là bao nhiêu để Flip-Flop chuyển từ trạng thái hiện tại \`Qn\` sang trạng thái kế tiếp \`Qn+1\`:

| Qn → Qn+1 | RS (R, S) | JK (J, K) | D | T |
|---|---|---|---:|---:|
| 0 → 0 | X, 0 | 0, X | 0 | 0 |
| 0 → 1 | 0, 1 | 1, X | 1 | 1 |
| 1 → 0 | 1, 0 | X, 1 | 0 | 1 |
| 1 → 1 | 0, X | X, 0 | 1 | 0 |

---

## 4. Ngõ vào Trực tiếp PRE và CLR
- **PRE (Preset):** Đặt trạng thái \`Q = 1\` ngay lập tức.
- **CLR (Clear):** Xóa trạng thái \`Q = 0\` ngay lập tức.
- PRE và CLR là các ngõ vào **bất đồng bộ (Asynchronous)**, có quyền ưu tiên cao hơn xung Clock.
`,

  "counter-register": `## 1. Bộ đếm (Counter)

Bộ đếm Mod-M có M trạng thái phân biệt:
\`\`\`text
Số trạng thái tối đa = 2^n
Điều kiện chọn số Flip-Flop n: 2^(n-1) < M ≤ 2^n
\`\`\`
*Ví dụ:* Bộ đếm Mod-10 (đếm từ 0 đến 9) cần \`n = 4\` Flip-Flop (vì \`2^3 < 10 ≤ 2^4\`).

### Bộ đếm Bất đồng bộ (Ripple Counter)
- Ngõ ra của FF phía trước được dùng làm xung Clock cho FF phía sau.
- Cấu tạo đơn giản nhưng có nhược điểm trễ tích lũy qua các tầng, dễ gây xung nhiễu (glitch).

### Bộ đếm Đồng bộ (Synchronous Counter)
- Tất cả các Flip-Flop đều nhận **chung một nguồn xung Clock**.
- Toàn bộ các FF chuyển trạng thái cùng lúc, tốc độ cao và ổn định.

---

## 2. Thanh ghi Dịch (Shift Register)

Thanh ghi là tập hợp các Flip-Flop dùng để lưu trữ và dịch chuyển vector dữ liệu nhị phân:

| Kiểu thanh ghi | Viết tắt | Cơ chế hoạt động |
|---|---|---|
| Serial In - Serial Out | **SISO** | Nạp nối tiếp từng bit, xuất nối tiếp |
| Serial In - Parallel Out | **SIPO** | Nạp nối tiếp từng bit, xuất song song tất cả các bit |
| Parallel In - Serial Out | **PISO** | Nạp đồng thời tất cả các bit, dịch xuất nối tiếp |
| Parallel In - Parallel Out | **PIPO** | Nạp song song và xuất song song tức thì |
`,

  "verilog-co-ban": `## 1. Cấu trúc Module Verilog

Trong Verilog HDL, mọi khối mạch đều được gói trong một \`module\`:

\`\`\`verilog
module ten_module (
    input  wire a,
    input  wire b,
    output wire y
);

    // Mô tả cấu trúc mạch hoặc hành vi
    assign y = a & b;

endmodule
\`\`\`

---

## 2. Kiểu dữ liệu: wire vs reg

### wire (Nối dây)
- Đại diện cho các đường dây dẫn vật lý nối giữa các cổng hoặc module.
- Không có khả năng lưu trữ giá trị.
- Thường được gán giá trị bằng câu lệnh liên tục \`assign\`.

### reg (Biến thủ tục)
- Dùng cho các biến nhận giá trị **bên trong các khối thủ tục** như \`always\` hoặc \`initial\`.
- Lưu trữ giá trị cho đến lần cập nhật tiếp theo.
> **Lưu ý tối quan trọng:** Khai báo \`reg\` không đồng nghĩa với việc mạch sẽ tổng hợp ra một thanh ghi/Flip-Flop vật lý. Trong khối \`always @(*)\` tổ hợp, \`reg\` vẫn được tổng hợp thành dây dẫn hoặc mạch tổ hợp thuần túy.

---

## 3. Biểu diễn Hằng số Số học trong Verilog

Cú pháp:
\`\`\`text
<độ rộng bit>'<cơ số><giá trị>
\`\`\`
Các cơ số: \`b\` (binary), \`o\` (octal), \`d\` (decimal), \`h\` (hexadecimal).

\`\`\`verilog
4'b1010   // 4 bit nhị phân (giá trị 10 thập phân)
8'hC5     // 8 bit thập lục phân
1'b1      // 1 bit logic 1
4'd10     // 4 bit thập phân (giá trị 10)
\`\`\`

Bốn mức logic cơ bản trong Verilog:
- \`0\`: Mức thấp / False.
- \`1\`: Mức cao / True.
- \`x\` hoặc \`X\`: Không xác định (Unknown).
- \`z\` hoặc \`Z\`: Trở kháng cao / hở mạch (High Impedance).

---

## 4. Bảng Toán tử Verilog

| Nhóm toán tử | Ký hiệu | Ý nghĩa |
|---|---|---|
| Số học | \`+ - * / %\` | Cộng, trừ, nhân, chia, chia lấy dư |
| Quan hệ | \`< <= > >=\` | Nhỏ hơn, nhỏ hơn hoặc bằng, lớn hơn... |
| So sánh bằng | \`== !=\` | So sánh bằng / khác logic (bỏ qua x, z) |
| So sánh Case | \`=== !==\` | So sánh chính xác tuyệt đối cả mức x và z |
| Logic | \`&& || !\` | AND logic, OR logic, NOT logic (trả về 1 bit) |
| Bitwise | \`~ & | ^ ~^\` | Đảo, AND, OR, XOR, XNOR trên từng cặp bit |
| Reduction (Thu gọn) | \`& ~& | ~| ^\` | Nhận 1 vector, thực hiện phép toán trên tất cả các bit để ra 1 bit |
| Ghép vector | \`{A, B}\` | Ghép các bit lại thành một vector dài hơn |
| Lặp vector | \`{n{A}}\` | Lặp lại tín hiệu A n lần |
`,

  "verilog-behavioral": `## 1. Khối always và initial

### Khối initial
- Bắt đầu chạy tại thời điểm \`t = 0\` và chỉ chạy đúng 1 lần duy nhất rồi kết thúc.
- **Không thể tổng hợp thành phần cứng:** Chủ yếu được dùng trong Testbench để thiết lập giá trị ban đầu và tạo xung kích thích.

### Khối always
Chạy lặp lại liên tục mỗi khi có sự thay đổi trên danh sách độ nhạy (sensitivity list):

#### always Tổ hợp:
\`\`\`verilog
always @(*) begin
    y = a & b;
end
\`\`\`
\`@(*)\` tự động bắt mọi biến ngõ vào trong biểu thức.

#### always Tuần tự theo xung Clock:
\`\`\`verilog
always @(posedge clk or negedge rst_n) begin
    if (!rst_n)
        q <= 1'b0;
    else
        q <= d;
end
\`\`\`

---

## 2. Blocking (=) vs Non-blocking (<=)

Đây là quy tắc vàng bắt buộc phải tuân thủ trong Verilog:

### Phép gán Blocking (=)
- Thực thi tuần tự từ trên xuống dưới (dòng dưới phải chờ dòng trên hoàn tất).
- **Ứng dụng:** Dùng cho **mạch logic tổ hợp** bên trong \`always @(*)\`.

### Phép gán Non-blocking (<=)
- Tất cả các biểu thức vế phải được đánh giá đồng thời, sau đó gán cùng một lúc vào vế trái khi khối kết thúc.
- **Ứng dụng:** Dùng cho **mạch logic tuần tự** theo xung clock bên trong \`always @(posedge clk)\`.

---

## 3. Câu lệnh Điều khiển: if-else và case

### Lệnh if - else:
\`\`\`verilog
if (sel == 2'b00)
    out = in0;
else if (sel == 2'b01)
    out = in1;
else
    out = in2;
\`\`\`

### Lệnh case:
\`\`\`verilog
case (sel)
    2'b00:   out = in0;
    2'b01:   out = in1;
    default: out = 1'b0;
endcase
\`\`\`

> **Cảnh báo Latch ngoài ý muốn (Inadvertent Latch):**
> Trong mạch tổ hợp, nếu câu lệnh \`case\` hoặc \`if\` không bao quát hết mọi trường hợp có thể xảy ra (hoặc thiếu nhánh \`default:\`), bộ tổng hợp sẽ tự động sinh ra chốt Latch để giữ trạng thái cũ, gây lỗi mạch phần cứng nghiêm trọng.
`,

  "fsm": `## 1. Mô hình Máy Trạng thái Hữu hạn (FSM)

Một hệ thống FSM chuẩn bao gồm 3 khối logic chính:
\`\`\`text
Ngõ vào (Input)
  ↓
[Khối 1: Next-State Logic (Tổ hợp)]
  ↓ next_state
[Khối 2: State Register (Tuần tự theo Clock)]
  ↓ current_state
  ├─→ hồi tiếp về Next-State Logic
  └─→ [Khối 3: Output Logic] → Ngõ ra (Output)
\`\`\`

- **Moore FSM:** \`Output = f(current_state)\` (ngõ ra an toàn, không bị nhấp nháy theo ngõ vào).
- **Mealy FSM:** \`Output = f(current_state, input)\` (ngõ ra phản ứng tức thì theo ngõ vào, tiết kiệm trạng thái).

---

## 2. Khung code 3 Khối always Chuẩn cho FSM

Đây là phong cách viết code FSM chuẩn công nghiệp:

\`\`\`verilog
module fsm_moore (
    input  wire clk,
    input  wire rst_n,
    input  wire in_signal,
    output reg  out_signal
);

    // 1. Định nghĩa mã trạng thái
    localparam S_IDLE = 2'b00,
               S_RUN  = 2'b01,
               S_DONE = 2'b10;

    reg [1:0] current_state, next_state;

    // KHỐI 1: State Register (Tuần tự, chuyển trạng thái theo clock)
    always @(posedge clk or negedge rst_n) begin
        if (!rst_n)
            current_state <= S_IDLE;
        else
            current_state <= next_state;
    end

    // KHỐI 2: Next-State Logic (Tổ hợp, xác định trạng thái kế tiếp)
    always @(*) begin
        case (current_state)
            S_IDLE: begin
                if (in_signal)
                    next_state = S_RUN;
                else
                    next_state = S_IDLE;
            end
            S_RUN: begin
                next_state = S_DONE;
            end
            S_DONE: begin
                next_state = S_IDLE;
            end
            default: next_state = S_IDLE;
        endcase
    end

    // KHỐI 3: Output Logic (Mô tả ngõ ra)
    always @(*) begin
        case (current_state)
            S_DONE:  out_signal = 1'b1;
            default: out_signal = 1'b0;
        endcase
    end

endmodule
\`\`\`
`,

  "mo-phong-ise": `## 1. Quy trình Kiểm chứng Mô phỏng trên ISE Xilinx 14.7

Quy trình 10 bước chuẩn để thiết kế và mô phỏng mạch số:
1. Đọc yêu cầu kỹ thuật và vẽ sơ đồ khối.
2. Lập bảng trạng thái và phương trình logic.
3. Mở phần mềm ISE Xilinx 14.7, tạo Project mới.
4. Tạo file Verilog Module (.v) chứa mạch thiết kế (Design Under Test - DUT).
5. Khai báo danh sách các cổng ngõ vào và ngõ ra.
6. Viết mã mô tả phần cứng (RTL code).
7. Tạo file Verilog Testbench (.v) để kiểm tra DUT.
8. Viết mã sinh xung nhịp (Clock Generator) và vector kích thích (Stimulus).
9. Chạy trình mô phỏng **Behavioral Simulation (ISim)**.
10. Đọc và phân tích giản đồ sóng (Waveform) đối chiếu với bảng trạng thái lý thuyết.

---

## 2. Cấu trúc Mẫu của một Testbench

Testbench là module cấp cao nhất dùng để bao bọc và kiểm thử DUT, hoàn toàn **không có cổng ngõ vào/ra (port list rỗng)**:

\`\`\`verilog
\`timescale 1ns / 1ps

module tb_my_circuit;

    // 1. Khai báo tín hiệu nối với DUT:
    // Ngõ vào của DUT trở thành kiểu 'reg' trong testbench
    reg clk;
    reg rst_n;
    reg data_in;

    // Ngõ ra của DUT trở thành kiểu 'wire' trong testbench
    wire data_out;

    // 2. Khởi tạo đối tượng mạch cần test (DUT)
    my_circuit uut (
        .clk(clk),
        .rst_n(rst_n),
        .data_in(data_in),
        .data_out(data_out)
    );

    // 3. Khối tạo xung nhịp Clock chu kỳ 10ns (tần số 100MHz)
    always begin
        #5 clk = ~clk;
    end

    // 4. Khối tạo kịch bản kiểm thử (Stimulus)
    initial begin
        // Khởi tạo giá trị ban đầu
        clk = 0;
        rst_n = 0;
        data_in = 0;

        // Giữ reset trong 20ns
        #20 rst_n = 1;

        // Cấp dữ liệu test
        #10 data_in = 1;
        #10 data_in = 0;
        #20 data_in = 1;

        // Kết thúc mô phỏng
        #100 $finish;
    end

endmodule
\`\`\`
`,
};

export function getAllLessons(): Lesson[] {
  return curriculum.map((c) => {
    const rawContent = rawLessonsContent[c.slug] || "";
    const headings = extractHeadings(rawContent);

    return {
      slug: c.slug,
      order: c.order,
      title: c.title,
      description: c.description,
      estimatedMinutes: c.estimatedMinutes,
      prerequisiteSlugs: c.prerequisites,
      headings,
      tags: [c.category],
      content: rawContent,
      objectives: c.objectives || [],
    };
  });
}


export function getLessonBySlug(slug: string): Lesson | undefined {
  const all = getAllLessons();
  return all.find((l) => l.slug === slug);
}

export function getAdjacentLessons(slug: string): {
  prev?: Lesson;
  next?: Lesson;
} {
  const all = getAllLessons();
  const index = all.findIndex((l) => l.slug === slug);
  if (index === -1) return {};

  return {
    prev: index > 0 ? all[index - 1] : undefined,
    next: index < all.length - 1 ? all[index + 1] : undefined,
  };
}
