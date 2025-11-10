// src/pages/EditProduct.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import productsData from "../../data/products.json";

type Product = {
  id: number;
  name: string;
  price: number;
  currency: string;
  rating?: number;
  image: string;
  description: string;
  category?: string;
};

type Props = {
  // Si usas Redux o API, puedes ignorar esto y manejar el guardado afuera:
  onSave?(updated: Product): void;
};

const EditProduct: React.FC<Props> = ({ onSave }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement | null>(null);

  // Busca el producto por id desde el JSON (mock)
  const original = useMemo(() => {
    const pid = Number(id);
    return (productsData as Product[]).find((p) => p.id === pid);
  }, [id]);

  // Estado del formulario
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState<string>("");     // ruta final a guardar
  const [preview, setPreview] = useState<string>(""); // preview en pantalla
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!original) return;
    setName(original.name);
    setPrice(original.price);
    setCategory(original.category ?? "");
    setImage(original.image);
    setPreview(original.image);
  }, [original]);

  if (!original) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#071126] text-white">
        <div className="bg-black/30 px-6 py-4 rounded-xl">Producto no encontrado.</div>
      </div>
    );
  }

  const pickFile = () => fileRef.current?.click();

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const url = URL.createObjectURL(f);
    setPreview(url);
    // En un flujo real subirías la imagen y guardarías su URL.
    // Por ahora, guardamos el nombre local para simular:
    setImage(preview || original.image);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) return;

    setSaving(true);

    const updated: Product = {
      ...original,
      name,
      price: typeof price === "string" ? parseFloat(price || "0") : price,
      category,
      image: preview || image || original.image,
    };

    // 👉 Si usas Redux, despacha aquí (p.ej. dispatch(updateProduct(updated)))
    onSave?.(updated);

    // Mock: persistir en localStorage para probar rápidamente
    try {
      const current: Product[] = JSON.parse(
        localStorage.getItem("products_mock") || "[]"
      );
      // si no había, tomar del json base
      const base = current.length ? current : (productsData as Product[]);
      const next = base.map((p) => (p.id === updated.id ? updated : p));
      localStorage.setItem("products_mock", JSON.stringify(next));
    } catch {
      // ignora
    }

    setSaving(false);
    navigate(-1);
  };

  return (
    <section className="min-h-screen w-full bg-[#071126] text-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-10 py-10">
        {/* Header */}
        <h1 className="text-5xl font-extrabold leading-tight">
          <span className="block">EDIT</span>
          <span className="block">PRODUCT</span>
        </h1>

        <form
          onSubmit={submit}
          className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start"
        >
          {/* Columna izquierda: formulario */}
          <div className="bg-white/5 rounded-2xl p-6 space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm text-gray-300 mb-2">Title</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Title"
                className="w-full rounded-lg bg-white text-gray-900 px-4 py-2 outline-none"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm text-gray-300 mb-2">Price</label>
              <input
                value={price}
                onChange={(e) => {
                  const v = e.target.value.replace(/[^\d.]/g, "");
                  setPrice(v === "" ? "" : Number(v));
                }}
                placeholder="Price"
                inputMode="decimal"
                className="w-full rounded-lg bg-white text-gray-900 px-4 py-2 outline-none"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm text-gray-300 mb-2">Category</label>
              <input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Category"
                className="w-full rounded-lg bg-white text-gray-900 px-4 py-2 outline-none"
              />
            </div>

            {/* Botón */}
            <button
              type="submit"
              disabled={saving}
              className="w-full bg-[#F7C84B] text-[#111] font-semibold py-3 rounded-xl hover:brightness-95 disabled:opacity-60"
            >
              {saving ? "Saving..." : "Next"}
            </button>
          </div>

          {/* Columna derecha: imagen */}
          <div className="bg-white/5 rounded-2xl p-4 flex flex-col items-center justify-center">
            <div className="w-full aspect-[3/4] max-h-[520px] bg-black/20 rounded-xl overflow-hidden flex items-center justify-center">
              {preview ? (
                <img
                  src={preview}
                  alt={original.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-400">No image</span>
              )}
            </div>

            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onFile}
            />
            <button
              type="button"
              onClick={pickFile}
              className="mt-4 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15"
            >
              Replace image
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditProduct;
