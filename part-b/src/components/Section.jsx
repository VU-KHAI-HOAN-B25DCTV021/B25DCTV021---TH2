/**
 * Section – Wrapper component dùng children.
 * Props: title (tuỳ chọn), className, children
 */
function Section({ title, className, children }) {
  return (
    <section className={className || ''}>
      {title && <h2>{title}</h2>}
      {children}
    </section>
  );
}

export default Section;
