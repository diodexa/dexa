import { useState } from "react"
import * as XLSX from "xlsx"

type Guest = {
  id: string
  name: string
  phone: string
}

const normalizePhone = (phone: any) => {
  if (!phone) return ""

  let cleaned = String(phone).replace(/\D/g, "")

  if (cleaned.startsWith("0")) {
    cleaned = "62" + cleaned.slice(1)
  }

  if (!cleaned.startsWith("62")) {
    cleaned = "62" + cleaned
  }

  return cleaned
}

const generateLink = (name: string, id: string) =>
  `https://dexa-invitation.com/Leaf?to=${encodeURIComponent(name)}&id=${id}`

const generateWA = (phone: string, message: string) =>
  `https://wa.me/${normalizePhone(phone)}?text=${encodeURIComponent(message)}`

const generateMessage = (name: string, link: string) => {
  return `Halo ${name}

Kami mengundang Anda ke acara pernikahan kami

10 Desember 2026

Silakan buka undangan:
${link}

Merupakan suatu kehormatan bagi kami jika Anda berkenan hadir`
}

export const GuestWA = () => {
  const [guests, setGuests] = useState<Guest[]>([])

  // 🔥 manual input
  const [manualName, setManualName] = useState("")
  const [manualLink, setManualLink] = useState("")
  const [manualMessage, setManualMessage] = useState("")

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

    // 🔥 generate manual
    const handleGenerateManual = () => {
    if (!manualName) return

    const id = Date.now().toString()
    const link = generateLink(manualName, id)
    const message = generateMessage(manualName, link)

    setManualLink(link)
    setManualMessage(message)
    }

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Undangan WhatsApp</h2>

      {/* 🔥 Upload Excel */}
      <input type="file" accept=".xlsx, .xls" onChange={handleFile} />

      {/* 🔥 AUTO FROM EXCEL */}
      {guests.map(g => {
        const link = generateLink(g.name, g.id)
        const message = generateMessage(g.name, link)
        const wa = generateWA(g.phone, message)

        return (
          <div key={g.id} style={{ marginBottom: "1rem" }}>
            <p><strong>{g.name}</strong></p>

            <input value={link} readOnly />

            <button onClick={() => navigator.clipboard.writeText(link)}>
              Copy
            </button>

            <a href={wa} target="_blank">
              <button>Kirim WA</button>
            </a>
          </div>
        )
      })}

      <hr style={{ margin: "2rem 0" }} />

      {/* 🔥 MANUAL GENERATOR */}
      <h3>Generate Link Manual</h3>

      <input
        type="text"
        placeholder="Nama tamu"
        value={manualName}
        onChange={(e) => setManualName(e.target.value)}
      />

 

      <br /><br />

      <button onClick={handleGenerateManual}>
        Generate
      </button>

      {manualLink && (
        <div style={{ marginTop: "1rem" }}>
          <p><strong>Link:</strong></p>
          <input value={manualLink} readOnly />
          <textarea value={manualMessage} />
          <button onClick={() => navigator.clipboard.writeText(manualMessage)}>
            Copy pesan
          </button>

          <br /><br />
        </div>
      )}
    </div>
  )
}



