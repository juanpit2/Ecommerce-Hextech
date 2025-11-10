import CartSection from "../components/features/products/ProducCardCart";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Header";

export default function CartPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#071126]">
      <Navbar />

      <div className="flex-grow">
        <CartSection />
      </div>

      <Footer />
    </div>
  );
}
