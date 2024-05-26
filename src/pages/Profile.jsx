import React from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import FullNameInput from '../components/FullNameInput'
import EmailInput from '../components/EmailInput'
import PasswordInput from '../components/PasswordInput'
import PhoneNumberInput from '../components/PhoneNumberInput'
import AddressInput from '../components/AddressInput'
import Button from '../components/Button'
import { FiUser } from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux'
import { setProfile as setProfileAction } from '../redux/reducers/profile'

const Profile = () => {

    // const [user, setUser] = React.useState({})
    const user = useSelector(state => state.profile.data)
    const [successMessage, setSuccessMessage] = React.useState(null)
    const [uploadSuccessMessage, setUploadSuccessMessage] = React.useState('')
    const [preview, setPreview] = React.useState()
    const token = useSelector(state => state.auth.token)
    const dispatch = useDispatch()

    // const getProfile = () => {
    //     axios.get(`${import.meta.env.VITE_BACKEND_URL}/profile`,{
    //         headers: {
    //             'Authorization' : `Bearer ${token}`
    //         }
    //     }).then(({data}) => {
    //         setUser(data.results)
    //     })
    // }

    React.useEffect(()=>{
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
        // getProfile()
    },[])

    React.useEffect(() => {
        if(successMessage){
            setTimeout(()=>{
                setSuccessMessage(null)
            },2000)
        }
    },[successMessage])

    const updateProfileData = async (e) => {
        e.preventDefault()
        const form = new FormData()
        const fields = ['fullName','email','phoneNumber','password','address']
        fields.forEach((field) => {
            if(e.target[field]){
                form.append(field, e.target[field].value)
            }
        })

        const {data} = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/customer/profile`, form, {
            headers: {
                'Content-Type' : 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
        })
        setSuccessMessage(data.message)
        // setUser(data.results)
        dispatch(setProfileAction(data.results))
    }

    const changePicture = (e) => {
        const pictureUrl = URL.createObjectURL(e.target.files[0])
        setPreview(pictureUrl)
    }

    const uploadPhoto = async (e) => {
        e.preventDefault()
        try {
            const [file] = e.target.pictures.files
            if(file){
                const form = new FormData()
                form.append('pictures',file)
                const {data: res} = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/customer/profile`, form, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type' : 'multipart/form-data'
                    }
                })

                // setUser(res.results)
                dispatch(setProfileAction(res.results))
                setPreview(null)
                setUploadSuccessMessage(<p className='self-center text-xl text-green-500'>{res.message}</p>)
                setTimeout(() => {
                    setUploadSuccessMessage('')
                },2000)
            }
        } catch (err) {
            setUploadSuccessMessage(<p className='self-center text-xl text-red-500'>{err.message}</p>)
            setTimeout(() => {
                setUploadSuccessMessage('')
            },2000)
        }

    }
    return (
        <>
            <Navbar className='bg-black' />
            {/* <!-- main --> */}
            <main className="flex flex-col p-6 pt-20 bg-white h-fit md:p-24">
                {uploadSuccessMessage}
                <div className="flex flex-row self-center gap-5 py-10 md:self-start">
                    <h1 className="text-4xl font-medium tracking-wide text-gray-900">Profile</h1>
                </div>
                {/* <!-- column-1 --> */}
                <div className="flex flex-col-reverse flex-1 gap-3 h-fit md:flex-row-reverse ">
                    <form onSubmit={updateProfileData} className="flex flex-col flex-1 gap-4 p-5 bg-white border border-gray-200 rounded-md">
                        <FullNameInput defaultValue={user.fullName} />
                        <EmailInput defaultValue={user.email} />
                        <PhoneNumberInput defaultValue={user.phoneNumber} />
                        <PasswordInput defaultValue={user.password} htmlFor={'password'} id={'password'} type={'password'} name={'password'} text='Password' placeholder='Enter Your Password'/>
                        <AddressInput defaultValue={user.address} />
                        {successMessage && <div className='self-center text-xl text-green-700'>{successMessage}</div>}
                        <Button type='submit' text='Submit' className='py-3 bg-orange-500'/>
                    </form>

                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col items-center w-full gap-2 p-5 bg-white border border-gray-200 rounded-md md:max-w-xs">
                            <span className="text-3xl font-semibold tracking-wide text-center md:text-xl">{user.fullName}</span>
                            <span className='text-base md:text-xs'>{user.email}</span>
                            <form onSubmit={uploadPhoto} className='flex flex-col items-center justify-center'>
                                <label className='relative flex mb-2 overflow-hidden rounded-full cursor-pointer'>
                                    {(!preview && !user?.pictures) && <FiUser className='text-9xl'/>}
                                    {(!preview && user?.pictures) && <img src={user?.pictures} className='max-w-[9rem] w-full h-full object-cover'/>}
                                    {preview && <img src={preview} className='max-w-[9rem] w-full h-full object-cover'/>}

                                    {preview && <div className='absolute w-full h-full bg-[rgba(0,0,0,0.5)]'></div>}

                                    <input multiple={false} onChange={changePicture} type="file" name='pictures' className='hidden'/>
                                </label>
                                <button className="flex items-center justify-center h-10 px-10 text-xs duration-300 bg-orange-500 border border-orange-500 rounded-md cursor-pointer hover:borde-orange-500 active:scale-95 transition:all">Upload New Photo</button>
                            </form>
                            <span className='text-xs'>Since <strong>20 January 2022</strong></span>
                        </div>
                    </div>
                </div>
            </main>
            {/* <!-- /main --> */}
            <Footer />
        </>
    )
}

export default Profile