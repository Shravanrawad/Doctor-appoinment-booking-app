import { Button } from '@/components/ui/button'
import { GraduationCap, LinkedinIcon, MapPin, Twitter, Youtube } from 'lucide-react'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import Bookappoinment from './bookappoinment';

function Doctor({ doctordata }) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    if (loading) {
        return (
            <>
                <div className='grid grid-cols-1 md:grid-cols-3 border-[1px] p-5 mt-5 rounded-lg animate-pulse'>
                    <div className='bg-gray-200 h-[200px] w-full rounded-lg'></div>
                    <div className='col-span-2 mt-5 flex md:px-10 flex-col gap-3 items-baseline'>
                        <div className='h-8 bg-gray-200 rounded w-1/2'></div>
                        <div className='h-6 bg-gray-200 rounded w-1/3'></div>
                        <div className='h-6 bg-gray-200 rounded w-1/3'></div>
                        <div className='h-8 bg-gray-200 rounded w-1/4'></div>
                        <div className='h-10 bg-gray-200 rounded w-1/4'></div>
                    </div>
                </div>

                <div className='p-3 border-[1px] rounded-lg mt-5 animate-pulse'>
                    <div className='h-6 bg-gray-200 rounded w-1/4 mb-2'></div>
                    <div className='h-20 bg-gray-200 rounded w-full'></div>
                </div>
            </>
        );
    }

    return (
        <>
            <div className='grid grid-cols-1 md:grid-cols-3 border-[1px] p-5 mt-5 rounded-lg'>
                <div>
                    <Image src={doctordata.attributes?.image?.data?.attributes?.url} width={200} height={200} alt='doctor' className='rounded-lg w-full h-[100%] object-cover' />
                </div>

                <div className='col-span-2 mt-5 flex md:px-10 flex-col gap-3 items-baseline'>
                    <h2 className='font-bold text-2xl'>{doctordata.attributes.Name}</h2>
                    <h2 className='flex items-center gap-2 text-gray-500 text-md'>
                        <GraduationCap />
                        <span>{doctordata.attributes.Year_of_Experience} of Experience</span>
                    </h2>
                    <h2 className='text-md flex gap-2 text-gray-500 items-center'>
                        <MapPin />
                        <span>{doctordata.attributes.Address}</span>
                    </h2>
                    <h2 className='text-[10px] bg-red-100 p-1 rounded-full px-2 text-primary'>
                        {doctordata.attributes?.categories?.data[0]?.attributes?.Name}
                    </h2>

                    <div className='flex items-center gap-3 cursor-pointer'>
                        <LinkedinIcon className='h-[30px] w-[30px] text-blue-500' />
                        <Twitter className='h-[30px] w-[30px] text-sky-700' />
                        <Youtube className='h-[30px] w-[30px] text-red-500' />
                    </div>
                    <Bookappoinment doctordata={doctordata}/>
                </div>
            </div>

            <div className='p-3 border-[1px] rounded-lg mt-5'>
                <h2 className='font-bold text-[20px]'>About Me</h2>
                <p className='text-gray-500 tracking-wider'>{doctordata.attributes.About}</p>
            </div>
        </>
    )
}

export default Doctor;
