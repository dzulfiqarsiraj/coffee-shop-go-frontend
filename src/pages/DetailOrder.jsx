import React from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { FiUser } from "react-icons/fi";
import { FiMapPin } from "react-icons/fi";
import { FiPhoneCall } from "react-icons/fi";
import { FiCreditCard } from "react-icons/fi";
import { FiTruck } from "react-icons/fi";
import { FiLoader } from "react-icons/fi";
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CoffeeBeanImage from '../assets/coffeebean.jpg'
import CovLogo from '../assets/icon/cov-black.svg';

const DetailOrder = () => {
    const [orderDetail, setOrderDetail] = React.useState([{}])
    const [loading, setLoading] = React.useState(false)
    const {orderId} = useParams()
    const token = useSelector(state => state.auth.token)
    const userProfile = useSelector(state => state.profile.data)

    const getOrderDetail = React.useCallback(async () => {
        try {
            setLoading(true)
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/customer/order-details`,{
                headers : {
                    'Authorization' : `Bearer ${token}`
                },
                params : {
                    orderId : orderId
                }
            });

            setOrderDetail(res.data.results)
            setLoading(false)
            console.log(res.data.results)
        } catch (error) {
            console.log(error)
        }
        
    }, [orderId, token])

    React.useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });

          getOrderDetail()
    },[getOrderDetail])
    return (
        <>
            <Navbar className='bg-black' />
            {/* <!-- main --> */}
            {loading ? <div className='flex justify-center w-screen h-screen'><img className='w-16 animate-pulse' src={CovLogo} alt="" /></div> :
            <main className="flex flex-col h-fit px-24 mb-16 pt-24">
                <h1 className="text-4xl font-medium text-gray-900 tracking-wide pt-10">Order <span className="font-bold">{orderDetail[0]?.orderNumber}</span></h1>
                <span className="text-sm text-gray-500 pt-2 pb-10">{orderDetail[0]?.date} at {orderDetail[0]?.time}</span>
                {/* <!-- column-1 --> */}
                <div className="flex flex-1 h-fit flex-row-reverse gap-3">
                    <div className="flex flex-col flex-1 gap-4">
                        <div className="flex flex-row justify-between items-center">
                            <span className="text-xl font-semibold tracking-wide">Your Order</span>
                        </div>
                        {/* <!-- product-card-1 --> */}
                        {orderDetail?.map(item => (
                        <div key={item?.id} className="flex flex-row h-fit bg-gray-100 gap-5">
                            <img src={item?.image ? `${item?.image}` : CoffeeBeanImage} className='h-48 aspect-square object-cover bg-center'/>
                            <div className="flex flex-col flex-1 self-center gap-3">
                                {item?.tag && <span className="w-fit text-xs text-white font-semibold bg-red-700 px-2 py-1 rounded-full">FLASH SALE!</span>}
                                <span className="font-semibold tracking-wide">{item?.product}</span>
                                <div className="flex flex-row items-center gap-2 divide-x-2 divide-gray-300">
                                    <span className="text-sm text-gray-600">{item?.quantity} pcs</span>
                                    <span className="text-sm text-gray-600 pl-2">{item?.size}</span>
                                    <span className="text-sm text-gray-600 pl-2">{item?.variant}</span>
                                    <span className="text-sm text-gray-600 pl-2">{item?.shipping}</span>
                                </div>
                                <div className="flex flex-row gap-3 items-center">
                                    {item?.discount !== null && <span className="self-center text-xs text-red-700">&#40; Disc. {item?.discount * 100} % &#41;</span>}
                                    <span className="text-base text-orange-500">IDR {Number(item?.subTotal).toLocaleString('id')}</span>
                                </div>
                            </div>
                        </div>
                        ))}
                    </div>

                    <div className="flex flex-col flex-1 gap-4">
                        <span className="text-xl font-semibold tracking-wide">Order Information</span>

                        <div className="flex flex-col w-full">
                            <div className="flex flex-col p-3 gap-5">
                                <div className="flex flex-row justify-between">
                                    <div className="flex flex-row gap-2">
                                        <div><FiUser /></div>
                                        <span className="font-medium text-gray-800">Full Name</span>
                                    </div>
                                    <span className="font-semibold">{orderDetail[0].fullName}</span>
                                </div>
                                <hr />
                                <div className="flex flex-row justify-between">
                                    <div className="flex flex-row gap-2">
                                        <div><FiMapPin /></div>
                                        <span className="font-medium text-gray-800">Address</span>
                                    </div>
                                    <span className="font-semibold">{orderDetail[0]?.deliveryAddress}</span>
                                </div>
                                <hr />
                                <div className="flex flex-row justify-between">
                                    <div className="flex flex-row gap-2">
                                        <div><FiPhoneCall /></div>
                                        <span className="font-medium text-gray-800">Phone</span>
                                    </div>
                                    <span className="font-semibold">{userProfile.phoneNumber}</span>
                                </div>
                                <hr />
                                <div className="flex flex-row justify-between">
                                    <div className="flex flex-row gap-2">
                                        <div><FiCreditCard /></div>
                                        <span className="font-medium text-gray-800">Payment Method</span>
                                    </div>
                                    <span className="font-semibold">Cash</span>
                                </div>
                                <hr />
                                <div className="flex flex-row justify-between">
                                    <div className="flex flex-row gap-2">
                                        <div><FiTruck /></div>
                                        <span className="font-medium text-gray-800">Shipping</span>
                                    </div>
                                    <span className="font-semibold">{orderDetail[0]?.shipping}</span>
                                </div>
                                <hr />
                                <div className="flex flex-row justify-between">
                                    <div className="flex flex-row gap-2">
                                        <div><FiLoader /></div>
                                        <span className="font-medium text-gray-800">Status</span>
                                    </div>
                                    {orderDetail[0]?.status === 'Awaiting Payment' && <span className={`text-sm font-semibold bg-orange-100 text-orange-600 px-3 py-1 box-border rounded-full`}>{orderDetail[0]?.status}</span>}
                                    {orderDetail[0]?.status === 'On Process' && <span className={`text-sm font-semibold bg-blue-100 text-blue-600 px-3 py-1 box-border rounded-full`}>{orderDetail[0]?.status}</span>}
                                    {orderDetail[0]?.status === 'Ready to Pick' && <span className={`text-sm font-semibold bg-green-100 text-green-600 px-3 py-1 box-border rounded-full`}>{orderDetail[0]?.status}</span>}
                                    {orderDetail[0]?.status === 'Delivered' && <span className={`text-sm font-semibold bg-green-100 text-green-600 px-3 py-1 box-border rounded-full`}>{orderDetail[0]?.status}</span>}
                                    {orderDetail[0]?.status === 'Canceled' && <span className={`text-sm font-semibold bg-red-100 text-red-600 px-3 py-1 box-border rounded-full`}>{orderDetail[0]?.status}</span>}
                                </div>
                                <hr />
                                <div className="flex flex-row justify-between">
                                    <span className="font-medium text-gray-800">Total Transaksi</span>
                                    <span className="font-semibold text-orange-500">IDR {Number(orderDetail[0]?.grandTotal).toLocaleString('id')},-</span>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </main>
            }
            {/* <!-- /main --> */}
            <Footer />
        </>
    )
}

export default DetailOrder