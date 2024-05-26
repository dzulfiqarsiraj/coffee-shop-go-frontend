import CoffeeShopLogo from '../assets/icon/coffee-shop-icon.svg';
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="flex flex-col md:flex-row bg-slate-100 py-16 md:py-20 px-10 md:px-40 gap-10 md:gap-32 w-screen">
        <div className="flex flex-col flex-1 gap-8 self-end">
            <figure className="flex flex-row gap-2 mb-4">
                <img src={CoffeeShopLogo} alt="" />
                <figcaption className="font-sacramento text-yellow-900 text-lg">Coffee Shop</figcaption>
            </figure>
            <p className="text-gray-600">Coffee Shop is a store that sells some good meals, and especially coffee. We provide high quality beans</p>
            <span className="text-xs text-gray-400">@2020CoffeeStore</span>
        </div>
        <ul className="flex flex-col gap-4 w-fit">
            <li className="font-semibold text-gray-900">Product</li>
            <li><a className="text-gray-600 text-sm hover:text-orange-500" href="product.html">Our Product</a></li>
            <li><a className="text-gray-600 text-sm hover:text-orange-500" href="">Pricing</a></li>
            <li><a className="text-gray-600 text-sm hover:text-orange-500" href="">Locations</a></li>
            <li><a className="text-gray-600 text-sm hover:text-orange-500" href="">Countries</a></li>
            <li><a className="text-gray-600 text-sm hover:text-orange-500" href="">Blog</a></li>
        </ul>
        <ul className="flex flex-col w-fit gap-4">
            <li className="font-semibold text-gray-900">Engage</li>
            <li><a className="text-gray-600 text-sm hover:text-orange-500" href="">Partner</a></li>
            <li><a className="text-gray-600 text-sm hover:text-orange-500" href="">FAQ</a></li>
            <li><a className="text-gray-600 text-sm hover:text-orange-500" href="">About Us</a></li>
            <li><a className="text-gray-600 text-sm hover:text-orange-500" href="">Privacy Policy</a></li>
            <li><a className="text-gray-600 text-sm hover:text-orange-500" href="">Terms of Service</a></li>
        </ul>
        <div className="flex flex-col w-fit gap-5">
            <span className="font-semibold text-gray-900">Social Media</span>
            <div className="flex flex-row gap-4">
                <div className="flex justify-center items-center bg-[#1A4D2E] w-9 h-9 rounded-full hover:opacity-90 active:scale-95 transition:all duration-300 cursor-pointer hover:grayscale"><a href=""><FaFacebookF className='text-white'/></a></div>
                <div className="flex justify-center items-center bg-[#1A4D2E] w-9 h-9 rounded-full hover:opacity-90 active:scale-95 transition:all duration-300 cursor-pointer hover:grayscale"><a href=""><FaTwitter className='text-white'/></a></div>
                <div className="flex justify-center items-center bg-[#1A4D2E] w-9 h-9 rounded-full hover:opacity-90 active:scale-95 transition:all duration-300 cursor-pointer hover:grayscale"><a href=""><FaInstagram className='text-xl text-white'/></a></div>
            </div>
        </div>
    </footer>
    )
}

export default Footer