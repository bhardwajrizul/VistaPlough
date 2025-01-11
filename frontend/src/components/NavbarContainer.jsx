import NavbarPhone from './NavbarPhone';
import Navbar from './Navbar';
import { useMediaQuery } from 'react-responsive';


export default function NavbarContainer() {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    return (
        <>
            {isMobile ? <NavbarPhone /> : <Navbar />}
        </>
    );
}
