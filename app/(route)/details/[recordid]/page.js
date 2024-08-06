'use client'

import globalapi from '@/app/_utils/globalapi'
import React, { useEffect, useState } from 'react'
import Doctor from '../_componant/doctor';
import Doctorsuggestionlist from '../_componant/doctorsuggestionlist';

function Details({params}) {

  const [doctordata, setdoctordata] = useState();

  useEffect(() => {
        getdoctorbyid();
  }, [])

  const getdoctorbyid = () => {
    globalapi.getdoctorbyid(params?.recordid).then(resp => {
        setdoctordata(resp.data.data)  
    }) 
  } 

  return (
    <div className='p-5 md:px-20'>
      <h2 className='font-bold text-[22px]'>Details</h2>
      <div className='grid grid-cols-1 md:grid-cols-4'>

           <div className='col-span-3'>
              {doctordata && <Doctor doctordata={doctordata}/>}
           </div>

           <div>
              <Doctorsuggestionlist/>
           </div>

      </div>
    </div>
  )
}

export default Details
