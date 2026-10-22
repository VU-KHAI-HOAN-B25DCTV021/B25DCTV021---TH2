/**
 * BookCard – Thẻ hiển thị thông tin 1 cuốn sách.
 * Props: book, isFavorite, onToggleFavorite
 * Hàm xử lý yêu thích được truyền từ App xuống qua props.
 */
function BookCard({ book, isFavorite, onToggleFavorite }) {
  return (
    <article className="book-card">
      <span className="book-genre-tag">{book.genre}</span>
      <h3 className="book-name">{book.name}</h3>
      <p className="book-author">✍️ {book.author}</p>
      <p className="book-year">📅 Năm {book.year}</p>
      <div className="book-actions">
        <button
          className={`btn-fav ${isFavorite ? 'active' : ''}`}
          onClick={() => onToggleFavorite(book.id)}
          aria-label={isFavorite ? 'Bỏ yêu thích' : 'Yêu thích'}
        >
          {isFavorite ? '❤️ Đã thích' : '🤍 Yêu thích'}
        </button>
      </div>
    </article>
  );
}

export default BookCard;
