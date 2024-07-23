import { NextResponse } from 'next/server';
import { parse } from 'cookie';

export async function GET(req) {
    const cookies = req.headers.get('cookie');

    if (!cookies) {
        return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
    }

    const sessionCookie = parse(cookies).session;

    if (!sessionCookie) {
        return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
    }

    const session = JSON.parse(sessionCookie);
    return NextResponse.json({ session });
}