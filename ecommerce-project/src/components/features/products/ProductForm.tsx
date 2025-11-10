import React, { useMemo, useRef, useState } from "react";

type FormValues = {
  title: string;
  price: number | "";
  category: string;
};

type Props = {
  initialValues?: Partial<FormValues>;
  onNext?: (data: { values: FormValues; files: File[] }) => void;
};

const AddProductForm: React.FC<Props> = ({ initialValues, onNext }) => {
  const [values, setValues] = useState<FormValues>({
    title: initialValues?.title ?? "",
    price: initialValues?.price ?? "",
    category: initialValues?.category ?? "",
  });

  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const previews = useMemo(
    () => files.map((f) => ({ name: f.name, url: URL.createObjectURL(f) })),
    [files]
  );

  const onChange =
    (key: keyof FormValues) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = e.target.value;
      setValues((s) => ({
        ...s,
        [key]: key === "price" ? (v === "" ? "" : Number(v)) : v,
      }));
    };

  function handleFiles(newFiles: FileList | File[]) {
    const accepted = Array.from(newFiles).filter((f) => f.type.startsWith("image/"));
    setFiles((prev) => {
      const bySig = new Set(prev.map((p) => `${p.name}_${p.size}`));
      const uniq = accepted.filter((f) => !bySig.has(`${f.name}_${f.size}`));
      return [...prev, ...uniq].slice(0, 6);
    });
  }

  function onDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files?.length) handleFiles(e.dataTransfer.files);
  }

  function onBrowse() {
    inputRef.current?.click();
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!values.title || values.price === "" || !values.category) return;
    onNext?.({ values: values as FormValues, files });
  }

  return (
    <section className="w-full min-h-screen bg-[url('/images/hextech-bg.jpg')] bg-cover bg-center">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="rounded-2xl bg-white/95 backdrop-blur shadow-xl p-6 sm:p-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-wide text-[#0A0F1C] mb-6">
            PRODUCT
          </h1>

          <form onSubmit={submit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-[#0A0F1C] mb-1">
                  Title
                </label>
                <input
                  type="text"
                  placeholder="Title"
                  value={values.title}
                  onChange={onChange("title")}
                  className="w-full rounded-md border border-gray-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#1C6CE5]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#0A0F1C] mb-1">
                  Price
                </label>
                <input
                  type="number"
                  min={0}
                  placeholder="Price"
                  value={values.price}
                  onChange={onChange("price")}
                  className="w-full rounded-md border border-gray-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#1C6CE5] [-moz-appearance:textfield]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#0A0F1C] mb-1">
                  Category
                </label>
                <input
                  type="text"
                  placeholder="Category"
                  value={values.category}
                  onChange={onChange("category")}
                  className="w-full rounded-md border border-gray-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#1C6CE5]"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-lg bg-[#1C6CE5] hover:bg-[#1656b8] text-white font-semibold px-6 py-3 transition"
                disabled={!values.title || values.price === "" || !values.category}
              >
                Next
              </button>
            </div>

            <div>
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={onDrop}
                className={[
                  "relative h-[300px] sm:h-[360px] rounded-xl border-2 border-dashed",
                  isDragging ? "border-[#1C6CE5] bg-blue-50/40" : "border-gray-300 bg-gray-100/70",
                  "flex items-center justify-center text-center px-4",
                ].join(" ")}
              >
                <input
                  ref={inputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => e.target.files && handleFiles(e.target.files)}
                />

                {previews.length === 0 ? (
                  <div>
                    <div className="mx-auto mb-3 w-14 h-14 rounded-full bg-white/70 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-8 h-8 text-gray-700"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 16.5V7.5A2.5 2.5 0 0 1 5.5 5h13A2.5 2.5 0 0 1 21 7.5v9A2.5 2.5 0 0 1 18.5 19h-13A2.5 2.5 0 0 1 3 16.5Z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m3 14 4.5-4.5a2 2 0 0 1 2.828 0L15 14m-2-2 1-1a2 2 0 0 1 2.828 0L21 13"
                        />
                        <circle cx="8" cy="8.5" r="1" />
                      </svg>
                    </div>
                    <p className="text-lg font-semibold text-[#0A0F1C]">Add photos</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Drag & drop or{" "}
                      <button
                        type="button"
                        onClick={onBrowse}
                        className="text-[#1C6CE5] font-semibold underline underline-offset-2"
                      >
                        browse files
                      </button>
                    </p>
                    <p className="text-xs text-gray-500 mt-2">PNG, JPG up to 6 images</p>
                  </div>
                ) : (
                  <div className="w-full h-full p-3 overflow-y-auto">
                    <div className="grid grid-cols-3 gap-3">
                      {previews.map((p) => (
                        <div
                          key={p.url}
                          className="relative w-full h-24 rounded-md overflow-hidden bg-white"
                          title={p.name}
                        >
                          <img src={p.url} className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>

                    <div className="mt-4">
                      <button
                        type="button"
                        onClick={onBrowse}
                        className="px-3 py-2 rounded-md bg-white text-[#0A0F1C] border border-gray-300 hover:bg-gray-50"
                      >
                        Add more
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddProductForm;
