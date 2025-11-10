import React from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import ProductSection from "../components/features/products/ProductSection";
import Navbar from '../components/layout/Header'
import Footer from "../components/layout/Footer";
import ReviewList from "../components/features/reviews/ReviewList";
import Benefits from "../components/features/products/ProductBenefits";

export default function ProductDetailPage() {
  const { id } = useParams();
  const productId = Number(id);

  const product = useAppSelector((state) =>
    state.products.items.find((p) => p.id === productId)
  );

  if (!product) {
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
      <ReviewList />
      <Benefits />
      <Footer />
    </>
  );
}
