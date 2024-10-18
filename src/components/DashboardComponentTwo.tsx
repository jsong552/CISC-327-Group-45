import React from 'react'

export const DashboardComponentTwo = ({ no1, no2, title, subtitle, text1, text2 }) => {
    return (
        <div className="border-2 border-[#d7d8da] rounded-lg h-48 flex flex-col">
            <div className="px-8 flex flex-row border-b-2 border-b-[#d7d8da] h-12 w-full justify-between items-center">
                <p className="text-center font-bold text-xl">{title}</p>
                <div className="flex flex-row gap-4 items-center">
                    <p>{subtitle}</p>
                    <img 
                        src="/arrowIcon.svg"
                        alt="Arrow icon"
                        className="w-[10px] h-[10px]"
                    />
                </div>
            </div>
            
            <div className="px-8 pt-8 grid grid-cols-2 gap-8">
                <div className="flex flex-col gap-1">
                    <p className="font-bold text-2xl">{no1}</p>
                    <p className="text-lg">{text1}</p>
                </div>
                <div className="flex flex-col gap-1">
                    <p className="font-bold text-2xl">{no2}</p>
                    <p className="text-lg">{text2}</p>
                </div>
            </div>
        </div>
    )
}
