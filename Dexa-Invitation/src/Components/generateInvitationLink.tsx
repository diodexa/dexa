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

const getFirstName = (fullName: string) => {
  if (fullName.includes(".")) {
    return fullName.split(".")[0].trim()
  }

  return fullName.trim().split(" ")[0]
}

const messageTemplates = {
  islam: (name: string, pria: string, wanita: string, link: string) => {
    const priaDepan = getFirstName(pria)
    const wanitaDepan = getFirstName(wanita)
    return (
`
Kepada Yth
Bapak/Ibu/Saudara/i
*${name}*

‎السَّلاَمُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ 


Bismillahirahmanirrahim.

Tanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i, untuk menghadiri acara resepsi pernikahan kami:

${wanita}
&
${pria}

Berikut link untuk info lengkap dari acara kami:

${link}

Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i, berkenan untuk hadir dan memberikan doa restu.

‎وَالسَّلاَمُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ

Kami yang berbahagia:
Kel. Kedua mempelai,
${wanitaDepan} & ${priaDepan}
`
    )
  },
  

  kristen: (name: string, pria: string, wanita: string, link: string) => {
    const priaDepan = getFirstName(pria)
    const wanitaDepan = getFirstName(wanita)
    return (

`
Shalom ${name}

Dengan penuh sukacita, kami mengundang Anda untuk menghadiri acara pernikahan kami.

${wanita}
    &
${pria}

Berikut link untuk info lengkap dari acara kami:
${link}

Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i, berkenan untuk hadir dan memberikan doa restu.

Tuhan memberkati

Kami yang berbahagia:
Kel. Kedua mempelai,
${wanitaDepan} & ${priaDepan}

`
    )
  },
    

  umum: (name: string, pria: string, wanita: string, link: string) => {
    const priaDepan = getFirstName(pria)
    const wanitaDepan = getFirstName(wanita)
    return (

`
Halo ${name}

Kami mengundang Anda ke acara pernikahan kami

${wanita}
&
${pria}

Berikut link untuk info lengkap dari acara kami:
${link}

Merupakan suatu kehormatan bagi kami jika Anda berkenan hadir

Kami yang berbahagia:
Kel. Kedua mempelai,
${wanitaDepan} & ${priaDepan}
`
    )
  }
}

export const GuestWA = () => {
  const [guests, setGuests] = useState<Guest[]>([])
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const [namaPria, setNamaPria] = useState("Pengantin Pria")
  const [namaWanita, setNamaWanita] = useState("Pengantin Wanita")
  const [templateType, setTemplateType] = useState<"islam" | "kristen" | "umum">("umum")
  const [baseLink, setBaseLink] = useState("")

  // 🔥 manual input
  const [manualName, setManualName] = useState("nama")
  const [manualLink, setManualLink] = useState("dexa-invitation.com")
  const [copiedManual, setCopiedManual] = useState(false)
  const [manualMessage, setManualMessage] = useState("")



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

      const mapped = json.map((item: any) => ({
        id: String(item.No), // 🔥 ambil dari Excel "No"
        name: item.name,
        phone: item.phone,
      }))

      setGuests(mapped)

    }

    reader.readAsBinaryString(file)
  }

    // 🔥 generate manual
    const handleGenerateManual = () => {
      if (!manualName) return

      const id = Date.now().toString()
      const link = generateLink(baseLink, manualName, id)

      setManualLink(link)
    }
    
    useEffect(() => {
      setMessageMap({})
    }, [templateType])

    useEffect(() => {
      if (!manualName) return

      const link = generateLink(baseLink, manualName, (manualName +"01"))

      const message = messageTemplates[templateType](manualName,namaPria,namaWanita,link)

      setManualMessage(message)
    }, [manualName, namaPria, namaWanita, templateType, baseLink])

  return (
    <div className="w-full mx-auto p-4">
      <div className="flex">
        <img src="/logo-dio.webp" className="max-h-25 w-auto object-contain"  />
            <div className="flex flex-row">
                <span className="self-center text-xl font-semibold whitespace-nowrap text-teal-500 dark:text-white">DEXA </span>
                <span className="self-center text-2xs whitespace-nowrap text-teal-500 dark:text-white"> invitation  </span>
            </div>
      </div>
      <h2>Blast Page</h2>
      <div className="flex flex-col gap-2 mb-4">
        <input
          type="text"
          placeholder="URL undangan"
          value={baseLink}
          onChange={(e) => setBaseLink(e.target.value)}
          className="border p-2 text-center bg-white"
        />
        <div className="flex gap-1 justify-center flex-col md:flex-row p-2 ">
          <div className="flex flex-col flex-1">
            <input
              type="text"
              placeholder="Calon Pengantin Wanita"
              value={namaWanita}
              onChange={(e) => setNamaWanita(e.target.value)}
              className="border p-2 bg-white"
              />
          </div>
          <div className="flex flex-col flex-1">
            <input
              type="text"
              placeholder="Calon Pengantin Pria"
              value={namaPria}
              onChange={(e) => setNamaPria(e.target.value)}
              className="border p-2 bg-white"
            />
            </div>
          </div>

      <select
        value={templateType}
        onChange={(e) => setTemplateType(e.target.value as any)}
        className="border-1 border-solid bg-white  text-center"
      >
        <option value="umum">Umum</option>
        <option value="islam">Islam</option>
        <option value="kristen">Kristen</option>
      </select>

      <div className="border-1 border-solid items-center justify-center m-5 ">
        <input type="file" accept=".xlsx, .xls" onChange={handleFile} className="p-10" />
      </div>
      </div>


      {/* 🔥 AUTO FROM EXCEL */}
      {guests.map(g => {
        const link = generateLink(baseLink, g.name, g.id)
        const defaultMessage = messageTemplates[templateType](g.name,namaPria,namaWanita,link)
        const message = messageMap[g.id] ?? defaultMessage
        const wa = generateWA(g.phone, message)

        return (
          <div key={g.id} className= {`flex flex-row p-2 ${checkedMap[g.id] ? "bg-green-700 text-white" : "bg-white"}`}>
            <p className="basis-1/4"><strong>{g.name}</strong></p>

            <textarea value={message} rows={4} onChange={(e) =>setMessageMap(prev => ({...prev,[g.id]: e.target.value}))} className="basis-3/4 w-full resize-none border-1 border-solid pl-2" /> 
            
          

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
      <h3>Untuk Grup/Kirim manual</h3>

      <div className="flex flex-col gap-1">

        <input
          type="text"
          placeholder="Nama Grup"
          value={manualName}
          onChange={(e) => setManualName(e.target.value)}
          className="border-1 border-solid bg-white text-center py-1"
        />

        <button onClick={handleGenerateManual} className="bg-teal-600 text-white hover:bg-white hover:text-black py-2">
          Generate
        </button>
      </div>

      {manualLink && (
        <div  className="mt-[1rem] p-2 bg-white flex flex-col gap-1">
          <p><strong>Pesan</strong></p>
          <textarea value={manualMessage} onChange={(e) => setManualMessage(e.target.value)} rows={6} className=" w-full  resize-none border-1 border-solid" />
          <button
            onClick={() => {
              navigator.clipboard.writeText(manualMessage)
              setCopiedManual(true)

              setTimeout(() => setCopiedManual(false), 1000)
            }}
            className="relative border-1 border-solid bg-teal-600 text-white hover:bg-white hover:text-black"
          >
            {copiedManual && (
              <span className="bg-black text-white text-xs absolute right-1/2 -translate-y-1/2 -top-6 px-2 py-1 rounded">
                copied!
              </span>
            )}

            Copy to clipboard
          </button>

          <span className="bg-black text-white text-xs absolute right-0 -top-6 px-2 py-1 rounded transition"> copied! </span>
        </div>
      )}
    </div>
  )
}



