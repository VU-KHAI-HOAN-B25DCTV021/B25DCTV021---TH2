import { useState } from 'react';
import booksData from './data/books.js';
import Header from './components/Header.jsx';
import Section from './components/Section.jsx';
import GenreFilter from './components/GenreFilter.jsx';
import BookList from './components/BookList.jsx';
import Footer from './components/Footer.jsx';
import './App.css';

/**
 * App – Component gốc, giữ toàn bộ state.
 *
 * State:
 *   - favorites: mảng id sách yêu thích
 *   - activeGenre: thể loại đang lọc
 *   - searchTerm: từ khoá tìm kiếm
 *   - isDark: chế độ sáng/tối
 */
function App() {
  const [favorites, setFavorites] = useState([]);
  const [activeGenre, setActiveGenre] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isDark, setIsDark] = useState(true);

  // Danh sách thể loại duy nhất (dùng Set)
  const genres = [...new Set(booksData.map((b) => b.genre))].sort();

  // Kết hợp tìm kiếm + lọc thể loại
  const filteredBooks = booksData.filter((book) => {
    const matchesSearch =
      searchTerm === '' ||
      book.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = activeGenre === '' || book.genre === activeGenre;
    return matchesSearch && matchesGenre;
  });

  // Toggle yêu thích – App giữ state và truyền hàm xuống BookCard
  function toggleFavorite(id) {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fId) => fId !== id) : [...prev, id]
    );
  }

  // Chuyển đổi sáng ↔ tối
  function toggleTheme() {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light');
  }

  return (
    <div className="app">
      {/* Header – nhận số yêu thích và hàm toggle theme qua props */}
      <Header
        favCount={favorites.length}
        onToggleTheme={toggleTheme}
        isDark={isDark}
      />

      <main className="container main-content">
        {/* Thanh tìm kiếm – dùng Section với children */}
        <Section className="toolbar">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Tìm sách theo tên…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Tìm kiếm sách"
            />
          </div>
        </Section>

        {/* Bộ lọc thể loại bằng nút bấm */}
        <Section className="filter-section">
          <GenreFilter
            genres={genres}
            activeGenre={activeGenre}
            onSelect={setActiveGenre}
          />
        </Section>

        {/* Dòng trạng thái */}
        <div className="status-bar">
          Đang hiển thị {filteredBooks.length} / {booksData.length} cuốn
        </div>

        {/* Danh sách sách */}
        <BookList
          books={filteredBooks}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
        />
      </main>

      <Footer />
    </div>
  );
}

export default App;
