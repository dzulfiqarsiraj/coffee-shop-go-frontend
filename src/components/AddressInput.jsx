import { FiMapPin } from "react-icons/fi";

const AddressInput = (props) => {

    // eslint-disable-next-line react/prop-types
    const {defaultValue} = props
    return (
        <label htmlFor="address" className="flex flex-col gap-2">
            <span className="font-semibold text-lg">Address</span>
            <div className="flex flex-row items-center border h-28 border-gray-300 rounded-lg px-4 gap-4">
                <div>
                    <FiMapPin className="text-gray-500" />
                </div>
                <textarea defaultValue={defaultValue} className="box-border flex-1 md:p-2 outline-none placeholder:text-sm placeholder:text-gray-500" id="address" name="address" placeholder="Enter Your Address" autoComplete="on"/>
            </div>
        </label>
    )

}

export default AddressInput