import ProductEdit from '../components/features/products/EditProduct.tsx'
import Navbar from '../components/layout/Header'
import Footer from "../components/layout/Footer";

export default function ProductEditPage() {
    return(
        <>
        <Navbar />
        <ProductEdit />
        <Footer />
        </>
    )
}
