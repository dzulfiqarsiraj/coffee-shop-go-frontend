import {Link} from 'react-router-dom'
import covLogo from '../assets/icon/cov-earth.svg';

const BrandLogo = () => {
    return (
        <figure>
            <Link to={'/'} className="flex flex-row gap-2 mb-8 items-center">
                <img className='w-11 hover:scale-110 transition-all duration-300 animate-pulse' src={covLogo} alt="" />
                {/* <figcaption  className="text-yellow-900 text-lg font-sacramento">Coffe Shop</figcaption> */}
            </Link>
        </figure>
    )
}

export default BrandLogo