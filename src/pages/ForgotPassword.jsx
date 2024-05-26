import React from 'react';
import BrandLogo from '../components/BrandLogo';
import Button from '../components/Button';
import EmailInput from '../components/EmailInput';

const ForgotPassword = () => {

    const [forgotPasswordInfo, setForgotPasswordInfo] = React.useState('')

    const forgotPasswordProcess = (e) => {
        e.preventDefault()
        setForgotPasswordInfo(<span className="text-neutral-600 text-sm mb-5">We will send new password to your email</span>)
        setTimeout(() => {
            window.open(`${import.meta.env.VITE_FRONTEND_URL}/login`)
        },3000)
    }

    return (
        <main  className="flex flex-col w-screen h-screen sm:flex-row">
        <section className="hidden md:flex w-4/12 bg-[url('../assets/bg_forgot-password.png')] bg-cover bg-center">
        </section>
        <section className="flex flex-col flex-1 bg-white justify-center items-center px-10">
            <div className="flex flex-col max-w-3xl w-full bg-white h3/6 mt-16 mb-16">
                <BrandLogo />
                <h1 className="font-semibold text-2xl text-yellow-800 tracking-wide mb-5">Fill out the form correctly</h1>
                {forgotPasswordInfo}
                <form onSubmit={forgotPasswordProcess} className="flex flex-col gap-6">
                    <EmailInput />
                    <Button type='submit' className="bg-[#1A4D2E] py-3 text-white">Submit</Button>
                </form>
            </div>
        </section>
    </main>
    )
};

export default ForgotPassword