import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Calendar } from "@/components/ui/calendar";
import { CalendarDays, Clock, LoaderCircle } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import globalapi from '@/app/_utils/globalapi';
import { toast } from 'sonner';

function Bookappoinment({ doctordata }) {
    const [date, setDate] = useState(new Date());
    const [timeslot, settimeslot] = useState([]);
    const [selectedslot, setselectedslot] = useState();
    const { user } = useKindeBrowserClient();
    const [note, setnote] = useState('');
    const [loading, setloading] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        gettime();
    }, []);

    const gettime = () => {
        const timelist = [];
        for (let i = 10; i <= 12; i++) {
            timelist.push({ time: i + ':00 AM' });
            timelist.push({ time: i + ':30 AM' });
        }
        for (let i = 1; i <= 6; i++) {
            timelist.push({ time: i + ':00 PM' });
            timelist.push({ time: i + ':30 PM' });
        }
        settimeslot(timelist);
    }

    const confirmbooking = () => {
        setloading(true);
        const data = {
          data: {
            UserName: `${user.given_name} ${user.family_name}`,
            Email: user.email,
            Time: selectedslot,
            Date: date,
            doctor: doctordata.id,
            Note: note
          }
        };
      
        globalapi.Bookappointment(data).then(resp => {
          setloading(false);
          if (resp) {
            globalapi.sendEmail(data).then(res => { 
              toast('Booking confirmed.');
            }).catch(err => {
              toast('Error sending confirmation email. Please try again.');
            });
            setOpen(false);
          } else {
            toast('Server Error. Try again later.');
          }
        }).catch(err => {
          setloading(false);
          console.error('Error booking appointment:', err);
          toast('Error booking appointment. Please try again.');
        });
      };
      

    const isPastDay = (day) => {
        return day < new Date();
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <Button className='mt-3 rounded-full'>Book Appointment</Button>
            </DialogTrigger>
            <DialogContent className='h-[520px] md:h-[580px] overflow-y-scroll'>
                <DialogHeader>
                    <DialogTitle>Book Appointment</DialogTitle>
                    <DialogDescription>
                        <div>
                            <div className='grid grid-cols-1 md:grid-cols-2 mt-5'>
                                <div className='flex flex-col gap-3 items-baseline'>
                                    <h2 className='flex gap-2 items-center'>
                                        <CalendarDays className='text-primary h-5 w-5 ml-[-19px] md:ml-0'/>
                                        Select Date
                                    </h2>
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        disabled={isPastDay}
                                        onSelect={setDate}
                                        className="rounded-md border ml-5 md:ml-0"
                                    />
                                </div>
                                <div className='mt-3 md:mt-0'>
                                    <h2 className='flex gap-2 items-center mb-3'>
                                        <Clock className='text-primary h-5 w-5' />
                                        Select Time Slot
                                    </h2>
                                    <div className='grid grid-cols-3 gap-2 border rounded-lg p-5'>
                                        {timeslot.map((item, index) => (
                                            <h2
                                                key={index}
                                                onClick={() => setselectedslot(item.time)}
                                                className={`p-2 border hover:bg-primary hover:text-white cursor-pointer rounded-full text-center ${item.time === selectedslot && 'bg-primary text-white'}`}
                                            >
                                                {item.time}
                                            </h2>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </DialogDescription>
                    <Textarea placeholder='Note' value={note} onChange={(e) => setnote(e.target.value)} />
                </DialogHeader>
                <DialogFooter className="sm:justify-end">
                    <DialogClose asChild>
                        <Button className='text-red-500 border-red-500' type="button" variant="outline">
                            Close
                        </Button>
                    </DialogClose>
                    <Button onClick={confirmbooking} disabled={!(date && selectedslot)} type="button">
                        {loading ? <LoaderCircle className='animate-spin' /> : 'Submit'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default Bookappoinment;
