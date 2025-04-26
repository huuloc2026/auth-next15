import { setAuthCookies } from '@/lib/auth';
import api from '@/lib/axios';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/utils/constant';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
    const ENDPOINT= process.env.NEXT_PUBLIC_API_URL
  const { username, password } = await req.json();
    
  const res = await api.post('/auth/login', {
    username,
    password,
    expiresInMins: 15 
  });
  
  const data = await res.data
 

  const response = NextResponse.json({ message: 'Login success' });
  const {accessToken,refreshToken} = data
  await setAuthCookies(accessToken,refreshToken)


  return response;
}
