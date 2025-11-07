import Navbar from '../components/layout/Header'
import ProductDetail from '../components/features/products/ProductSection'
import Benefits from "../components/features/products/ProductBenefits";
import Footer from "../components/layout/Footer";
import ReviewList from '../components/features/reviews/ReviewList'
export default function ProductsPage() {
  return (
    <>
      <Navbar />
      <ProductDetail />
      <ReviewList />
        
        <Benefits />
      
      <Footer />
    </>
  );
}