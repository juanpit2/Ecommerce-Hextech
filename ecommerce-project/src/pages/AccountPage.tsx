import Account from '../components/features/user/UserProfile'
import Navbar from '../components/layout/Header'
import Footer from "../components/layout/Footer";
import CartSection from '../components/features/products/ProducCardCart';

export default function AccountPage() {
    return(
        <>
        <Navbar />
        <div className="flex-grow">
            <Account />
        </div>
        <Footer />
        </>
    )
}