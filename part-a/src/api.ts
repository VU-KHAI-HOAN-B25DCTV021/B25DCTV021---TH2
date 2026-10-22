import type { Book, NewBookData } from './types';

// ============================================================
// CẤU HÌNH API
// Nếu dùng mockapi.io, đổi API_URL thành URL của bạn, ví dụ:
//   const API_URL = 'https://<project>.mockapi.io/api/v1/books';
//   const USE_MOCK_API = true;
// ============================================================
const API_URL = '/books.json';
const USE_MOCK_API = false;

/**
 * Tải danh sách sách bằng fetch + async/await.
 */
export async function fetchBooks(): Promise<Book[]> {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error(`Lỗi tải dữ liệu: ${response.status} ${response.statusText}`);
  }
  const data: Book[] = await response.json();
  return data;
}

/**
 * Thêm sách mới. Nếu dùng mockapi → POST, không thì tạo id giả.
 */
export async function addBookToAPI(book: NewBookData): Promise<Book> {
  if (!USE_MOCK_API) {
    // Tạo ID giả khi không dùng mockapi
    return { ...book, id: Date.now() };
  }

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(book),
  });
  if (!response.ok) {
    throw new Error('Lỗi thêm sách');
  }
  return response.json();
}

/**
 * Xóa sách. Nếu dùng mockapi → DELETE.
 */
export async function deleteBookFromAPI(id: number | string): Promise<void> {
  if (!USE_MOCK_API) return;

  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Lỗi xóa sách');
  }
}
