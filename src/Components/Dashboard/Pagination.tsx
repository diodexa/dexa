
type PaginationProps = {
  current: number
  total: number
  onPageChange: (page: number) => void
}

export const GuestPagination = ({ current, total, onPageChange }: PaginationProps) => {
  if (total <= 1) return null

  return (
    <div className="flex justify-center items-center gap-4 bg-gray-50 p-4 rounded-xl">
      <button
        disabled={current === 1}
        onClick={() => onPageChange(current - 1)}
        className="px-4 py-2 bg-white border rounded shadow-sm disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100 transition"
      >
        Prev
      </button>
      
      <span className="text-sm font-medium">
        Halaman <span className="text-teal-600 font-bold">{current}</span> dari {total}
      </span>

      <button
        disabled={current === total}
        onClick={() => onPageChange(current + 1)}
        className="px-4 py-2 bg-white border rounded shadow-sm disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100 transition"
      >
        Next
      </button>
    </div>
  )
}
