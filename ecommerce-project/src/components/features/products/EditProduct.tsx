import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { updateProduct, removeProduct } from "../../../store/productSlice";
import type { Product } from "../../../Type/ProductView";

const PLACEHOLDER = "/images/placeholder.png";

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

const EditProduct: React.FC = () => {
  const dispatch = useAppDispatch();
  const allProducts = useAppSelector((state) => state.products.items);

  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
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

  const selectedProduct = allProducts.find((p) => p.id === selectedProductId);

  useEffect(() => {
    if (!selectedProduct) {
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
      return;
    }

    setValues({
      name: selectedProduct.name,
      price: selectedProduct.price,
      currency: selectedProduct.currency ?? "GLD",
      description: selectedProduct.description ?? "",
      category: selectedProduct.category ?? "",
      rating: selectedProduct.rating ?? 5,
      tagInput: "",
      colorInput: "",
      materialInput: "",
      featureInput: "",
      specKey: "",
      specValue: "",
    });

    setTags(selectedProduct.tags ?? []);
    setColors(selectedProduct.colors ?? []);
    setMaterials(selectedProduct.materials ?? []);
    setFeatures(selectedProduct.features ?? []);

    const normalizedSpec: Record<string, string> = {};
    const spec = selectedProduct.specification ?? {};
    Object.entries(spec).forEach(([key, value]) => {
      if (value !== undefined) {
        normalizedSpec[key] = value;
      }
    });
    setSpecification(normalizedSpec);

    const existingImages = selectedProduct.images ?? (selectedProduct.image ? [selectedProduct.image] : []);
    setImagePreviews(
      existingImages.map((img, idx) => ({
        name: `existing-${idx}`,
        url: img,
        base64: img,
      }))
    );
  }, [selectedProduct]);

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

  const removeImage = (index: number) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  function submit(e: React.FormEvent) {
    e.preventDefault();

    if (!selectedProduct) {
      alert("Por favor selecciona un producto para editar");
      return;
    }

    if (!values.name || values.price === "" || !values.currency || !values.category) {
      alert("Faltan campos obligatorios: name, price, currency, category.");
      return;
    }

    const images = imagePreviews.length > 0 ? imagePreviews.map((p) => p.base64) : [];
    const mainImage = images[0] ?? PLACEHOLDER;

    const updatedProduct: Product = {
      id: selectedProduct.id,
      name: values.name,
      description: values.description || "Product description",
      price: Number(values.price),
      currency: values.currency,
      rating: Number(values.rating || 0) || 0,
      image: mainImage,
      images: images.length ? images : [PLACEHOLDER],
      category: values.category,
      tags,
      colors,
      materials,
      features,
      specification,
    };

    dispatch(updateProduct(updatedProduct));
    alert("Producto actualizado correctamente");
    setSelectedProductId(null);
  }

  function handleDelete() {
    if (!selectedProduct) return;

    if (window.confirm(`¿Estás seguro de eliminar "${selectedProduct.name}"?`)) {
      dispatch(removeProduct(selectedProduct.id));
      alert("Producto eliminado");
      setSelectedProductId(null);
    }
  }

  return (
    <section className="w-full min-h-screen bg-[url('/images/hextech-bg.jpg')] bg-cover bg-center">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="rounded-2xl bg-white/95 backdrop-blur shadow-xl p-6 sm:p-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0A0F1C] mb-6">
            Edit product
          </h1>

          {/* Selector de Producto */}
          <div className="mb-8 p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
            <label className="block text-lg font-semibold mb-3 text-[#0A0F1C]">
              Select product to edit *
            </label>
            <select
              value={selectedProductId ?? ""}
              onChange={(e) => setSelectedProductId(Number(e.target.value) || null)}
              className="w-full border-2 border-blue-300 rounded-md px-4 py-3 text-base font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">-- Select a product --</option>
              {allProducts.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} - {p.currency} {p.price}
                </option>
              ))}
            </select>
          </div>

          {!selectedProduct ? (
            <div className="text-center py-12 text-gray-500">
              <p className="text-xl">👆 Select a product from the dropdown to start editing</p>
            </div>
          ) : (
            <form onSubmit={submit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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

              <div className="space-y-6">
                <div className="space-y-3">
                  <div
                    className="relative h-[300px] rounded-xl border-2 border-dashed border-gray-300 bg-gray-100/70 flex items-center justify-center cursor-pointer"
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
                        {imagePreviews.map((p, idx) => (
                          <div key={p.url} className="relative">
                            <img src={p.url} className="h-24 object-cover rounded-md" alt="" />
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeImage(idx);
                              }}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

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

              <div className="lg:col-span-2 flex gap-4">
                <button
                  type="button"
                  onClick={handleDelete}
                  className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition"
                >
                  Delete Product
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedProductId(null)}
                  className="flex-1 rounded-lg bg-gray-400 hover:bg-gray-500 text-white font-semibold px-6 py-3"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-lg bg-[#1C6CE5] hover:bg-[#1656b8] text-white font-semibold px-6 py-3"
                >
                  Update Product
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default EditProduct;
