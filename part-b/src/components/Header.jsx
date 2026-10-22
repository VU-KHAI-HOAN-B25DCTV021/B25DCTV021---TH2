/**
 * Header – Hiển thị tên thư viện, số yêu thích, nút chuyển theme.
 * Props: favCount, onToggleTheme, isDark
 */
function Header({ favCount, onToggleTheme, isDark }) {
  return (
    <header className="header">
      <div className="container header-content">
        <div className="header-left">
          <h1 className="logo">📚 Thư Viện Lớp Học</h1>
        </div>
        <div className="header-right">
          <span className="fav-badge">
            ❤️ <span>{favCount}</span> yêu thích
          </span>
          <button
            className="btn-icon"
            onClick={onToggleTheme}
            aria-label="Chuyển chế độ sáng/tối"
          >
            <span>{isDark ? '☀️' : '🌙'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
