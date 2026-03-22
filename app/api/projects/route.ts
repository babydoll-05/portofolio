import { NextResponse } from 'next/server';
import { readProjects, writeProjects } from '@/lib/db';
import { checkAuth } from '@/lib/auth';

export async function GET() {
  const projects = readProjects();
  return NextResponse.json(projects);
}

export async function POST(req: Request) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const projects = readProjects();
  const body = await req.json();
  const newProject = { ...body, id: Date.now().toString() };
  projects.push(newProject);
  writeProjects(projects);

  return NextResponse.json(newProject, { status: 201 });
}
