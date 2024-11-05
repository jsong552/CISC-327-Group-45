import React from 'react';

export const Sales = () => {
 
  return (
    <div className='w-full'>
            <div className='bg-white'>
                <div className="flex">
                    <div className="p-12 flex gap-4 h-6">
                        <p className="text-4xl font-semibold text-stone-700">Sales</p>
                    </div>
                </div>

                <div className="ml-12">
                    <p className="text-lg">All sales of the pharmacy.</p>
                </div>


                <div className="flex flex-col">
                    <div className="flex flex-row ml-12 mt-6 border border-gray-400 rounded round-xl w-5/6">
                        <div className='border border-gray round-md p-4 w-1/4'>
                            <p className="text-center font-bold">Order ID</p>
                        </div>
                        <div className='border border-gray round-md p-4 w-1/4'>
                            <p className="text-center font-bold">Date & Time</p>
                        </div>
                        
                        
                    </div>

                </div>
            </div>
        </div>
  );
};

