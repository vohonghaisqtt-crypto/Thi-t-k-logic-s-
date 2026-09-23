import { FlashcardItem } from "@/lib/types";

export const flashcards: FlashcardItem[] = [
  // ==========================================
  // MODULE 01: HỆ ĐẾM & BIỂU DIỄN THÔNG TIN (6 thẻ)
  // ==========================================
  {
    id: "fc-he-dem-01",
    category: "formula",
    front: "Công thức giá trị biểu diễn số trong hệ cơ số r bất kỳ?",
    back: "N = Σ (aᵢ × rⁱ)\n\nTrong đó aᵢ là ký số tại vị trí i, r là cơ số (2, 8, 10, 16). Phần nguyên i ≥ 0, phần lẻ i < 0.",
    lessonSlug: "he-dem",
    tip: "Nhớ quy tắc: Nguyên chia lấy dư ngược lên, lẻ nhân lấy nguyên xuôi xuống.",
  },
  {
    id: "fc-he-dem-02",
    category: "formula",
    front: "Cách tìm số bù 2 của một số nhị phân n bit?",
    back: "Bù 2 = Bù 1 + 1\n(Đảo toàn bộ các bit 0 thành 1, 1 thành 0 rồi cộng thêm 1).\n\nMẹo nhanh: Giữ nguyên các bit từ phải qua trái cho đến bit 1 đầu tiên, sau đó đảo toàn bộ các bit còn lại phía trước.",
    lessonSlug: "he-dem",
    tip: "Áp dụng mẹo quét từ LSB sang MSB sẽ làm bài thi nhanh gấp 3 lần.",
  },
  {
    id: "fc-he-dem-03",
    category: "concept",
    front: "Phạm vi biểu diễn của số nguyên có dấu n-bit dạng bù 2?",
    back: "Từ -(2ⁿ⁻¹) đến +(2ⁿ⁻¹ - 1)\n\nVí dụ với 8 bit: từ -128 đến +127. Số âm có bit dấu MSB = 1.",
    lessonSlug: "he-dem",
    tip: "Dạng bù 2 chỉ có một số 0 duy nhất (0000 0000), không bị lãng phí như dạng bit dấu.",
  },
  {
    id: "fc-he-dem-04",
    category: "concept",
    front: "Đặc điểm nhận dạng cốt lõi của Mã Gray (Gray Code)?",
    back: "Hai giá trị số liên tiếp nhau chỉ khác nhau đúng 1 bit duy nhất.\n\nỨng dụng: Giảm nhiễu chuyển mạch trong bìa Karnaugh, encoder quang học và đồng bộ clock domain chéo.",
    lessonSlug: "he-dem",
    tip: "Thứ tự mã Gray 2-bit bắt buộc: 00 -> 01 -> 11 -> 10.",
  },
  {
    id: "fc-he-dem-05",
    category: "trap",
    front: "Khi nào xảy ra hiện tượng Tràn số học (Overflow) trong phép cộng bù 2?",
    back: "Tràn số học CHỈ xảy ra khi cộng 2 số CÙNG DẤU mà kết quả thu được lại mang DẤU TRÁI NGƯỢC (Dương + Dương = Âm, hoặc Âm + Âm = Dương).\n\nCông thức nhận diện phần cứng: V = C_in_MSB ⊕ C_out_MSB.",
    lessonSlug: "he-dem",
    tip: "Có bit nhớ Carry tràn ra ngoài MSB KHÔNG có nghĩa là bị tràn số học có dấu.",
  },
  {
    id: "fc-he-dem-06",
    category: "concept",
    front: "Sự khác biệt căn bản giữa mã BCD và số nhị phân thuần túy?",
    back: "BCD (Binary-Coded Decimal) mã hóa RIÊNG TỪNG CHỮ SỐ thập phân bằng 4 bit nhị phân (0000 đến 1001).\n\nVí dụ: 25₁₀ = 0010 0101 (BCD), trong khi nhị phân thuần túy 25₁₀ = 11001₂.",
    lessonSlug: "he-dem",
    tip: "BCD lãng phí 6 tổ hợp từ 1010 đến 1111 nhưng hiển thị trực quan lên LED 7 đoạn.",
  },

  // ==========================================
  // MODULE 02: ĐẠI SỐ BOOLE & CỔNG LOGIC (5 thẻ)
  // ==========================================
  {
    id: "fc-boole-01",
    category: "formula",
    front: "Phát biểu 2 định luật DeMorgan cốt lõi trong Đại số Boole?",
    back: "1. (A · B)' = A' + B' (Phủ định của tích bằng tổng các phủ định)\n2. (A + B)' = A' · B' (Phủ định của tổng bằng tích các phủ định)",
    lessonSlug: "dai-so-boole",
    tip: "Bẻ gãy thanh phủ định phía trên và đổi dấu phép toán (AND thành OR, OR thành AND).",
  },
  {
    id: "fc-boole-02",
    category: "formula",
    front: "Biểu thức đại số và bảng chân trị của cổng XOR (Exclusive-OR)?",
    back: "Y = A ⊕ B = A'B + AB'\n\nNgõ ra Y = 1 khi hai ngõ vào khác nhau (một bit 0, một bit 1).\nNgõ ra Y = 0 khi hai ngõ vào giống nhau.",
    lessonSlug: "dai-so-boole",
    tip: "XOR là bộ dò bit lẻ (odd detector): số lượng bit 1 là lẻ thì ngõ ra bằng 1.",
  },
  {
    id: "fc-boole-03",
    category: "concept",
    front: "Tại sao cổng NAND và NOR được gọi là cổng logic vạn năng (Universal Gates)?",
    back: "Vì chỉ cần dùng duy nhất một loại cổng NAND (hoặc NOR), ta có thể tổng hợp được tất cả các hàm logic cơ bản khác: NOT, AND, OR, XOR, XNOR.",
    lessonSlug: "dai-so-boole",
    tip: "Trong công nghiệp vi mạch bán dẫn, cổng NAND/NOR được ưu tiên sản xuất vì mật độ transistor nhỏ gọn nhất.",
  },
  {
    id: "fc-boole-04",
    category: "concept",
    front: "Nguyên lý Đối ngẫu (Duality Principle) trong Đại số Boole phát biểu gì?",
    back: "Nếu một đẳng thức đại số Boole là đúng, thì biểu thức đối ngẫu của nó (đổi AND ↔ OR và 0 ↔ 1, giữ nguyên các biến) cũng luôn luôn đúng.",
    lessonSlug: "dai-so-boole",
    tip: "Đối ngẫu CHỈ đổi toán tử và hằng số, tuyệt đối KHÔNG đảo biến.",
  },
  {
    id: "fc-boole-05",
    category: "formula",
    front: "Đặc tính của cổng XNOR và ứng dụng trong so sánh bằng?",
    back: "Y = ¬(A ⊕ B) = A·B + A'·B'\n\nNgõ ra Y = 1 khi hai ngõ vào GIỐNG NHAU (cùng 0 hoặc cùng 1). Đây là phần tử cốt lõi của mạch so sánh bằng đa bit (A = B).",
    lessonSlug: "dai-so-boole",
    tip: "XNOR = Equivalence Gate (cổng tương đương).",
  },

  // ==========================================
  // MODULE 03: DẠNG CHUẨN TẮC & BÌA KARNAUGH (5 thẻ)
  // ==========================================
  {
    id: "fc-karnaugh-01",
    category: "concept",
    front: "Phân biệt Minterm (Σm) và Maxterm (ΠM)?",
    back: "- Minterm (mᵢ): Tích chuẩn tắc, gán bit 1 cho biến thường (A), bit 0 cho biến đảo (A').\n- Maxterm (Mᵢ): Tổng chuẩn tắc, gán bit 0 cho biến thường (A), bit 1 cho biến đảo (A').",
    lessonSlug: "karnaugh",
    tip: "SOP = Tổng các Minterm (gom ô 1). POS = Tích các Maxterm (gom ô 0).",
  },
  {
    id: "fc-karnaugh-02",
    category: "trap",
    front: "Quy tắc bắt buộc khi gom nhóm các ô số 1 trên bìa Karnaugh?",
    back: "1. Kích thước nhóm BẮT BUỘC là lũy thừa của 2 (1, 2, 4, 8, 16... ô). Tuyệt đối không gom 3, 5, 6 ô.\n2. Nhóm phải có dạng hình chữ nhật hoặc hình vuông.\n3. Nhóm càng lớn thì biểu thức tối giản càng ít biến (nhóm 2^k ô triệt tiêu k biến).",
    lessonSlug: "karnaugh",
    tip: "Bìa K-map có tính chất liền kề qua mép: 4 góc hoặc 2 mép đối diện có thể gom chung.",
  },
  {
    id: "fc-karnaugh-03",
    category: "concept",
    front: "Vai trò của điều kiện tùy định (Don't Care Condition - X) trong K-map?",
    back: "Ô X đại diện cho tổ hợp ngõ vào không bao giờ xuất hiện hoặc ngõ ra không quan trọng.\n\nChiến thuật: Coi X = 1 nếu nó giúp gộp nhóm ô 1 lớn hơn; coi X = 0 (bỏ qua) nếu nó đứng riêng lẻ.",
    lessonSlug: "karnaugh",
    tip: "Đừng cố gom tất cả các ô X nếu chúng không giúp giảm biến.",
  },
  {
    id: "fc-karnaugh-04",
    category: "trap",
    front: "Thứ tự sắp xếp chỉ số hàng/cột của bìa Karnaugh 4 biến?",
    back: "Bắt buộc theo mã Gray 2-bit: 00 -> 01 -> 11 -> 10.\n\nHàng thứ 3 là 11, hàng thứ 4 là 10. Tương tự với cột.\nNếu viết 10 trước 11 như số nhị phân thông thường thì tính liền kề đơn biến bị phá vỡ.",
    lessonSlug: "karnaugh",
    tip: "Ghi nhớ thần chú: 00, 01, 11, 10 (11 đứng trước 10).",
  },
  {
    id: "fc-karnaugh-05",
    category: "formula",
    front: "Nguyên lý triệt tiêu biến khi gom nhóm 2^k ô trên K-map?",
    back: "Một nhóm gồm 2^k ô liền kề sẽ triệt tiêu được đúng k biến có giá trị thay đổi giữa 0 và 1 trong nhóm đó.\n\nVí dụ: K-map 4 biến gom nhóm 4 ô (2^2) sẽ triệt tiêu 2 biến, biểu thức còn lại đúng 2 biến.",
    lessonSlug: "karnaugh",
    tip: "Nhóm 1 ô = 4 biến; Nhóm 2 ô = 3 biến; Nhóm 4 ô = 2 biến; Nhóm 8 ô = 1 biến.",
  },

  // ==========================================
  // MODULE 04: MẠCH LOGIC TỔ HỢP CĂN BẢN (6 thẻ)
  // ==========================================
  {
    id: "fc-tohop-01",
    category: "concept",
    front: "Đặc điểm bản chất của Mạch logic tổ hợp (Combinational Logic)?",
    back: "Ngõ ra ở mọi thời điểm CHỈ phụ thuộc duy nhất vào giá trị tín hiệu ngõ vào tại chính thời điểm đó.\n\nKhông có khả năng lưu trữ bộ nhớ, không có phản hồi vòng (no feedback loop).",
    lessonSlug: "mach-to-hop",
    tip: "Phương trình hàm: Y = f(X1, X2, ..., Xn).",
  },
  {
    id: "fc-tohop-02",
    category: "formula",
    front: "Mối quan hệ giữa số đường chọn (Select lines) và ngõ vào của Multiplexer (MUX)?",
    back: "MUX có n đường chọn sẽ quản lý và điều phối được 2ⁿ đường dữ liệu ngõ vào đến 1 ngõ ra duy nhất.\n\nVí dụ:\n- MUX 2:1 cần 1 đường chọn (S).\n- MUX 4:1 cần 2 đường chọn (S1, S0).\n- MUX 8:1 cần 3 đường chọn.",
    lessonSlug: "mach-to-hop",
    tip: "Công thức: Số ngõ vào Input = 2^(Số đường Select).",
  },
  {
    id: "fc-tohop-03",
    category: "concept",
    front: "Sự khác biệt giữa Encoder thông thường và Priority Encoder (Bộ mã hóa ưu tiên)?",
    back: "- Encoder thông thường: Chỉ cho phép duy nhất một ngõ vào tích cực tại một thời điểm (nhiều hơn 1 sẽ sai kết quả).\n- Priority Encoder: Cho phép nhiều ngõ vào cùng tích cực, mạch sẽ ưu tiên xuất mã nhị phân của ngõ vào có trọng số cao nhất.",
    lessonSlug: "mach-to-hop",
    tip: "IC thực tế phổ biến: 74LS148 là bộ mã hóa ưu tiên 8 sang 3 dòng active-low.",
  },
  {
    id: "fc-tohop-04",
    category: "trap",
    front: "Thế nào là tín hiệu Tích cực mức thấp (Active-Low)?",
    back: "Tín hiệu chỉ được coi là kích hoạt (Active/Enable) khi điện áp ở mức logic 0 (LOW). Mức 1 đại diện cho trạng thái khóa/ngắt (Inactive).\n\nKý hiệu: Thường có dấu tròn đảo ở chân IC hoặc có dấu gạch trên đầu tên tín hiệu (~EN, CS#).",
    lessonSlug: "mach-to-hop",
    tip: "Rất nhiều IC thực tế (như 74LS138) dùng chân Enable tích cực mức 0.",
  },
  {
    id: "fc-tohop-05",
    category: "concept",
    front: "Phương pháp dùng MUX 2ⁿ:1 để thực hiện hàm Boolean n biến?",
    back: "Đưa n biến logic vào n chân điều khiển Select (S) của MUX. Các ngõ vào dữ liệu I₀, I₁,... được nối trực tiếp với mức logic 0, 1 hoặc biến còn lại theo đúng bảng chân trị của hàm.",
    lessonSlug: "mach-to-hop",
    tip: "MUX là mạch vạn năng trong vi mạch tổ hợp, có thể thực hiện mọi hàm logic.",
  },
  {
    id: "fc-tohop-06",
    category: "formula",
    front: "Cách ghép 2 IC Decoder 2→4 thành Decoder 3→8 bằng chân Enable?",
    back: "Đưa 2 biến địa chỉ thấp vị vào song song các chân chọn A, B của cả 2 IC. Biến địa chỉ cao vị (C) được nối trực tiếp vào chân Enable của IC2, và qua cổng NOT vào Enable của IC1.",
    lessonSlug: "mach-to-hop",
    tip: "C=0 chọn IC1 (giải mã 000..011); C=1 chọn IC2 (giải mã 100..111).",
  },

  // ==========================================
  // MODULE 05: MẠCH SỐ HỌC & SO SÁNH (5 thẻ)
  // ==========================================
  {
    id: "fc-sohoc-01",
    category: "formula",
    front: "Cấu trúc và phương trình của Bộ nửa cộng (Half Adder)?",
    back: "- Tổng (Sum): S = A ⊕ B\n- Nhớ ra (Carry): C = A · B\n\nChỉ cộng 2 bit dữ liệu đơn, KHÔNG có chân nhận bit nhớ từ tầng trước.",
    lessonSlug: "mach-so-hoc",
    tip: "Half Adder cấu thành từ đúng 1 cổng XOR và 1 cổng AND.",
  },
  {
    id: "fc-sohoc-02",
    category: "formula",
    front: "Phương trình logic của Bộ cộng toàn phần (Full Adder)?",
    back: "- Sum: S = A ⊕ B ⊕ Cᵢₙ\n- Carry: Cₒᵤₜ = A·B + Cᵢₙ·(A ⊕ B)\n\nCộng được 3 bit nhị phân (2 bit dữ liệu và 1 bit nhớ từ tầng trước).",
    lessonSlug: "mach-so-hoc",
    tip: "Một Full Adder có thể ghép từ 2 Half Adder và 1 cổng OR.",
  },
  {
    id: "fc-sohoc-03",
    category: "concept",
    front: "Nguyên lý của Bộ cộng lan truyền nhớ (Ripple Carry Adder)?",
    back: "Ghép chuỗi n bộ Full Adder liên tiếp, trong đó ngõ ra nhớ C_out của tầng trước được nối vào C_in của tầng kế tiếp.\n\nNhược điểm: Thời gian trễ truyền lan tăng tỷ lệ thuận với số bit n (t_delay = n × t_FA).",
    lessonSlug: "mach-so-hoc",
    tip: "Để khắc phục trễ Ripple, người ta dùng bộ cộng Carry-Lookahead (tính trước bit nhớ).",
  },
  {
    id: "fc-sohoc-04",
    category: "concept",
    front: "Quy tắc so sánh độ lớn (Magnitude Comparator) đa bit?",
    back: "Mạch bắt buộc so sánh từ bit trọng số cao nhất (MSB) xuống LSB. Nếu A_MSB > B_MSB thì kết luận ngay A > B mà không cần quan tâm các bit còn lại; chỉ khi các bit cao vị bằng nhau mới xét tiếp bit thấp hơn.",
    lessonSlug: "mach-so-hoc",
    tip: "Điều kiện bằng nhau: A = B khi tất cả các cặp bit đều có A_i XNOR B_i = 1.",
  },
  {
    id: "fc-sohoc-05",
    category: "formula",
    front: "Cách tạo bit kiểm tra chẵn lẻ (Parity Bit)?",
    back: "- Chẵn (Even Parity): P = A ⊕ B ⊕ C ⊕ D (sao cho tổng số bit 1 gồm cả P là số chẵn).\n- Lẻ (Odd Parity): P = ~(A ⊕ B ⊕ C ⊕ D) (sao cho tổng số bit 1 gồm cả P là số lẻ).",
    lessonSlug: "mach-so-hoc",
    tip: "Phía thu: Kiểm tra lỗi bằng cách tính lại phép XOR toàn bộ các bit nhận được kể cả P.",
  },

  // ==========================================
  // MODULE 06: MẠCH LOGIC TUẦN TỰ & FLIP-FLOP (6 thẻ)
  // ==========================================
  {
    id: "fc-tuantu-01",
    category: "concept",
    front: "Sự khác biệt cốt lõi giữa Latch và Flip-Flop?",
    back: "- Latch: Nhạy theo MỨC tín hiệu (Level-sensitive). Khi Enable kích hoạt, dữ liệu vào thông suốt ra ngõ ra.\n- Flip-Flop: Nhạy theo CẠNH xung nhịp (Edge-triggered). Chỉ lấy mẫu dữ liệu tại thời điểm chuyển mức 0->1 (posedge) hoặc 1->0 (negedge).",
    lessonSlug: "mach-tuan-tu",
    tip: "Mạch đồng bộ hiện đại và FPGA hầu hết xây dựng trên Flip-Flop nhạy cạnh.",
  },
  {
    id: "fc-tuantu-02",
    category: "formula",
    front: "Bảng trạng thái và tính năng đặc biệt của JK Flip-Flop?",
    back: "- J=0, K=0: Giữ nguyên (Hold: Q+ = Q)\n- J=0, K=1: Xóa về 0 (Reset: Q+ = 0)\n- J=1, K=0: Đặt lên 1 (Set: Q+ = 1)\n- J=1, K=1: Đảo trạng thái (Toggle: Q+ = ~Q)\n\nPhương trình: Q+ = J·~Q + ~K·Q.",
    lessonSlug: "mach-tuan-tu",
    tip: "Khắc phục triệt để trạng thái cấm của RS Flip-Flop bằng trạng thái Toggle.",
  },
  {
    id: "fc-tuantu-03",
    category: "formula",
    front: "Phương trình đặc trưng của D Flip-Flop và T Flip-Flop?",
    back: "- D Flip-Flop: Q+ = D (Ngõ ra kế tiếp bám sát giá trị ngõ vào D tại cạnh clock).\n- T Flip-Flop: Q+ = T ⊕ Q (T=0 giữ nguyên, T=1 đảo trạng thái Q).",
    lessonSlug: "mach-tuan-tu",
    tip: "D FF là linh kiện phổ biến nhất trong thanh ghi, bộ nhớ đệm và FPGA.",
  },
  {
    id: "fc-tuantu-04",
    category: "trap",
    front: "Vai trò của ngõ trực tiếp PRE (Preset) và CLR (Clear)?",
    back: "Là các ngõ vào KHÔNG ĐỒNG BỘ (Asynchronous), có quyền ưu tiên cao nhất: lập tức ép Q=1 (PRE) hoặc Q=0 (CLR) mà KHÔNG phụ thuộc xung Clock.\n\nThường tích cực mức thấp (~PRE, ~CLR).",
    lessonSlug: "mach-tuan-tu",
    tip: "Dùng để thiết lập trạng thái khởi động mạch khi vừa bật nguồn.",
  },
  {
    id: "fc-tuantu-05",
    category: "concept",
    front: "Bảng kích thích (Excitation Table) dùng để làm gì?",
    back: "Cho biết cần đặt các ngõ vào của FF bằng bao nhiêu để làm cho ngõ ra chuyển từ trạng thái hiện tại Q sang trạng thái kế tiếp mong muốn Q+.\n\nD FF: D = Q+\nT FF: T = Q ⊕ Q+",
    lessonSlug: "mach-tuan-tu",
    tip: "Là công cụ cốt lõi để thiết kế bộ đếm đồng bộ và máy trạng thái FSM.",
  },
  {
    id: "fc-tuantu-06",
    category: "trap",
    front: "Trạng thái cấm của RS Flip-Flop xảy ra khi nào?",
    back: "- Với RS cổng NOR: Cấm khi S = R = 1 (vì làm cả Q và ~Q cùng xuống 0, và khi nhả ra cùng lúc sẽ rơi vào trạng thái không xác định).\n- Với RS cổng NAND (chân ~S, ~R): Cấm khi ~S = ~R = 0.",
    lessonSlug: "mach-tuan-tu",
    tip: "Luôn kiểm tra cổng NOR (active-high) hay NAND (active-low) trước khi làm bài.",
  },

  // ==========================================
  // MODULE 07: BỘ ĐẾM & THANH GHI DỊCH (5 thẻ)
  // ==========================================
  {
    id: "fc-counter-01",
    category: "formula",
    front: "Công thức tính số Flip-Flop cần thiết cho bộ đếm Mod-M?",
    back: "Số FF (n) phải thỏa mãn bất đẳng thức:\n2ⁿ⁻¹ < M ≤ 2ⁿ\n\nVí dụ: Bộ đếm Mod-6 cần 3 FF (2² < 6 ≤ 2³ = 8).\nBộ đếm Mod-10 cần 4 FF (2³ < 10 ≤ 2⁴ = 16).",
    lessonSlug: "counter-register",
    tip: "Luôn nhớ: n con FF có thể tạo tối đa 2^n trạng thái.",
  },
  {
    id: "fc-counter-02",
    category: "concept",
    front: "Phân biệt Bộ đếm bất đồng bộ (Ripple) và Bộ đếm đồng bộ (Synchronous)?",
    back: "- Ripple Counter: Xung clock của FF sau lấy từ ngõ ra của FF trước. Đơn giản nhưng trễ tích lũy tăng dần, dễ sinh glitch ở tần số cao.\n- Synchronous Counter: Tất cả các FF nhận CHUNG một nguồn xung clock. Mọi FF lật trạng thái cùng lúc, an toàn ở tần số cao.",
    lessonSlug: "counter-register",
    tip: "Mạch công nghiệp tốc độ cao bắt buộc dùng Synchronous Counter.",
  },
  {
    id: "fc-counter-03",
    category: "concept",
    front: "Kể tên 4 kiểu vào/ra của Thanh ghi dịch (Shift Register)?",
    back: "1. SISO: Nối tiếp vào - Nối tiếp ra (Serial-In Serial-Out)\n2. SIPO: Nối tiếp vào - Song song ra (chuyển đổi bit nối tiếp thành byte song song)\n3. PISO: Song song vào - Nối tiếp ra (truyền dữ liệu lên đường truyền serial)\n4. PIPO: Song song vào - Song song ra (thanh ghi lưu trữ đa bit thông thường)",
    lessonSlug: "counter-register",
    tip: "SIPO thường dùng nhận dữ liệu UART; PISO dùng phát dữ liệu UART.",
  },
  {
    id: "fc-counter-04",
    category: "formula",
    front: "Cách reset bộ đếm tự nhiên 4-bit thành bộ đếm Mod-10?",
    back: "Khi đếm đến trạng thái 10 (1010₂ tức Q3=1, Q1=1), dùng cổng NAND nhận 2 ngõ ra Q3 và Q1, ngõ ra cổng NAND nối vào chân ~CLR (Active-Low) của tất cả các Flip-Flop để xóa tức thì về 0.",
    lessonSlug: "counter-register",
    tip: "Phương pháp reset bất đồng bộ: NAND(các bit bằng 1 của trạng thái M).",
  },
  {
    id: "fc-counter-05",
    category: "concept",
    front: "Đặc điểm của Bộ đếm vòng (Ring Counter) và Johnson Counter?",
    back: "- Ring Counter: Nối ngõ ra Q của FF cuối về FF đầu, quay vòng duy nhất 1 bit 1 (cần n FF cho n trạng thái).\n- Johnson Counter: Nối ngõ ra đảo ~Q của FF cuối về FF đầu, tạo chuỗi mã phản chiếu (cần n FF cho 2n trạng thái).",
    lessonSlug: "counter-register",
    tip: "Johnson counter tăng gấp đôi số trạng thái so với Ring counter cùng số FF.",
  },

  // ==========================================
  // MODULE 08: QUY TRÌNH HDL & VERILOG CƠ BẢN (6 thẻ)
  // ==========================================
  {
    id: "fc-verilog-01",
    category: "verilog",
    front: "Quy tắc cốt lõi phân biệt kiểu dữ liệu `wire` và `reg` trong Verilog?",
    back: "- `wire`: Đại diện cho đường dây nối vật lý, nhận giá trị liên tục qua câu lệnh `assign` hoặc ngõ ra module con.\n- `reg`: Biến lưu trữ giá trị được gán bên trong các khối thủ tục (`always` hoặc `initial`).",
    lessonSlug: "verilog-co-ban",
    tip: "reg KHÔNG đồng nghĩa là Flip-Flop phần cứng; reg trong always @(*) tổ hợp vẫn tổng hợp thành mạch tổ hợp.",
  },
  {
    id: "fc-verilog-02",
    category: "verilog",
    front: "Cú pháp biểu diễn hằng số số học trong Verilog: `<size>'<base><value>`?",
    back: "- size: Số lượng bit nhị phân.\n- base: Cơ số (b: nhị phân, o: bát phân, d: thập phân, h: thập lục phân).\n- value: Giá trị.\n\nVí dụ: 8'hA5 (8 bit hex A5 = 10100101₂), 4'b1100, 16'd255.",
    lessonSlug: "verilog-co-ban",
    tip: "Nếu không khai báo size, mặc định Verilog coi là số nguyên 32 bit thập phân.",
  },
  {
    id: "fc-verilog-03",
    category: "trap",
    front: "Phân biệt toán tử so sánh logic `==` và toán tử case equality `===`?",
    back: "- `==`: Trả về `x` (Unknown) nếu một trong hai vế có chứa bit `x` hoặc `z`.\n- `===`: So sánh chính xác tuyệt đối cả 4 trạng thái (0, 1, x, z), trả về 1 nếu giống hệt nhau kể cả bit x/z. Chỉ dùng cho Testbench mô phỏng, không tổng hợp được.",
    lessonSlug: "verilog-co-ban",
    tip: "Kiểm tra lỗi khởi tạo x trong testbench: dùng === 1'bx.",
  },
  {
    id: "fc-verilog-04",
    category: "verilog",
    front: "Cú pháp và vai trò của toán tử thu gọn (Reduction Operator)?",
    back: "Đặt toán tử logic trước một vector bus: &A, |A, ^A.\nThực hiện phép toán trên tất cả các bit của vector A để trả về 1 bit kết quả.\n\nVí dụ: &4'b1111 = 1; &4'b1101 = 0.",
    lessonSlug: "verilog-co-ban",
    tip: "& đứng trước 1 biến là Reduction (thu gọn), & đứng giữa 2 biến là Bitwise AND.",
  },
  {
    id: "fc-verilog-05",
    category: "verilog",
    front: "Cú pháp ghép vector và nhân bản bit trong Verilog?",
    back: "- Ghép nối: `{A, B}` (ghép vector A và B theo thứ tự trái sang phải).\n- Nhân bản: `{n{A}}` (lặp lại tín hiệu A đúng n lần).\n\nVí dụ: `{4{1'b1}}` = 4'b1111; `{2'b10, 2'b01}` = 4'b1001.",
    lessonSlug: "verilog-co-ban",
    tip: "Rất hữu ích khi cần mở rộng dấu (sign-extension) trong mạch cộng trừ bù 2.",
  },
  {
    id: "fc-verilog-06",
    category: "trap",
    front: "Tại sao nên dùng Named Port Connection khi khởi tạo Module con?",
    back: "Named Mapping `.port_name(signal_name)` liên kết tín hiệu trực tiếp theo tên cổng khai báo, độc lập 100% với thứ tự chân.\n\nPositional Mapping nối theo thứ tự rất dễ gây chập mạch ngõ vào/ra khi sửa module con.",
    lessonSlug: "verilog-co-ban",
    tip: "Chuẩn thiết kế: addbit U1 (.a(x), .b(y), .cin(c), .sum(s), .cout(co));",
  },

  // ==========================================
  // MODULE 09: MÔ TẢ HÀNH VI (BEHAVIORAL) (6 thẻ)
  // ==========================================
  {
    id: "fc-behavioral-01",
    category: "verilog",
    front: "Quy tắc vàng phân biệt Blocking (=) và Non-blocking (<=) trong Verilog?",
    back: "1. Logic tổ hợp (Combinational): Dùng `always @(*)` và phép gán BLOCKING `=`. Thực thi tuần tự từng dòng.\n2. Logic tuần tự (Sequential): Dùng `always @(posedge clk)` và phép gán NON-BLOCKING `<=`. Đánh giá đồng thời vế phải rồi cập nhật cùng lúc tại cạnh clock.",
    lessonSlug: "verilog-behavioral",
    tip: "Nhớ câu thần chú: Tổ hợp dùng '=', Cạnh Clock dùng '<='.",
  },
  {
    id: "fc-behavioral-02",
    category: "trap",
    front: "Thế nào là hiện tượng Inadvertent Latch (chốt nhớ ngoài ý muốn) trong Verilog?",
    back: "Xảy ra khi một biến trong khối tổ hợp `always @(*)` không được gán giá trị ở TẤT CẢ các nhánh điều kiện (`if` thiếu `else`, hoặc `case` thiếu `default`).\n\nBộ tổng hợp buộc phải sinh ra Latch để giữ giá trị cũ, gây trễ và chạy sai chức năng.",
    lessonSlug: "verilog-behavioral",
    tip: "Phòng tránh: Luôn có nhánh `default:` trong `case` hoặc gán giá trị mặc định ở đầu khối always.",
  },
  {
    id: "fc-behavioral-03",
    category: "verilog",
    front: "Sự khác biệt căn bản giữa khối `initial` và khối `always`?",
    back: "- `initial`: Chỉ chạy DUY NHẤT 1 lần tại thời điểm bắt đầu mô phỏng (t = 0), không thể tổng hợp thành phần cứng thực tế (chỉ dùng trong Testbench).\n- `always`: Lặp lại liên tục suốt thời gian hoạt động mỗi khi tín hiệu trong danh sách nhạy (sensitivity list) thay đổi.",
    lessonSlug: "verilog-behavioral",
    tip: "Không bao giờ dùng initial để gán reset trong mạch tổng hợp nạp FPGA.",
  },
  {
    id: "fc-behavioral-04",
    category: "verilog",
    front: "Vai trò của ký hiệu `@(*)` trong khối always tổ hợp?",
    back: "`@(*)` tự động đưa tất cả các biến xuất hiện ở vế phải của biểu thức bên trong khối vào danh sách nhạy (Sensitivity list).\n\nTránh được lỗi mô phỏng không chạy do lập trình viên khai báo thiếu biến ngõ vào.",
    lessonSlug: "verilog-behavioral",
    tip: "Luôn dùng always @(*) thay vì liệt kê thủ công always @(a or b or c).",
  },
  {
    id: "fc-behavioral-05",
    category: "trap",
    front: "Sự khác biệt giữa câu lệnh `casez` và `casex` trong Verilog?",
    back: "- `casez`: Bỏ qua các bit `z` hoặc `?` (coi là don't care khi so khớp nhánh).\n- `casex`: Bỏ qua cả `x` VÀ `z`.\n\nKhuyến cáo: Nên dùng `casez` với ký tự `?`, tránh dùng `casex` vì có thể vô tình che giấu lỗi tín hiệu chưa khởi tạo x.",
    lessonSlug: "verilog-behavioral",
    tip: "Ví dụ: 4'b1??? khớp với mọi mã nhị phân có bit cao nhất là 1.",
  },
  {
    id: "fc-behavioral-06",
    category: "verilog",
    front: "Mô hình D Flip-Flop có Reset bất đồng bộ trong Verilog?",
    back: "always @(posedge clk or posedge rst) begin\n  if (rst)\n    q <= 1'b0;\n  else\n    q <= d;\nend\n\nReset được đưa vào danh sách nhạy và có mức ưu tiên cao hơn xung clock.",
    lessonSlug: "verilog-behavioral",
    tip: "Nếu reset đồng bộ: danh sách nhạy chỉ có always @(posedge clk).",
  },

  // ==========================================
  // MODULE 10: MÁY TRẠNG THÁI HỮU HẠN (FSM) (5 thẻ)
  // ==========================================
  {
    id: "fc-fsm-01",
    category: "concept",
    front: "Mô hình kiến trúc 3 khối chuẩn của một FSM trong Verilog?",
    back: "1. Next-state Logic (always @(*)): Mạch tổ hợp tính toán trạng thái kế tiếp từ current_state và input.\n2. State Register (always @(posedge clk)): Mạch tuần tự cập nhật current_state <= next_state.\n3. Output Logic: Phát tín hiệu ngõ ra dựa trên current_state (Moore) hoặc cả current_state + input (Mealy).",
    lessonSlug: "fsm",
    tip: "Tách bạch 3 khối giúp code FSM dễ debug, dễ tối ưu và không bị sinh chốt ngoài ý muốn.",
  },
  {
    id: "fc-fsm-02",
    category: "concept",
    front: "Sự khác nhau căn bản giữa máy trạng thái Moore và Mealy?",
    back: "- Moore: Ngõ ra CHỈ phụ thuộc vào Trạng thái hiện tại. Ngõ ra đồng bộ hoàn toàn với xung clock, không bị nhiễu ngõ vào.\n- Mealy: Ngõ ra phụ thuộc cả Trạng thái hiện tại VÀ Ngõ vào. Phản ứng nhanh hơn trong cùng chu kỳ clock nhưng dễ bị xung gai (glitch) từ ngõ vào.",
    lessonSlug: "fsm",
    tip: "Cần ngõ ra sạch glitch tuyệt đối: Chọn Moore.",
  },
  {
    id: "fc-fsm-03",
    category: "verilog",
    front: "Tại sao nên dùng `localparam` hoặc `parameter` để định nghĩa trạng thái FSM?",
    back: "Giúp code dễ đọc, trực quan theo tên ký hiệu (ví dụ: S_IDLE, S_READ, S_WRITE) thay vì gõ số nhị phân trực tiếp; dễ dàng thay đổi kiểu mã hóa trạng thái (Binary, One-Hot, Gray) mà không cần sửa thân logic FSM.",
    lessonSlug: "fsm",
    tip: "Ví dụ: localparam S_IDLE = 2'b00, S_START = 2'b01, S_DONE = 2'b10;",
  },
  {
    id: "fc-fsm-04",
    category: "trap",
    front: "Nguy cơ xung gai (Glitch) ở ngõ ra Mealy FSM xảy ra như thế nào?",
    back: "Do ngõ ra Mealy có đường nối trực tiếp từ tín hiệu ngõ vào (Y = f(State, Input)), bất kỳ dao động điện áp hoặc nhiễu chuyển mạch nào ở ngõ vào sẽ truyền thẳng ra ngõ ra ngay trong chu kỳ clock hiện tại mà không chờ cạnh clock.",
    lessonSlug: "fsm",
    tip: "Giải pháp: Thêm 1 tầng Flip-Flop chốt ngõ ra Mealy (Registered Mealy Output).",
  },
  {
    id: "fc-fsm-05",
    category: "concept",
    front: "So sánh mã hóa trạng thái Binary Encoding và One-Hot Encoding trong FSM?",
    back: "- Binary: Cần log2(N) Flip-Flop, tiết kiệm FF nhưng mạch giải mã trạng thái kế tiếp phức tạp hơn.\n- One-Hot: Cần đúng N Flip-Flop cho N trạng thái (mỗi trạng thái chỉ có 1 bit lên 1). Tốn FF hơn nhưng logic giải mã cực kỳ đơn giản và tốc độ nhanh, tối ưu cho kiến trúc FPGA.",
    lessonSlug: "fsm",
    tip: "FPGA có sẵn nhiều Flip-Flop: One-Hot là lựa chọn hàng đầu cho FSM tốc độ cao.",
  },

  // ==========================================
  // MODULE 11: MÔ PHỎNG & KIỂM CHỨNG ISE (5 thẻ)
  // ==========================================
  {
    id: "fc-mophong-01",
    category: "concept",
    front: "Sự khác biệt căn bản giữa Design Module và Testbench Module?",
    back: "- Design Module: Mô tả phần cứng thực tế, có các chân `input` và `output`, có thể tổng hợp thành vi mạch FPGA/ASIC (Synthesizable).\n- Testbench: Môi trường kiểm thử ảo, không có chân ngõ vào/ra (port list rỗng). Dùng để phát xung kích thích tín hiệu và quan sát sóng ngõ ra, KHÔNG thể tổng hợp thành phần cứng.",
    lessonSlug: "mo-phong-ise",
    tip: "Trong Testbench, tín hiệu nối vào input DUT khai báo là `reg`, nối vào output DUT khai báo là `wire`.",
  },
  {
    id: "fc-mophong-02",
    category: "verilog",
    front: "Cú pháp tạo xung clock chu kỳ 20ns (tần số 50MHz) trong Testbench?",
    back: "`timescale 1ns / 1ps\n\nalways #10 clk = ~clk;\n\nGiải thích: Cứ sau nửa chu kỳ 10ns, tín hiệu clk sẽ tự đảo trạng thái từ 0 sang 1 hoặc ngược lại, tạo nên toàn bộ chu kỳ xung 20ns (T = 10ns + 10ns = 20ns -> f = 1/20ns = 50MHz).",
    lessonSlug: "mo-phong-ise",
    tip: "Đừng quên khởi tạo clk = 0 trong khối initial trước khi chạy always clock.",
  },
  {
    id: "fc-mophong-03",
    category: "trap",
    front: "Tại sao không được dùng câu lệnh trễ `#10` trong Design Module?",
    back: "Toán tử trễ `#` chỉ là câu lệnh điều khiển thời gian trong môi trường mô phỏng (Simulation). Trình tổng hợp phần cứng (Synthesis tool) sẽ bỏ qua hoặc báo lỗi vì phần cứng thực tế không có linh kiện nào tạo trễ trực tiếp bằng `#`.",
    lessonSlug: "mo-phong-ise",
    tip: "Mọi điều khiển trễ thời gian trong phần cứng thực tế phải được tính bằng số chu kỳ xung Clock và bộ đếm.",
  },
  {
    id: "fc-mophong-04",
    category: "trap",
    front: "Tại sao tín hiệu trên Waveform ISim lại hiển thị dải màu đỏ toàn bộ?",
    back: "Dải màu đỏ biểu thị trạng thái không xác định 'x' (Unknown). Nguyên nhân phổ biến nhất là lập trình viên quên gán giá trị khởi tạo tại t=0 trong khối initial của Testbench, hoặc mạch chưa nhận tín hiệu Reset ban đầu.",
    lessonSlug: "mo-phong-ise",
    tip: "Luôn khởi tạo tất cả các tín hiệu reg tại thời điểm t=0: initial begin a=0; b=0; rst=1; end",
  },
  {
    id: "fc-mophong-05",
    category: "concept",
    front: "Ý nghĩa của chỉ thị tiền xử lý `timescale 1ns / 1ps trong Verilog?",
    back: "- `1ns`: Đơn vị thời gian (Time Unit) cho mọi câu lệnh trễ `#` (ví dụ `#10` là 10 × 1ns = 10ns).\n- `1ps`: Độ chính xác làm tròn thời gian (Time Precision) của bộ giải mô phỏng (tính toán chi tiết đến 0.001ns).",
    lessonSlug: "mo-phong-ise",
    tip: "Luôn đặt chỉ thị timescale ở dòng đầu tiên của file Testbench.",
  },
];
