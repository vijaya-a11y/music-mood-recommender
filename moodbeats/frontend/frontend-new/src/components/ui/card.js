import '../styles.css';
export default function Card({ children, className = "", onClick }) {
  return (
    <div
      onClick={onClick}
      className={`rounded-lg border p-4 shadow-lg bg-white ${className}`}
    >
      {children}
    </div>
  )
}
