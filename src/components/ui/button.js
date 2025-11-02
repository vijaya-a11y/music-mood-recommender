export default function Button({
  children,
  onClick,
  className = "",
  variant = "default",
  disabled = false,
}) {
  const base = "px-4 py-2 rounded-md font-semibold transition-all"

  const styles =
    variant === "outline"
      ? "border border-gray-400 text-gray-700 hover:bg-gray-100"
      : "bg-blue-600 text-white hover:bg-blue-700"

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${styles} ${className}`}
    >
      {children}
    </button>
  )
}
