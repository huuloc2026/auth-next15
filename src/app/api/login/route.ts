import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/utils/constant';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
    const ENDPOINT= process.env.NEXT_PUBLIC_API_URL
  const { username, password } = await req.json();
    
  const res = await fetch(`${ENDPOINT}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username,
      password,
    }),
  });
  
  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json({ message: 'Login failed' }, { status: 400 });
  }

  const response = NextResponse.json({ message: 'Login success' });

  response.cookies.set(ACCESS_TOKEN, data.accessToken, {
    httpOnly: true,  
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24, 
  });

  response.cookies.set(REFRESH_TOKEN, data.refreshToken, {
    httpOnly: true,  
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 240,
  });

  return response;
}
