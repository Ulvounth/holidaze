// app/api/auth/register/route.ts
import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = 'https://v2.api.noroff.dev/';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const response = await fetch(`${API_BASE_URL}auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error('Error registering user');
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
