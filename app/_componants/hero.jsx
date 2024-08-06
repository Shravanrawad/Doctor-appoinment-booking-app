import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

function Hero() {
  return (
  <section>
  <div className="mx-auto max-w-screen-xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-10">
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
      <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full">
        <Image
          alt=""
          width={800}
          height={800}
          src='/doctor.jpg'
          className="absolute inset-0 h-full rounded-3xl w-full object-cover"
        />
      </div>

      <div className="lg:py-24">
        <h2 className="text-3xl font-bold sm:text-4xl">Find & Book <span className='text-primary'>Appointments</span> with Top <span className='text-primary'> Doctors</span></h2>

        <p className="mt-4 text-gray-600">
        "Welcome to our Doctor Appointment App! Easily schedule your medical appointments with 
         top-rated healthcare professionals in just a few clicks.Whether you need a routine check-up,
         a specialist consultation"
        </p>

       <Button className='mt-10'>
          Explore Now
       </Button>
       
      </div>
    </div>
  </div>
</section>
  )
}

export default Hero
