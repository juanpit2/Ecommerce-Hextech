import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import ProductSection from "../components/features/products/ProductSection";
import Navbar from '../components/layout/Header'
import Footer from "../components/layout/Footer";
// review list removed from product detail — product-specific reviews are shown inside ProductSection
import Benefits from "../components/features/products/ProductBenefits";

export default function ProductDetailPage() {
  const { id } = useParams();

  const productId = Number(id);
  const [product, setProduct] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      const { data, error } = await supabase.from('products').select('*').eq('id', productId).single();
      if (error) {
        setError(error.message);
        setProduct(null);
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
        setProduct({
          ...data,
          images: safeParse(data?.images),
          tags: safeParse(data?.tags),
          colors: safeParse(data?.colors),
          materials: safeParse(data?.materials),
          features: safeParse(data?.features),
          specification: safeObj(data?.specification),
        });
        setError(null);
      }
      setLoading(false);
    }
    if (productId) fetchProduct();
  }, [productId]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-[#071126] text-white">Cargando producto...</div>;
  }
  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#071126]">
        <h1 className="text-3xl text-white font-bold">
          Product not found.
        </h1>
      </div>
    );
  }

  return (
    <>
      <Navbar />
  <ProductSection product={product as any} />
      <Benefits />
      <Footer />
    </>
  );
}
