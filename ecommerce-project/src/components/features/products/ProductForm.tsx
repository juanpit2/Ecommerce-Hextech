import React, { useRef, useState } from "react";
import { supabase } from "../../../utils/supabaseClient";

/** ---------- Utilidades ---------- */
const PLACEHOLDER = "/images/placeholder.png";

// Función para convertir archivo a Base64
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

type FormValues = {
  name: string;
  price: number | "";
  currency: string;
  description: string;
  category: string;
  rating: number | "";
  tagInput: string;
  colorInput: string;
  materialInput: string;
  featureInput: string;
  specKey: string;
  specValue: string;
};

const AddProductForm: React.FC = () => {


  const [values, setValues] = useState<FormValues>({
    name: "",
    price: "",
    currency: "GLD",
    description: "",
    category: "",
    rating: 5,
    tagInput: "",
    colorInput: "",
    materialInput: "",
    featureInput: "",
    specKey: "",
    specValue: "",
  });

  const [tags, setTags] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [materials, setMaterials] = useState<string[]>([]);
  const [features, setFeatures] = useState<string[]>([]);
  const [specification, setSpecification] = useState<Record<string, string>>({});

  const [imagePreviews, setImagePreviews] = useState<{ name: string; url: string; base64: string }[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onChange =
    (key: keyof FormValues) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const v = e.target.value;
      setValues((s) => ({
        ...s,
        [key]:
          key === "price" || key === "rating"
            ? (v === "" ? "" : Number(v))
            : v,
      }));
    };

  /** ---------- Arrays simples (tags, colors, materials, features) ---------- */
  const pushUnique = (arr: string[], v: string) =>
    v.trim() && !arr.includes(v.trim()) ? [...arr, v.trim()] : arr;

  const addTag = () => {
    setTags((a) => pushUnique(a, values.tagInput));
    setValues((s) => ({ ...s, tagInput: "" }));
  };
  const addColor = () => {
    setColors((a) => pushUnique(a, values.colorInput));
    setValues((s) => ({ ...s, colorInput: "" }));
  };
  const addMaterial = () => {
    setMaterials((a) => pushUnique(a, values.materialInput));
    setValues((s) => ({ ...s, materialInput: "" }));
  };
  const addFeature = () => {
    setFeatures((a) => pushUnique(a, values.featureInput));
    setValues((s) => ({ ...s, featureInput: "" }));
  };

  const removeFrom = (arr: string[], setter: (v: string[]) => void, v: string) =>
    setter(arr.filter((x) => x !== v));

  const addSpec = () => {
    const k = values.specKey.trim();
    const v = values.specValue.trim();
    if (!k || !v) return;
    setSpecification((s) => ({ ...s, [k]: v }));
    setValues((st) => ({ ...st, specKey: "", specValue: "" }));
  };
  const removeSpec = (k: string) => {
    setSpecification(({ [k]: _, ...rest }) => rest);
  };

  async function handleFiles(newFiles: FileList | File[]) {
    const accepted = Array.from(newFiles).filter((f) => f.type.startsWith("image/"));
    const newPreviews = await Promise.all(
      accepted.slice(0, 6 - imagePreviews.length).map(async (file) => ({
        name: file.name,
        url: URL.createObjectURL(file),
        base64: await fileToBase64(file),
      }))
    );
    setImagePreviews((prev) => [...prev, ...newPreviews].slice(0, 6));
  }

  /** ---------- submit ---------- */
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (
      !values.name ||
      values.price === "" ||
      !values.currency ||
      !values.category
    ) {
      alert("Faltan campos obligatorios: name, price, currency, category.");
      return;
    }

    // Usar las imágenes en Base64 en lugar de blob URLs
    const images = imagePreviews.length > 0 ? imagePreviews.map((p) => p.base64) : [];
    const mainImage = images[0] ?? PLACEHOLDER;

    // Crea el objeto con la forma de tu Product del slice
    const newProduct = {
      id: Date.now(),
      name: values.name,
      description: values.description || "New product added",
      price: Number(values.price),
      currency: values.currency,
      rating: Number(values.rating || 0) || 0,
      image: mainImage,                          // imagen principal en Base64
      images: images.length ? images : [PLACEHOLDER],  // galería en Base64
      category: values.category,
      tags,
      colors,
      materials,
      features,
      specification,
    };

    // Insertar en Supabase
    const { data, error } = await supabase.from('products').insert([newProduct]);
    if (error) {
      alert("Error al guardar en Supabase: " + error.message);
      return;
    }

    // reset
    setValues({
      name: "",
      price: "",
      currency: "GLD",
      description: "",
      category: "",
      rating: 5,
      tagInput: "",
      colorInput: "",
      materialInput: "",
      featureInput: "",
      specKey: "",
      specValue: "",
    });
    setTags([]);
    setColors([]);
    setMaterials([]);
    setFeatures([]);
    setSpecification({});
    setImagePreviews([]);
    alert("Producto agregado correctamente");
  }

  return (
    <section className="w-full min-h-screen bg-[url('/images/hextech-bg.jpg')] bg-cover bg-center">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="rounded-2xl bg-white/95 backdrop-blur shadow-xl p-6 sm:p-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0A0F1C] mb-6">
            Add product
          </h1>

          <form onSubmit={submit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* --------- Columna izquierda: campos básicos --------- */}
            <div className="space-y-5">
              <label className="block">
                <span className="text-sm font-semibold">Name *</span>
                <input
                  type="text"
                  placeholder="Product name"
                  value={values.name}
                  onChange={onChange("name")}
                  className="w-full border rounded-md px-4 py-2.5"
                />
              </label>

              <div className="grid grid-cols-2 gap-3">
                <label className="block">
                  <span className="text-sm font-semibold">Price *</span>
                  <input
                    type="number"
                    min={0}
                    placeholder="Price"
                    value={values.price}
                    onChange={onChange("price")}
                    className="w-full border rounded-md px-4 py-2.5"
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-semibold">Currency *</span>
                  <input
                    type="text"
                    placeholder="GLD"
                    value={values.currency}
                    onChange={onChange("currency")}
                    className="w-full border rounded-md px-4 py-2.5"
                  />
                </label>
              </div>

              <label className="block">
                <span className="text-sm font-semibold">Category *</span>
                <input
                  type="text"
                  placeholder="Hextech Gear"
                  value={values.category}
                  onChange={onChange("category")}
                  className="w-full border rounded-md px-4 py-2.5"
                />
              </label>

              <label className="block">
                <span className="text-sm font-semibold">Description</span>
                <textarea
                  placeholder="Short description"
                  value={values.description}
                  onChange={onChange("description")}
                  rows={4}
                  className="w-full border rounded-md px-4 py-2.5"
                />
              </label>

              <label className="block">
                <span className="text-sm font-semibold">Rating</span>
                <input
                  type="number"
                  min={0}
                  max={5}
                  step={0.1}
                  value={values.rating}
                  onChange={onChange("rating")}
                  className="w-full border rounded-md px-4 py-2.5"
                />
              </label>

              {/* Tags */}
              <div>
                <span className="text-sm font-semibold">Tags</span>
                <div className="flex gap-2 mt-1">
                  <input
                    type="text"
                    value={values.tagInput}
                    onChange={onChange("tagInput")}
                    className="flex-1 border rounded-md px-3 py-2"
                    placeholder="hextech, gauntlet, power…"
                  />
                  <button type="button" onClick={addTag} className="px-3 py-2 rounded-md bg-[#1C6CE5] text-white">
                    Add
                  </button>
                </div>
                {!!tags.length && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {tags.map((t) => (
                      <span
                        key={t}
                        className="text-xs bg-gray-200 rounded-full px-2 py-1 cursor-pointer"
                        onClick={() => removeFrom(tags, setTags, t)}
                        title="Remove"
                      >
                        {t} ✕
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Colors */}
              <div>
                <span className="text-sm font-semibold">Colors (hex)</span>
                <div className="flex gap-2 mt-1">
                  <input
                    type="text"
                    value={values.colorInput}
                    onChange={onChange("colorInput")}
                    className="flex-1 border rounded-md px-3 py-2"
                    placeholder="#F7C84B"
                  />
                  <button type="button" onClick={addColor} className="px-3 py-2 rounded-md bg-[#1C6CE5] text-white">
                    Add
                  </button>
                </div>
                {!!colors.length && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {colors.map((c) => (
                      <span
                        key={c}
                        className="text-xs bg-gray-200 rounded-full px-2 py-1 cursor-pointer"
                        onClick={() => removeFrom(colors, setColors, c)}
                        title="Remove"
                      >
                        {c} ✕
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* --------- Columna derecha: imágenes + listas avanzadas --------- */}
            <div className="space-y-6">
              {/* Uploader */}
              <div
                className="relative h-[300px] rounded-xl border-2 border-dashed border-gray-300 bg-gray-100/70 flex items-center justify-center"
                onClick={() => inputRef.current?.click()}
              >
                <input
                  ref={inputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => e.target.files && handleFiles(e.target.files)}
                />
                {imagePreviews.length === 0 ? (
                  <p className="text-[#1C6CE5] font-semibold underline cursor-pointer">Add images (max 6)</p>
                ) : (
                  <div className="grid grid-cols-3 gap-3 w-full p-3">
                    {imagePreviews.map((p) => (
                      <img key={p.url} src={p.url} className="h-24 object-cover rounded-md" />
                    ))}
                  </div>
                )}
              </div>

              {/* Materials */}
              <div>
                <span className="text-sm font-semibold">Materials</span>
                <div className="flex gap-2 mt-1">
                  <input
                    type="text"
                    value={values.materialInput}
                    onChange={onChange("materialInput")}
                    className="flex-1 border rounded-md px-3 py-2"
                    placeholder="Alloyed hexsteel shell…"
                  />
                  <button type="button" onClick={addMaterial} className="px-3 py-2 rounded-md bg-[#1C6CE5] text-white">
                    Add
                  </button>
                </div>
                {!!materials.length && (
                  <ul className="list-disc ml-5 mt-2 space-y-1">
                    {materials.map((m) => (
                      <li key={m} className="cursor-pointer" onClick={() => removeFrom(materials, setMaterials, m)}>
                        {m}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Features */}
              <div>
                <span className="text-sm font-semibold">Product features</span>
                <div className="flex gap-2 mt-1">
                  <input
                    type="text"
                    value={values.featureInput}
                    onChange={onChange("featureInput")}
                    className="flex-1 border rounded-md px-3 py-2"
                    placeholder="Sonic pulse generator…"
                  />
                  <button type="button" onClick={addFeature} className="px-3 py-2 rounded-md bg-[#1C6CE5] text-white">
                    Add
                  </button>
                </div>
                {!!features.length && (
                  <ul className="list-disc ml-5 mt-2 space-y-1">
                    {features.map((f) => (
                      <li key={f} className="cursor-pointer" onClick={() => removeFrom(features, setFeatures, f)}>
                        {f}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Specification (key/value) */}
              <div>
                <span className="text-sm font-semibold">Specification (key/value)</span>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <input
                    type="text"
                    value={values.specKey}
                    onChange={onChange("specKey")}
                    placeholder="Weight"
                    className="border rounded-md px-3 py-2"
                  />
                  <input
                    type="text"
                    value={values.specValue}
                    onChange={onChange("specValue")}
                    placeholder="18 kg"
                    className="border rounded-md px-3 py-2"
                  />
                </div>
                <button
                  type="button"
                  onClick={addSpec}
                  className="mt-2 px-3 py-2 rounded-md bg-[#1C6CE5] text-white"
                >
                  Add spec
                </button>

                {Object.keys(specification).length > 0 && (
                  <div className="mt-3 border rounded-md p-3 bg-gray-50">
                    {Object.entries(specification).map(([k, v]) => (
                      <div
                        key={k}
                        className="flex items-center justify-between border-b last:border-b-0 py-1 cursor-pointer"
                        onClick={() => removeSpec(k)}
                        title="Remove"
                      >
                        <span className="font-medium">{k}</span>
                        <span className="text-gray-700">{v}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-2">
              <button
                type="submit"
                className="w-full rounded-lg bg-[#1C6CE5] hover:bg-[#1656b8] text-white font-semibold px-6 py-3"
              >
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddProductForm;
