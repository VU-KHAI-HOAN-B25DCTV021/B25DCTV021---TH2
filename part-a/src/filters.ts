import type { Book } from './types';

/**
 * Trích danh sách thể loại duy nhất bằng Set.
 */
export function getGenres(books: Book[]): string[] {
  const genreSet = new Set<string>();
  books.forEach((book) => genreSet.add(book.genre));
  return [...genreSet].sort();
}

/**
 * Đổ option vào <select> lọc thể loại.
 */
export function populateGenreFilter(genres: string[]): void {
  const select = document.getElementById('genre-filter') as HTMLSelectElement | null;
  if (!select) return;

  // Giữ option "Tất cả thể loại" đầu tiên
  while (select.options.length > 1) {
    select.remove(1);
  }

  genres.forEach((genre) => {
    const option = document.createElement('option');
    option.value = genre;
    option.textContent = genre;
    select.appendChild(option);
  });
}

/**
 * Đổ option vào <select> thể loại trong form thêm sách.
 */
export function populateFormGenreSelect(genres: string[]): void {
  const select = document.getElementById('book-genre') as HTMLSelectElement | null;
  if (!select) return;

  while (select.options.length > 1) {
    select.remove(1);
  }

  genres.forEach((genre) => {
    const option = document.createElement('option');
    option.value = genre;
    option.textContent = genre;
    select.appendChild(option);
  });
}

/**
 * Kết hợp tìm kiếm theo tên + lọc theo thể loại.
 */
export function filterBooks(books: Book[], searchTerm: string, genre: string): Book[] {
  const term = searchTerm.toLowerCase().trim();
  return books.filter((book) => {
    const matchesSearch = term === '' || book.name.toLowerCase().includes(term);
    const matchesGenre = genre === '' || book.genre === genre;
    return matchesSearch && matchesGenre;
  });
}
