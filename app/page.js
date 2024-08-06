'use client'

import { Button } from "@/components/ui/button";
import Hero from "./_componants/hero";
import Searchcat from "./_componants/searchcat";
import Doctorslist from "./_componants/doctorslist";
import globalapi from "./_utils/globalapi";
import { useEffect, useState } from "react";

export default function Home() {

  const [doctorlist, setdoctorlist] = useState([])

  useEffect(() => {
        getdoctorlist();
  }, [])

  const getdoctorlist =() => {
       globalapi.getDoctorlist().then(resp => {
        console.log('this is doctorlist', resp.data.data);
        setdoctorlist(resp.data.data);
       }) 
  } 

  return (
   <div>
      <Hero/>
      <Searchcat/>
      <Doctorslist doctorlist={doctorlist}/>
   </div>
  );
}
