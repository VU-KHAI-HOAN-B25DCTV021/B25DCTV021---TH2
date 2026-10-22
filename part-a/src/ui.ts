import type { Book } from './types';

// ============================================================
// Hiển thị / ẩn trạng thái
// ============================================================

export function showLoading(): void {
  const el = document.getElementById('loading');
  if (el) el.style.display = 'flex';
}

export function hideLoading(): void {
  const el = document.getElementById('loading');
  if (el) el.style.display = 'none';
}

export function showError(message: string): void {
  const el = document.getElementById('error-msg');
  if (el) {
    el.textContent = message;
    el.style.display = 'block';
  }
}

export function hideError(): void {
  const el = document.getElementById('error-msg');
  if (el) el.style.display = 'none';
}

/** Cập nhật "Đang hiển thị x / y cuốn" */
export function updateStatus(shown: number, total: number): void {
  const el = document.getElementById('status-bar');
  if (el) {
    el.textContent = `Đang hiển thị ${shown} / ${total} cuốn`;
    el.style.display = 'block';
  }
}

/** Cập nhật số yêu thích trên header */
export function updateFavCount(count: number): void {
  const numEl = document.getElementById('fav-number');
  if (numEl) {
    numEl.textContent = String(count);
    // Hiệu ứng nảy nhẹ
    numEl.classList.remove('bounce');
    void numEl.offsetWidth; // trigger reflow
    numEl.classList.add('bounce');
  }
}

// ============================================================
// Tạo thẻ sách bằng createElement + textContent
// ============================================================

export function createBookCard(book: Book, isFavorite: boolean): HTMLElement {
  const card = document.createElement('article');
  card.className = 'book-card';
  card.dataset.id = String(book.id);

  // Tag thể loại
  const genre = document.createElement('span');
  genre.className = 'book-genre-tag';
  genre.textContent = book.genre;

  // Tên sách
  const name = document.createElement('h3');
  name.className = 'book-name';
  name.textContent = book.name;

  // Tác giả
  const author = document.createElement('p');
  author.className = 'book-author';
  author.textContent = `✍️ ${book.author}`;

  // Năm
  const year = document.createElement('p');
  year.className = 'book-year';
  year.textContent = `📅 Năm ${book.year}`;

  // Nhóm nút hành động
  const actions = document.createElement('div');
  actions.className = 'book-actions';

  const favBtn = document.createElement('button');
  favBtn.className = `btn-fav${isFavorite ? ' active' : ''}`;
  favBtn.dataset.action = 'favorite';
  favBtn.dataset.id = String(book.id);
  favBtn.textContent = isFavorite ? '❤️ Đã thích' : '🤍 Yêu thích';
  favBtn.setAttribute('aria-label', isFavorite ? 'Bỏ yêu thích' : 'Yêu thích');

  const delBtn = document.createElement('button');
  delBtn.className = 'btn-del';
  delBtn.dataset.action = 'delete';
  delBtn.dataset.id = String(book.id);
  delBtn.textContent = '🗑️ Xóa';
  delBtn.setAttribute('aria-label', 'Xóa sách');

  actions.appendChild(favBtn);
  actions.appendChild(delBtn);

  card.appendChild(genre);
  card.appendChild(name);
  card.appendChild(author);
  card.appendChild(year);
  card.appendChild(actions);

  return card;
}

// ============================================================
// Render toàn bộ lưới sách
// ============================================================

export function renderBooks(books: Book[], favorites: Set<string>): void {
  const grid = document.getElementById('book-grid');
  if (!grid) return;

  grid.innerHTML = '';

  if (books.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'empty-state';
    const p = document.createElement('p');
    p.textContent = '📭 Không tìm thấy sách nào';
    empty.appendChild(p);
    grid.appendChild(empty);
    return;
  }

  const fragment = document.createDocumentFragment();
  books.forEach((book) => {
    const card = createBookCard(book, favorites.has(String(book.id)));
    fragment.appendChild(card);
  });
  grid.appendChild(fragment);
}

// ============================================================
// Thông báo toast
// ============================================================

export function showNotification(message: string, isError = false): void {
  const notification = document.createElement('div');
  notification.className = `notification ${isError ? 'notification-error' : 'notification-success'}`;
  notification.textContent = message;
  document.body.appendChild(notification);

  requestAnimationFrame(() => notification.classList.add('show'));

  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}
