import React from 'react';

const Navbar: React.FC = () => {
    return (
        <div className="bg-[#F7FAFD] flex items-center gap-2.5">
            <img src="./logoPharma.svg" alt="logo" className="h-14" />
            
            
            <div className="flex relative bg-[#E3EBF3] rounded">
                <input 
                    
                    type='text' 
                    placeholder='Search inventory.' 
                    className="text-[12px] px-2 py-5 focus:outline-none bg-[#e3ebf3] text-black h-2 w-60" 
                />

                <img 
                    src="./searchicon.svg" 
                    alt="search icon"
                    className="right-0 p-3" 
                    
                    
                
                />   
            </div>
        </div>



    );
};

export default Navbar;