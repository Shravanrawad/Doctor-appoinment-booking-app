'use client'
import Doctorslist from '@/app/_componants/doctorslist';
import globalapi from '@/app/_utils/globalapi'
import React, { useEffect, useState } from 'react'

function Search({params}) {

  const [doctorlist, setdoctorlist] = useState([]);

  useEffect(() => {
    getdoctors();
  }, [params])

  const getdoctors =() => {
    globalapi.getdoctorsbycategory(params.cname).then(resp => {
      setdoctorlist(resp.data.data)
    })
  }

  return (
    <div>
     <Doctorslist heading={params.cname} doctorlist={doctorlist} />
    </div>

  )
}

export default Search
