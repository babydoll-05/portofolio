import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { ADMIN_PASSWORD, SESSION_TOKEN } from '@/lib/auth';

export async function POST(req: Request) {
  const { password } = await req.json();

  if (password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Password salah!' }, { status: 401 });
  }

  const cookieStore = await cookies();
  cookieStore.set('admin_session', SESSION_TOKEN, {
    httpOnly: true,
    sameSite: 'strict',
    maxAge: 60 * 60 * 24,
    path: '/',
  });

  return NextResponse.json({ success: true });
}
