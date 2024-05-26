import React from 'react';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { FiXCircle } from "react-icons/fi";
import { FiPlus } from "react-icons/fi";
import { FiMail } from "react-icons/fi";
import { FiUser } from "react-icons/fi";
import { FiMapPin } from "react-icons/fi";
import CoffeeBeanImage from '../assets/coffeebean.jpg'
import BriImage from '../assets/bri.svg'
import DanaImage from '../assets/dana.svg'
import BcaImage from '../assets/bca.svg'
import GopayImage from '../assets/gopay.svg'
import OvoImage from '../assets/ovo.svg'
import PaypalImage from '../assets/paypal.svg'
import {useNavigate} from 'react-router-dom';

import { emptyCart as emptyCartAction } from '../redux/reducers/cart';
import {removeFromCart as removeFromCartAction} from '../redux/reducers/cart'

const CheckoutProduct = () => {
    const [customerData, setCustomerData] = React.useState({
        email : '',
        fullname : '',
        address : ''
    })
    const [shipping, setShipping] = React.useState('')
    const [shippingPrice, setShippingPrice] = React.useState(0)
    const [emailInputMessage, setEmailInputMessage] = React.useState('')
    const [fullNameInputMessage, setFullNameInputMessage] = React.useState('')
    const [addressInputMessage, setAddressInputMessage] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const [successMessage, setSuccessMesage] = React.useState('hidden')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart.data)
    const token = useSelector(state => state.auth.token)
    const totalOrder = cart.reduce((prev, curr) => {
        let discount = curr.product.discount
        if(!curr.product.discount){
            discount = 0
        }
        return prev + (((curr.product.basePrice - (curr.product.basePrice * discount)) + curr.size.additionalPrice + curr.variant.additionalPrice) * curr.quantity)
    },0)

    React.useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
    },[])

    const customerFormHandler = (e) => {
        setCustomerData({...customerData, [e.target.name] : e.target.value})
    }

    const checkoutProcess = async () => {
        const dataReq = {
            cartData : cart,
            custData : customerData,
            shippingData : shipping,
            shippingPrice : shippingPrice
        }
        try {
            setLoading(true)
            if(customerData.email === ''){
                setLoading(false)
                throw new Error('empty email')
            }
            if(customerData.fullname === ''){
                setLoading(false)
                throw new Error('empty name')
            }
            if(customerData.address === ''){
                setLoading(false)
                throw new Error('empty address')
            }
            if(shipping === ''){
                setLoading(false)
                throw new Error('empty shipping')
            }
            
            const data = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/customer/orders`, dataReq, {
                headers : {
                    'Authorization' : `Bearer ${token}`,
                }
            });
            
            if(data){
                setTimeout(()=>{
                    setLoading(false)
                    setSuccessMesage('')
                },2000)
                setTimeout(()=>{
                    dispatch(emptyCartAction())
                    navigate('/history-order')
                },5000)
            }
            
        } catch (error) {
            if(error.message === 'empty email'){
                setEmailInputMessage('Email Must Not Be Empty')
                setTimeout(()=>{
                    setEmailInputMessage('')
                },2000)
            }
            if(error.message === 'empty name'){
                setFullNameInputMessage('Name Must Not Be Empty')
                setTimeout(()=>{
                    setFullNameInputMessage('')
                },2000)
            }
            if(error.message === 'empty address'){
                setAddressInputMessage('Address Must Not Be Empty')
                setTimeout(()=>{
                    setAddressInputMessage('')
                },2000)
            }
            if(error.message === 'empty shipping'){
                setShipping('Choose Delivery Option')
                setTimeout(()=>{
                    setShipping('')
                },2000)
            }
        }
    }

    return (
        <>
            <Navbar className="bg-black"/>
            <main className="flex flex-col px-24 pt-24 mb-16 h-fit">
                <h1 className="py-10 text-4xl font-medium tracking-wide text-gray-900">Payment <span className="text-yellow-900">Details</span></h1>
                {/* <!-- column-1 --> */}
                <div className="flex flex-row flex-1 gap-3 h-fit">
                    <div className="flex flex-col flex-1 gap-4">
                        <div className="flex flex-row items-center justify-between">
                            <span className="text-xl font-semibold tracking-wide">Your Order</span>
                            <button type="button" onClick={() => navigate('/products')} className="flex flex-row items-center justify-center h-10 gap-2 text-sm duration-300 bg-orange-500 border border-orange-500 rounded-md cursor-pointer hover:borde-orange-500 active:scale-95 transition:all">
                                <div className="flex items-center pl-2"><FiPlus className='w-4' /></div>
                                <div className="flex items-center flex-1 pr-2"><span>Add Menu</span></div>
                            </button>
                        </div>
                        {/* <!-- product-card-1 --> */}
                        {
                            cart.map(product => (
                                <div key={`product_${product?.product?.id}`} className="flex flex-row gap-5 bg-gray-100 h-fit">
                                    <img src={product?.product?.image ? `${product?.product?.image}` : CoffeeBeanImage} className='object-cover h-48 bg-center aspect-square'/>
                                    <div className="flex flex-col self-center flex-1 gap-3">
                                        {product?.product?.tag === "Flash Sale" && <span className="px-2 py-1 text-xs font-semibold text-white bg-red-700 rounded-full w-fit">FLASH SALE!</span>}
                                        {product?.product?.tag === "End Year Sale" && <span className="px-2 py-1 text-xs font-semibold text-white bg-orange-700 rounded-full w-fit">END YEAR SALE!</span>}
                                        {product?.product?.tag === "Ramadhan Sale" && <span className="px-2 py-1 text-xs font-semibold text-white bg-green-700 rounded-full w-fit">RAMADHAN SALE!</span>}
                                        <span className="font-semibold tracking-wide">{product?.product?.name}</span>
                                        <div className="flex flex-row items-center gap-2 divide-x-2 divide-gray-300">
                                            <span className="text-sm text-gray-600">{product?.quantity} pcs</span>
                                            <span className="pl-2 text-sm text-gray-600">{product?.size?.size}</span>
                                            <span className="pl-2 text-sm text-gray-600">{product?.variant?.variant}</span>
                                            <span className="pl-2 text-sm text-gray-600">{shipping}</span>
                                        </div>
                                        <div className="flex flex-row items-center gap-3">
                                            {product?.product?.discount && <span className="self-center text-xs text-red-700"><del>IDR {Number((
                                                Number(product?.product?.basePrice) + Number(product?.variant?.additionalPrice) + Number(product?.size?.additionalPrice))*Number(product?.quantity)).toLocaleString('id')
                                                },-</del></span>}
                                            <span className="text-base text-[#1A4D2E]">IDR {
                                            product?.product?.discount ?
                                            (((Number(product?.product?.basePrice)-(Number(product?.product?.basePrice)*Number(product?.product?.discount)))+
                                            Number(product?.variant?.additionalPrice) + Number(product?.size?.additionalPrice)) * Number(product?.quantity)).toLocaleString('id') :
                                            Number((
                                                Number(product?.product?.basePrice) + Number(product?.variant?.additionalPrice) + Number(product?.size?.additionalPrice))*Number(product?.quantity)).toLocaleString('id')
                                            },-</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-center px-8 w-fit">
                                        <FiXCircle type='button' onClick={() => {
                                            dispatch(removeFromCartAction(product))
                                        }} className='text-red-700 duration-300 hover:text-slate-700 hover:cursor-pointer hover:scale-125 transition:all' />
                                    </div>
                                </div>
                            ))
                        }                        
                        
                        <span className="text-xl font-semibold tracking-wide">Payment Info & Delivery</span>

                        <form action="" className="flex flex-col gap-5">
                            <label htmlFor="email" className="flex flex-col gap-1">
                                <span className="text-lg font-semibold">Email</span>
                                <div className="flex flex-row items-center h-10 gap-2 px-2 border border-black rounded">
                                    <div>
                                        <FiMail />
                                    </div>
                                    <input className="flex-1 outline-none" id="email" type="email" name="email" value={customerData.email} onChange={customerFormHandler}/>
                                </div>
                            </label>
                            {emailInputMessage === 'Email Must Not Be Empty' ? (<div className='text-sm text-red-800'>{emailInputMessage}!</div>) : ''}
                            <label htmlFor="fullname" className="flex flex-col gap-1">
                                <span className="text-lg font-semibold">Full Name</span>
                                <div className="flex flex-row items-center h-10 gap-2 px-2 border border-black rounded">
                                    <div>
                                        <FiUser />
                                    </div>
                                    <input className="flex-1 outline-none" id="fullname" type="text" name="fullname" value={customerData.fullname} onChange={customerFormHandler}/>
                                </div>
                            </label>
                            {fullNameInputMessage === 'Name Must Not Be Empty' ? (<div className='text-sm text-red-800'>{fullNameInputMessage}!</div>) : ''}
                            <label htmlFor="address" className="flex flex-col gap-1">
                                <span className="text-lg font-semibold">Address</span>
                                <div className="flex flex-row items-center h-10 gap-2 px-2 border border-black rounded">
                                    <div>
                                        <FiMapPin />
                                    </div>
                                    <input className="flex-1 outline-none" id="address" type="address" name="address" value={customerData.address} onChange={customerFormHandler}/>
                                </div>
                            </label>
                            {addressInputMessage === 'Address Must Not Be Empty' ? (<div className='text-sm text-red-800'>{addressInputMessage}!</div>) : ''}
                            <div className="flex flex-col gap-1">
                                <span className="text-lg font-semibold">Delivery</span>
                                <div className="flex flex-row items-center gap-8">
                                    <button type='button' onClick={()=>{
                                        setShipping('Dine In');
                                        setShippingPrice(0);
                                    }} className={`flex flex-1 justify-center items-center h-10 border ${shipping === 'Dine In' ? 'border-green-700' : 'border-gray-500'} rounded-md hover:border hover:border-green-700 active:scale-95 transition:all duration-300 cursor-pointer`}>Dine In</button>
                                    <button type='button' onClick={() => {
                                        setShipping('Door Delivery');
                                        setShippingPrice(10000);
                                    }} className={`flex flex-1 justify-center items-center h-10 border ${shipping === 'Door Delivery' ? 'border-green-700' : 'border-gray-500'} rounded-md hover:border hover:border-green-700 active:scale-95 transition:all duration-300 cursor-pointer`}>Door Delivery</button>
                                    <button type='button' onClick={() => {
                                        setShipping('Pick Up');
                                        setShippingPrice(0);
                                    }} className={`flex flex-1 justify-center items-center h-10 border ${shipping === 'Pick Up' ? 'border-green-700' : 'border-gray-500'} rounded-md hover:border hover:border-green-700 active:scale-95 transition:all duration-300 cursor-pointer`}>Pick Up</button>
                                </div>
                            </div>
                            {shipping === 'Choose Delivery Option' ? (<div className='text-sm text-red-800'>{shipping}!</div>) : ''}

                        </form>

                    </div>

                    <div className="flex flex-col flex-1 gap-4">
                        <div className="flex items-center h-10">
                            <span className="text-xl font-semibold tracking-wide">Total</span>
                        </div>
                        <div className="flex flex-col w-full max-w-lg bg-gray-100">
                            <div className="flex flex-col gap-5 p-3">
                                <div className="flex flex-row justify-between ">
                                    <span className="font-semibold text-gray-800">Order</span>
                                    <span className="font-semibold">IDR {Number(totalOrder).toLocaleString('id')},-</span>
                                </div>
                                <div className="flex flex-row justify-between ">
                                    <span className="font-semibold text-gray-800">Delivery</span>
                                    <span className="font-semibold">IDR {Number(shippingPrice).toLocaleString('id')},-</span>
                                </div>
                                <div className="flex flex-row justify-between ">
                                    <span className="font-semibold text-gray-800">Tax</span>
                                    <span className="font-semibold">IDR {(Number(totalOrder) * 0.05).toLocaleString('id')},-</span>
                                </div>
                                <hr />
                                <div className="flex flex-row justify-between ">
                                    <span className="font-semibold text-gray-800">Sub Total</span>
                                    <span className="font-semibold">IDR {((Number(totalOrder) + (Number(totalOrder) * 0.05)) + Number(shippingPrice)).toLocaleString('id')},-</span>
                                </div>
                                <div className='flex justify-center flex-1'>
                                    {loading && <span className="loading loading-infinity loading-lg"></span>}
                                    {<div className={`${successMessage} text-green-700`}>Checkout Process Successfully</div>}
                                </div>
                                <button disabled={cart.length === 0 ? true : false} type='button' onClick={checkoutProcess} className={`flex flex-1 text-sm justify-center items-center border ${cart.length == 0 ? 'border-slate-500 bg-slate-500' : 'border-[#1A4D2E] bg-[#1A4D2E] hover:border-[#1A4D2E]'} rounded-md text-white active:scale-95 transition:all duration-300 cursor-pointer py-2`}>Checkout</button>

                                <span className="text-sm font-thin tracking-wide">We Accept</span>
                                <div className="flex flex-row">
                                    <div className="flex items-center justify-start flex-1"><img src={BriImage} alt="" /></div>
                                    <div className="flex items-center justify-center flex-1"><img src={DanaImage} alt="" /></div>
                                    <div className="flex items-center justify-center flex-1"><img src={BcaImage} alt="" /></div>
                                    <div className="flex items-center justify-center flex-1"><img src={GopayImage} alt="" /></div>
                                    <div className="flex items-center justify-center flex-1"><img src={OvoImage} alt="" /></div>
                                    <div className="flex items-center justify-end flex-1"><img src={PaypalImage} alt="" /></div>
                                </div>
                                <span className="text-sm font-thin tracking-wide">*Get Discount if you pay with Bank Central Asia</span>

                            </div>
                        </div>
                    </div>
                </div>
            </main>
            {/* <!-- /main --> */}
            <Footer />
        </>
    )
}

export default CheckoutProduct