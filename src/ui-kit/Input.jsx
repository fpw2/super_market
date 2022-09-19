import clsx from "clsx"

export default function Input({className, placeholder, type="text", required, ...rest}) {

    const classNames = clsx("input", className) // "input": true => allways this class
    
    return <>
        <label className="label">
        {placeholder}
            {required && <span className="input-required">*</span>}
            <div>
                <input 
                    className={classNames}
                    placeholder={placeholder}
                    type={type} 
                    required={required} 
                    {...rest}
                />
            </div>
        </label>
    </>
}