import Navbar from "../components/layout/Header";
import BannerProducts from "../components/layout/BannerPitlover";
import ProductsGrid from "../components/features/products/ProductGrid";
import Benefits from "../components/features/products/ProductBenefits";
import Footer from "../components/layout/Footer";

export default function ProductsPage() {
  return (
    <>
      <Navbar />
      <div className="pt-15 px-6">
        <BannerProducts />
      
        <ProductsGrid />
        <Benefits />
      </div>
      <Footer />
    </>
  );
}
