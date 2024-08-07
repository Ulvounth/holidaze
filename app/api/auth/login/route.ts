// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import cookie from 'cookie';

const API_BASE_URL = 'https://v2.api.noroff.dev/'; // Replace with your actual API base URL

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const response = await fetch(`${API_BASE_URL}auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error('Error logging in');
    }

    const data = await response.json();
    const accessToken = data.data.accessToken;

    // Set access token in HTTP-only cookie
    return NextResponse.json({ message: 'Logged in successfully' }, {
      headers: {
        'Set-Cookie': cookie.serialize('accessToken', accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== 'development',
          sameSite: 'strict',
          maxAge: 60 * 60 * 24, // 1 day
          path: '/',
        }),
      },
    });
  } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
