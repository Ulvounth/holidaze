// app/api/auth/create-api-key/route.ts
import { NextRequest, NextResponse } from 'next/server';
import cookie from 'cookie';

const API_BASE_URL = 'https://v2.api.noroff.dev/'; // Replace with your actual API base URL

export async function POST(req: NextRequest) {
  const { name } = await req.json();
  const cookies = cookie.parse(req.headers.get('cookie') || '');
  const accessToken = cookies.accessToken;

  if (!accessToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const response = await fetch(`${API_BASE_URL}auth/create-api-key`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ name }),
    });

    if (!response.ok) {
      throw new Error('Error creating API key');
    }

    const data = await response.json();
    const apiKey = data.data.key;

    // Set API key in HTTP-only cookie
    return NextResponse.json({ message: 'API Key created successfully' }, {
      headers: {
        'Set-Cookie': cookie.serialize('apiKey', apiKey, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== 'development',
          sameSite: 'strict',
          maxAge: 60 * 60 * 24, // 1 day
          path: '/',
        }),
      },
    });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
