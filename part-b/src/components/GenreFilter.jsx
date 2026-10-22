/**
 * GenreFilter – Lọc thể loại bằng các nút bấm.
 * Props: genres, activeGenre, onSelect
 */
function GenreFilter({ genres, activeGenre, onSelect }) {
  return (
    <div className="genre-filter-buttons">
      <button
        className={`genre-btn ${activeGenre === '' ? 'active' : ''}`}
        onClick={() => onSelect('')}
      >
        📋 Tất cả
      </button>
      {genres.map((genre) => (
        <button
          key={genre}
          className={`genre-btn ${activeGenre === genre ? 'active' : ''}`}
          onClick={() => onSelect(genre)}
        >
          {genre}
        </button>
      ))}
    </div>
  );
}

export default GenreFilter;
