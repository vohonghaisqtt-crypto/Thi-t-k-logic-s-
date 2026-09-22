import { QuizQuestion } from "@/lib/types";

export const quizzes: QuizQuestion[] = [
  // ==========================================
  // MODULE 1: HỆ ĐẾM VÀ BIỂU DIỄN THÔNG TIN
  // ==========================================
  {
    id: "q-he-dem-01",
    lessonSlug: "he-dem",
    type: "mcq",
    prompt: "Số nhị phân 101101₂ khi chuyển đổi sang hệ thập lục phân (Hexadecimal) có giá trị là bao nhiêu?",
    options: ["2D₁₆", "B4₁₆", "5B₁₆", "A5₁₆"],
    correctAnswer: "2D₁₆",
    explanation: "Nhóm 4 bit từ phải qua trái: 101101₂ = 0010 1101₂. Ta có 0010₂ = 2₁₆ và 1101₂ = 13₁₀ = D₁₆. Kết quả là 2D₁₆.",
    relatedSection: "chuyen-doi-co-so",
    difficulty: "basic",
  },
  {
    id: "q-he-dem-02",
    lessonSlug: "he-dem",
    type: "true-false",
    prompt: "Số 0 trong hệ thống biểu diễn số có dấu dạng Bù 2 có 2 biểu diễn khác nhau là +0 và -0.",
    options: ["Đúng", "Sai"],
    correctAnswer: false,
    explanation: "Sai. Trong hệ biểu diễn bù 2, số 0 chỉ có DUY NHẤT một biểu diễn (ví dụ 8 bit là 0000 0000₂). Điều này giúp tối ưu mạch tính toán số học so với dạng bit dấu hay bù 1 (vốn có cả +0 và -0).",
    relatedSection: "so-co-dau-bu-1-bu-2",
    difficulty: "medium",
  },
  {
    id: "q-he-dem-03",
    lessonSlug: "he-dem",
    type: "fill",
    prompt: "Mã mà trong đó hai số thập phân liên tiếp chỉ có đúng 1 bit nhị phân thay đổi giá trị được gọi là mã ______.",
    correctAnswer: "gray",
    explanation: "Mã Gray (Gray code) có đặc tính phản chiếu đơn biến (unit-distance), giúp loại bỏ xung nhiễu chuyển mạch và được dùng làm chỉ số các hàng/cột của bìa Karnaugh.",
    relatedSection: "ma-nhi-phan-dac-biet",
    difficulty: "basic",
  },
  {
    id: "q-he-dem-04",
    lessonSlug: "he-dem",
    type: "mcq",
    prompt: "Biểu diễn số bù 2 của số thập phân -25 sử dụng 8 bit nhị phân là gì?",
    options: ["11100111₂", "11100110₂", "10011001₂", "11011001₂"],
    correctAnswer: "11100111₂",
    explanation: "Bước 1: +25₁₀ = 0001 1001₂.\nBước 2: Bù 1 = 1110 0110₂.\nBước 3: Bù 2 = Bù 1 + 1 = 1110 0111₂.",
    relatedSection: "so-co-dau-bu-1-bu-2",
    difficulty: "medium",
  },

  // ==========================================
  // MODULE 2: ĐẠI SỐ BOOLE VÀ CỔNG LOGIC
  // ==========================================
  {
    id: "q-boole-01",
    lessonSlug: "dai-so-boole",
    type: "mcq",
    prompt: "Theo định luật DeMorgan, biểu thức phủ định của hàm F = (A + B) · C' là:",
    options: [
      "F' = A' · B' + C",
      "F' = (A' + B') · C",
      "F' = A'B'C",
      "F' = A' + B' + C'"
    ],
    correctAnswer: "F' = A' · B' + C",
    explanation: "Áp dụng DeMorgan: F' = ((A + B) · C')' = (A + B)' + (C')' = (A' · B') + C = A'B' + C.",
    relatedSection: "dinh-luat-demorgan",
    difficulty: "medium",
  },
  {
    id: "q-boole-02",
    lessonSlug: "dai-so-boole",
    type: "true-false",
    prompt: "Cổng NAND và cổng NOR được gọi là các cổng logic vạn năng vì có thể dùng chúng để tổng hợp bất kỳ hàm logic nào.",
    options: ["Đúng", "Sai"],
    correctAnswer: true,
    explanation: "Đúng. Bằng cách phối hợp duy nhất một loại cổng NAND (hoặc NOR), ta có thể tạo ra cổng NOT, AND, OR, XOR và bất kỳ mạch tổ hợp phức tạp nào.",
    relatedSection: "tinh-van-nang-nand-nor",
    difficulty: "basic",
  },
  {
    id: "q-boole-03",
    lessonSlug: "dai-so-boole",
    type: "fill",
    prompt: "Cổng logic có ngõ ra bằng 1 khi và chỉ khi hai ngõ vào có giá trị khác nhau là cổng ______.",
    correctAnswer: "xor",
    explanation: "Cổng XOR (Exclusive-OR) có biểu thức Y = A ⊕ B = A'B + AB'. Ngõ ra bằng 1 khi số lượng bit 1 ở ngõ vào là số lẻ.",
    relatedSection: "cac-cong-logic-co-ban",
    difficulty: "basic",
  },

  // ==========================================
  // MODULE 3: RÚT GỌN BÌA KARNAUGH
  // ==========================================
  {
    id: "q-karnaugh-01",
    lessonSlug: "karnaugh",
    type: "mcq",
    prompt: "Khi gom một nhóm gồm 8 ô có giá trị 1 trên bìa Karnaugh 4 biến (A, B, C, D), số lượng biến bị triệt tiêu là bao nhiêu?",
    options: ["1 biến", "2 biến", "3 biến", "4 biến"],
    correctAnswer: "3 biến",
    explanation: "Nhóm gồm 2ᵏ ô sẽ triệt tiêu được k biến. Ở đây 8 = 2³, do đó nhóm 8 ô sẽ triệt tiêu được 3 biến và chỉ còn lại 1 biến duy nhất trong tích.",
    relatedSection: "quy-tac-gom-nhom-kmap",
    difficulty: "medium",
  },
  {
    id: "q-karnaugh-02",
    lessonSlug: "karnaugh",
    type: "true-false",
    prompt: "Khi tối giản bìa Karnaugh, ta bắt buộc phải gom tất cả các ô chứa điều kiện tùy định (Don't care - ký hiệu X).",
    options: ["Đúng", "Sai"],
    correctAnswer: false,
    explanation: "Sai. Chỉ gom ô X khi nó giúp mở rộng nhóm ô 1 thành nhóm lũy thừa của 2 lớn hơn. Các ô X đứng đơn lẻ hoặc không giúp mở rộng nhóm thì được gán bằng 0 và bỏ qua.",
    relatedSection: "dieu-kien-tuy-dinh-dont-care",
    difficulty: "medium",
  },
  {
    id: "q-karnaugh-03",
    lessonSlug: "karnaugh",
    type: "mcq",
    prompt: "Dạng chuẩn tắc SOP (Sum of Products) được biểu diễn bằng tổng của các:",
    options: ["Minterm (kí hiệu Σm)", "Maxterm (kí hiệu ΠM)", "Cổng NOR", "Biến đơn lẻ"],
    correctAnswer: "Minterm (kí hiệu Σm)",
    explanation: "SOP là tổng các tích, được xây dựng từ các minterm tương ứng với các hàng có ngõ ra bằng 1 trên bảng chân trị.",
    relatedSection: "dang-chuan-tac-sop-pos",
    difficulty: "basic",
  },

  // ==========================================
  // MODULE 4: MẠCH LOGIC TỔ HỢP CĂN BẢN
  // ==========================================
  {
    id: "q-to-hop-01",
    lessonSlug: "mach-to-hop",
    type: "mcq",
    prompt: "Một bộ ghép kênh Multiplexer (MUX) có 16 ngõ vào dữ liệu cần có bao nhiêu đường chọn (Select lines)?",
    options: ["2 đường", "3 đường", "4 đường", "8 đường"],
    correctAnswer: "4 đường",
    explanation: "Công thức số ngõ vào MUX là 2ⁿ, trong đó n là số đường chọn. Vì 16 = 2⁴ nên cần n = 4 đường chọn (S₃, S₂, S₁, S₀).",
    relatedSection: "bo-ghep-kenh-mux",
    difficulty: "basic",
  },
  {
    id: "q-to-hop-02",
    lessonSlug: "mach-to-hop",
    type: "true-false",
    prompt: "Bộ giải mã (Decoder) n sang 2ⁿ ngõ ra với chân Enable tích cực mức thấp (Active-Low) sẽ hoạt động bình thường khi cấp EN = 1.",
    options: ["Đúng", "Sai"],
    correctAnswer: false,
    explanation: "Sai. Active-Low nghĩa là tích cực khi ở mức 0. Khi EN = 1, IC bị vô hiệu hóa (disabled) và toàn bộ các ngõ ra bị treo ở trạng thái không tích cực.",
    relatedSection: "active-high-vs-active-low",
    difficulty: "medium",
  },
  {
    id: "q-to-hop-03",
    lessonSlug: "mach-to-hop",
    type: "fill",
    prompt: "Bộ mã hóa giải quyết tình huống có nhiều ngõ vào cùng tích cực đồng thời bằng cách chỉ chọn ngõ vào có chỉ số cao nhất được gọi là bộ mã hóa ______.",
    correctAnswer: "uu tien",
    explanation: "Priority Encoder (Bộ mã hóa ưu tiên, ví dụ 74148) sẽ ấn định thứ tự ưu tiên cho từng ngõ vào để ngõ ra không bị xung đột mã hóa.",
    relatedSection: "bo-ma-hoa-encoder",
    difficulty: "basic",
  },

  // ==========================================
  // MODULE 5: MẠCH SỐ HỌC & SO SÁNH
  // ==========================================
  {
    id: "q-so-hoc-01",
    lessonSlug: "mach-so-hoc",
    type: "mcq",
    prompt: "Bộ cộng toàn phần (Full Adder) cho 2 bit A, B và bit nhớ ngõ vào Cin có phương trình Tổng (Sum) và Số nhớ (Cout) là:",
    options: [
      "Sum = A ⊕ B ⊕ Cin; Cout = AB + Cin(A ⊕ B)",
      "Sum = A + B + Cin; Cout = AB · Cin",
      "Sum = A · B · Cin; Cout = A ⊕ B ⊕ Cin",
      "Sum = A ⊕ B; Cout = AB + Cin"
    ],
    correctAnswer: "Sum = A ⊕ B ⊕ Cin; Cout = AB + Cin(A ⊕ B)",
    explanation: "Sum được tạo bởi 2 tầng cổng XOR: A ⊕ B ⊕ Cin. Cout xuất hiện khi có ít nhất 2 trong 3 bit bằng 1: AB + Cin(A ⊕ B).",
    relatedSection: "bo-cong-toan-phan-full-adder",
    difficulty: "medium",
  },
  {
    id: "q-so-hoc-02",
    lessonSlug: "mach-so-hoc",
    type: "true-false",
    prompt: "Mạch kiểm tra bit chẵn lẻ (Parity Checker) được xây dựng hoàn toàn từ một chuỗi các cổng XOR.",
    options: ["Đúng", "Sai"],
    correctAnswer: true,
    explanation: "Đúng. Cổng XOR phát hiện số lượng bit 1 là lẻ, do đó chuỗi cổng XOR liên tiếp nối các bit dữ liệu sẽ cho biết tổng số bit 1 là chẵn hay lẻ.",
    relatedSection: "mach-kiem-tra-chan-le",
    difficulty: "basic",
  },

  // ==========================================
  // MODULE 6: MẠCH LOGIC TUẦN TỰ & FLIP-FLOP
  // ==========================================
  {
    id: "q-tuan-tu-01",
    lessonSlug: "mach-tuan-tu",
    type: "mcq",
    prompt: "Flip-Flop JK khi có cả hai ngõ vào J = 1 và K = 1 thì ở cạnh kích của xung Clock tiếp theo, trạng thái ngõ ra Q sẽ:",
    options: [
      "Đảo trạng thái (Toggle: Q_next = Q')",
      "Giữ nguyên trạng thái (Hold: Q_next = Q)",
      "Bị cấm không xác định",
      "Luôn bị xóa về 0"
    ],
    correctAnswer: "Đảo trạng thái (Toggle: Q_next = Q')",
    explanation: "Khi J = 1, K = 1, JK Flip-Flop chuyển sang chế độ Toggle (đảo bit), khắc phục được nhược điểm trạng thái cấm S = 1, R = 1 của RS Flip-Flop.",
    relatedSection: "jk-flip-flop",
    difficulty: "basic",
  },
  {
    id: "q-tuan-tu-02",
    lessonSlug: "mach-tuan-tu",
    type: "fill",
    prompt: "Loại Flip-Flop có phương trình trạng thái kế tiếp luôn bằng ngõ vào dữ liệu Q(next) = D là ______ Flip-Flop.",
    correctAnswer: "d",
    explanation: "D Flip-Flop (Data / Delay Flip-Flop) lưu giữ bit dữ liệu D tại cạnh xung clock, là thành phần cơ bản cấu tạo nên thanh ghi và bộ nhớ trong vi mạch.",
    relatedSection: "d-flip-flop",
    difficulty: "basic",
  },
  {
    id: "q-tuan-tu-03",
    lessonSlug: "mach-tuan-tu",
    type: "true-false",
    prompt: "Tín hiệu đưa vào chân Preset (PRE) và Clear (CLR) bất đồng bộ chỉ có tác dụng khi có cạnh tích cực của xung Clock.",
    options: ["Đúng", "Sai"],
    correctAnswer: false,
    explanation: "Sai. PRE và CLR bất đồng bộ (Asynchronous) ép trạng thái ngõ ra Q lên 1 hoặc về 0 NGAY LẬP TỨC mà không cần quan tâm đến xung nhịp Clock.",
    relatedSection: "ngo-dat-truoc-pre-clr",
    difficulty: "medium",
  },

  // ==========================================
  // MODULE 7: BỘ ĐẾM & THANH GHI DỊCH
  // ==========================================
  {
    id: "q-counter-01",
    lessonSlug: "counter-register",
    type: "mcq",
    prompt: "Để thiết kế một bộ đếm thập phân Mod-10 (đếm tuần hoàn từ 0 đến 9), cần sử dụng tối thiểu bao nhiêu Flip-Flop?",
    options: ["3 Flip-Flop", "4 Flip-Flop", "5 Flip-Flop", "10 Flip-Flop"],
    correctAnswer: "4 Flip-Flop",
    explanation: "Áp dụng công thức 2^(n-1) < M ≤ 2^n: Với M = 10, ta có 2³ = 8 < 10 ≤ 2⁴ = 16. Vậy số Flip-Flop tối thiểu cần là n = 4.",
    relatedSection: "thiet-ke-bo-dem-mod-m",
    difficulty: "medium",
  },
  {
    id: "q-counter-02",
    lessonSlug: "counter-register",
    type: "mcq",
    prompt: "Thanh ghi dịch có ngõ vào nối tiếp và ngõ ra song song được viết tắt là:",
    options: ["SIPO", "SISO", "PISO", "PIPO"],
    correctAnswer: "SIPO",
    explanation: "SIPO là Serial-In Parallel-Out: Dữ liệu nạp nối tiếp từng bit qua một chân vào và xuất đồng thời song song qua nhiều chân ra sau n chu kỳ clock.",
    relatedSection: "thanh-ghi-dich",
    difficulty: "basic",
  },

  // ==========================================
  // MODULE 8: VERILOG CƠ BẢN
  // ==========================================
  {
    id: "q-verilog-01",
    lessonSlug: "verilog-co-ban",
    type: "code-reading",
    prompt: "Cho đoạn mã Verilog sau. Hãy xác định giá trị của vector 4-bit `y`:\n\n```verilog\nwire [3:0] a = 4'b1011;\nwire [3:0] b = 4'b0110;\nwire [3:0] y = a ^ b;\n```",
    options: ["4'b1101", "4'b1111", "4'b0010", "4'b0001"],
    correctAnswer: "4'b1101",
    explanation: "Toán tử `^` là phép XOR từng bit (bitwise XOR):\n  a: 1 0 1 1\n  b: 0 1 1 0\n--------------\n  y: 1 1 0 1 (1^0=1, 0^1=1, 1^1=0, 1^0=1). Kết quả là 4'b1101.",
    relatedSection: "toan-tu-verilog",
    difficulty: "medium",
  },
  {
    id: "q-verilog-02",
    lessonSlug: "verilog-co-ban",
    type: "true-false",
    prompt: "Trong Verilog, một tín hiệu được gán giá trị ở vế trái trong khối lệnh thủ tục `always` bắt buộc phải được khai báo với kiểu dữ liệu `reg`.",
    options: ["Đúng", "Sai"],
    correctAnswer: true,
    explanation: "Đúng. Bất kỳ biến nào nhận giá trị bên trong khối thủ tục (always hoặc initial) phải là kiểu `reg`. Nếu gán vào kiểu `wire` trong always, trình biên dịch sẽ báo lỗi cú pháp.",
    relatedSection: "phan-biet-wire-va-reg",
    difficulty: "basic",
  },
  {
    id: "q-verilog-03",
    lessonSlug: "verilog-co-ban",
    type: "mcq",
    prompt: "Trong Verilog, biểu thức ghép vector `{2'b10, 3'b101}` sẽ cho ra kết quả là vector mấy bit có giá trị là gì?",
    options: [
      "Vector 5-bit: 5'b10101",
      "Vector 6-bit: 6'b010101",
      "Vector 5-bit: 5'b11111",
      "Lỗi cú pháp vì khác số bit"
    ],
    correctAnswer: "Vector 5-bit: 5'b10101",
    explanation: "Toán tử `{ }` ghép các vector theo thứ tự từ trái sang phải: 2 bit (10) ghép với 3 bit (101) tạo thành vector 5-bit có giá trị 5'b10101.",
    relatedSection: "ghep-vector-concatenation",
    difficulty: "medium",
  },

  // ==========================================
  // MODULE 9: MÔ TẢ HÀNH VI (BEHAVIORAL VERILOG)
  // ==========================================
  {
    id: "q-behavioral-01",
    lessonSlug: "verilog-behavioral",
    type: "code-reading",
    prompt: "Đoạn mã sau bị lỗi thiết kế phần cứng nghiêm trọng nào?\n\n```verilog\nalways @(*)\nbegin\n    if (sel == 2'b00)\n        out = in0;\n    else if (sel == 2'b01)\n        out = in1;\nend\n```",
    options: [
      "Sinh chốt nhớ ngoài ý muốn (Inadvertent Latch) vì thiếu trường hợp cho sel = 10 và 11",
      "Lỗi cú pháp do không khai báo posedge",
      "Mạch bị ngắn mạch (short-circuit)",
      "Không có lỗi, tổng hợp thành MUX 2:1 bình thường"
    ],
    correctAnswer: "Sinh chốt nhớ ngoài ý muốn (Inadvertent Latch) vì thiếu trường hợp cho sel = 10 và 11",
    explanation: "Vì không có nhánh `else` vét cạn tất cả các trường hợp của biến `sel` (2'b10 và 2'b11), trình tổng hợp bắt buộc phải tạo chốt nhớ (Latch) để giữ lại giá trị cũ của `out`, vi phạm nguyên tắc mạch tổ hợp.",
    relatedSection: "bay-sinh-latch-ngoai-y-muon",
    difficulty: "hard",
  },
  {
    id: "q-behavioral-02",
    lessonSlug: "verilog-behavioral",
    type: "mcq",
    prompt: "Theo quy tắc chuẩn trong thiết kế Verilog, phép gán Non-blocking (`<=`) được sử dụng cho loại logic nào?",
    options: [
      "Logic tuần tự trong khối always @(posedge clk)",
      "Logic tổ hợp trong khối always @(*)",
      "Câu lệnh gán liên tục assign",
      "Khai báo tham số parameter"
    ],
    correctAnswer: "Logic tuần tự trong khối always @(posedge clk)",
    explanation: "Non-blocking (`<=`) cập nhật giá trị đồng thời ở cuối bước thời gian, mô tả chính xác sự chuyển dịch dữ liệu song song của các Flip-Flop tại cạnh clock.",
    relatedSection: "quy-tac-blocking-va-non-blocking",
    difficulty: "basic",
  },

  // ==========================================
  // MODULE 10: MÁY TRẠNG THÁI HỮU HẠN (FSM)
  // ==========================================
  {
    id: "q-fsm-01",
    lessonSlug: "fsm",
    type: "mcq",
    prompt: "Điểm khác biệt cốt lõi giữa máy trạng thái Moore và Mealy là:",
    options: [
      "Ở Moore, ngõ ra chỉ phụ thuộc trạng thái hiện tại; ở Mealy, ngõ ra phụ thuộc cả trạng thái hiện tại và ngõ vào",
      "Ở Mealy, ngõ ra chỉ phụ thuộc trạng thái hiện tại; ở Moore, ngõ ra phụ thuộc cả ngõ vào",
      "Moore không cần xung Clock, Mealy cần xung Clock",
      "Mealy có số trạng thái luôn gấp đôi Moore"
    ],
    correctAnswer: "Ở Moore, ngõ ra chỉ phụ thuộc trạng thái hiện tại; ở Mealy, ngõ ra phụ thuộc cả trạng thái hiện tại và ngõ vào",
    explanation: "Moore FSM: Output = f(Current State) giúp tín hiệu ra đồng bộ và ít nhiễu. Mealy FSM: Output = f(Current State, Input) phản ứng nhanh hơn nhưng ngõ ra có thể bị nhiễu theo ngõ vào.",
    relatedSection: "phan-biet-moore-va-mealy",
    difficulty: "medium",
  },
  {
    id: "q-fsm-02",
    lessonSlug: "fsm",
    type: "mcq",
    prompt: "Trong khung kiến trúc FSM chuẩn 3 khối always, khối cập nhật thanh ghi trạng thái (State Register) sử dụng cú pháp nào?",
    options: [
      "always @(posedge clk or negedge rst_n) dùng phép gán non-blocking (<=)",
      "always @(*) dùng phép gán blocking (=)",
      "assign current_state = next_state;",
      "always #10 clk = ~clk;"
    ],
    correctAnswer: "always @(posedge clk or negedge rst_n) dùng phép gán non-blocking (<=)",
    explanation: "State Register là mạch tuần tự chứa các Flip-Flop lưu trữ mã trạng thái, nên bắt buộc phải nhạy với cạnh clock (hoặc reset bất đồng bộ) và dùng phép gán non-blocking `<=`: state <= next_state.",
    relatedSection: "khung-kien-truc-3-always-block",
    difficulty: "medium",
  },
  {
    id: "q-fsm-03",
    lessonSlug: "fsm",
    type: "fill",
    prompt: "Từ khóa trong Verilog thường được dùng để định nghĩa tên các trạng thái (ví dụ: S_IDLE, S_START) một cách cục bộ trong module là ______.",
    correctAnswer: "localparam",
    explanation: "localparam (hoặc parameter) dùng để định nghĩa các hằng số tượng trưng cho mã trạng thái, giúp code sáng tỏ và ngăn ngừa việc ghi đè ngoài ý muốn từ module cha.",
    relatedSection: "dinh-nghia-ma-trang-thai",
    difficulty: "basic",
  },

  // ==========================================
  // MODULE 11: MÔ PHỎNG & KIỂM CHỨNG ISE
  // ==========================================
  {
    id: "q-ise-01",
    lessonSlug: "mo-phong-ise",
    type: "true-false",
    prompt: "Trong module Testbench, danh sách cổng vào/ra ở khai báo module (port list) là rỗng: `module testbench_tb; ... endmodule`.",
    options: ["Đúng", "Sai"],
    correctAnswer: true,
    explanation: "Đúng. Testbench là môi trường khép kín trên phần mềm mô phỏng, không kết nối với chân vật lý bên ngoài của FPGA nên không có tín hiệu input/output trong port list.",
    relatedSection: "cau-truc-testbench",
    difficulty: "basic",
  },
  {
    id: "q-ise-02",
    lessonSlug: "mo-phong-ise",
    type: "mcq",
    prompt: "Trong Testbench, tín hiệu nối vào chân ngõ vào (inputs) của mạch cần kiểm tra (DUT - Device Under Test) phải được khai báo bằng kiểu nào?",
    options: ["reg", "wire", "integer", "parameter"],
    correctAnswer: "reg",
    explanation: "Vì Testbench lái các giá trị ngõ vào bên trong khối thủ tục `initial` hoặc `always` (ví dụ `#10 a = 1;`), nên các tín hiệu kích thích này bắt buộc phải khai báo là `reg`.",
    relatedSection: "ket-noi-dut-trong-testbench",
    difficulty: "medium",
  },
  {
    id: "q-ise-03",
    lessonSlug: "mo-phong-ise",
    type: "code-reading",
    prompt: "Với chỉ thị `timescale 1ns / 1ps, câu lệnh sau tạo ra xung Clock có chu kỳ và tần số bằng bao nhiêu?\n\n```verilog\nalways #10 clk = ~clk;\n```",
    options: [
      "Chu kỳ 20ns, tần số 50MHz",
      "Chu kỳ 10ns, tần số 100MHz",
      "Chu kỳ 10ns, tần số 50MHz",
      "Chu kỳ 20ns, tần số 20MHz"
    ],
    correctAnswer: "Chu kỳ 20ns, tần số 50MHz",
    explanation: "Mỗi nửa chu kỳ trễ 10 đơn vị thời gian (10 × 1ns = 10ns). Toàn bộ chu kỳ xung Clock T = 10ns + 10ns = 20ns. Tần số f = 1 / T = 1 / (20 × 10⁻⁹ s) = 50 × 10⁶ Hz = 50MHz.",
    relatedSection: "sinh-xung-clock-testbench",
    difficulty: "hard",
  },
];
