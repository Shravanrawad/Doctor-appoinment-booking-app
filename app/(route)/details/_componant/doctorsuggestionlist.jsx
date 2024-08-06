import globalapi from '@/app/_utils/globalapi';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import Link from 'next/link';

function Doctorsuggestionlist() {

  const [docctorlist, setdoctorlist] = useState([]);
  useEffect(() => {
        console.log('this is' ,docctorlist)
        getdoctorlist();
  },[])
  
  const getdoctorlist =() => {
    globalapi.getDoctorlist().then(rep => {
        setdoctorlist(rep.data.data)
    })
  }

  return (
    <div className='p-4 border-[1px] mt-5 md:ml-5 rounded-lg h-[100%] md:h-[409px] overflow-y-scroll'>
        <h2 className='mb-3 font-bold'>Suggestions</h2>
         
        {docctorlist.map((item, index) => (
          <Link href={`/details/${item.id}`} key={index}>
            <div className='mb-4 p-3 shadow-sm w-full cursor-pointer hover:bg-slate-100 rounded-lg flex items-center gap-3'>
                <Image src={item?.attributes?.image?.data?.attributes?.url} height={70} width={70} className='w-[70px] h-[70px] rounded-full object-cover' alt='doctor'/>

            <div className='flex flex-col gap-1'>
           
            <h2 className='text-sm font-semibold'>{item?.attributes?.Name}</h2>
            <p className='text-sm text-gray-500'>{item?.attributes?.Year_of_Experience}</p>
            <h2 className='text-[10px] text-center bg-red-100 p-1 rounded-full px-1 text-primary'>
                {item?.attributes?.categories?.data[0]?.attributes?.Name}
            </h2>
        </div>
            </div>
          </Link>
        ))}  

    </div>
  )
}

export default Doctorsuggestionlist
