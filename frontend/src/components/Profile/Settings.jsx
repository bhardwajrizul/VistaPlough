import { motion } from "framer-motion";

import { useState } from "react";

const Settings = () => {

    const [updatePassword, setupdatePassword] = useState({
        oldPassword: "",
        password: "",
        confirmPassword: "",
    });

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
                Change Password
            </motion.h1>
            <label htmlFor="old-password-input" className="u-font-wasted">
                <span className="text-lg text-slate-600">Current Password</span>
            </label>
            <input
                id="old-password-input"
                type="password"
                value={updatePassword.oldPassword}
                onChange={(e) => setupdatePassword({ ...updatePassword, oldPassword: e.target.value })}
                className={`u-input w-full rounded-[10px] text-xl py-2 px-2 u-border-accent-bold u-font-wasted outline-none`}
            />
            <label htmlFor="password-input" className="u-font-wasted">
                <span className="text-lg text-slate-600">New Password</span>
            </label>
            <input
                id="password-input"
                type="password"
                value={updatePassword.password}
                onChange={(e) => setupdatePassword({ ...updatePassword, password: e.target.value })}
                className={`u-input w-full text-xl rounded-[10px] py-2 px-2 u-border-accent-bold u-font-wasted outline-none`}
            />
            <label htmlFor="confirm-password-input" className="u-font-wasted">
                <span className="text-lg text-slate-600">Confirm Password</span>
            </label>
            <input
                id="confirm-password-input"
                type="password"
                value={updatePassword.confirmPassword}
                onChange={(e) => setupdatePassword({ ...updatePassword, confirmPassword: e.target.value })}
                className={`u-input w-full text-xl rounded-[10px] py-2 px-2 u-border-accent-bold u-font-wasted outline-none`}
            />
            <div className="flex flex-row justify-center gap-4">
                <button
                    type="button"
                    onClick={() => setupdatePassword({ ...updatePassword, disabled: !updatePassword.disabled })}
                    className={`u-bg-tertiary text-center px-10 mt-4 shadow-[0px_4px_0px_rgba(0,0,0,0.3)] active:translate-y-[4px] active:shadow-[0px_0px_0px_rgba(0,0,0,0.3)] transition-all rounded-xl py-3 u-font-sarasvati text-lg u-text-white
                                transition duration-150 ease-in-out disabled:opacity-50`}
                >
                    {'Update Password'}
                </button>
            </div>
        </motion.div>
    )
}

export default Settings;