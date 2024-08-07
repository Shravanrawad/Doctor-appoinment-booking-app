'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import globalapi from '../_utils/globalapi'
import Image from 'next/image'
import Link from 'next/link'

function Searchcat() {

    const [categorylist, setcategorylist] = useState([]);

    useEffect(() => {
        getcategorylist();
    }, [])

    const getcategorylist = () => {
        globalapi.getcategory().then(resp => {
            setcategorylist(resp.data.data)
        })
    }

    return (
        <div className='mb-10 flex flex-col px-5 items-center gap-2'>
            <h2 className='font-bold text-4xl tracking-wide'>Search <span className='text-primary'>Doctors</span></h2>
            <h2 className='text-gray-500 text-xl'>Search Your Doctor and Book Appointment</h2>

            <div className="flex w-full mt-3 max-w-sm items-center space-x-2">
                <Input type="text" placeholder="Search..." />
                <Button type="submit"><Search className='h-4 w-4 mr-2' />Search</Button>
            </div>


            <div className='grid grid-cols-3 mt-5 md:grid-cols-4 lg:grid-cols-6'>
                {categorylist.length > 0 ? categorylist.map((item, index) => index < 6 && (
                <Link href={'/search/'+item.attributes.Name}
                     key={index} className='flex flex-col text-center items-center p-5 bg-red-50 m-2 rounded-lg gap-2 cursor-pointer hover:scale-105 transition-all duration-200 ease-in-out'>
                        <Image
                            src={item.attributes?.Icon.data.attributes.url}
                            alt='icon'
                            width={40}
                            height={40}
                        />
                        <label className='cursor-pointer text-primary'>{item?.attributes?.Name}</label>
                    
                </Link>
                )) :
                    [1, 2, 3, 4, 5, 6].map((item, index) => (
                        <div className='h-[87px] w-[87px] bg-slate-100 animate-pulse rounded-lg m-2'>
  
                        </div>
                ))
                }
            </div>
        </div>
    )
}

export default Searchcat
