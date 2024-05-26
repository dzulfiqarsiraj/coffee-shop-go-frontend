const Button = (props) => {

    // eslint-disable-next-line react/prop-types
    const {children, text, className} = props

    return (
        <button {...props} className={`${className} rounded-md flex gap-2 justify-center items-center hover:opacity-90 active:scale-95 transition:all duration-300 cursor-pointer`}>
            {text || children}
        </button>
    )
}

export default Button