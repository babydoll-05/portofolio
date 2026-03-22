import { cookies } from 'next/headers';

const ADMIN_PASSWORD = 'Jeje123';
const SESSION_TOKEN = 'jee_admin_2024_secret';

export async function checkAuth(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session');
  return session?.value === SESSION_TOKEN;
}

export { ADMIN_PASSWORD, SESSION_TOKEN };
