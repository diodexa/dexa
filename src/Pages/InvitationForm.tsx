import { useState } from "react";
import type { Invitation } from "../types/invitationType";

const InvitationForm = () => {
  const [form, setForm] = useState<Invitation>({
    slug: "",
    template: "Monochrome",

    Namabride: "",
    NamabridePanggilan: "",
    AkunIGWanita: "",
    AkunTikTokWanita: "",
    BapakpengantinWanita: "",
    IbupengantinWanita: "",
    FotoBride: "",

    Namagroom: "",
    NamagroomPanggilan: "",
    AkunIGPria: "",
    AkunTikTokPria: "",
    BapakpengantinPria: "",
    IbupengantinPria: "",
    FotoGroom: "",

    FormatWaktu: "WIB",

    TanggalAkad: "",
    JamAkad: "",
    TanggalAkadISO: "",
    LokasiAkad: "",
    LinkGoogleMapsAkad: "",

    TanggalResepsi: "",
    JamResepsi: "",
    LokasiResepsi: "",
    LinkGoogleMapsResepsi: "",

    note: "",

    coverImage: "",
    backcover: "",

    gallery: [],

    Salam: "",
    Sambutan: "",
    Ayat: "",
    NamaSurat: "",

    music: "",
    video: "",

    theme: {
      backgroundImage: "",
      warna1: "#000000",
      warna2: "#ffffff",
      warna3: "#888888",
      contrasfont: "#ffffff",
      ContrasBackgroundColor: "#000000",
      warnaButtonBackground: "#000000",
      warnaButtonBorder: "#ffffff",
      warnaweddingInvitation: "#ffffff",
    },

    Story: [],

    WeddingGift: {
      rekening: [
        {
          bank: "",
          atasNama: "",
          nomorRekening: "",
        },
        {
          bank: "",
          atasNama: "",
          nomorRekening: "",
        },
      ],

      alamat: {
        alamat: "",
        penerima: "",
        noHp: "",
      },
    },

    Closing: "",

    Background: {},

    Chat: {
      Interaksi: [],
    },

    sticker: [],
  });

  const [variableName, setVariableName] = useState("");

  /*
  |--------------------------------------------------------------------------
  | TEMPLATE
  |--------------------------------------------------------------------------
  */

  const templates = [
    "Monochrome",
    "FlipBook",
    "JourneyLeaf",
    "JourneyCream",
    "GroupChat",
  ];

  /*
  |--------------------------------------------------------------------------
  | BANK / E-WALLET
  |--------------------------------------------------------------------------
  */

  const paymentOptions = [
    "BCA",
    "BNI",
    "BRI",
    "Mandiri",
    "BTN",
    "BSI",
    "CIMB Niaga",
    "Permata",
    "Danamon",
    "Maybank",
    "Bank Jago",
    "Bank Mega",
    "SeaBank",
    "ShopeePay",
    "DANA",
    "GoPay",
    "OVO",
    "LinkAja",
  ];

  /*
  |--------------------------------------------------------------------------
  | UPDATE FIELD
  |--------------------------------------------------------------------------
  */

  const updateField = <K extends keyof Invitation>(
    field: K,
    value: Invitation[K]
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  /*
  |--------------------------------------------------------------------------
  | UPDATE BRIDE
  |--------------------------------------------------------------------------
  */

  const updateBride = <
    K extends
      | "Namabride"
      | "NamabridePanggilan"
      | "AkunIGWanita"
      | "AkunTikTokWanita"
      | "BapakpengantinWanita"
      | "IbupengantinWanita"
  >(
    field: K,
    value: Invitation[K]
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  /*
  |--------------------------------------------------------------------------
  | UPDATE GROOM
  |--------------------------------------------------------------------------
  */

  const updateGroom = <
    K extends
      | "Namagroom"
      | "NamagroomPanggilan"
      | "AkunIGPria"
      | "AkunTikTokPria"
      | "BapakpengantinPria"
      | "IbupengantinPria"
  >(
    field: K,
    value: Invitation[K]
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  /*
  |--------------------------------------------------------------------------
  | AUTO VARIABLE NAME
  |--------------------------------------------------------------------------
  */

  const generateVariableName = () => {
    const bride = form.NamabridePanggilan.trim();
    const groom = form.NamagroomPanggilan.trim();

    if (!bride || !groom) {
      alert("Isi nama panggilan kedua mempelai terlebih dahulu.");
      return;
    }

    const variable = `${bride}${groom}`
      .replace(/[^a-zA-Z0-9]/g, "");

    setVariableName(variable);
  };

  /*
  |--------------------------------------------------------------------------
  | UPDATE WEDDING GIFT
  |--------------------------------------------------------------------------
  */

  const updateRekening = (
    index: number,
    field: "bank" | "atasNama" | "nomorRekening",
    value: string
  ) => {
    setForm((prev) => {
      const rekening = [
        ...(prev.WeddingGift?.rekening ?? []),
      ];

      while (rekening.length < 2) {
        rekening.push({
          bank: "",
          atasNama: "",
          nomorRekening: "",
        });
      }

      rekening[index] = {
        ...rekening[index],
        [field]: value,
      };

      return {
        ...prev,

        WeddingGift: {
          rekening,

          alamat:
            prev.WeddingGift?.alamat ?? {
              alamat: "",
              penerima: "",
              noHp: "",
            },
        },
      };
    });
  };

  const updateWeddingGiftAddress = (
    field: "alamat" | "penerima" | "noHp",
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,

      WeddingGift: {
        rekening:
          prev.WeddingGift?.rekening ?? [],

        alamat: {
          alamat:
            prev.WeddingGift?.alamat?.alamat ?? "",

          penerima:
            prev.WeddingGift?.alamat?.penerima ?? "",

          noHp:
            prev.WeddingGift?.alamat?.noHp ?? "",

          [field]: value,
        },
      },
    }));
  };

  /*
  |--------------------------------------------------------------------------
  | FORMAT TYPESCRIPT
  |--------------------------------------------------------------------------
  */

  const generateTypeScript = () => {
    if (!variableName.trim()) {
      alert("Isi nama variable terlebih dahulu.");
      return "";
    }

    const variable = variableName
      .trim()
      .replace(/[^a-zA-Z0-9_$]/g, "");

    if (!variable) {
      alert("Nama variable tidak valid.");
      return "";
    }

    const output = {
      template: form.template,

      Namabride: form.Namabride,
      NamabridePanggilan:
        form.NamabridePanggilan,

      AkunIGWanita:
        form.AkunIGWanita || undefined,

      AkunTikTokWanita:
        form.AkunTikTokWanita || undefined,

      BapakpengantinWanita:
        form.BapakpengantinWanita,

      IbupengantinWanita:
        form.IbupengantinWanita,

      Namagroom: form.Namagroom,

      NamagroomPanggilan:
        form.NamagroomPanggilan,

      AkunIGPria:
        form.AkunIGPria || undefined,

      AkunTikTokPria:
        form.AkunTikTokPria || undefined,

      BapakpengantinPria:
        form.BapakpengantinPria,

      IbupengantinPria:
        form.IbupengantinPria,

      FormatWaktu:
        form.FormatWaktu || undefined,

      TanggalAkad:
        form.TanggalAkad || undefined,

      JamAkad:
        form.JamAkad || undefined,

      TanggalAkadISO:
        form.TanggalAkadISO || undefined,

      LokasiAkad:
        form.LokasiAkad || undefined,

      LinkGoogleMapsAkad:
        form.LinkGoogleMapsAkad || undefined,

      TanggalResepsi:
        form.TanggalResepsi || undefined,

      JamResepsi:
        form.JamResepsi || undefined,

      LokasiResepsi:
        form.LokasiResepsi || undefined,

      LinkGoogleMapsResepsi:
        form.LinkGoogleMapsResepsi || undefined,

      WeddingGift: {
        rekening:
          form.WeddingGift?.rekening?.filter(
            (rekening) =>
              rekening.bank ||
              rekening.atasNama ||
              rekening.nomorRekening
          ) ?? [],

        alamat: {
          alamat:
            form.WeddingGift?.alamat?.alamat ?? "",

          penerima:
            form.WeddingGift?.alamat?.penerima ?? "",

          noHp:
            form.WeddingGift?.alamat?.noHp ?? "",
        },
      },
    };

    /*
     * JSON.stringify dipakai hanya sebagai
     * formatter object.
     *
     * Setelah itu kita hapus tanda quote
     * pada property supaya menjadi TypeScript.
     */

    const json = JSON.stringify(
      output,
      null,
      2
    );

    const ts = json.replace(
      /"([a-zA-Z_$][a-zA-Z0-9_$]*)":/g,
      "$1:"
    );

    const result = `export const ${variable} = ${ts};`;

    return result;
  };

  /*
  |--------------------------------------------------------------------------
  | COPY TYPESCRIPT
  |--------------------------------------------------------------------------
  */

  const copyTypeScript = async () => {
    const ts = generateTypeScript();

    if (!ts) return;

    await navigator.clipboard.writeText(ts);

    alert(
      `TypeScript ${variableName} berhasil dicopy.`
    );
  };

  /*
  |--------------------------------------------------------------------------
  | SUBMIT
  |--------------------------------------------------------------------------
  */

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const ts = generateTypeScript();

    if (!ts) return;

    console.log(ts);

    alert(
      "Data berhasil dibuat. Hasil TypeScript ada di console."
    );
  };

  /*
  |--------------------------------------------------------------------------
  | UI
  |--------------------------------------------------------------------------
  */

  return (
    <main className="min-h-screen bg-gray-100 p-4 md:p-8 text-black">

      <div className="max-w-5xl mx-auto">

        {/* HEADER */}

        <div className="bg-white rounded-2xl shadow p-6 mb-6">

          <h1 className="text-2xl md:text-3xl font-bold">
            Input Data Undangan
          </h1>

          <p className="text-gray-500 mt-1">
            Buat data undangan baru dalam format TypeScript.
          </p>

        </div>


        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6"
        >

          {/* ====================================================== */}
          {/* TEMPLATE & VARIABLE */}
          {/* ====================================================== */}

          <section className="bg-white rounded-2xl shadow p-6">

            <h2 className="text-xl font-bold mb-5">
              1. Template
            </h2>

            <div className="grid md:grid-cols-2 gap-4">

              <SelectInput
                label="Template"
                value={form.template}
                options={templates}
                onChange={(v) =>
                  updateField("template", v)
                }
              />

              <div className="flex flex-col gap-1">

                <label className="text-sm font-medium">
                  Nama Variable
                </label>

                <div className="flex gap-2">

                  <input
                    value={variableName}
                    onChange={(e) =>
                      setVariableName(
                        e.target.value
                      )
                    }
                    placeholder="ClaraDaniel"
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-black"
                  />

                  <button
                    type="button"
                    onClick={generateVariableName}
                    className="px-4 bg-black text-white rounded-lg"
                  >
                    Auto
                  </button>

                </div>

                <p className="text-xs text-gray-400">
                  Contoh: ClaraDaniel
                </p>

              </div>

            </div>

          </section>


          {/* ====================================================== */}
          {/* BRIDE */}
          {/* ====================================================== */}

          <section className="bg-white rounded-2xl shadow p-6">

            <h2 className="text-xl font-bold mb-5">
              2. Data Mempelai Wanita
            </h2>

            <div className="grid md:grid-cols-2 gap-4">

              <Input
                label="Nama Lengkap"
                value={form.Namabride}
                onChange={(v) =>
                  updateBride(
                    "Namabride",
                    v
                  )
                }
              />

              <Input
                label="Nama Panggilan"
                value={form.NamabridePanggilan}
                onChange={(v) =>
                  updateBride(
                    "NamabridePanggilan",
                    v
                  )
                }
              />

              <Input
                label="Nama Ayah"
                value={form.BapakpengantinWanita}
                onChange={(v) =>
                  updateBride(
                    "BapakpengantinWanita",
                    v
                  )
                }
              />

              <Input
                label="Nama Ibu"
                value={form.IbupengantinWanita}
                onChange={(v) =>
                  updateBride(
                    "IbupengantinWanita",
                    v
                  )
                }
              />

              <Input
                label="Instagram"
                value={
                  form.AkunIGWanita ?? ""
                }
                onChange={(v) =>
                  updateBride(
                    "AkunIGWanita",
                    v
                  )
                }
              />

              <Input
                label="TikTok"
                value={
                  form.AkunTikTokWanita ?? ""
                }
                onChange={(v) =>
                  updateBride(
                    "AkunTikTokWanita",
                    v
                  )
                }
              />

            </div>

          </section>


          {/* ====================================================== */}
          {/* GROOM */}
          {/* ====================================================== */}

          <section className="bg-white rounded-2xl shadow p-6">

            <h2 className="text-xl font-bold mb-5">
              3. Data Mempelai Pria
            </h2>

            <div className="grid md:grid-cols-2 gap-4">

              <Input
                label="Nama Lengkap"
                value={form.Namagroom}
                onChange={(v) =>
                  updateGroom(
                    "Namagroom",
                    v
                  )
                }
              />

              <Input
                label="Nama Panggilan"
                value={form.NamagroomPanggilan}
                onChange={(v) =>
                  updateGroom(
                    "NamagroomPanggilan",
                    v
                  )
                }
              />

              <Input
                label="Nama Ayah"
                value={form.BapakpengantinPria}
                onChange={(v) =>
                  updateGroom(
                    "BapakpengantinPria",
                    v
                  )
                }
              />

              <Input
                label="Nama Ibu"
                value={form.IbupengantinPria}
                onChange={(v) =>
                  updateGroom(
                    "IbupengantinPria",
                    v
                  )
                }
              />

              <Input
                label="Instagram"
                value={
                  form.AkunIGPria ?? ""
                }
                onChange={(v) =>
                  updateGroom(
                    "AkunIGPria",
                    v
                  )
                }
              />

              <Input
                label="TikTok"
                value={
                  form.AkunTikTokPria ?? ""
                }
                onChange={(v) =>
                  updateGroom(
                    "AkunTikTokPria",
                    v
                  )
                }
              />

            </div>

          </section>


          {/* ====================================================== */}
          {/* AKAD */}
          {/* ====================================================== */}

          <section className="bg-white rounded-2xl shadow p-6">

            <h2 className="text-xl font-bold mb-5">
              4. Akad
            </h2>

            <div className="grid md:grid-cols-2 gap-4">

              <Input
                label="Tanggal Akad"
                type="date"
                value={
                  form.TanggalAkad ?? ""
                }
                onChange={(v) =>
                  updateField(
                    "TanggalAkad",
                    v
                  )
                }
              />

              <Input
                label="Jam Akad"
                type="time"
                value={
                  form.JamAkad ?? ""
                }
                onChange={(v) =>
                  updateField(
                    "JamAkad",
                    v
                  )
                }
              />

              <Input
                label="Lokasi Akad"
                value={
                  form.LokasiAkad ?? ""
                }
                onChange={(v) =>
                  updateField(
                    "LokasiAkad",
                    v
                  )
                }
              />

              <Input
                label="Google Maps Akad"
                value={
                  form.LinkGoogleMapsAkad ?? ""
                }
                onChange={(v) =>
                  updateField(
                    "LinkGoogleMapsAkad",
                    v
                  )
                }
              />

            </div>

          </section>


          {/* ====================================================== */}
          {/* RESEPSI */}
          {/* ====================================================== */}

          <section className="bg-white rounded-2xl shadow p-6">

            <h2 className="text-xl font-bold mb-5">
              5. Resepsi
            </h2>

            <div className="grid md:grid-cols-2 gap-4">

              <Input
                label="Tanggal Resepsi"
                type="date"
                value={
                  form.TanggalResepsi ?? ""
                }
                onChange={(v) =>
                  updateField(
                    "TanggalResepsi",
                    v
                  )
                }
              />

              <Input
                label="Jam Resepsi"
                type="time"
                value={
                  form.JamResepsi ?? ""
                }
                onChange={(v) =>
                  updateField(
                    "JamResepsi",
                    v
                  )
                }
              />

              <Input
                label="Lokasi Resepsi"
                value={
                  form.LokasiResepsi ?? ""
                }
                onChange={(v) =>
                  updateField(
                    "LokasiResepsi",
                    v
                  )
                }
              />

              <Input
                label="Google Maps Resepsi"
                value={
                  form.LinkGoogleMapsResepsi ?? ""
                }
                onChange={(v) =>
                  updateField(
                    "LinkGoogleMapsResepsi",
                    v
                  )
                }
              />

            </div>

          </section>


          {/* ====================================================== */}
          {/* WEDDING GIFT */}
          {/* ====================================================== */}

          <section className="bg-white rounded-2xl shadow p-6">

            <h2 className="text-xl font-bold mb-2">
              6. Wedding Gift
            </h2>

            <p className="text-sm text-gray-500 mb-6">
              Tambahkan maksimal 2 rekening atau e-wallet.
            </p>


            {/* REKENING 1 */}

            <div className="border border-gray-200 rounded-xl p-5 mb-5">

              <h3 className="font-semibold text-lg mb-4">
                Rekening / E-Wallet 1
              </h3>

              <div className="grid md:grid-cols-2 gap-4">

                <SelectInput
                  label="Bank / E-Wallet"
                  value={
                    form.WeddingGift
                      ?.rekening?.[0]
                      ?.bank ?? ""
                  }
                  options={paymentOptions}
                  onChange={(v) =>
                    updateRekening(
                      0,
                      "bank",
                      v
                    )
                  }
                />

                <Input
                  label="Atas Nama"
                  value={
                    form.WeddingGift
                      ?.rekening?.[0]
                      ?.atasNama ?? ""
                  }
                  onChange={(v) =>
                    updateRekening(
                      0,
                      "atasNama",
                      v
                    )
                  }
                />

                <Input
                  label="Nomor Rekening / Nomor HP"
                  value={
                    form.WeddingGift
                      ?.rekening?.[0]
                      ?.nomorRekening ?? ""
                  }
                  onChange={(v) =>
                    updateRekening(
                      0,
                      "nomorRekening",
                      v
                    )
                  }
                />

              </div>

            </div>


            {/* REKENING 2 */}

            <div className="border border-gray-200 rounded-xl p-5 mb-6">

              <h3 className="font-semibold text-lg mb-4">
                Rekening / E-Wallet 2
              </h3>

              <div className="grid md:grid-cols-2 gap-4">

                <SelectInput
                  label="Bank / E-Wallet"
                  value={
                    form.WeddingGift
                      ?.rekening?.[1]
                      ?.bank ?? ""
                  }
                  options={paymentOptions}
                  onChange={(v) =>
                    updateRekening(
                      1,
                      "bank",
                      v
                    )
                  }
                />

                <Input
                  label="Atas Nama"
                  value={
                    form.WeddingGift
                      ?.rekening?.[1]
                      ?.atasNama ?? ""
                  }
                  onChange={(v) =>
                    updateRekening(
                      1,
                      "atasNama",
                      v
                    )
                  }
                />

                <Input
                  label="Nomor Rekening / Nomor HP"
                  value={
                    form.WeddingGift
                      ?.rekening?.[1]
                      ?.nomorRekening ?? ""
                  }
                  onChange={(v) =>
                    updateRekening(
                      1,
                      "nomorRekening",
                      v
                    )
                  }
                />

              </div>

            </div>


            {/* ALAMAT */}

            <div className="border-t pt-6">

              <h3 className="font-semibold text-lg mb-4">
                Alamat Wedding Gift
              </h3>

              <div className="grid md:grid-cols-2 gap-4">

                <Input
                  label="Nama Penerima"
                  value={
                    form.WeddingGift
                      ?.alamat
                      ?.penerima ?? ""
                  }
                  onChange={(v) =>
                    updateWeddingGiftAddress(
                      "penerima",
                      v
                    )
                  }
                />

                <Input
                  label="No HP Penerima"
                  value={
                    form.WeddingGift
                      ?.alamat
                      ?.noHp ?? ""
                  }
                  onChange={(v) =>
                    updateWeddingGiftAddress(
                      "noHp",
                      v
                    )
                  }
                />

                <div className="md:col-span-2">

                  <Textarea
                    label="Alamat"
                    value={
                      form.WeddingGift
                        ?.alamat
                        ?.alamat ?? ""
                    }
                    onChange={(v) =>
                      updateWeddingGiftAddress(
                        "alamat",
                        v
                      )
                    }
                  />

                </div>

              </div>

            </div>

          </section>


          {/* ====================================================== */}
          {/* SUBMIT */}
          {/* ====================================================== */}

          <div className="bg-white rounded-2xl shadow p-6 sticky bottom-4">

            <div className="flex flex-col md:flex-row gap-3">

              <button
                type="submit"
                className="flex-1 bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition"
              >
                Buat Data
              </button>

              <button
                type="button"
                onClick={copyTypeScript}
                className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-100 transition"
              >
                Copy TS
              </button>

            </div>

          </div>

        </form>

      </div>

    </main>
  );
};


/* ================================================================ */
/* INPUT */
/* ================================================================ */

interface InputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}

const Input = ({
  label,
  value,
  onChange,
  type = "text",
}: InputProps) => {
  return (
    <div className="flex flex-col gap-1">

      <label className="text-sm font-medium">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-black"
      />

    </div>
  );
};


/* ================================================================ */
/* SELECT */
/* ================================================================ */

interface SelectInputProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

const SelectInput = ({
  label,
  value,
  options,
  onChange,
}: SelectInputProps) => {
  return (
    <div className="flex flex-col gap-1">

      <label className="text-sm font-medium">
        {label}
      </label>

      <select
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white outline-none focus:ring-2 focus:ring-black"
      >

        <option value="">
          Pilih Bank / E-Wallet
        </option>

        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}

      </select>

    </div>
  );
};


/* ================================================================ */
/* TEXTAREA */
/* ================================================================ */

interface TextareaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const Textarea = ({
  label,
  value,
  onChange,
}: TextareaProps) => {
  return (
    <div className="flex flex-col gap-1">

      <label className="text-sm font-medium">
        {label}
      </label>

      <textarea
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        rows={4}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 resize-y outline-none focus:ring-2 focus:ring-black"
      />

    </div>
  );
};


export default InvitationForm;
