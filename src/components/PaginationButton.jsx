const PaginationButton = (props) => {
    // eslint-disable-next-line react/prop-types
    const {className,text, onClick} = props
    return (
        <button onClick={onClick} className={`${className} flex justify-center items-center text-xs md:text-base w-6 h-6 md:w-9 md:h-9 rounded-full hover:bg-orange-500 hover:opacity-90 active:scale-95 transition:all duration-300 cursor-pointer`}>{text}</button>
    )
}

export default PaginationButton