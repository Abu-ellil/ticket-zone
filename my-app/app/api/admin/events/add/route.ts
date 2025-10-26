import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Event from '@/models/Event';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
  await dbConnect();

  try {
    const formData = await req.formData();
    
    // Extract text fields from form data
    const eventName = formData.get('eventName') as string;
    const date = formData.get('date') as string;
    const eventStartTime = formData.get('eventStartTime') as string;
    const doorsOpenTime = formData.get('doorsOpenTime') as string;
    const venue = formData.get('venue') as string;
    const currency = formData.get('currency') as string || 'SAR';
    const customerServiceNumber = formData.get('customerServiceNumber') as string;
    const email = formData.get('email') as string;
    
    // Parse tickets data
    const ticketsData = formData.get('tickets') as string;
    const tickets = JSON.parse(ticketsData);
    
    // Handle image upload to Cloudinary
    const imageFile = formData.get('image') as File | null;
    let imageUrl = '';
    
    if (imageFile) {
      // Convert File to buffer for upload
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      // Upload to Cloudinary
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: 'image' },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );
        stream.end(buffer);
      });
      
      const cloudinaryResult = result as { secure_url: string };
      imageUrl = cloudinaryResult.secure_url;
    }
    
    // Calculate the minimum price from tickets for priceFrom field
    const minPrice = tickets.length > 0 ? Math.min(...tickets.map((ticket: { price: number }) => ticket.price)) : 0;
    
    // Create event object matching the schema
    const event = await Event.create({
      title: eventName,
      artist: eventName || 'Various Artists', // Using event name as artist for now
      date,
      time: {
        eventStartTime,
        doorsOpenTime,
      },
      location: venue,
      venue,
      imageUrl,
      priceFrom: minPrice,
      tickets: tickets.map((ticket: { type: string; price: number; discount?: string }) => ({
        type: ticket.type,
        price: ticket.price,
        discount: ticket.discount || '',
      })),
      currency,
      contactInfo: {
        customerServiceNumber: customerServiceNumber || undefined,
        email: email || undefined,
      },
      tags: [], // Initialize with empty tags array
    });
    
    return NextResponse.json({ success: true, data: event }, { status: 201 });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to add event';
    return NextResponse.json({ success: false, message: errorMessage }, { status: 400 });
  }
}