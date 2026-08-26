import { useEffect, useState } from "react"
import * as XLSX from "xlsx"
import { GuestSearch } from "../Components/Dashboard/Search"
import { GuestPagination } from "../Components/Dashboard/Pagination"

type Guest = {
  id: string
  no: string
  name: string
  phone: string
}

type TemplateType = "islam" | "kristen" | "umum"

/* =========================================================
   HELPER
========================================================= */

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

const generateLink = (base: string, guest: string) => {
  const cleanBase = base.trim().replace(/\/+$/, "")

  return `${cleanBase}/${encodeURIComponent(guest)}`
}

const generateWA = (phone: string, message: string) => {
  return `https://wa.me/${normalizePhone(phone)}?text=${encodeURIComponent(
    message
  )}`
}

const getFirstName = (fullName: string) => {
  if (!fullName) return ""

  if (fullName.includes(".")) {
    return fullName.split(".")[0].trim()
  }

  return fullName.trim().split(" ")[0]
}

/* =========================================================
   AMBIL NAMA MEMPELAI DARI URL
=========================================================

Contoh:

https://dexa-invitation.com/Clara-Daniel

hasil:

wanita = Clara
pria   = Daniel

========================================================= */

const getCoupleFromUrl = (url: string) => {
  if (!url.trim()) {
    return {
      wanita: "",
      pria: "",
    }
  }

  let cleanUrl = url.trim()

  // Hilangkan protocol
  cleanUrl = cleanUrl.replace(/^https?:\/\//, "")

  // Hilangkan www
  cleanUrl = cleanUrl.replace(/^www\./, "")

  // Ambil pathname
  const parts = cleanUrl.split("/")

  // contoh:
  // dexa-invitation.com
  // Clara-Daniel

  if (parts.length < 2) {
    return {
      wanita: "",
      pria: "",
    }
  }

  const slug = parts[1]

  if (!slug) {
    return {
      wanita: "",
      pria: "",
    }
  }

  const couple = slug.split("-")

  const wanita = decodeURIComponent(couple[0] || "")
  const pria = decodeURIComponent(couple[1] || "")

  return {
    wanita,
    pria,
  }
}

/* =========================================================
   MESSAGE TEMPLATE
========================================================= */

const messageTemplates: Record<
  TemplateType,
  (
    name: string,
    pria: string,
    wanita: string,
    link: string
  ) => string
> = {
  islam: (
    name: string,
    pria: string,
    wanita: string,
    link: string
  ) => {
    const priaDepan = getFirstName(pria)
    const wanitaDepan = getFirstName(wanita)

    return `
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
  },

  kristen: (
    name: string,
    pria: string,
    wanita: string,
    link: string
  ) => {
    const priaDepan = getFirstName(pria)
    const wanitaDepan = getFirstName(wanita)

    return `
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
  },

  umum: (
    name: string,
    pria: string,
    wanita: string,
    link: string
  ) => {
    const priaDepan = getFirstName(pria)
    const wanitaDepan = getFirstName(wanita)

    return `
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
  },
}

/* =========================================================
   COMPONENT
========================================================= */

export const GuestWA = () => {
  const [guests, setGuests] = useState<Guest[]>([])

  /* URL UNDANGAN */
  const [baseLink, setBaseLink] = useState("")

  /* NAMA MEMPELAI */
  const [namaPria, setNamaPria] = useState("")
  const [namaWanita, setNamaWanita] = useState("")

  /* TEMPLATE */
  const [templateType, setTemplateType] =
    useState<TemplateType>("umum")

  /* MANUAL */
  const [manualName, setManualName] = useState("")
  const [copiedManual, setCopiedManual] = useState(false)

  /* MESSAGE EDITOR */
  const [messageMap, setMessageMap] =
    useState<Record<string, string>>({})

  /* CHECKBOX */
  const [checkedMap, setCheckedMap] =
    useState<Record<string, boolean>>({})

  /* COPY */
  const [copiedId, setCopiedId] =
    useState<string | null>(null)

  /* SORT */
  const [sortBy, setSortBy] =
    useState<"no" | "name" | "checked" | null>(null)

  const [sortOrder, setSortOrder] =
    useState<"asc" | "desc">("asc")

  /* SEARCH */
  const [searchTerm, setSearchTerm] = useState("")

  /* PAGINATION */
  const [currentPage, setCurrentPage] = useState(1)

  const itemsPerPage = 10

  /* LOCAL STORAGE */
  const [isLoaded, setIsLoaded] = useState(false)

  /* =========================================================
     AMBIL NAMA DARI URL
  ========================================================= */

  useEffect(() => {
    const { wanita, pria } =
      getCoupleFromUrl(baseLink)

    setNamaWanita(wanita)
    setNamaPria(pria)
  }, [baseLink])

  /* =========================================================
     HANDLE EXCEL
  ========================================================= */

  const handleFile = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0]

    if (!file) return

    const reader = new FileReader()

    reader.onload = (evt) => {
      const data = evt.target?.result

      if (!data) return

      const workbook = XLSX.read(data, {
        type: "binary",
      })

      const sheet =
        workbook.Sheets[
          workbook.SheetNames[0]
        ]

      const json =
        XLSX.utils.sheet_to_json(sheet)

      const mapped: Guest[] = json.map(
        (item: any, index) => ({
          id: `${index}-${item.name}-${item.phone}`,

          no: String(
            item.No ??
              item.NO ??
              item.no ??
              item["No."] ??
              index + 1
          ),

          name: String(
            item.name ??
              item.Name ??
              ""
          ).trim(),

          phone: String(
            item.phone ??
              item.Phone ??
              ""
          ).trim(),
        })
      )

      setGuests(mapped)
      setCurrentPage(1)
    }

    reader.readAsBinaryString(file)
  }

  /* =========================================================
     MANUAL GENERATOR
  ========================================================= */

  const handleGenerateManual = async () => {
    if (!manualName || !baseLink) return

    const link = generateLink(
      baseLink,
      manualName
    )

    const message =
      messageTemplates[templateType](
        manualName,
        namaPria,
        namaWanita,
        link
      )

    try {
      await navigator.clipboard.writeText(
        message
      )

      setCopiedManual(true)

      setTimeout(() => {
        setCopiedManual(false)
      }, 1500)
    } catch (error) {
      console.error(
        "Gagal copy pesan:",
        error
      )
    }
  }

  /* =========================================================
     RESET MESSAGE KETIKA TEMPLATE BERUBAH
  ========================================================= */

  useEffect(() => {
    setMessageMap({})
  }, [templateType])

  /* =========================================================
     LOCAL STORAGE - LOAD
  ========================================================= */

  useEffect(() => {
    const savedGuests =
      localStorage.getItem("guest-data")

    if (savedGuests) {
      try {
        setGuests(
          JSON.parse(savedGuests)
        )
      } catch {
        localStorage.removeItem(
          "guest-data"
        )
      }
    }

    const savedChecks =
      localStorage.getItem("guest-checks")

    if (savedChecks) {
      try {
        setCheckedMap(
          JSON.parse(savedChecks)
        )
      } catch {
        localStorage.removeItem(
          "guest-checks"
        )
      }
    }

    setIsLoaded(true)
  }, [])

  /* =========================================================
     LOCAL STORAGE - GUEST
  ========================================================= */

  useEffect(() => {
    if (!isLoaded) return

    localStorage.setItem(
      "guest-data",
      JSON.stringify(guests)
    )
  }, [guests, isLoaded])

  /* =========================================================
     LOCAL STORAGE - CHECK
  ========================================================= */

  useEffect(() => {
    if (!isLoaded) return

    localStorage.setItem(
      "guest-checks",
      JSON.stringify(checkedMap)
    )
  }, [checkedMap, isLoaded])

  /* =========================================================
     SORT
  ========================================================= */

  const handleSort = (
    field: "no" | "name" | "checked"
  ) => {
    if (sortBy === field) {
      setSortOrder((prev) =>
        prev === "asc"
          ? "desc"
          : "asc"
      )
    } else {
      setSortBy(field)
      setSortOrder("asc")
    }
  }

  /* =========================================================
     FILTER + SORT
  ========================================================= */

  const filteredGuests = [...guests]
    .filter((guest) =>
      (guest.name ?? "")
        .toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        )
    )
    .sort((a, b) => {
      if (!sortBy) return 0

      /* CHECKED */

      if (sortBy === "checked") {
        const aChecked =
          checkedMap[a.id] ? 1 : 0

        const bChecked =
          checkedMap[b.id] ? 1 : 0

        return sortOrder === "asc"
          ? aChecked - bChecked
          : bChecked - aChecked
      }

      /* NO */

      if (sortBy === "no") {
        const aNo = Number(a.no)
        const bNo = Number(b.no)

        return sortOrder === "asc"
          ? aNo - bNo
          : bNo - aNo
      }

      /* NAME */

      const aValue =
        a.name.toLowerCase()

      const bValue =
        b.name.toLowerCase()

      return sortOrder === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue)
    })

  /* =========================================================
     PAGINATION
  ========================================================= */

  const totalPages =
    Math.ceil(
      filteredGuests.length /
        itemsPerPage
    )

  const paginatedGuests =
    filteredGuests.slice(
      (currentPage - 1) *
        itemsPerPage,

      currentPage *
        itemsPerPage
    )

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">

      <div className="max-w-7xl mx-auto">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="bg-white rounded-2xl shadow-sm p-5 mb-5">

          <div className="flex items-center gap-3">

            <img
              src="/logo-dio.webp"
              className="h-14 w-auto object-contain"
              alt="Dexa Invitation"
            />

            <div className="text-left">

              <div className="flex items-baseline">

                <span className="text-xl font-bold text-teal-600">
                  DEXA
                </span>

                <span className="ml-1 text-sm text-gray-500">
                  invitation
                </span>

              </div>

              <p className="text-xs text-gray-400">
                Guest WhatsApp Generator
              </p>

            </div>

          </div>

        </div>

        {/* =================================================
            DATA UNDANGAN
        ================================================= */}

        <div className="bg-white rounded-2xl shadow-sm p-5 mb-5">

          <h2 className="text-lg font-bold">
            Data Undangan
          </h2>

          <p className="text-sm text-gray-500 mt-1 mb-4">
            Masukkan URL utama undangan
          </p>

          <input
            type="text"
            placeholder="https://dexa-invitation.com/Bride-Groom"
            value={baseLink}
            onChange={(e) =>
              setBaseLink(
                e.target.value
              )
            }
            className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white outline-none focus:ring-2 focus:ring-teal-500"
          />

          {/* PREVIEW MEMPELAI */}

          {namaWanita && namaPria && (
            <div className="grid grid-cols-2 gap-3 mt-4">

              <div className="bg-pink-50 border border-pink-100 rounded-xl p-4">

                <p className="text-xs text-gray-400">
                  Mempelai Wanita
                </p>

                <p className="font-semibold text-lg">
                  {namaWanita}
                </p>

              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">

                <p className="text-xs text-gray-400">
                  Mempelai Pria
                </p>

                <p className="font-semibold text-lg">
                  {namaPria}
                </p>

              </div>

            </div>
          )}

        </div>

        {/* =================================================
            MANUAL GENERATOR
        ================================================= */}

        <div className="bg-white rounded-2xl shadow-sm p-5 mb-5">

          <h2 className="text-lg font-bold">
            Generate Undangan Manual
          </h2>

          <p className="text-sm text-gray-500 mt-1 mb-4">
            Masukkan nama tamu atau nama grup.
            Pesan akan langsung dibuat dan disalin.
          </p>

          <div className="flex flex-col md:flex-row gap-3">

            {/* NAMA */}

            <input
              type="text"
              placeholder="Nama tamu / nama grup"
              value={manualName}
              onChange={(e) =>
                setManualName(
                  e.target.value
                )
              }
              className="flex-[2] border border-gray-300 rounded-xl px-4 py-3 bg-white outline-none focus:ring-2 focus:ring-teal-500"
            />

            {/* TEMPLATE */}

            <select
              value={templateType}
              onChange={(e) =>
                setTemplateType(
                  e.target.value as TemplateType
                )
              }
              className="flex-1 border border-gray-300 rounded-xl px-4 py-3 bg-white outline-none focus:ring-2 focus:ring-teal-500"
            >

              <option value="umum">
                Umum
              </option>

              <option value="islam">
                Islam
              </option>

              <option value="kristen">
                Kristen
              </option>

            </select>

            {/* GENERATE COPY */}

            <button
              onClick={
                handleGenerateManual
              }
              disabled={
                !manualName ||
                !baseLink
              }
              className={`
                flex-1
                py-3
                rounded-xl
                font-semibold
                transition
                ${
                  copiedManual
                    ? "bg-green-600 text-white"
                    : "bg-teal-600 hover:bg-teal-700 text-white"
                }
                disabled:bg-gray-300
                disabled:cursor-not-allowed
              `}
            >

              {copiedManual
                ? "✓ Pesan Tersalin"
                : "Generate & Copy"}

            </button>

          </div>

        </div>

        {/* =================================================
            IMPORT EXCEL
        ================================================= */}

        <div className="bg-white rounded-2xl shadow-sm p-5 mb-5">

          <h2 className="text-lg font-bold">
            Import Daftar Tamu
          </h2>

          <p className="text-sm text-gray-500 mt-1 mb-4">
            Upload file Excel (.xlsx / .xls)
          </p>

          <label className="block border-2 border-dashed border-gray-300 hover:border-teal-500 rounded-xl p-8 text-center cursor-pointer transition">

            <input
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFile}
              className="hidden"
            />

            <div className="text-3xl mb-2">
              📄
            </div>

            <p className="font-semibold">
              Klik untuk memilih file Excel
            </p>

            <p className="text-xs text-gray-400 mt-1">
              Kolom: No, Name, Phone
            </p>

          </label>

        </div>

        {/* =================================================
            TABLE
        ================================================= */}

        {guests.length > 0 && (

          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

            {/* TOOLBAR */}

            <div className="p-4 border-b">

              <div className="flex flex-col md:flex-row gap-3">

                <div className="flex-1">

                  <GuestSearch
                    value={searchTerm}
                    onChange={(val) => {
                      setSearchTerm(val)
                      setCurrentPage(1)
                    }}
                  />

                </div>

                <select
                  value={templateType}
                  onChange={(e) =>
                    setTemplateType(
                      e.target.value as TemplateType
                    )
                  }
                  className="border border-gray-300 rounded-xl px-4 py-2 bg-white"
                >

                  <option value="umum">
                    Umum
                  </option>

                  <option value="islam">
                    Islam
                  </option>

                  <option value="kristen">
                    Kristen
                  </option>

                </select>

              </div>

            </div>

            {/* TABLE */}

            <div className="overflow-x-auto">

              <table className="w-full border-collapse">

                <thead>

                  <tr className="bg-teal-600 text-white">

                    <th
                      onClick={() =>
                        handleSort("no")
                      }
                      className="border px-3 py-3 cursor-pointer whitespace-nowrap"
                    >
                      No{" "}
                      {sortBy === "no" &&
                        (sortOrder === "asc"
                          ? "↑"
                          : "↓")}
                    </th>

                    <th
                      onClick={() =>
                        handleSort("name")
                      }
                      className="border px-4 py-3 text-left cursor-pointer whitespace-nowrap"
                    >
                      Nama{" "}
                      {sortBy === "name" &&
                        (sortOrder === "asc"
                          ? "↑"
                          : "↓")}
                    </th>

                    <th className="border px-4 py-3 min-w-[400px]">
                      Pesan WhatsApp
                    </th>

                    <th className="border px-4 py-3 whitespace-nowrap">
                      Aksi
                    </th>

                    <th
                      onClick={() =>
                        handleSort("checked")
                      }
                      className="border px-4 py-3 cursor-pointer"
                    >
                      ✓
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {paginatedGuests.map(
                    (guest) => {

                      const link =
                        generateLink(
                          baseLink,
                          guest.name
                        )

                      const defaultMessage =
                        messageTemplates[
                          templateType
                        ](
                          guest.name,
                          namaPria,
                          namaWanita,
                          link
                        )

                      const message =
                        messageMap[
                          guest.id
                        ] ??
                        defaultMessage

                      const wa =
                        generateWA(
                          guest.phone,
                          message
                        )

                      return (

                        <tr
                          key={guest.id}
                          className={`
                            border-b
                            transition
                            ${
                              checkedMap[
                                guest.id
                              ]
                                ? "bg-teal-50"
                                : "bg-white"
                            }
                          `}
                        >

                          {/* NO */}

                          <td className="text-center px-3 py-3">
                            {guest.no}
                          </td>

                          {/* NAMA */}

                          <td className="px-4 py-3">

                            <strong>
                              {guest.name}
                            </strong>

                            <p className="text-xs text-gray-400">
                              {guest.phone}
                            </p>

                          </td>

                          {/* MESSAGE */}

                          <td className="px-3 py-3">

                            <textarea
                              value={message}
                              rows={5}
                              onChange={(e) =>
                                setMessageMap(
                                  (prev) => ({
                                    ...prev,
                                    [guest.id]:
                                      e.target.value,
                                  })
                                )
                              }
                              className="w-full border border-gray-300 rounded-lg p-2 resize-none outline-none focus:ring-2 focus:ring-teal-500"
                            />

                          </td>

                          {/* ACTION */}

                          <td className="px-3 py-3">

                            <div className="flex justify-center gap-4">

                              {/* WHATSAPP */}

                              <a
                                href={wa}
                                target="_blank"
                                rel="noreferrer"
                                title="Kirim WhatsApp"
                              >

                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  className="w-8 h-8 text-white bg-[#45C153] rounded-full p-1 hover:scale-110 transition"
                                  fill="currentColor"
                                >

                                  <path d="M20.52 3.48A11.82 11.82 0 0012.03 0C5.4 0 .02 5.38.02 12c0 2.12.56 4.18 1.63 6L0 24l6.17-1.61A11.96 11.96 0 0012.03 24c6.63 0 12.01-5.38 12.01-12 0-3.2-1.25-6.2-3.52-8.52zM12.03 21.8c-1.8 0-3.56-.48-5.1-1.4l-.37-.22-3.66.96.98-3.57-.24-.37A9.74 9.74 0 012.28 12c0-5.37 4.37-9.75 9.75-9.75 2.6 0 5.05 1.01 6.9 2.86A9.7 9.7 0 0121.78 12c0 5.38-4.37 9.8-9.75 9.8zm5.35-7.35c-.29-.15-1.7-.84-1.97-.93-.26-.1-.45-.15-.64.15-.19.29-.74.93-.91 1.12-.17.19-.34.21-.63.07-.29-.15-1.22-.45-2.32-1.44-.86-.77-1.44-1.73-1.61-2.02-.17-.29-.02-.45.13-.6.13-.13.29-.34.43-.51.15-.17.2-.29.29-.48.1-.19.05-.36-.02-.51-.07-.15-.64-1.54-.87-2.11-.23-.56-.46-.49-.64-.5h-.55c-.19 0-.51.07-.78.36-.27.29-1.02 1-1.02 2.43s1.05 2.8 1.2 2.99c.15.19 2.06 3.15 4.99 4.42.7.3 1.25.48 1.67.61.7.22 1.34.19 1.85.12.56-.08 1.7-.7 1.94-1.37.24-.68.24-1.26.17-1.37-.07-.11-.26-.17-.55-.32z" />

                                </svg>

                              </a>

                              {/* COPY */}

                              <button
                                onClick={() => {

                                  navigator.clipboard.writeText(
                                    message
                                  )

                                  setCopiedId(
                                    guest.id
                                  )

                                  setTimeout(
                                    () =>
                                      setCopiedId(
                                        null
                                      ),
                                    1000
                                  )

                                }}
                                className="relative"
                                title="Copy pesan"
                              >

                                {copiedId ===
                                  guest.id && (

                                  <span className="absolute -top-7 right-0 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                                    Copied!
                                  </span>

                                )}

                                <i className="fa-regular fa-copy text-xl" />

                              </button>

                            </div>

                          </td>

                          {/* CHECK */}

                          <td className="text-center">

                            <input
                              type="checkbox"
                              checked={
                                checkedMap[
                                  guest.id
                                ] || false
                              }
                              onChange={(e) =>
                                setCheckedMap(
                                  (prev) => ({
                                    ...prev,
                                    [guest.id]:
                                      e.target.checked,
                                  })
                                )
                              }
                              className="scale-150 cursor-pointer accent-teal-500"
                            />

                          </td>

                        </tr>

                      )
                    }
                  )}

                </tbody>

              </table>

            </div>

            {/* PAGINATION */}

            <div className="p-4 border-t">

              <GuestPagination
                current={currentPage}
                total={totalPages}
                onPageChange={(page) =>
                  setCurrentPage(page)
                }
              />

            </div>

          </div>

        )}

        {/* SEARCH EMPTY */}

        {guests.length > 0 &&
          filteredGuests.length === 0 && (

            <p className="text-center p-10 text-gray-500">
              Nama "{searchTerm}" tidak ditemukan.
            </p>

          )}

      </div>

    </div>
  )
}