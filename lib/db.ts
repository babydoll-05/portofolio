import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const FILE_PATH = path.join(DATA_DIR, 'projects.json');

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
}

export function readProjects() {
  ensureDataDir();
  if (!fs.existsSync(FILE_PATH)) {
    // Seed awal jika file belum ada (volume baru)
    const seed: unknown[] = [];
    fs.writeFileSync(FILE_PATH, JSON.stringify(seed, null, 2));
    return seed;
  }
  try {
    return JSON.parse(fs.readFileSync(FILE_PATH, 'utf-8'));
  } catch {
    return [];
  }
}

export function writeProjects(data: unknown[]) {
  ensureDataDir();
  fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
}
