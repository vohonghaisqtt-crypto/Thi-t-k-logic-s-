# LESSON 03 — SOP, POS, MINTERM, MAXTERM VÀ KARNAUGH

**Slug:** `karnaugh`  
**Nguồn chính:** C2, trang 11–25 và 29–43.

## 1. Ba cách biểu diễn một hàm Boolean

C2 giới thiệu ba cách:

1. bảng trạng thái/truth table;
2. biểu thức đại số;
3. bìa Karnaugh.

Ba dạng này phải được nhìn như ba biểu diễn **cùng một hàm**, không phải ba bài khác nhau.

---

## 2. Truth table

Hàm `n` biến có:

```text
2^n tổ hợp đầu vào
```

và bảng có:

- `n` cột input;
- 1 hoặc nhiều cột output;
- `2^n` dòng tổ hợp nếu hàm được định nghĩa đầy đủ.

---

## 3. Minterm và SOP

Minterm là tích chứa đủ các biến.

Quy ước theo C2:

- bit `0` → biến đảo;
- bit `1` → biến thường.

Ví dụ `A B C = 1 0 1`:

```text
m5 = A·¬B·C
```

Dạng chuẩn SOP lấy các minterm tại những dòng `F=1`:

```text
F = Σm(...)
```

---

## 4. Maxterm và POS

Maxterm là tổng chứa đủ biến.

Quy ước:

- bit `0` → biến thường;
- bit `1` → biến đảo.

Dạng chuẩn POS lấy các maxterm tại những dòng `F=0`:

```text
F = ΠM(...)
```

---

## 5. Don't-care

Một số tổ hợp input có thể không được sử dụng. C2 ký hiệu chúng bằng `X`/don't-care.

Khi tối giản:

- có thể coi `X` là 1 nếu giúp tạo nhóm lớn hơn trong SOP;
- có thể coi `X` là 0 nếu giúp tạo nhóm lớn hơn trong POS;
- không bắt buộc phải sử dụng mọi `X`.

---

## 6. Vì sao K-map dùng thứ tự Gray?

Các ô kề nhau phải chỉ khác **một biến**. Vì vậy hàng/cột được sắp theo Gray:

```text
00, 01, 11, 10
```

Không được sắp:

```text
00, 01, 10, 11
```

nếu điều đó làm mất quan hệ một-bit-khác-nhau giữa các ô kề.

---

## 7. K-map 2, 3, 4 và 5 biến trong nguồn

C2 minh họa:

- 2 biến;
- 3 biến;
- 4 biến;
- 5 biến.

Phần thực hành cốt lõi của app nên tập trung 2–4 biến. Bìa 5 biến giữ như phần nhận biết/nguồn tham khảo.

---

## 8. Quy tắc nhóm

Theo C2:

- nhóm số ô là lũy thừa của 2;
- nhóm 2 ô loại 1 biến;
- nhóm 4 ô loại 2 biến;
- nhóm 8 ô loại 3 biến;
- nhóm càng lớn càng tốt;
- mỗi ô cần được phủ ít nhất một lần;
- một ô có thể tham gia nhiều nhóm nếu có lợi;
- mép đối diện được xem là kề nhau.

### SOP

Nhóm các ô `1`.

### POS

Nhóm các ô `0`.

---

## 9. Quy trình rút gọn K-map

C2 đưa ra ba bước:

```text
B1. Đưa hàm lên K-map.
B2. Khoanh các nhóm ô kề theo quy tắc.
B3. Viết biểu thức từ các nhóm và kết hợp lại.
```

Để tự học chắc hơn, khi thực hiện B2 cần tự hỏi:

1. nhóm lớn nhất có thể tạo là bao nhiêu ô?
2. có nhóm qua biên không?
3. có ô nào chỉ có một cách nhóm lớn hợp lệ không?
4. có cần nhóm chồng không?
5. don't-care có giúp tăng kích thước nhóm không?

---

## 10. Worked Example nguồn — `F(A,B,C)=Σ(0,1,3,4,5)`

Nguồn C2 trang 39–40 giải cả SOP và POS.

Cách học bài này:

1. dựng K-map 3 biến;
2. đánh `1` ở các minterm `0,1,3,4,5`;
3. với SOP, nhóm các `1` thành nhóm lớn nhất;
4. viết tích tương ứng cho từng nhóm;
5. với POS, nhìn các ô `0` còn lại và nhóm theo quy tắc POS;
6. đối chiếu hai biểu thức bằng truth table nếu cần.

Mục tiêu của worked example là nhìn thấy **cùng một hàm có thể rút theo SOP hoặc POS**.

---

## 11. Worked Example nguồn — K-map có don't-care

Nguồn C2:

```text
F(A,B,C,D)
= Σ(0,1,2,3,6,8)
+ Σd(10,11,12,13,14,15)
```

Tư duy:

1. đánh `1` cho các minterm thực;
2. đánh `X` cho don't-care;
3. thử coi các `X` như `1` ở những vị trí giúp tạo nhóm lớn;
4. không cần buộc dùng tất cả `X`;
5. mục tiêu là biểu thức tối giản nhưng vẫn đúng trên tất cả tổ hợp **được định nghĩa**.

---

## 12. Bẫy — Lesson 03

1. SOP nhóm `1`; POS nhóm `0`.
2. Gray order là điều kiện cấu trúc, không phải trang trí.
3. Ô ở hai mép đối diện có thể kề nhau.
4. Không nhóm 3, 5, 6, 7 ô.
5. Nhóm nhỏ trước khi nhìn nhóm lớn thường dẫn tới kết quả không tối giản.
6. Don't-care không phải input “luôn bằng X” trong phần cứng; nó là tổ hợp không quan trọng đối với đặc tả đang xét.

---

## 13. Practice ladder — Lesson 03

### Level A

1. Viết `m0…m7` của hàm 3 biến.
2. Viết `M0…M7` của hàm 3 biến.
3. Chuyển một truth table thành `Σm` và `ΠM`.

### Level B

1. Rút K-map 3 biến theo SOP.
2. Rút cùng hàm đó theo POS.
3. Rút K-map 4 biến có nhóm qua biên.

### Level C

1. Rút hàm 4 biến có don't-care.
2. Từ biểu thức tối giản, vẽ mạng cổng.
3. Kiểm chứng biểu thức rút gọn bằng truth table.

---

## 14. Mastery check — Lesson 03

```text
□ Tôi chuyển được truth table ↔ SOP/POS.
□ Tôi viết đúng minterm và maxterm.
□ Tôi đặt đúng thứ tự Gray trên K-map.
□ Tôi nhóm được 2/4/8 ô, kể cả qua biên.
□ Tôi biết dùng don't-care khi có lợi.
□ Tôi giải thích được vì sao một biến bị loại khi nhóm các ô kề.
```
