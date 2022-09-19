import clsx from "clsx"

export default function Button({children, outline, className, ...rest}) {
    
    const classNames = clsx(
        {
        "btn": true, // allways add btn
        "btn-default": !outline, // add btn-default when they are no props outline
        "btn-outline": outline, // add btn-outline when they are a props outline
        },
        className // add the class what u want
    )

    return <button className={classNames} {...rest}>{children}</button>
}