'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { LoginLink, LogoutLink, useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { LoaderCircle } from 'lucide-react';
import { RiArrowDropDownLine } from "react-icons/ri";


function Header() {
    const Menu = [
        { id: 1, name: 'Home', path: '/' },
        { id: 2, name: 'Explore', path: '/search/Cardiologist' },
        { id: 3, name: 'Contact Us', path: '/' },
    ];

    const { user } = useKindeBrowserClient();
    const [loading, setloading] = useState(false);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    const handleMyBookingClick = () => {
        setIsPopoverOpen(false);
    };

    useEffect(() => {
        console.log(user);
    }, [user]);

    return (
        <div className='flex items-center justify-between p-4 shadow-md'>
            <div className='flex items-center gap-10'>
                <Link href={'/'}>
                    <Image src={'/logo.svg'} alt='logo' width={50} height={50} />
                </Link>

                <ul className='md:flex gap-8 hidden'>
                    {Menu.map((item) => (
                        <Link href={item.path} key={item.id}>
                            <li className='hover:text-primary cursor-pointer hover:scale-105 transition-all ease-in-out'>
                                {item.name}
                            </li>
                        </Link>
                    ))}
                </ul>
            </div>
            {user ? (  
                    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                        <PopoverTrigger>
                        <div className='flex items-center justify-center gap-1'>
                        <Image className='rounded-full' src={user?.picture} alt='profile' width={50} height={50} />
                        <RiArrowDropDownLine className='h-7 w-7'/>
                        </div>
                        </PopoverTrigger>
                        <PopoverContent className='w-44 mr-5'>
                            <ul className='flex flex-col gap-2'>
                                <Link onClick={handleMyBookingClick} href={'/my-booking'} className='cursor-pointer hover:bg-slate-100 p-2 rounded-md'>My Booking</Link>
                                <li onClick={() => {
                                    setloading(true)
                                    setTimeout(() => {
                                        setloading(false)
                                    }, 3000);
                                }} className={`cursor-pointer hover:bg-slate-100 p-2 rounded-md text-red-600 ${loading ? 'flex justify-center items-center' : ''}`}><LogoutLink>{loading ? <LoaderCircle className='animate-spin'/> : 'Logout'}</LogoutLink></li>
                            </ul>
                        </PopoverContent>
                    </Popover>
            ) : (
                <LoginLink>
                    <Button>Get Started</Button>
                </LoginLink>
            )}
        </div>
    );
}

export default Header;
