import { FiMail } from "react-icons/fi";

const EmailInput = (props) => {
    // eslint-disable-next-line react/prop-types
    const {defaultValue} = props
    return (
        <label htmlFor="email" className="flex flex-col gap-2">
            <span className="font-semibold text-lg">Email</span>
            <div className="flex flex-row items-center border h-14 border-gray-300 rounded-lg px-4 gap-4">
                <div>
                    <FiMail className="text-gray-500" />
                </div>
                <input defaultValue={defaultValue} className="flex-1 outline-none placeholder:text-sm placeholder:text-gray-500" id="email" type="email" name="email" placeholder="Enter Your Email" autoComplete="on"/>
            </div>
        </label>
    )

}

export default EmailInput