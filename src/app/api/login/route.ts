import { setAuthCookies } from '@/lib/auth';
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
  const {accessToken,refreshToken} = data
  await setAuthCookies(accessToken,refreshToken)


  return response;
}
