import { google } from 'googleapis';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // FIXED: The JWT constructor now takes a single object to resolve the error in your screenshot
    const auth = new google.auth.JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/calendar'],
    });

    const calendar = google.calendar({ version: 'v3', auth });

    // Insert the inquiry as a "Provisional" event
    const response = await calendar.events.insert({
      calendarId: process.env.GOOGLE_CALENDAR_ID,
      requestBody: {
        summary: `PROVISIONAL: ${body.name}`,
        description: `Phone: ${body.phone}\nGuests: ${body.partySize}\nMessage: ${body.message}`,
        start: {
          date: body.eventDate, // Creates an All-Day event for that date
        },
        end: {
          date: body.eventDate,
        },
        // Color ID 6 is Tangerine/Orange, used here to represent "Pending"
        colorId: '6', 
      },
    });

    return NextResponse.json({ success: true, data: response.data });
  } catch (error: any) {
    console.error("Calendar API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}