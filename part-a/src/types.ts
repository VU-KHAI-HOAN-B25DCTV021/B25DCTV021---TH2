/** Một cuốn sách trong thư viện */
export interface Book {
  id: number | string;
  name: string;
  author: string;
  genre: string;
  year: number;
}

/** Dữ liệu gửi khi thêm sách mới (chưa có id) */
export type NewBookData = Omit<Book, 'id'>;
