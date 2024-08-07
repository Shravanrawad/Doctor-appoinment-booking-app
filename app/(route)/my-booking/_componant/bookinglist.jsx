import { Button } from '@/components/ui/button';
import { Calendar, Clock, LoaderCircle, MapPin } from 'lucide-react';
import moment from 'moment/moment';
import Image from 'next/image';
import React, { useState } from 'react';
import Cancelcon from './cancelcon';
import globalapi from '@/app/_utils/globalapi';
import { toast } from 'sonner';

function Bookinglist({ bookinglist , expired, updaterecord}) {

  const [loading, setloading] = useState(false)  
  const onCancel = (item) => {
        setloading(true);
        globalapi.deletebooking(item.id).then(rep => {
            if(rep){
                toast('Appointment Cancel Successfully')
                updaterecord();
                setloading(false)
            }
        }) 
  }

    return (
        <div className='relative'>
            {bookinglist && bookinglist.length > 0 ? (
                bookinglist.map((item, index) => {
                    const imageUrl = item?.attributes?.doctor?.data?.attributes?.image?.data?.attributes?.url;
                    return (
                      <div key={index} className='flex items-center gap-4 border p-5 mt-4 rounded-lg'>
                      {imageUrl ? (
                          <Image
                              src={imageUrl}
                              alt='doctor img'
                              className='rounded-full h-[70px] w-[70px] object-cover mt-[-30px]'
                              width={100}
                              height={100}
                          />
                      ) : (
                          <p>No image available</p>
                      )}
                      <div className='flex flex-col gap-2 w-full'>
                        <h2 className='font-bold flex justify-between items-center text-[18px]'>{item.attributes.doctor.data.attributes.Name} 
                        </h2>
                        <h2 className='flex gap-2 text-gray-500'><MapPin className='text-primary h-5 w-5'/> {item.attributes.doctor.data.attributes.Address}</h2>
                        <h2 className='flex gap-2 text-gray-500'><Calendar className='text-primary h-5 w-5'/> On: { moment(item.attributes.Date).format('DD-MMM-YYYY')}</h2>
                        <h2 className='flex gap-2'><Clock className='text-primary h-5 w-5'/> At Time : {item.attributes.Time}</h2>
                        <div className='flex w-full justify-end'>
                          {!expired && <Cancelcon  loading={loading} handelcancel={() => onCancel(item)}/>}
                        </div>
                      </div>
                  </div>
                    );
                })
            ) : (
                <p className='w-full text-center p-5 flex justify-center mt-5'>No Bookings</p>
            )}
        </div>
    );
}

export default Bookinglist;
