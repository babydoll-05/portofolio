import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');

export function readProjects() {
  const filePath = path.join(DATA_DIR, 'projects.json');
  if (!fs.existsSync(filePath)) return [];
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

export function writeProjects(data: unknown[]) {
  const filePath = path.join(DATA_DIR, 'projects.json');
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}
