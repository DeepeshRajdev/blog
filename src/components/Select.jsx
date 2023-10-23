import { forwardRef, useId } from "react";

const Select = forwardRef(({ options, label, className, ...props }, ref) => {
    const id = useId();
    return (
        <>
            {label && <label className="text-violet-900" htmlFor={id}>{label}</label>}
            <select name="select" id={id} ref={ref} className={`${className}`}>
                {
                    options?.map((item) => <option value={item} key={item}>{item}</option>)
                }
            </select>
        </>
    )
})
export default Select