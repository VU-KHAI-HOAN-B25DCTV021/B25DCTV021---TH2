// ============================================================
// Quản lý localStorage: yêu thích & theme
// ============================================================

const FAVORITES_KEY = 'library_favorites';
const THEME_KEY = 'library_theme';

/** Lấy danh sách id yêu thích từ localStorage */
export function getFavorites(): Set<string> {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    if (raw) {
      const arr: string[] = JSON.parse(raw);
      return new Set(arr);
    }
  } catch (err) {
    console.error('Lỗi đọc favorites từ localStorage:', err);
  }
  return new Set<string>();
}

/** Lưu danh sách yêu thích vào localStorage */
export function saveFavorites(favorites: Set<string>): void {
  try {
    const arr = [...favorites];
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(arr));
  } catch (err) {
    console.error('Lỗi lưu favorites:', err);
  }
}

/** Toggle yêu thích, trả về trạng thái mới (true = đang thích) */
export function toggleFavorite(id: string, favorites: Set<string>): boolean {
  if (favorites.has(id)) {
    favorites.delete(id);
  } else {
    favorites.add(id);
  }
  saveFavorites(favorites);
  return favorites.has(id);
}

/** Lấy theme đã lưu */
export function getTheme(): string {
  return localStorage.getItem(THEME_KEY) || 'dark';
}

/** Lưu theme */
export function saveTheme(theme: string): void {
  localStorage.setItem(THEME_KEY, theme);
}
