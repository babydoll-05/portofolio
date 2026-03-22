import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { checkAuth } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const authed = await checkAuth(req);
  if (!authed) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const formData = await req.formData();
  const file = formData.get('file') as File;

  if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 });

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadDir = path.join(process.cwd(), 'public', 'uploads');
  if (!existsSync(uploadDir)) await mkdir(uploadDir, { recursive: true });

  const ext = file.name.split('.').pop();
  const filename = `${Date.now()}.${ext}`;
  await writeFile(path.join(uploadDir, filename), buffer);

  return NextResponse.json({ url: `/uploads/${filename}` });
}
