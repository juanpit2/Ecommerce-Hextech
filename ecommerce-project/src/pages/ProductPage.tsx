import ProductForm from '../components/features/products/ProductForm.tsx'
import Navbar from '../components/layout/Header'
import Footer from "../components/layout/Footer";

export default function ProductPage() {
    return(
        <>
        <Navbar />
        <ProductForm />
        <Footer />
        </>
    )
}
