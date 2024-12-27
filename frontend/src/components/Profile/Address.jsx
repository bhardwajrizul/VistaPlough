import { motion } from "framer-motion";

import pincodeDirectory from 'india-pincode-lookup';

import { useState, useEffect } from "react";

import toast from "react-hot-toast";

import { useUserStore } from "../../stores/useUserStore";
import { Loader } from "lucide-react";

const Address = ({ user }) => {

    
    const { patchShippingDetails, loading, userUpdated } = useUserStore();
    
    useEffect(() => {
        if (userUpdated) {
            setAddress({
                address: user?.address?.address || "",
                landmark: user?.address?.landmark || "",
                city: user?.address?.city || "",
                state: user?.address?.state || "",
                pincode: user?.address?.pincode || "",
                disabled: true
            });
        }
    }, [userUpdated, user])

    const [address, setAddress] = useState({
        country: "India",
        address: user?.address?.address || "",
        landmark: user?.address?.landmark || "",
        city: user?.address?.city || "",
        state: user?.address?.state || "",
        pincode: user?.address?.pincode || "",
        disabled: true
    })

    const handlePincodeChange = (e) => {
        const newValue = e.target.value;
        if (newValue.toString().length <= 5) {
            setAddress({
                ...address,
                pincode: newValue,
                city: '',
                state: ''
            });
        } else if (newValue.toString().length === 6) {
            try {
                const pincodeInfo = pincodeDirectory.lookup(newValue);
                setAddress({
                    ...address,
                    pincode: newValue,
                    city: pincodeInfo[0].districtName,
                    state: pincodeInfo[0].stateName
                });
            } catch (err) {  // eslint-disable-line
                setAddress({
                    ...address,
                    pincode: '',
                    city: '',
                    state: ''
                });
                toast.error('Invalid Pincode');
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        patchShippingDetails({
            address: address.address,
            landmark: address.landmark,
            city: address.city,
            state: address.state,
            pincode: address.pincode
        });
    }

    return (
        <motion.form
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            onSubmit={(e) => handleSubmit(e)}
            className="basis-[65%] flex flex-col mt-4">

            <motion.h1
                initial={{ opacity: 0, y: -40, x: -40 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-3xl text-center mb-4 u-font-sarasvati mt-8">
                Your Shipping Address
            </motion.h1>
            <div className="w-full">
                <label htmlFor="address-input" className="u-font-wasted">
                    <span className="text-lg text-slate-600">Address</span>
                </label>
                <input
                    id="address-input"
                    type="text"
                    onChange={(e) => setAddress({ ...address, address: e.target.value })}
                    value={address.address}
                    className={`${!address.disabled && 'u-border-accent-bold'} u-input w-full rounded-[10px] text-xl py-1 px-2 u-font-wasted outline-none`}
                    disabled={address.disabled}
                />
            </div>
            <div className="w-full">
                <label htmlFor="landmark-input" className="u-font-wasted">
                    <span className="text-lg text-slate-600">Landmark {'(Optional)'}</span>
                </label>
                <input
                    id="landmark-input"
                    type="text"
                    onChange={(e) => setAddress({ ...address, landmark: e.target.value })}
                    value={address.landmark}
                    className={`${!address.disabled && 'u-border-accent-bold'} u-input w-full rounded-[10px] text-xl py-1 px-2 u-font-wasted outline-none`}
                    disabled={address.disabled}
                />
            </div>
            <div className="flex flex-row items-center justify-start">
                <div className="w-1/2">
                    <label htmlFor="country-input" className="u-font-wasted">
                        <span className="text-lg text-slate-600">Country</span>
                    </label>
                    <input
                        id="country-input"
                        type="text"
                        value={address.country || 'India'}
                        className={`u-input w-full rounded-[10px] text-xl py-1 px-2 u-font-wasted outline-none`}
                        disabled={true}
                    />
                </div>
                <div className="w-1/2">
                    <label htmlFor="pincode-input" className="u-font-wasted">
                        <span className="text-lg text-slate-600">Pincode</span>
                    </label>
                    <input
                        id="pincode-input"
                        type="text"
                        onChange={handlePincodeChange}
                        value={parseInt(address.pincode) || ''}
                        className={`u-input w-full rounded-[10px] ${!address.disabled && 'u-border-accent-bold'} text-xl py-1 px-2 u-font-wasted outline-none`}
                        disabled={address.disabled}
                    />
                </div>
            </div>
            <div className="flex flex-row items-center justify-start">
                <div className="w-1/2">
                    <label htmlFor="city-input" className="u-font-wasted">
                        <span className="text-lg text-slate-600">City</span>
                    </label>
                    <input
                        id="city-input"
                        type="text"
                        value={address.city}
                        className={`u-input w-full rounded-[10px] text-xl py-1 px-2 u-font-wasted outline-none`}
                        disabled={true}
                    />
                </div>
                <div className="w-1/2">
                    <label htmlFor="state-input" className="u-font-wasted">
                        <span className="text-lg text-slate-600">State</span>
                    </label>
                    <input
                        id="state-input"
                        type="text"
                        value={address.state}
                        className={`u-input w-full rounded-[10px] text-xl py-1 px-2 u-font-wasted outline-none`}
                        disabled={true}
                    />
                </div>
            </div>
            <div className="flex flex-row justify-center gap-4">
                {
                    address.disabled && !loading && (
                        <button
                            type="button"
                            onClick={() => setAddress({ ...address, disabled: false })}
                            className={`u-bg-tertiary text-center px-10 mt-4 shadow-[0px_4px_0px_rgba(0,0,0,0.3)] active:translate-y-[4px] active:shadow-[0px_0px_0px_rgba(0,0,0,0.3)] transition-all rounded-xl py-2 u-font-sarasvati text-lg u-text-white
                                transition duration-150 ease-in-out disabled:opacity-50`}
                        >
                            Edit Shipping Details
                        </button>
                    )
                }
                {
                    !address.disabled && !loading && (
                        <button
                            type="submit"
                            className={`text-center px-10 mt-4 shadow-[0px_4px_0px_rgba(0,0,0,0.3)] active:translate-y-[4px] active:shadow-[0px_0px_0px_rgba(0,0,0,0.3)] transition-all rounded-xl py-2 u-font-sarasvati text-lg u-text-white
                                transition duration-150 ease-in-out disabled:opacity-50 u-bg-primary`}
                        >
                            Update Shipping Details
                        </button>
                    )
                }
                {
                    !address.disabled && loading && (
                        <div className="mt-4">
                            <Loader className='mr-2 h-6 w-6 animate-spin inline' aria-hidden='true' />
                            Updating Shipping Details...
                        </div>
                    )
                }
                {
                    !address.disabled && !loading && (
                        <button
                            type="button"
                            onClick={() => setAddress(
                                {
                                    address: user?.address?.address || "",
                                    landmark: user?.address?.landmark || "",
                                    city: user?.address?.city || "",
                                    state: user?.address?.state || "",
                                    pincode: user?.address?.pincode || "",
                                    disabled: true
                                }
                            )}
                            className="text-center px-10 mt-4 shadow-[0px_4px_0px_rgba(0,0,0,0.3)] active:translate-y-[4px] active:shadow-[0px_0px_0px_rgba(0,0,0,0.3)] transition-all rounded-xl py-2 u-font-sarasvati text-lg u-text-white u-bg-primary"
                        >
                            Cancel
                        </button>
                    )
                }

            </div>
            <div className="text-center font-bold u-bg-secondary p-2 rounded-[15px] u-border-accent u-box-shadow mt-8 text-md text-slate-600 u-font-wasted">
                For Shipping outside India, please contact us at&nbsp;
                <a
                    className="text-blue-500"
                    target="_blank"
                    href="mailto:your@email.address">
                    your@email.address
                </a>
            </div>
        </motion.form>
    )
}

export default Address;