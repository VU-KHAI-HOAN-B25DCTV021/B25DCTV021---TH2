import BookCard from './BookCard.jsx';

/**
 * BookList – Lưới hiển thị danh sách sách.
 * Props: books, favorites, onToggleFavorite
 * Mỗi BookCard có key = book.id.
 */
function BookList({ books, favorites, onToggleFavorite }) {
  if (books.length === 0) {
    return (
      <div className="empty-state">
        <p>📭 Không tìm thấy sách nào</p>
      </div>
    );
  }

  return (
    <div className="book-grid">
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          isFavorite={favorites.includes(book.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}

export default BookList;
