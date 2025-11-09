// src/pages/ProductsPage.tsx
import { useParams } from "react-router-dom";
import Navbar from '../components/layout/Header';
import ProductDetail from '../components/features/products/ProductSection';
import Benefits from "../components/features/products/ProductBenefits";
import Footer from "../components/layout/Footer";
import ReviewList from '../components/features/reviews/ReviewList';
import productsView from "../components/data/productView.json";
import type { Product } from '../Type/ProductView';

export default function ProductsPage() {
  const { id } = useParams();
  const allProducts = productsView as Product[];
  const item = allProducts.find(p => p.id === Number(id));

  if (!item) {
    return (
      <>
        <Navbar />
        <div className="max-w-7xl mx-auto px-6 py-16 text-white">
          Product not found.
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <ProductDetail product={item} />
      <ReviewList />
      <Benefits />
      <Footer />
    </>
  );
}
