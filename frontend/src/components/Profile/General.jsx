import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { useUserStore } from "../../stores/useUserStore";

import CountryCode from "./CountryCode";
import Address from "./Address";

import { Loader } from "lucide-react";

const General = ({ user }) => {

    const { userUpdated, loading, patchUserDetails } = useUserStore();

    useEffect(() => {
        if (userUpdated) {
            setUserData({
                name: user.name,
                countryCode: user?.number?.countryCode || '+91',
                phone: user?.number?.value || '',
                disabled: true
            });
        }
    }, [userUpdated, user])

    const [userData, setUserData] = useState({
        name: user.name,
        countryCode: user?.number?.countryCode || '+91',
        phone: user?.number?.value || '',
        disabled: true
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        patchUserDetails({
            name: userData.name,
            countryCode: userData.countryCode,
            phone: userData.phone
        });
    };


    return (
        <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="basis-[65%] flex flex-col gap-4 p-4">
            <motion.h1
                initial={{ opacity: 0, y: -40, x: -40 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-3xl text-center mb-4 u-font-sarasvati mt-8">
                Personal Details
            </motion.h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name-input" className="u-font-wasted">
                    <span className="text-xl text-slate-600">Name</span>
                </label>
                <input
                    id="name-input"
                    type="text"
                    value={userData.name}
                    onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                    className={`u-input w-full rounded-[10px] text-2xl py-2 px-2 u-font-wasted outline-none ${userData.disabled ? 'border-none cursor-not-allowed' : 'u-border-accent-bold'}`}
                    disabled={userData.disabled}
                />
                <label htmlFor="email-input" className="u-font-wasted">
                    <span className="text-xl text-slate-600">Email </span>
                </label>
                <input
                    id="email-input"
                    type="email"
                    value={user.email}
                    className={`u-input w-full rounded-[10px] text-2xl py-2 px-2 u-font-wasted outline-none border-none cursor-not-allowed`}
                    disabled={true}
                />
                <label htmlFor="phone-input" className="u-font-wasted">
                    <span className="text-xl text-slate-600">Phone </span>
                </label>
                <div className="flex flex-row items-center gap-2">
                    {
                        userData.disabled ? (
                            <label className="u-font-wasted">
                                <span className="text-xl text-slate-600">{userData.countryCode} </span>
                            </label>
                        ) : (
                            <CountryCode
                                userData={userData}
                                setUserData={setUserData}
                            />
                        )
                    }

                    <input
                        id="phone-input"
                        type="number"
                        inputMode="numeric"
                        value={parseInt(userData.phone)}
                        onChange={(e) => {
                            setUserData({ ...userData, phone: parseInt(e.target.value) })
                        }}
                        className={`u-input w-full rounded-[10px] text-2xl py-2 px-2 u-font-wasted outline-none ${userData.disabled ? 'border-none cursor-not-allowed' : 'u-border-accent-bold'}`}
                        disabled={userData.disabled}
                        placeholder="Enter your phone number"
                    />
                </div>

                <div className="flex flex-row justify-center items-center gap-4">

                    {
                        userData.disabled && !loading && (
                            <button
                                type="button"
                                onClick={() => setUserData({ ...userData, disabled: false })}
                                className={`u-bg-tertiary text-center px-4 mt-4 shadow-[0px_4px_0px_rgba(0,0,0,0.3)] active:translate-y-[4px] active:shadow-[0px_0px_0px_rgba(0,0,0,0.3)] transition-all rounded-xl py-2 u-font-sarasvati text-lg u-text-white 
							transition duration-150 ease-in-out disabled:opacity-50`}
                            >
                                Edit Personal Details
                            </button>
                        )
                    }
                    {
                        !userData.disabled && !loading && (
                            <button
                                type="submit"
                                className={`u-bg-tertiary text-center px-4 mt-4 shadow-[0px_4px_0px_rgba(0,0,0,0.3)] active:translate-y-[4px] active:shadow-[0px_0px_0px_rgba(0,0,0,0.3)] transition-all rounded-xl py-2 u-font-sarasvati text-lg u-text-white 
							transition duration-150 ease-in-out disabled:opacity-50 u-bg-primary`}
                            >

                                Update Details
                            </button>
                        )
                    }
                    {
                        !userData.disabled && loading && (
                            <div className="mt-4">
                                <Loader className='mr-2 h-6 w-6 animate-spin inline' aria-hidden='true' />
                                Updating Details...
                            </div>
                        )
                    }
                    {
                        !userData.disabled && !loading && (
                            <button
                                type="button"
                                onClick={() => setUserData(
                                    {
                                        name: user.name,
                                        countryCode: user?.number?.countryCode || '+91',
                                        phone: user?.number?.value || '',
                                        disabled: true
                                    }
                                )}
                                className={`u-bg-tertiary text-center px-4 mt-4 shadow-[0px_4px_0px_rgba(0,0,0,0.3)] active:translate-y-[4px] active:shadow-[0px_0px_0px_rgba(0,0,0,0.3)] transition-all rounded-xl py-2 u-font-sarasvati text-lg u-text-white 
							transition duration-150 ease-in-out disabled:opacity-50  ${userData.disabled ? 'u-bg-tertiary' : 'u-bg-primary'}`}
                            >
                                Cancel
                            </button>
                        )
                    }
                    {
                        userData.disabled && !loading &&
                        <button
                            type="button"
                            className={`u-bg-tertiary text-center px-10 mt-4 shadow-[0px_4px_0px_rgba(0,0,0,0.3)] active:translate-y-[4px] active:shadow-[0px_0px_0px_rgba(0,0,0,0.3)] transition-all rounded-xl py-2 u-font-sarasvati text-lg u-text-white 
							transition duration-150 ease-in-out disabled:opacity-50 `}
                        >
                            Verify Number
                        </button>
                    }
                </div>
            </form>
            <Address user={user} />
        </motion.div >
    )
}

export default General;