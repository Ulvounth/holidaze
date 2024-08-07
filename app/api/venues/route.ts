// app/api/posts/route.ts
import { NextResponse } from 'next/server';

const API_BASE_URL = 'https://v2.api.noroff.dev/'; // Replace with your actual API base URL

export async function GET() {
  try {
    const response = await fetch(`${API_BASE_URL}holidaze/venues`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Error fetching venues');
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
