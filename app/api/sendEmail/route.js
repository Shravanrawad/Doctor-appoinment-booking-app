import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import EmailTemplate from '@/emails';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const response = await req.json();
    const data = await resend.emails.send({
      from: 'doctor-appoinment-booking.free',
      to: [response.data.Email],
      subject: 'Appointment Booking Confirmation',
      react: EmailTemplate({ userFirstname: response.data.UserName }),
    });
    return NextResponse.json({ data });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: error.message });
  }
}
