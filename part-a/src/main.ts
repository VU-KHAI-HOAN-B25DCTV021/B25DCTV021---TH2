// ============================================================
// MAIN – Điều phối toàn bộ ứng dụng
// ============================================================

import './styles.css';
import type { Book, NewBookData } from './types';
import { fetchBooks, addBookToAPI, deleteBookFromAPI } from './api';
import { getFavorites, toggleFavorite } from './storage';
import { initTheme, toggleTheme } from './theme';
import {
  showLoading,
  hideLoading,
  showError,
  hideError,
  updateStatus,
  updateFavCount,
  renderBooks,
  showNotification,
} from './ui';
import {
  getGenres,
  populateGenreFilter,
  populateFormGenreSelect,
  filterBooks,
} from './filters';
import { setupForm } from './form';

// ============================================================
// STATE
// ============================================================
let books: Book[] = [];
let favorites: Set<string> = getFavorites();

// ============================================================
// RENDER HELPER
// ============================================================
function renderAndUpdate(): void {
  const searchTerm =
    (document.getElementById('search-input') as HTMLInputElement)?.value || '';
  const genre =
    (document.getElementById('genre-filter') as HTMLSelectElement)?.value || '';

  const filtered = filterBooks(books, searchTerm, genre);
  renderBooks(filtered, favorites);
  updateStatus(filtered.length, books.length);
}

// ============================================================
// HANDLERS
// ============================================================

/** Thêm sách mới (POST nếu dùng mockapi) */
async function handleAddBook(bookData: NewBookData): Promise<void> {
  try {
    const newBook = await addBookToAPI(bookData);
    books.unshift(newBook); // Hiển thị ở đầu danh sách

    // Cập nhật thể loại nếu có thể loại mới
    const genres = getGenres(books);
    populateGenreFilter(genres);
    populateFormGenreSelect(genres);

    renderAndUpdate();
    showNotification('✅ Đã thêm sách thành công!');
  } catch {
    showNotification('❌ Lỗi khi thêm sách', true);
  }
}

/** Xóa sách (DELETE nếu dùng mockapi) */
async function handleDelete(id: string): Promise<void> {
  try {
    await deleteBookFromAPI(id);
    books = books.filter((b) => String(b.id) !== id);

    // Xóa khỏi yêu thích nếu có
    favorites.delete(id);
    updateFavCount(favorites.size);

    renderAndUpdate();
    showNotification('🗑️ Đã xóa sách');
  } catch {
    showNotification('❌ Lỗi khi xóa sách', true);
  }
}

// ============================================================
// INIT
// ============================================================
async function init(): Promise<void> {
  // 1. Khởi tạo theme sáng/tối
  initTheme();
  document.getElementById('theme-toggle')?.addEventListener('click', toggleTheme);

  // 2. Tải danh sách sách
  showLoading();
  try {
    books = await fetchBooks();
    hideLoading();
    hideError();

    // Tạo danh sách thể loại bằng Set
    const genres = getGenres(books);
    populateGenreFilter(genres);
    populateFormGenreSelect(genres);

    renderAndUpdate();
  } catch (error) {
    hideLoading();
    showError(
      error instanceof Error ? error.message : 'Đã xảy ra lỗi khi tải dữ liệu'
    );
  }

  // 3. Tìm kiếm theo tên ngay khi gõ
  document.getElementById('search-input')?.addEventListener('input', () => {
    renderAndUpdate();
  });

  // 4. Lọc theo thể loại
  document.getElementById('genre-filter')?.addEventListener('change', () => {
    renderAndUpdate();
  });

  // 5. Event delegation cho nút Yêu thích & Xóa
  document.getElementById('book-grid')?.addEventListener('click', (e: Event) => {
    const target = e.target as HTMLElement;
    const button = target.closest<HTMLElement>('[data-action]');
    if (!button) return;

    const action = button.dataset.action;
    const id = button.dataset.id;
    if (!id) return;

    if (action === 'favorite') {
      toggleFavorite(id, favorites);
      updateFavCount(favorites.size);
      renderAndUpdate();
    } else if (action === 'delete') {
      if (confirm('Bạn có chắc muốn xóa sách này không?')) {
        handleDelete(id);
      }
    }
  });

  // 6. Form thêm sách
  setupForm(handleAddBook);

  // 7. Hiển thị số yêu thích ban đầu
  updateFavCount(favorites.size);
}

// Khởi chạy
init();
