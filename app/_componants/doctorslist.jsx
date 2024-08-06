import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import { useState, useEffect, usePathname} from 'react';


function Doctorslist({ doctorlist, heading = 'Popular Doctors' }) {

    const truncateText = (text, length) => {
        return text.length > length ? text.substring(0, length) + '...' : text;
    };
    
    return (
        <div className='mb-10 px-10'>
            <h2 className='font-bold text-xl px-10'>{heading}</h2>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-4'>
                {doctorlist.length > 0 ? doctorlist.map((item, index) => (
                    <div key={index} className='border-[1px] rounded-lg p-3 cursor-pointer hover:shadow-sm transition-all ease-in-out'>
                        <Image src={item.attributes?.image?.data?.attributes?.url} alt='img' width={500} height={500} className='h-[200px] w-full object-cover rounded-lg' />
                        <div className='mt-3 items-baseline flex flex-col gap-1'>

                            <h2 className='text-[10px] bg-red-100 p-1 rounded-full px-2 text-primary'>
                                {item.attributes?.categories?.data[0]?.attributes?.Name}
                            </h2>
                            
                            <h2 className='font-bold'>{item.attributes.Name}</h2>
                            <h2 className='text-primary text-sm'>{item.attributes.Year_of_Experience} of Experience</h2>
                            <h2 className='text-gray-500 text-sm'>
                                {truncateText(item.attributes?.Address, 31)}
                            </h2>

                        <Link href={'/details/'+item?.id} className='w-full'>
                        <h2 className='p-2 px-3 border-[1px] border-primary text-primary rounded-full w-full text-center text-[11px] mt-2 cursor-pointer hover:bg-primary hover:text-white'>Book Now</h2>
                        </Link>
                        </div>
                    </div>
                )) :
                    [1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
                        <div className='h-[220px] bg-slate-100 w-full rounded-lg animate-pulse'>

                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Doctorslist
