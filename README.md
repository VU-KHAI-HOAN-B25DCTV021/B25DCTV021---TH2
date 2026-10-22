# 📚 Bài thực hành TH2 – Quản lý Thư Viện Lớp Học

## Giới thiệu

Trang web quản lý thư viện sách với các chức năng: xem danh sách, tìm kiếm, lọc thể loại, đánh dấu yêu thích, thêm sách mới và xóa sách.

Dự án gồm **2 phần** để so sánh cách tiếp cận:

| | **Phần A – TypeScript thuần** | **Phần B – React (Vite)** |
|---|---|---|
| Thư mục | `part-a/` | `part-b/` |
| Ngôn ngữ | TypeScript + Vanilla CSS | JSX + Vanilla CSS |
| Build tool | Vite | Vite |
| Port | `3000` | `3001` |

---

## Hướng dẫn chạy

### Phần A – TypeScript thuần

```bash
cd part-a
npm install
npm run dev
```

Truy cập: [http://localhost:3000](http://localhost:3000)

### Phần B – React

```bash
cd part-b
npm install
npm run dev
```

Truy cập: [http://localhost:3001](http://localhost:3001)

---

## Dữ liệu sách

- **12 cuốn sách**, **3 thể loại**: Tiểu thuyết, Lịch sử, Khoa học viễn tưởng
- Phần A: tải từ `public/books.json` bằng `fetch` + `async/await`
- Phần B: import từ `src/data/books.js` (dữ liệu tĩnh, chưa gọi API)

---

## Chức năng

| Chức năng | Phần A | Phần B |
|---|---|---|
| Hiển thị danh sách sách | ✅ | ✅ |
| Tìm kiếm theo tên (live) | ✅ | ✅ |
| Lọc theo thể loại | ✅ (Select) | ✅ (Nút bấm) |
| Kết hợp tìm + lọc | ✅ | ✅ |
| Hiển thị "x / y cuốn" | ✅ | ✅ |
| Yêu thích + đếm trên header | ✅ | ✅ |
| Lưu yêu thích vào localStorage | ✅ | — |
| Xóa sách (confirm) | ✅ | — |
| Form thêm sách + validate | ✅ | — |
| Chế độ sáng/tối | ✅ | ✅ |

---

## So sánh Phần A (DOM thuần) và Phần B (React)

### 1. Cách tạo giao diện

| Tiêu chí | Phần A – DOM thuần | Phần B – React |
|---|---|---|
| **Tạo phần tử** | `document.createElement()`, `textContent`, `appendChild()` | JSX – viết HTML trong JavaScript |
| **Cập nhật UI** | Tự tìm phần tử (`getElementById`) rồi sửa thủ công | React tự cập nhật khi `state` thay đổi (Virtual DOM) |
| **Quản lý sự kiện** | `addEventListener` + event delegation trên container cha | Gắn trực tiếp `onClick` trên từng element trong JSX |
| **Dữ liệu ↔ Giao diện** | Phải tự đồng bộ: sửa dữ liệu → gọi hàm render lại | Tự động: `setState` → React re-render component |

### 2. Cấu trúc code

| Tiêu chí | Phần A | Phần B |
|---|---|---|
| **Tổ chức** | Tách thành nhiều module `.ts` (api, ui, filters, form…) | Tách thành nhiều component `.jsx` (Header, BookCard…) |
| **Tái sử dụng** | Gọi hàm, truyền tham số | Component + props + children |
| **State** | Biến toàn cục trong `main.ts` + `localStorage` | `useState` hook trong component `App` |
| **Truyền dữ liệu** | Gọi hàm trực tiếp | Props truyền từ component cha xuống con |

### 3. Ưu / nhược điểm

| | Phần A – DOM thuần | Phần B – React |
|---|---|---|
| **Ưu** | Hiểu rõ cách DOM hoạt động; không phụ thuộc framework; nhẹ | Code gọn, dễ đọc; tự động cập nhật UI; dễ mở rộng |
| **Nhược** | Code dài khi UI phức tạp; dễ bug khi quên cập nhật DOM | Cần học JSX, hooks; bundle lớn hơn; cần build tool |

### 4. Kết luận

- **Phần A** phù hợp để **học nền tảng** (DOM, event, module) và các dự án nhỏ.
- **Phần B** phù hợp cho **dự án thực tế** vì code dễ bảo trì, mở rộng và tái sử dụng component.
- React giải quyết vấn đề chính của DOM thuần: **đồng bộ dữ liệu với giao diện** – thay vì tự render thủ công, chỉ cần thay đổi state và React lo phần còn lại.

---

## Yêu cầu nâng cao đã hoàn thành

- ✅ **TypeScript** cho Phần A (tất cả module đều viết bằng `.ts`)
- ✅ **DELETE API** – nút Xóa gọi `DELETE` lên mockapi (có thể bật bằng cách đổi `USE_MOCK_API = true` trong `api.ts`)
- ✅ **Chế độ sáng/tối** – cả 2 phần đều hỗ trợ

---

## Cấu trúc thư mục

```
TH2/
├── part-a/                         # Phần A – TypeScript thuần
│   ├── index.html                  # HTML semantic
│   ├── public/
│   │   └── books.json              # Dữ liệu sách (fetch API)
│   ├── src/
│   │   ├── types.ts                # Interface Book
│   │   ├── api.ts                  # fetch + async/await
│   │   ├── storage.ts              # localStorage (favorites, theme)
│   │   ├── theme.ts                # Chuyển sáng/tối
│   │   ├── ui.ts                   # createElement, renderBooks
│   │   ├── filters.ts              # Set, search, genre filter
│   │   ├── form.ts                 # Validate form
│   │   ├── styles.css              # CSS (Flexbox, Grid, responsive)
│   │   └── main.ts                 # Entry point
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── part-b/                         # Phần B – React (Vite)
│   ├── index.html
│   ├── src/
│   │   ├── data/
│   │   │   └── books.js            # Dữ liệu tĩnh
│   │   ├── components/
│   │   │   ├── Header.jsx          # Header (props: favCount)
│   │   │   ├── Section.jsx         # Wrapper (children)
│   │   │   ├── GenreFilter.jsx     # Nút lọc thể loại
│   │   │   ├── BookList.jsx        # Danh sách (key)
│   │   │   ├── BookCard.jsx        # Thẻ sách (props: onToggleFavorite)
│   │   │   └── Footer.jsx          # Chân trang
│   │   ├── App.jsx                 # Component gốc (useState)
│   │   ├── App.css                 # Styles
│   │   ├── index.css               # Global styles
│   │   └── main.jsx                # ReactDOM.createRoot
│   ├── package.json
│   └── vite.config.js
│
└── README.md                       # File này
```
