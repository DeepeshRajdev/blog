import React, { forwardRef, useId } from "react";

const Input = forwardRef(({ label, type = 'text', className = '', ...props }, ref) => {
    let id = useId();
    return (
        <>
            {label && (<label className="text-violet-900" htmlFor={id}>{label}</label>)}
            <input type={type} id={id} className={`${className}`} ref={ref} {...props} />
        </>
    )
})
export default Input