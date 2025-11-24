
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";
import { firstImage } from "../../../utils/images";
import { supabase } from "../../../utils/supabaseClient";


const ProductGrid: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      const { data, error } = await supabase.from('products').select('*');
      if (error) {
        setError(error.message);
        setProducts([]);
      } else {
        // Normalizar arrays y objetos si vienen como string
        const safeParse = (v: any) => {
          if (Array.isArray(v)) return v;
          if (typeof v === 'string') {
            try {
              const parsed = JSON.parse(v);
              return Array.isArray(parsed) ? parsed : v;
            } catch { return v; }
          }
          return v;
        };
        const safeObj = (v: any) => {
          if (typeof v === 'object' && v !== null) return v;
          if (typeof v === 'string') {
            try { return JSON.parse(v); } catch { return {}; }
          }
          return {};
        };
        const normalized = (data || []).map((p) => ({
          ...p,
          images: safeParse(p.images),
          tags: safeParse(p.tags),
          colors: safeParse(p.colors),
          materials: safeParse(p.materials),
          features: safeParse(p.features),
          specification: safeObj(p.specification),
        }));
        setProducts(normalized);
        setError(null);
        // Debug visual
        console.log('Productos desde Supabase:', normalized);
      }
      setLoading(false);
    }
    fetchProducts();
  }, []);

  const openProduct = (id: number) => {
    navigate(`/product/${id}`, { state: { id } });
  };

  return (
    <div className="min-h-screen bg-white px-8 max-sm:px-3">
      <h1 className="text-[32px] font-semibold text-[#0A0F1C] mt-14 mb-6 px-20 max-sm:text-xl max-sm:mt-8 max-sm:mb-4 max-sm:px-2">
        Products
      </h1>
      {loading ? (
        <div className="text-center py-10">Cargando productos...</div>
      ) : error ? (
        <div className="text-center text-red-600 py-10">Error: {error}</div>
      ) : products.length === 0 ? (
        <div className="text-center py-10 text-gray-500">No hay productos para mostrar.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-50 py-30 max-w-6xl mx-auto max-sm:grid-cols-2 max-sm:gap-x-2 max-sm:gap-y-24 max-sm:py-12">
          {products.map((p) => (
            <div
              key={p.id}
              className="cursor-pointer max-sm:flex max-sm:justify-center"
              onClick={() => openProduct(p.id)}
            >
              <ProductCard
                name={p.name}
                price={p.price}
                currency={p.currency ?? "GLD"}
                rating={p.rating ?? 5}
                image={firstImage(p)}        
                description={p.description ?? ""}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
