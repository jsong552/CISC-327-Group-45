import React from 'react'

export const DashboardComponent = ({ image, borderColor, color, title, subtitle, desc, link }) => {
    const outerDivClassName = `h-64 border-2 border-[${borderColor}] flex flex-col items-center justify-between`;
    
    return (
        <div className={outerDivClassName}>
            <div className="flex flex-col items-center justify-around h-40 pt-8">
                <img 
                    src={image}
                    alt="add medicine icon"
                    className="w-[50px] h-[50px]"
                />
                <p className="font-bold text-3xl">{title}</p>
                <p className="font-semibold text-xl">{subtitle}</p>
            </div>
            <div className={`h-12 bg-[${color}] border-t-2 border-t-[${borderColor}] w-full`}>
                <div className="mx-auto w-2/3 h-full flex flex-col justify-around">
                    <div className="w-fit mx-auto">     
                        <div className="flex flex-row w-full gap-2">
                            <p>{desc}</p>
                            <img 
                                src="/arrowIcon.svg"
                                alt="arrow icon"
                                className="w-[15px] h-[15px] relative top-[5px]"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}