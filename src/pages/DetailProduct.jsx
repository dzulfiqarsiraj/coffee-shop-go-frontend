/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaStar } from "react-icons/fa6";
import { FaCircleChevronRight } from "react-icons/fa6";
import ProductCard from "../components/ProductCard";
import CoffeeBeanImage from "../assets/coffeebean.jpg";
import CovLogo from "../assets/icon/cov-black.svg";
import { getBestSellerProduct } from "./Home";
import { useDispatch } from "react-redux";
import { addToCart as addToCartAction } from "../redux/reducers/cart";


const DetailProduct = () => {
    const [detailProduct, setDetailProduct] = React.useState({});
    const [bestSeller, setBestSeller] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    let [qty, setQty] = React.useState(0);
    const [localSelector, setLocalSelector] = React.useState({
        product: null,
        size: null,
        variant: null,
        quantity: null,
        uniqueId: null,
    });
    const { id } = useParams();

    const decButton = () => {
        if (qty <= 0) {
            setQty(0);
            console.log(qty);
            setLocalSelector({
                ...localSelector,
                quantity: qty,
            });
            return;
        }
        setQty((qty -= 1));
        setLocalSelector({
            ...localSelector,
            quantity: qty,
        });
    };

    const addButton = () => {
        setQty((qty += 1));
        setLocalSelector({
            ...localSelector,
            quantity: qty,
        });
    };

    const getDetailProduct = async (id) => {
        setLoading(true);
        const { data } = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/products/${id}`
        );

        if(typeof data.results.sizes[0] === "string" || typeof data.results.variants[0] === "string"){
            data.results.sizes = data.results.sizes.map((size) => JSON.parse(size))
            data.results.variants = data.results.variants.map((variant) => JSON.parse(variant))
        }
        
        if (data.success) {
            setDetailProduct(data.results);
            setLocalSelector({
                ...localSelector,
                product: data.results,
                size: data.results.sizes[0],
                variant: data.results.variants[0],
                quantity: qty,
            });
        }
        setLoading(false);
    };

    React.useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
        getDetailProduct(id);
        getBestSellerProduct(setBestSeller, { limit: 3 }, setLoading);
    }, [id]);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const addCart = () => {
        dispatch(
            addToCartAction({
                ...localSelector,
                uniqueId: Math.random().toPrecision(4).slice(2),
            })
        );
        navigate("/products");
    };

    const addBuy = () => {
        dispatch(
            addToCartAction({
                ...localSelector,
                uniqueId: Math.random().toPrecision(4).slice(2),
            })
        );
        navigate("/checkout-product");
    };

    return (
        <>
            <Navbar className="bg-black" />
            {/* <!-- main --> */}
            {loading ? (
                <div className="flex justify-center w-screen h-screen">
                    <img className="w-16 animate-pulse" src={CovLogo} alt="" />
                </div>
            ) : (
                <main className="flex flex-col items-center justify-center w-screen gap-10 px-24 pt-32">
                    {/* <!-- column-1 --> */}
                    <div className="flex flex-row w-full gap-5">
                        {" "}
                        {/*<!-- left--> */}
                        <div className="flex flex-col w-2/4 gap-5">
                            <div className="w-full">
                                <img
                                    className="w-full"
                                    id={detailProduct?.id}
                                    src={
                                        detailProduct?.image !== null &&
                                        detailProduct?.image !== ""
                                            ? `${detailProduct?.image}`
                                            : CoffeeBeanImage
                                    }
                                    alt=""
                                />
                            </div>
                            <div className="flex flex-row gap-5">
                                <div className="flex-1">
                                    <img
                                        className="w-full"
                                        src={
                                            detailProduct?.image !== null &&
                                            detailProduct?.image !== ""
                                                ? `${detailProduct?.image}`
                                                : CoffeeBeanImage
                                        }
                                        alt=""
                                    />
                                </div>
                                <div className="flex-1">
                                    <img
                                        className="w-full"
                                        src={
                                            detailProduct?.image !== null &&
                                            detailProduct?.image !== ""
                                                ? `${detailProduct?.image}`
                                                : CoffeeBeanImage
                                        }
                                        alt=""
                                    />
                                </div>
                                <div className="flex-1">
                                    <img
                                        className="w-full"
                                        src={
                                            detailProduct?.image !== null &&
                                            detailProduct?.image !== ""
                                                ? `${detailProduct?.image}`
                                                : CoffeeBeanImage
                                        }
                                        alt=""
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col flex-1 gap-5 bg-white">
                            {" "}
                            {/*<!-- right --> */}
                            {detailProduct?.tag === "Flash Sale" && (
                                <span className="px-3 py-2 text-sm font-semibold tracking-wide text-white bg-red-600 rounded-full w-fit">
                                    FLASH SALE!
                                </span>
                            )}
                            {detailProduct?.tag === "End Year Sale" && (
                                <span className="px-3 py-2 text-sm font-semibold tracking-wide text-white bg-orange-600 rounded-full w-fit">
                                    END YEAR SALE!
                                </span>
                            )}
                            {detailProduct?.tag === "Ramadhan Sale" && (
                                <span className="px-3 py-2 text-sm font-semibold tracking-wide text-white bg-green-700 rounded-full w-fit">
                                    RAMADHAN SALE!
                                </span>
                            )}
                            <h1 className="text-5xl font-medium tracking-wide">
                                {detailProduct?.name}
                            </h1>
                            <div className="flex flex-row items-center gap-3">
                                {Number(detailProduct?.discount) !== 0 ? (
                                    <span className="text-[0.6rem] md:text-xs font-bold text-red-500">
                                        <del>
                                            Rp{" "}
                                            {Number(
                                                detailProduct?.basePrice
                                            ).toLocaleString("id")}
                                            ,-
                                        </del>
                                    </span>
                                ) : (
                                    ""
                                )}

                                <span className="text-sm md:text-xl font-bold text-[#1A4D2E]">
                                    Rp{" "}
                                    {(
                                        Number(detailProduct?.basePrice) -
                                        Number(detailProduct?.basePrice) *
                                            Number(detailProduct?.discount)
                                    ).toLocaleString("id")}
                                    ,-
                                </span>
                            </div>
                            <div className="flex flex-row items-center h-3 gap-3 mb-2">
                                <FaStar className="text-[#FF9F29] text-sm" />
                                <FaStar className="text-[#FF9F29] text-sm" />
                                <FaStar className="text-[#FF9F29] text-sm" />
                                <FaStar className="text-[#FF9F29] text-sm" />
                                <FaStar className="text-[#FF9F29] text-sm" />
                                <span className="text-base text-gray-500">
                                    5.0
                                </span>
                            </div>
                            <div className="flex flex-row items-start gap-4">
                                <div className="flex flex-row gap-4 divide-x-2 divide-gray-600">
                                    <span className="text-gray-600">
                                        200+ Review
                                    </span>
                                    {detailProduct?.isBestSeller && (
                                        <span className="pl-4 text-gray-600">
                                            Recommendation
                                        </span>
                                    )}
                                </div>
                                <i
                                    className="box-border self-start w-5 pb-1 text-orange-500"
                                    data-feather="thumbs-up"
                                ></i>
                            </div>
                            <p className="text-gray-600">
                                {detailProduct?.description}
                            </p>
                            <div className="flex flex-row border rounded-md h-9 w-fit border-gray-3">
                                <button
                                    type="button"
                                    disabled={qty <= 0 ? true : false}
                                    onClick={decButton}
                                    id="substract-button"
                                    className={`flex w-9 text-lg font-semibold justify-center items-center border ${
                                        qty <= 0
                                            ? `border-slate-400`
                                            : `border-[#1A4D2E] hover:bg-[#1A4D2E]`
                                    } rounded-md active:scale-95 transition:all duration-300 cursor-pointer hover:text-white`}
                                >
                                    -
                                </button>
                                <div
                                    id="qty-number"
                                    className="flex items-center justify-center w-10 text-lg font-semibold"
                                >
                                    {qty}
                                </div>
                                <button
                                    type="button"
                                    onClick={addButton}
                                    id="add-button"
                                    className="flex w-9 text-lg font-semibold justify-center items-center border border-[#1A4D2E] rounded-md hover:bg-[#1A4D2E] hover:text-white active:scale-95 transition:all duration-300 cursor-pointer"
                                >
                                    +
                                </button>
                            </div>
                            <div className="flex flex-col gap-3">
                                <span className="font-semibold">
                                    Choose Size
                                </span>

                                <div className="flex flex-row items-center h-10 gap-8">
                                    {detailProduct?.sizes?.map((item) => (
                                        <button
                                            onClick={() =>
                                                setLocalSelector({
                                                    ...localSelector,
                                                    size: item,
                                                })
                                            }
                                            type="button"
                                            key={`size_${item.id}`}
                                            className={`flex flex-1 h-full text-sm tracking-wide justify-center items-center border ${
                                                localSelector.size.id ===
                                                item.id
                                                    ? "border-[#1A4D2E]"
                                                    : "border-gray-300"
                                            } rounded-md hover:border hover:border-[#1A4D2E] hover:bg-[#1A4D2E] hover:text-white active:scale-95 transition:all duration-300 cursor-pointer`}
                                        >
                                            {item.size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-col gap-3">
                                <span className="font-semibold">
                                    Choose Variant
                                </span>
                                <div className="flex flex-row items-center h-10 gap-8">
                                    {detailProduct?.variants?.map((item) => (
                                        <button
                                            onClick={() =>
                                                setLocalSelector({
                                                    ...localSelector,
                                                    variant: item,
                                                })
                                            }
                                            type="button"
                                            key={`variant_${item.id}`}
                                            className={`flex flex-1 h-full text-sm tracking-wide text-black justify-center items-center border ${
                                                localSelector.variant.id ===
                                                item.id
                                                    ? "border-[#1A4D2E]"
                                                    : "border-gray-300"
                                            } rounded-md hover:border hover:border-[#1A4D2E] hover:bg-[#1A4D2E] hover:text-white active:scale-95 transition:all duration-300 cursor-pointer`}
                                        >
                                            {item.variant}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-row gap-5 mt-8 h-11">
                                <button
                                    type="button"
                                    onClick={addBuy}
                                    className="flex flex-1 text-sm justify-center items-center border border-[#1A4D2E] bg-[#1A4D2E] rounded-md hover:border-[#1A4D2E] text-white active:scale-95 transition:all duration-300 cursor-pointer"
                                    id="buy-button"
                                >
                                    Buy
                                </button>
                                <button
                                    type="button"
                                    onClick={addCart}
                                    className="flex flex-row flex-1 justify-center items-center gap-5 border border-[#1A4D2E] rounded-md hover:border-[#1A4D2E] active:scale-95 transition:all duration-300 cursor-pointer"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col w-full gap-5">
                        <h1 className="text-4xl font-medium tracking-wide text-gray-900">
                            Recommendation{" "}
                            <span className="text-yellow-900">For You</span>
                        </h1>
                        <div className="flex flex-row justify-center w-full gap-5">
                            {bestSeller?.map((item, index) => (
                                <ProductCard
                                    key={index}
                                    id={item?.id}
                                    image={item?.image}
                                    name={item?.name}
                                    description={item?.description}
                                    basePrice={item?.basePrice}
                                    tag={item?.tag}
                                    discount={item?.discount}
                                />
                            ))}
                        </div>

                        <div className="flex flex-row items-center self-center gap-4 pt-5 pb-10">
                            <div className="flex justify-center items-center text-base bg-[#FF9F29] w-9 h-9 rounded-full hover:opacity-90 active:scale-95 transition:all duration-300 cursor-pointer">
                                1
                            </div>
                            <div className="flex justify-center items-center text-base bg-gray-300 w-9 h-9 rounded-full hover:bg-[#FF9F29] hover:opacity-90 active:scale-95 transition:all duration-300 cursor-pointer">
                                2
                            </div>
                            <div className="flex justify-center items-center text-base bg-gray-300 w-9 h-9 rounded-full hover:bg-[#FF9F29] hover:opacity-90 active:scale-95 transition:all duration-300 cursor-pointer">
                                3
                            </div>
                            <div className="flex justify-center items-center text-base bg-gray-300 w-9 h-9 rounded-full hover:bg-[#FF9F29] hover:opacity-90 active:scale-95 transition:all duration-300 cursor-pointer">
                                4
                            </div>
                            <FaCircleChevronRight className="fa-solid fa-circle-chevron-right text-4xl text-[#FF9F29] hover:opacity-90 active:scale-95 transition:all duration-300 cursor-pointer" />
                        </div>
                    </div>
                </main>
            )}
            {/* <!-- /main --> */}
            <Footer />
        </>
    );
};

export default DetailProduct;
