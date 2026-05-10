import * as XLSX from "xlsx"
import { useState } from "react"

type Guest = {
  id: string
  name: string
  phone: string
}

export const ExcelUploader = () => {
  const [guests, setGuests] = useState<Guest[]>([])

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()

    reader.onload = (evt) => {
      const data = evt.target?.result
      const workbook = XLSX.read(data, { type: "binary" })

      const sheet = workbook.Sheets[workbook.SheetNames[0]]
      const json = XLSX.utils.sheet_to_json(sheet)

      setGuests(json as Guest[])
    }

    reader.readAsBinaryString(file)
  }

  return (
    <div>
      <input type="file" accept=".xlsx, .xls" onChange={handleFile} />

      <pre>{JSON.stringify(guests, null, 2)}</pre>
    </div>
  )
}