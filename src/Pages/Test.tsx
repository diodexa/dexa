import { useState } from "react";

type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonObject
  | JsonValue[];

interface JsonObject {
  [key: string]: JsonValue;
}

interface Page {
  key: string;
  title: string;
  value: JsonValue;
}

const Test = () => {
  const [jsonText, setJsonText] = useState("");
  const [data, setData] = useState<JsonValue | null>(null);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  const formatLabel = (key: string) => {
    return key
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/[_-]/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const formatValue = (value: JsonValue): string => {
    if (value === null) return "-";

    if (typeof value === "boolean") {
      return value ? "Ya" : "Tidak";
    }

    if (typeof value === "number") {
      return value.toLocaleString("id-ID");
    }

    if (typeof value === "string") {
      if (/^\d{4}-\d{2}-\d{2}/.test(value)) {
        const date = new Date(value);

        if (!isNaN(date.getTime())) {
          return date.toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          });
        }
      }

      return value;
    }

    return String(value);
  };

  const processJSON = () => {
    try {
      const parsed = JSON.parse(jsonText);
      setData(parsed);
      setCurrentPage(0);
      setError("");
    } catch {
      setData(null);
      setError("JSON tidak valid. Silakan periksa kembali data yang ditempel.");
    }
  };

  const renderPrimitive = (value: JsonValue) => {
    const formatted = formatValue(value);

    if (typeof value === "boolean") {
      return (
        <span
          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
            value
              ? "bg-emerald-50 text-emerald-600"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          {value ? "Aktif" : "Tidak Aktif"}
        </span>
      );
    }

    if (formatted === "-") {
      return <span className="text-gray-300">-</span>;
    }

    if (typeof value === "string" && /^https?:\/\//i.test(value)) {
      return (
        <a
          href={value}
          target="_blank"
          rel="noreferrer"
          className="break-all text-blue-600 hover:underline"
        >
          {value}
        </a>
      );
    }

    return (
      <span className="break-words whitespace-normal text-sm font-medium leading-6 text-gray-800">
        {formatted}
      </span>
    );
  };

  const renderSimpleFields = (object: JsonObject) => {
    const fields = Object.entries(object).filter(
      ([, value]) => typeof value !== "object" || value === null
    );

    if (!fields.length) return null;

    return (
      <div className="grid gap-px overflow-hidden rounded-xl border border-gray-200 bg-gray-200 sm:grid-cols-2">
        {fields.map(([key, value]) => (
          <div key={key} className="min-w-0 bg-white px-4 py-3">
            <p className="mb-1 text-[11px] font-medium uppercase tracking-wide text-gray-400">
              {formatLabel(key)}
            </p>

            <div className="min-w-0">
              {renderPrimitive(value)}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderArray = (array: JsonValue[]) => {
    if (!array.length) {
      return (
        <div className="rounded-xl border border-dashed border-gray-200 p-5 text-center text-sm text-gray-400">
          Tidak ada data
        </div>
      );
    }

    const objectItems = array.filter(
      (item): item is JsonObject =>
        typeof item === "object" &&
        item !== null &&
        !Array.isArray(item)
    );

    if (objectItems.length) {
      return (
        <div className="space-y-2">
          {objectItems.map((item, index) => (
            <div
              key={index}
              className="rounded-xl border border-gray-200 bg-white p-4"
            >
              <div className="mb-3 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-[10px] font-semibold text-gray-500">
                  {index + 1}
                </span>

                <span className="text-xs font-medium text-gray-400">
                  Data {index + 1}
                </span>
              </div>

              {renderObject(item)}
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="space-y-2">
        {array.map((item, index) => (
          <div
            key={index}
            className="flex items-start gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3"
          >
            <span className="mt-0.5 text-xs text-gray-300">
              {index + 1}.
            </span>

            <div className="min-w-0 flex-1">
              {typeof item === "object" && item !== null
                ? renderObject(item as JsonObject)
                : renderPrimitive(item)}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderObject = (object: JsonObject) => {
    const simpleFields = renderSimpleFields(object);

    const complexFields = Object.entries(object).filter(
      ([, value]) => typeof value === "object" && value !== null
    );

    return (
      <div className="space-y-3">
        {simpleFields}

        {complexFields.map(([key, value]) => (
          <div
            key={key}
            className="overflow-hidden rounded-xl border border-gray-200 bg-white"
          >
            <div className="border-b border-gray-100 px-4 py-3">
              <h3 className="text-sm font-semibold text-gray-900">
                {formatLabel(key)}
              </h3>
            </div>

            <div className="p-3">
              {Array.isArray(value)
                ? renderArray(value)
                : renderObject(value as JsonObject)}
            </div>
          </div>
        ))}
      </div>
    );
  };

  /*
   * Setiap property object utama menjadi halaman sendiri.
   *
   * Contoh:
   *
   * {
   *   cooperative: {...},
   *   regional_facilitator_period: {...},
   *   assistance_period: {...},
   *   regional_facilitator_program: {...}
   * }
   *
   * menjadi:
   *
   * 1. Cooperative
   * 2. Regional Facilitator Period
   * 3. Assistance Period
   * 4. Regional Facilitator Program
   */
  const getPages = (): Page[] => {
    if (!data || typeof data !== "object" || Array.isArray(data)) {
      return [];
    }

    const object = data as JsonObject;

    return Object.entries(object).map(([key, value]) => ({
      key,
      title: formatLabel(key),
      value,
    }));
  };

  const pages = getPages();
  const totalPages = pages.length;
  const currentData = pages[currentPage];

  const goToPage = (page: number) => {
    if (page < 0 || page >= totalPages) return;

    setCurrentPage(page);

    window.scrollTo({
      top: document.getElementById("result")?.offsetTop
        ? document.getElementById("result")!.offsetTop - 20
        : 0,
      behavior: "smooth",
    });
  };

  const renderPageContent = (value: JsonValue) => {
    if (Array.isArray(value)) {
      return renderArray(value);
    }

    if (typeof value === "object" && value !== null) {
      return renderObject(value);
    }

    return (
      <div className="rounded-xl border border-gray-200 bg-white p-4">
        {renderPrimitive(value)}
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-[#f5f6f8] p-4 md:p-8">
      <div className="mx-auto max-w-4xl">
        {/* INPUT */}
        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="mb-4">
            <h1 className="text-xl font-semibold text-gray-900">
              Data Viewer
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Tempel JSON untuk melihat informasi dengan tampilan yang lebih
              mudah dibaca.
            </p>
          </div>

          <textarea
            value={jsonText}
            onChange={(e) => setJsonText(e.target.value)}
            placeholder="Tempel JSON di sini..."
            spellCheck={false}
            className="h-56 w-full resize-y rounded-xl border border-gray-200 bg-gray-50 p-4 font-mono text-xs leading-5 text-gray-700 outline-none transition focus:border-gray-400 focus:bg-white"
          />

          <div className="mt-3 flex items-center justify-between gap-4">
            {error ? (
              <p className="text-xs text-red-500">{error}</p>
            ) : (
              <span className="text-xs text-gray-400">
                Data diproses langsung di browser.
              </span>
            )}

            <button
              type="button"
              onClick={processJSON}
              className="shrink-0 rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-700"
            >
              Tampilkan Data
            </button>
          </div>
        </section>

        {/* RESULT */}
        {data !== null && (
          <section id="result" className="mt-8">
            {/* HEADER */}
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Informasi Data
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Bagian {totalPages > 0 ? currentPage + 1 : 0} dari{" "}
                {totalPages}
              </p>
            </div>

            {totalPages > 0 && currentData && (
              <>
                {/* PAGINATION ATAS */}
                <div className="mb-4 flex items-center justify-between rounded-xl border border-gray-200 bg-white p-3">
                  <button
                    type="button"
                    disabled={currentPage === 0}
                    onClick={() => goToPage(currentPage - 1)}
                    className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    ← Sebelumnya
                  </button>

                  <div className="flex max-w-[60%] items-center gap-1 overflow-x-auto px-2">
                    {pages.map((page, index) => (
                      <button
                        key={page.key}
                        type="button"
                        title={page.title}
                        onClick={() => goToPage(index)}
                        className={`shrink-0 rounded-lg px-3 py-2 text-xs font-medium transition ${
                          currentPage === index
                            ? "bg-gray-900 text-white"
                            : "text-gray-500 hover:bg-gray-100"
                        }`}
                      >
                        {index + 1}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    disabled={currentPage === totalPages - 1}
                    onClick={() => goToPage(currentPage + 1)}
                    className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    Berikutnya →
                  </button>
                </div>

                {/* TITLE */}
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-900 text-sm font-semibold text-white">
                    {currentPage + 1}
                  </div>

                  <div className="min-w-0">
                    <h3 className="break-words text-lg font-semibold text-gray-900">
                      {currentData.title}
                    </h3>

                    <p className="text-xs text-gray-400">
                      Informasi bagian {currentPage + 1}
                    </p>
                  </div>
                </div>

                {/* CONTENT */}
                {renderPageContent(currentData.value)}

                {/* PAGINATION BAWAH */}
                <div className="mt-5 flex items-center justify-between rounded-xl border border-gray-200 bg-white p-3">
                  <button
                    type="button"
                    disabled={currentPage === 0}
                    onClick={() => goToPage(currentPage - 1)}
                    className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    ← Sebelumnya
                  </button>

                  <span className="text-xs text-gray-400">
                    {currentPage + 1} / {totalPages}
                  </span>

                  <button
                    type="button"
                    disabled={currentPage === totalPages - 1}
                    onClick={() => goToPage(currentPage + 1)}
                    className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    Berikutnya →
                  </button>
                </div>
              </>
            )}
          </section>
        )}
      </div>
    </main>
  );
};

export default Test;