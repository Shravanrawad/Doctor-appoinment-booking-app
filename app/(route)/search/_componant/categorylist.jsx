'use client'

import React, { useState, useEffect } from 'react';
import globalapi from '@/app/_utils/globalapi';
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command"
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

function Categorylist() {
    const [categorylist, setCategoryList] = useState([]);
    const params = usePathname();
    const category = params.split('/')[2];

    useEffect(() => {
        getCategoryList();
    }, []);

    const getCategoryList = async () => {
        try {
            const response = await globalapi.getcategory();
            setCategoryList(response.data.data);
        } catch (error) {
            console.error('Failed to fetch category list:', error);
        }
    };

    return (
        <div className='h-[480px] mt-5 flex flex-col'>
            <div className="flex h-screen flex-col justify-between border-e bg-white">
                <div className="px-4 py-4 overflow-y-scroll">
                    <span className="grid h-10 w-32 place-content-center rounded-lg text-xs text-gray-600">
                      Categories
                    </span>
                    <ul className="mt-2 space-y-1  h-full w-full overflow-y-scroll">
                        {categorylist && categorylist.map((item, index) => (
                            <li key={index} className='cursor-pointer'>
                                <Link href={'/search/'+item?.attributes?.Name} className={`p-2 flex gap-2 text-[14px] text-red-600 items-center rounded-md cursor-pointer w-full ${category == item.attributes.Name && 'bg-red-100'}`}>
                                    <Image src={item.attributes?.Icon.data.attributes.url} alt='icon' width={25} height={25} />
                                    <label className='cursor-pointer'>{item.attributes.Name}</label>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {/* <Command className='h-screen'>
                <CommandInput placeholder="Type a command or search..." />
                <CommandList className='overflow-visible'>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Suggestions">
                        {categorylist && categorylist.map((item, index) => (
                            <CommandItem key={index}>
                                <Link href={'/search/'+item?.attributes?.Name} className={`p-2 flex gap-2 text-[14px] text-red-600 items-center rounded-md cursor-pointer w-full ${category == item.attributes.Name && 'bg-red-100'}`}>
                                    <Image src={item.attributes?.Icon.data.attributes.url} alt='icon' width={25} height={25} />
                                    <label>{item.attributes.Name}</label>
                                </Link>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </CommandList>
            </Command> */}
        </div>
    );
}

export default Categorylist;
