import React from 'react'
import { FiLock, FiEye, FiEyeOff } from "react-icons/fi";

const PasswordInput = (props) => {

    // eslint-disable-next-line react/prop-types
    const {text, placeholder, id, name, defaultValue} = props

    const [type, setType] = React.useState('password');
    const [icon, setIcon] = React.useState(<FiEyeOff className='text-gray-500'/>);

    const handleToggle = () => {
        if(type === 'password'){
            setIcon(<FiEye className='text-gray-500'/>)
            setType('text')
        } else {
            setIcon(<FiEyeOff className='text-gray-500'/>)
            setType('password')
        }
    }


    return (                    
        <label htmlFor={id} className="flex flex-col gap-2">
            <span className="font-semibold text-lg">{text}</span>
            <div className="flex flex-row items-center border h-14 border-gray-300 rounded-lg px-4 gap-4">
                <div>
                    <FiLock className='text-gray-500'/>
                </div>
                <input defaultValue={defaultValue} className="flex-1 outline-none placeholder:text-sm placeholder:text-gray-500" id={id} type={type} name={name} placeholder={`${placeholder}`} autoComplete='on'/>
                <div className="flex items-center">
                    <button onClick={handleToggle} type="button">
                       {icon} 
                    </button>
                </div>
            </div>
        </label>
    );
}

export default PasswordInput