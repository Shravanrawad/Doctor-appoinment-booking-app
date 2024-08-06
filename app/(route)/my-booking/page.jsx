'use client'

import React, { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Bookinglist from './_componant/bookinglist'
import globalapi from '@/app/_utils/globalapi'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'

function Mybooking() {
    const { user } = useKindeBrowserClient();
    const [bookinglist, setBookinglist] = useState([]);

    useEffect(() => {
        if (user) {
            getUserBooking();
        }
    }, [user]);

    const getUserBooking = () => {
        const encodedEmail = encodeURIComponent(user?.email);
        globalapi.getuserbookinglist(encodedEmail).then(resp => {
            console.log('This is bookinglist', resp.data.data);
            setBookinglist(resp.data.data);
        });
    };

    const filterBooking = (type) => {
        const now = new Date();
        const result = bookinglist.filter(item => 
            type === 'upcoming' 
                ? new Date(item.attributes.Date) >= now 
                : new Date(item.attributes.Date) <= now
        );
        console.log('This result', result);
        return result
    };

    return (
        <div className='px-4 sm:px-10 mt-5'>
            <h2 className='font-bold text-2xl'>My Booking</h2>
            <Tabs defaultValue="upcoming" className="w-full mt-5">
                <TabsList className='w-full justify-start'>
                    <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                    <TabsTrigger value="expired">Expired</TabsTrigger>
                </TabsList>
                <TabsContent value="upcoming">
                    <Bookinglist bookinglist={filterBooking('upcoming')} expired={false} updaterecord={() => getUserBooking()}/>
                </TabsContent>
                <TabsContent value="expired">
                    <Bookinglist bookinglist={filterBooking('expired')}  expired={true}  updaterecord={() => getUserBooking()}/>
                </TabsContent>
            </Tabs>
        </div>
    );
}

export default Mybooking;
