import fs from 'fs';
import path from 'path';

import { REQUESTS_DIR } from '@/storage/paths';
import { SavedRequest } from '@/types/types';

export class RequestStorageService {
  constructor() {
    if (!fs.existsSync(REQUESTS_DIR)) {
      fs.mkdirSync(REQUESTS_DIR, { recursive: true });
    }
  }

  private getFilePath(name: string) {
    return path.join(REQUESTS_DIR, `${name}.json`);
  }

  save(request: SavedRequest) {
    const filePath = this.getFilePath(request.name);

    if (fs.existsSync(filePath)) {
      throw new Error(`Request "${request.name}" already exists`);
    }

    fs.writeFileSync(filePath, JSON.stringify(request, null, 2));
  }

  get(name: string): SavedRequest {
    const filePath = this.getFilePath(name);

    if (!fs.existsSync(filePath)) {
      throw new Error(`Request "${name}" not found`);
    }

    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data) as SavedRequest;
  }

  exists(name: string) {
    return fs.existsSync(this.getFilePath(name));
  }

  delete(name: string) {
    const filePath = this.getFilePath(name);

    if (!this.exists(name)) {
      throw new Error(`Request "${name}" not found`);
    }

    fs.unlinkSync(filePath);
  }

  list(): SavedRequest[] {
    const files = fs.readdirSync(REQUESTS_DIR);

    return files.filter(file => file.endsWith('.json'))
    .map(file => {
      const content = fs.readFileSync(path.join(REQUESTS_DIR, file), 'utf-8');

      return JSON.parse(content);
    })
  }
}

export const requestStorageService = new RequestStorageService();
