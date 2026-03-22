import { NextResponse } from 'next/server';
import { readProjects, writeProjects } from '@/lib/db';
import { checkAuth } from '@/lib/auth';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const projects = readProjects();
  const body = await req.json();
  const index = projects.findIndex((p: { id: string }) => p.id === id);

  if (index === -1) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  projects[index] = { ...projects[index], ...body };
  writeProjects(projects);

  return NextResponse.json(projects[index]);
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const projects = readProjects().filter((p: { id: string }) => p.id !== id);
  writeProjects(projects);

  return NextResponse.json({ success: true });
}
