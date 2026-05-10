
type SearchProps = {
  value: string
  onChange: (val: string) => void
}

export const GuestSearch = ({ value, onChange }: SearchProps) => {
  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Cari nama tamu..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500 outline-none bg-white text-center"
      />
    </div>
  )
}
