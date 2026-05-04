import { useEffect, useState } from "react"
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

const generateLink = (base: string, name: string, id: string) =>
  `${base}?to=${encodeURIComponent(name)}&id=${id}`

const generateWA = (phone: string, message: string) =>
  `https://wa.me/${normalizePhone(phone)}?text=${encodeURIComponent(message)}`

const messageTemplates = {
  islam: (name: string, link: string, pasangan: string, tanggal: string) => `
Assalamu'alaikum ${name}

Dengan memohon rahmat dan ridho Allah SWT, kami mengundang Anda untuk hadir dalam acara pernikahan kami.

${pasangan}
${tanggal}

Silakan buka undangan:
${link}

Wassalamu'alaikum Warahmatullahi Wabarakatuh
`,

  kristen: (name: string, link: string, pasangan: string, tanggal: string) => `
Shalom ${name}

Dengan penuh sukacita, kami mengundang Anda untuk menghadiri acara pernikahan kami.

${pasangan}
${tanggal}

Silakan buka undangan:
${link}

Tuhan memberkati
`,

  umum: (name: string, link: string, pasangan: string, tanggal: string) => `
Halo ${name}

Kami mengundang Anda ke acara pernikahan kami

${pasangan}
${tanggal}

Silakan buka undangan:
${link}

Merupakan suatu kehormatan bagi kami jika Anda berkenan hadir
`
}

export const GuestWA = () => {
  const [guests, setGuests] = useState<Guest[]>([])
  const [copiedId, setCopiedId] = useState<string | null>(null)

  // 🔥 manual input
  const [manualName, setManualName] = useState("")
  const [manualLink, setManualLink] = useState("")
  const [manualMessage, setManualMessage] = useState("")
  const [copiedManual, setCopiedManual] = useState(false)

  const [namaPasangan, setNamaPasangan] = useState("")
  const [tanggalNikah, setTanggalNikah] = useState("")
  const [templateType, setTemplateType] = useState<"islam" | "kristen" | "umum">("umum")
  const [baseLink, setBaseLink] = useState("https://dexa-invitation.com/Leaf")


  const [messageMap, setMessageMap] = useState<Record<string, string>>({})
  const [checkedMap, setCheckedMap] = useState<Record<string, boolean>>({})

  

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
    const link = generateLink(baseLink, manualName, id)
    const message = messageTemplates[templateType](manualName,link,namaPasangan,tanggalNikah)

    setManualLink(link)
    setManualMessage(message)
    }
    
    useEffect(() => {
      setMessageMap({})
    }, [templateType])

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Undangan WhatsApp</h2>

      {/* 🔥 Upload Excel */}
      <input type="file" accept=".xlsx, .xls" onChange={handleFile} />
      <div className="flex flex-col gap-2 mb-4">
        <label>Link Undangan kamu</label>
        <input
          type="text"
          placeholder="Link undangan (base URL)"
          value={baseLink}
          onChange={(e) => setBaseLink(e.target.value)}
          className="border p-2"
        />
        <label>Nama Pasangan</label>
        <input
          type="text"
          placeholder="Nama pasangan"
          value={namaPasangan}
          onChange={(e) => setNamaPasangan(e.target.value)}
          className="border p-2"
          />

        <label>Tanggal Pernikahan</label>
        <input
          type="text"
          placeholder="Tanggal pernikahan"
          value={tanggalNikah}
          onChange={(e) => setTanggalNikah(e.target.value)}
          className="border p-2"
        />

      </div>

      <select
        value={templateType}
        onChange={(e) => setTemplateType(e.target.value as any)}
      >
        <option value="umum">Umum</option>
        <option value="islam">Islam</option>
        <option value="kristen">Kristen</option>
      </select>

      {/* 🔥 AUTO FROM EXCEL */}
      {guests.map(g => {
        const link = generateLink(baseLink, g.name, g.id)
        const defaultMessage = messageTemplates[templateType](g.name,link,namaPasangan,tanggalNikah)
        const message = messageMap[g.id] ?? defaultMessage
        const wa = generateWA(g.phone, message)

        return (
          <div key={g.id} className= {`flex flex-row p-2 ${checkedMap[g.id] ? "bg-green-700 text-white" : "bg-white"}`}>
            <p className="basis-1/4"><strong>{g.name}</strong></p>

            <textarea value={message} rows={4} onChange={(e) =>setMessageMap(prev => ({...prev,[g.id]: e.target.value}))} className="basis-3/4 w-full resize-none border-1 border-solid" /> 
            
          

            {/* <button onClick={() => navigator.clipboard.writeText(link)}>
              Copy
            </button> */}

            <div className="basis-1/6 items-center justify-center flex">
              <a href={wa} target="_blank">
                <button className=" p-2 text-white relative group">
                  <label className="bg-black text-white text-xs absolute right-0 opacity-0   group-hover:opacity-100 group-hover:-translate-y-10 transition">sent to whatsapp</label>
                  <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="w-6 h-6 hover:scale-120 transition bg-[#45C153] rounded-full "
                          fill="currentColor"
                      >
                          <path d="M20.52 3.48A11.82 11.82 0 0012.03 0C5.4 0 .02 5.38.02 12c0 2.12.56 4.18 1.63 6L0 24l6.17-1.61A11.96 11.96 0 0012.03 24c6.63 0 12.01-5.38 12.01-12 0-3.2-1.25-6.2-3.52-8.52zM12.03 21.8c-1.8 0-3.56-.48-5.1-1.4l-.37-.22-3.66.96.98-3.57-.24-.37A9.74 9.74 0 012.28 12c0-5.37 4.37-9.75 9.75-9.75 2.6 0 5.05 1.01 6.9 2.86A9.7 9.7 0 0121.78 12c0 5.38-4.37 9.8-9.75 9.8zm5.35-7.35c-.29-.15-1.7-.84-1.97-.93-.26-.1-.45-.15-.64.15-.19.29-.74.93-.91 1.12-.17.19-.34.21-.63.07-.29-.15-1.22-.45-2.32-1.44-.86-.77-1.44-1.73-1.61-2.02-.17-.29-.02-.45.13-.6.13-.13.29-.34.43-.51.15-.17.2-.29.29-.48.1-.19.05-.36-.02-.51-.07-.15-.64-1.54-.87-2.11-.23-.56-.46-.49-.64-.5h-.55c-.19 0-.51.07-.78.36-.27.29-1.02 1-1.02 2.43s1.05 2.8 1.2 2.99c.15.19 2.06 3.15 4.99 4.42.7.3 1.25.48 1.67.61.7.22 1.34.19 1.85.12.56-.08 1.7-.7 1.94-1.37.24-.68.24-1.26.17-1.37-.07-.11-.26-.17-.55-.32z"/>
                      </svg>
                </button>
              </a>
              <button onClick={() => {
                  navigator.clipboard.writeText(message)
                  setCopiedId(g.id)

                  setTimeout(() => setCopiedId(null), 1000) 
                }}
                className="relative"
              >
                {copiedId === g.id && (
                  <span className="bg-black text-white text-xs absolute right-0 -top-6 px-2 py-1 rounded transition">
                    copied!
                  </span>
                )}

                <i className="fa-regular fa-copy"></i>
              </button>
            </div>
            <input type="checkbox" checked={checkedMap[g.id] || false} onChange={(e) => setCheckedMap(prev => ({...prev,[g.id]: e.target.checked}))} className="basis-1/4 scale-25" />
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
        <div  className="mt-[1rem] p-2 bg-white flex flex-col ">
          <p><strong>Pesan</strong></p>
          <textarea value={manualMessage} onChange={(e) => setManualMessage(e.target.value)} rows={6} className=" w-full  resize-none border-1 border-solid" />
          <button
            onClick={() => {
              navigator.clipboard.writeText(manualMessage)
              setCopiedManual(true)

              setTimeout(() => setCopiedManual(false), 1000)
            }}
            className="relative border-1 border-solid"
          >
            {copiedManual && (
              <span className="bg-black text-white text-xs absolute right-1/2 -translate-y-1/2 -top-6 px-2 py-1 rounded">
                copied!
              </span>
            )}

            Copy to clipboard
          </button>

          <span className="bg-black text-white text-xs absolute right-0 -top-6 px-2 py-1 rounded transition"> copied! </span>
          <br /><br />
        </div>
      )}
    </div>
  )
}



