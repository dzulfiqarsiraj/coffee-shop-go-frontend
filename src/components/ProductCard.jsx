import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import Button from './Button'
import CoffeeBeanImage from '../assets/coffeebean.jpg'

// eslint-disable-next-line react/prop-types
const ProductCard = ({id, image, name, description, basePrice, tag, discount}) => {

    return (
        <div className='flex flex-col items-center flex-1 relative'>
            {tag == 'Flash Sale' && <span className="bg-red-500 text-white text-[0.5rem] md:text-sm font-semibold rounded-full p-2 top-3 left-3 absolute">FLASH SALE!</span>  }
            {tag == 'End Year Sale' && <span className="bg-orange-500 text-white text-[0.5rem] md:text-sm font-semibold rounded-full p-2 top-3 left-3 absolute">END YEAR SALE!</span>  }
            {tag == 'Ramadhan Sale' && <span className="bg-green-700 text-white text-[0.5rem] md:text-sm font-semibold rounded-full p-2 top-3 left-3 absolute">RAMADHAN SALE!</span>  }
            <div className="max-w-md w-full aspect-square">
                <div className="hidden">{id}</div>
                <div >{(image !== null && image !== '') ? <img className="w-full" src={`${image}`} alt="" /> : <img className="w-full" src={CoffeeBeanImage} alt="" />}</div>
            </div>
            <div className='bg-white shadow-md rounded-b p-3 mx-3 -mt-10 flex flex-col gap-4 flex-1 md:max-w-xs md:w-full'>
                <div className='text-base md:text-2xl font-bold'>{name}</div>
                <div className='flex flex-1 text-[0.50rem] md:text-base text-gray-500 tracking-wide'>{description}</div>
                <div className="flex flex-col md:flex-row md:gap-2 md:items-center">
                    {tag ? <span className='text-[0.6rem] md:text-xs font-bold text-red-500'><del>Rp {Number(basePrice).toLocaleString('id')},-</del></span> : <span className='hidden'><del>Rp {Number(basePrice).toLocaleString('id')},-</del></span>}
                    
                    <span className='text-sm md:text-xl font-bold text-[#1A4D2E]'>Rp {(Number(basePrice) - (Number(basePrice)*Number(discount))).toLocaleString('id')},-</span>
                </div>
                <div className='flex flex-row gap-2'>
                    <Link to={`/products/${id}`} className="flex-1"><Button className='bg-[#1A4D2E] w-full py-1 md:py-2 text-[0.60rem] md:text-sm text-white'>Buy</Button></Link>
                    <Button className='border border-[#1A4D2E] px-3 md:px-5 text-xs md:text-base'>
                        <FiShoppingCart className="text-[#1A4D2E]"/>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard