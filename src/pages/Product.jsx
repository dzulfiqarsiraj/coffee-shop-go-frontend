/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import axios from 'axios'
// import { Link } from 'react-router-dom'
import motherImage from '../assets/icon/mother-fig.svg'
import manImage from '../assets/icon/man-fig.svg'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ProductCard from '../components/ProductCard.jsx'
import CovLogo from '../assets/icon/cov-black.svg';
import { FaCircleChevronLeft } from "react-icons/fa6"
import { FaCircleChevronRight } from "react-icons/fa6"
import PaginationButton from '../components/PaginationButton.jsx'
import { FiChevronRight } from "react-icons/fi";


const Product = () => {

    const [data, setData] = React.useState([{}])
    const [pageInfo, setPageInfo] = React.useState(null)
    const [showPaginationButton, setShowPaginationButton] = React.useState([])
    const [showCurrentPageButton, setShowCurrentPageButton] = React.useState()
    const [categories, setCategories] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [filterDisplay, setFilterDisplay] = React.useState('hidden')
    const [keyword, setKeyword] = React.useState('')
    const [categoryChecked, setCategoryChecked] = React.useState({
        'favorite product' : false,
        'coffee' : false,
        'non-coffee' : false,
        'foods' : false
    })

    const getProduct = async (page) => {
        let res
        setLoading(true)
        if(page === 'previous'){
            res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/products`,{params: {
                page: pageInfo.prevPage,
                search: keyword,
                category: categories,
                limit: 6
            }})
        }else if(page === 'next'){
            res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/products`,{params: {
                page: pageInfo.nextPage,
                search: keyword,
                category: categories,
                limit: 6
            }})
        }else{
            res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/products`,{params: {
                search: keyword,
                category: categories,
                limit: 6
            }})
        }


        let arrayPage = []
        for(let i = 1; i <= (res.data.pageInfo.totalPage); i++){
            arrayPage.push(i)
        }

        setShowPaginationButton(arrayPage)

        setShowCurrentPageButton(res.data.pageInfo.currentPage)

        setPageInfo(res.data.pageInfo)
        setData(res.data.results)
        setLoading(false)
    }

    const getCategory = async (category) => {
        if(categories.includes(category)){
            setCategories(categories.filter((cat => cat !== category)))
        }
         else {
            setCategories([...categories, category])
         }
    }

    const getCatgeoryChecked = (cat) => {
        if(categoryChecked[cat]){
            setCategoryChecked({...categoryChecked, [cat] : false})
        } else {
            setCategoryChecked({...categoryChecked, [cat] : true})
        }
    }

    const getFilterData = async (e) => {
        try {
            e.preventDefault()
            const {value: keyword} = e.target.keyword
            // const form = new URLSearchParams()
            // form.append('search', search)
    
            setKeyword(keyword)
            setLoading(true)
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/products`, {params: {
                keyword: keyword,
                category: categories,
                limit : 6
            }})
    
            let arrayPage = []
            for(let i = 1; i <= (res.data.pageInfo.totalPage); i++){
                arrayPage.push(i)
            }
            
            setShowPaginationButton(arrayPage)
    
            setShowCurrentPageButton(res.data.pageInfo.currentPage)
    
            setPageInfo(res.data.pageInfo)
            setData(res.data.results)
            setLoading(false)    
        } catch (error) {
            setData([])
            setLoading(false)
        }
        
    }

    const filterReset = () => {
        setKeyword('')
        setCategories([])
        setCategoryChecked({
            'favorite product' : false,
            'coffee' : false,
            'non-coffee' : false,
            'foods' : false
        })
    }

    const showCurrentPage = async (page = 1) => {
        setLoading(true)
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/products`, {params: {
            page: page,
            search: keyword,
            category: categories,
            limit: 6
        }})

        setShowCurrentPageButton(page)
        setPageInfo(res.data.pageInfo)
        setData(res.data.results)
        setLoading(false)
    }

    const showFilter = () => {
        if(filterDisplay == 'flex'){
            setFilterDisplay('hidden')
        } else if(filterDisplay == 'hidden'){
            setFilterDisplay('flex')
        }
    }

    React.useEffect(()=>{
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
        getProduct()
        showCurrentPage()
        getFilterData()
    },[])

    
    return (
        <>
            <Navbar className="bg-black"/>
            <div onClick={showFilter} className={'md:hidden fixed bottom-1/2 left-0 z-50 bg-black w-5 h-8 flex items-center justify-center rounded-r-md'}><FiChevronRight className='text-lg font-bold text-white' /></div>
            {/* main */}
            {loading ? <div className='flex justify-center w-screen h-screen'><img className='w-16 animate-pulse' src={CovLogo} alt="" /></div> :
            <>
            <main className="flex flex-col items-center justify-center w-screen overflow-hidden h-fit">
                <header className="flex items-center w-screen h-72 bg-[url('../assets/bg-product-1.jpg')] bg-cover bg-center">
                    <h1 className="w-4/6 ml-20 text-5xl font-normal tracking-wide text-white">We Provide Good Coffee and Healthy Meals</h1>
                </header>
                
                <div className="flex flex-col w-5/6">
                    {/* column 1 */}
                    <div className="flex flex-col w-full gap-5 py-10">
                        <div className="flex flex-row items-center justify-between">
                            <h1 className="text-4xl font-medium tracking-wide text-gray-900">Today <span className="text-yellow-900">Promo</span></h1>
                            <div className="flex flex-row items-center justify-center gap-2">
                                <FaCircleChevronLeft className="fa-solid fa-circle-chevron-left text-3xl text-gray-300 hover:opacity-90 active:scale-95 transition:all duration-300 cursor-pointer hover:text-[#FF9F29]"/>
                                <FaCircleChevronRight className="fa-solid fa-circle-chevron-right text-3xl text-gray-300 hover:opacity-90 active:scale-95 transition:all duration-300 cursor-pointer hover:text-[#FF9F29]"/>
                            </div>
                        </div>
                        <div className="relative flex flex-row gap-10 overflow-hidden -translate-x-1/2 w-max left-1/2">
                            {/* coupon-1 */}
                            <div className="flex w-80 flex-row bg-[#88B788] gap-6 px-4 rounded-2xl">
                                <div className="relative w-20 overflow-hidden"><img className="absolute -bottom-4" src={motherImage} alt=""/></div>
                                <div className="flex flex-col self-center justify-center flex-1 gap-1 my-3">
                                    <h1 className="text-sm font-semibold tracking-wide">HAPPY MOTHER&apos;S DAY!</h1>
                                    <span className="mb-2 text-xs tracking-wide">Get one of our favorite menu for free!</span>
                                    <span className="text-sm text-white">Claim Coupon</span>
                                </div>
                            </div>
                            {/* coupon-2 */}
                            <div className="flex w-80 flex-row bg-[#88B788] gap-6 px-4 rounded-2xl">
                                <div className="relative w-20 overflow-hidden"><img className="absolute -bottom-4" src={motherImage} alt=""/></div>
                                <div className="flex flex-col self-center justify-center flex-1 gap-1 my-3">
                                    <h1 className="text-sm font-semibold tracking-wide">HAPPY MOTHER&apos;S DAY!</h1>
                                    <span className="mb-2 text-xs tracking-wide">Get one of our favorite menu for free!</span>
                                    <span className="text-sm text-white">Claim Coupon</span>
                                </div>
                            </div>
                            {/* coupon-3 */}
                            <div className="flex w-80 flex-row bg-[#88B788] gap-6 px-4 rounded-2xl">
                                <div className="relative w-20 overflow-hidden"><img className="absolute -bottom-4" src={motherImage} alt=""/></div>
                                <div className="flex flex-col self-center justify-center flex-1 gap-1 my-3">
                                    <h1 className="text-sm font-semibold tracking-wide">HAPPY MOTHER&apos;S DAY!</h1>
                                    <span className="mb-2 text-xs tracking-wide">Get one of our favorite menu for free!</span>
                                    <span className="text-sm text-white">Claim Coupon</span>
                                </div>
                            </div>

                            {/* coupon-4 */}
                            <div className="flex flex-row gap-6 px-4 bg-orange-300 w-80 rounded-2xl">
                                <div className="relative w-20 overflow-hidden"><img className="absolute -bottom-4" src={manImage} alt="" /></div>
                                <div className="flex flex-col self-center justify-center flex-1 gap-1 my-3">
                                    <h1 className="text-sm font-semibold tracking-wide">Get a cup of coffee for free on Sunday morning</h1>
                                    <span className="mb-2 text-xs tracking-wide">Only at 7 to 9 AM</span>
                                </div>
                            </div>
            
                        </div>
                        <div className="flex flex-row gap-2 tracking-wide">
                            <div className="w-6 h-2 bg-[#FF9F29] rounded-full"></div>
                            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                        </div>
                    </div>
        
                    {/* column 2 */}
                    <div className="flex flex-col w-full gap-5 py-10 h-fit">
                        <div className="flex flex-row items-center justify-between">
                            <h1 className="text-4xl font-medium tracking-wide text-gray-900">Our <span className="text-yellow-900">Product</span></h1>
                        </div>
            
                        <div className="flex flex-row gap-7">
                            <aside className={`${filterDisplay} fixed md:static z-50 md:z-0 top-0 md:flex h-full bg-black rounded-3xl items-center p-8`}>
                                <form onSubmit={getFilterData} className={`flex flex-col w-full gap-6`}>
                                    <div className="flex justify-between">
                                        <span className="font-bold tracking-wide text-white">Filter</span>
                                        <span className="text-sm font-bold tracking-wide text-white"><button type='reset' onClick={() => filterReset()}>Reset Filter</button></span>
                                    </div>
        
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="keyword" className="text-sm font-bold tracking-wide text-white">Search</label>
                                        <input id="keyword" name='keyword' type="text" placeholder={keyword === '' ? "Search Your Product" : keyword} className="h-12 p-5 rounded-md placeholder:text-sm" />
                                    </div>
        
                                    <div className="flex flex-col gap-4">
                                        <span className="text-sm font-bold tracking-wide text-white">Category</span>
                                        <div className="flex flex-row gap-3">
                                            <input onChange={() => {getCatgeoryChecked('favorite product')}} checked={categoryChecked['favorite product']} onClick={() => {getCategory('favorite product')}} type="checkbox" id="favorite-product" name="category" value="favorite product" className="" />
                                            <label htmlFor="favorite-product" className="text-xs text-white md:text-base">Favorite Product</label>
                                        </div>
                                        <div className="flex flex-row gap-3">
                                            <input onChange={() => {getCatgeoryChecked('coffee')}} checked={categoryChecked['coffee']} onClick={() => {getCategory('coffee')}} type="checkbox" id="coffee" name="category" value="coffee" />
                                            <label htmlFor="coffee" className="text-xs text-white md:text-base">Coffee</label>
                                        </div>
                                        <div className="flex flex-row gap-3">
                                            <input onChange={() => {getCatgeoryChecked('non-coffee')}} checked={categoryChecked['non-coffee']} onClick={()=>{getCategory('non-coffee')}} type="checkbox" id="non-coffee" name="category" value="non coffee" />
                                            <label htmlFor="non-coffee" className="text-xs text-white md:text-base">Non Coffee</label>
                                        </div>
                                        <div className="flex flex-row gap-3">
                                            <input onChange={() => {getCatgeoryChecked('foods')}} checked={categoryChecked['foods']} onClick={()=>{getCategory('food')}} type="checkbox" id="foods" name="category" value="foods" />
                                            <label htmlFor="foods" className="text-xs text-white md:text-base">Foods</label>
                                        </div>
                                    </div>
        
                                    <div className="flex flex-col gap-4">
                                        <span className="text-sm font-bold tracking-wide text-white">Sort By</span>
                                        <div className="flex flex-row gap-3">
                                            <input type="radio" id="buy-1-get-1" name="sort-by" value="buy-1-get-1" />
                                            <label htmlFor="buy-1-get-1" className="text-xs text-white md:text-base">Buy One Get One</label>
                                        </div>
                                        <div className="flex flex-row gap-3">
                                            <input type="radio" id="flash-sale" name="sort-by" value="flash-sale" />
                                            <label htmlFor="flash-sale" className="text-xs text-white md:text-base">Flash Sale</label>
                                        </div>
                                        <div className="flex flex-row gap-3">
                                            <input type="radio" id="birthday-package" name="sort-by" value="birthday-package" />
                                            <label htmlFor="birthday-package" className="text-xs text-white md:text-base">Birthday Package</label>
                                        </div>
                                        <div className="flex flex-row gap-3">
                                            <input type="radio" id="cheap" name="sort-by" value="cheap" />
                                            <label htmlFor="cheap" className="text-xs text-white md:text-base">Cheap</label>
                                        </div>
                                    </div>
        
                                    <div className="flex flex-col gap-4">
                                        <span className="text-sm font-bold tracking-wide text-white">Range Price</span>
                                        <input type="range" minLength="0" maxLength="1000" step="2" />
                                    </div>
        
                                    <button type="submit" className="box-border px-4 py-3 text-xs font-semibold text-black duration-300 bg-orange-500 border border-orange-500 rounded-md cursor-pointer hover:opacity-90 active:scale-95 transition:all">Apply Filter</button>
                                </form>
                            </aside>
        
                            <div className="flex flex-col items-center flex-1 gap-10">
                                {data?.length === 0 ? <p className='self-center'>Product Not Found</p> : 
                                <div className="grid w-full grid-cols-2 gap-7 h-fit">
                                    {data?.map((item) => <ProductCard key={item?.id} id={item?.id} image={item?.image} name={item?.name} description={item?.description} basePrice={item.basePrice} tag={item.tag} discount={item.discount} isBestSeller={item?.isBestSeller}/>)}
                                </div>
                                }

                                <div className="flex flex-row gap-4">
                                    <button disabled={!pageInfo?.prevPage? true : false} type='button' onClick={() => {
                                        getProduct('previous');
                                        showCurrentPage(pageInfo?.prevPage)
                                        window.scrollTo({
                                            top: 600,
                                            behavior: "smooth",});
                                        }}><FaCircleChevronLeft className={`fa-solid fa-circle-chevron-right w-6 h-6 md:w-9 md:h-9 text-xs md:text-4xl hover:opacity-90 ${!pageInfo?.prevPage? 'text-slate-300' : 'active:scale-95 text-[#FF9F29]'} transition:all duration-300 cursor-pointer`}/></button>
                                    {data?.length === 0 ? '' : showPaginationButton.map((item) => <PaginationButton onClick={()=>{
                                        showCurrentPage(item); 
                                        window.scrollTo({
                                        top: 600,
                                        behavior: "smooth",});
                                    }}  key={item} text={item} className={item === showCurrentPageButton ? 'bg-[#FF9F29]':'bg-gray-200'}/>)}
                                    <button disabled={!pageInfo?.nextPage? true : false} type='button' onClick={() => {
                                        getProduct('next');
                                        showCurrentPage(pageInfo?.nextPage)
                                        window.scrollTo({
                                            top: 600,
                                            behavior: "smooth",});
                                        }}><FaCircleChevronRight className={`fa-solid fa-circle-chevron-right w-6 h-6 md:w-9 md:h-9 text-xs md:text-4xl hover:opacity-90 ${!pageInfo?.nextPage? 'text-slate-300' : 'active:scale-95 text-[#FF9F29]'} transition:all duration-300 cursor-pointer`}/></button>
                                </div>
                            
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            </>}
            <Footer />
        </>
    );
}

export default Product