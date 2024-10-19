import React from 'react';

const Navbar: React.FC = () => {
    return (
    
        <div className='flex fixed gap-3 bg-[#F7FAFD] h-16'>
            <div className="flex w-1/5 bg-[#FFFFFF]">
                <div>
                    <img src= "./healthSymbol.svg" alt="health symbol" className='items-center ml-10'/> 
                    </div>
                <div>
                <div className='mt-2 ml-4'>
                    <p className='text-[30px] text-[#000000] font-bold'>Pharma 237</p>    
                    
                </div>    
                    

                    
            </div>            
        </div>
            
            

            
            <div className="bg-[#F7FAFD] flex items-center w-screen">

   
                
                <div className="flex bg-[#E3EBF3] rounded">
                    <input 
                        
                        type='text' 
                        placeholder='Search inventory.' 
                        className="text-[12px] px-2 py-5 focus:outline-none bg-[#e3ebf3] text-black h-2 w-80" 
                    />

                    <img 
                        src="./searchicon.svg" 
                        alt="search icon"
                        className="right-0 p-3" 
                        
                        
                    
                    />   
                </div>
            </div>
        </div>


    );
};

export default Navbar;


