import type { NewBookData } from './types';

// ============================================================
// Validate form thêm sách
// ============================================================

interface ValidationResult {
  valid: boolean;
  message: string;
}

const CURRENT_YEAR = new Date().getFullYear();

export function validateName(value: string): ValidationResult {
  const trimmed = value.trim();
  if (!trimmed) {
    return { valid: false, message: 'Tên sách không được để trống' };
  }
  if (trimmed.length < 3) {
    return { valid: false, message: 'Tên sách phải có ít nhất 3 ký tự' };
  }
  return { valid: true, message: '' };
}

export function validateAuthor(value: string): ValidationResult {
  if (!value.trim()) {
    return { valid: false, message: 'Tác giả không được để trống' };
  }
  return { valid: true, message: '' };
}

export function validateGenre(value: string): ValidationResult {
  if (!value) {
    return { valid: false, message: 'Vui lòng chọn thể loại' };
  }
  return { valid: true, message: '' };
}

export function validateYear(value: string): ValidationResult {
  if (!value.trim()) {
    return { valid: false, message: 'Năm xuất bản không được để trống' };
  }
  const year = parseInt(value, 10);
  if (isNaN(year)) {
    return { valid: false, message: 'Năm xuất bản phải là số' };
  }
  if (year < 1900 || year > CURRENT_YEAR) {
    return { valid: false, message: `Năm phải từ 1900 đến ${CURRENT_YEAR}` };
  }
  return { valid: true, message: '' };
}

// ============================================================
// Hiển thị lỗi inline bên dưới mỗi ô
// ============================================================

function showFieldError(fieldId: string, message: string): void {
  const errorEl = document.getElementById(`error-${fieldId}`);
  if (errorEl) {
    errorEl.textContent = message;
    errorEl.style.display = message ? 'block' : 'none';
  }
  const input = document.getElementById(`book-${fieldId}`);
  if (input) {
    if (message) {
      input.classList.add('input-error');
    } else {
      input.classList.remove('input-error');
    }
  }
}

// ============================================================
// Gắn sự kiện cho form
// ============================================================

export function setupForm(onSubmit: (book: NewBookData) => void): void {
  const form = document.getElementById('book-form') as HTMLFormElement | null;
  if (!form) return;

  const nameInput = document.getElementById('book-name') as HTMLInputElement;
  const authorInput = document.getElementById('book-author') as HTMLInputElement;
  const genreSelect = document.getElementById('book-genre') as HTMLSelectElement;
  const yearInput = document.getElementById('book-year') as HTMLInputElement;

  // Validate ngay khi gõ (input event)
  nameInput?.addEventListener('input', () => {
    const r = validateName(nameInput.value);
    showFieldError('name', r.valid ? '' : r.message);
  });

  authorInput?.addEventListener('input', () => {
    const r = validateAuthor(authorInput.value);
    showFieldError('author', r.valid ? '' : r.message);
  });

  genreSelect?.addEventListener('change', () => {
    const r = validateGenre(genreSelect.value);
    showFieldError('genre', r.valid ? '' : r.message);
  });

  yearInput?.addEventListener('input', () => {
    const r = validateYear(yearInput.value);
    showFieldError('year', r.valid ? '' : r.message);
  });

  // Submit
  form.addEventListener('submit', (e: Event) => {
    e.preventDefault();

    const nameR = validateName(nameInput.value);
    const authorR = validateAuthor(authorInput.value);
    const genreR = validateGenre(genreSelect.value);
    const yearR = validateYear(yearInput.value);

    showFieldError('name', nameR.valid ? '' : nameR.message);
    showFieldError('author', authorR.valid ? '' : authorR.message);
    showFieldError('genre', genreR.valid ? '' : genreR.message);
    showFieldError('year', yearR.valid ? '' : yearR.message);

    if (nameR.valid && authorR.valid && genreR.valid && yearR.valid) {
      const newBook: NewBookData = {
        name: nameInput.value.trim(),
        author: authorInput.value.trim(),
        genre: genreSelect.value,
        year: parseInt(yearInput.value, 10),
      };
      onSubmit(newBook);
      form.reset();
      // Xóa trạng thái lỗi
      ['name', 'author', 'genre', 'year'].forEach((f) => showFieldError(f, ''));
    }
  });
}
