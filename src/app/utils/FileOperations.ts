import * as path from 'path';
import { promises as fs } from 'fs';
import { BaseFileOperations, CreateTaskFileOperations, UpdateTaskFileOperations } from './IFileOperations';
import { TaskDTO } from '../DTOs/TaskDTO';

export class FileOperations {
  private data: TaskDTO[] = [];
  private loaded = false;
  private filePath = path.resolve(process.cwd(), "db.json");

  async initialize(): Promise<void> {
    try {
      const dir = path.dirname(this.filePath);
      await fs.mkdir(dir, { recursive: true });

      try {
        await this.loadData();
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
          this.data = [];
          await this.saveData();
        } else {
          throw error;
        }
      }

      this.loaded = true;
    } catch (error) {
      console.error('Erro ao inicializar repositório:', error);
      throw error;
    }
  }
  private async loadData(): Promise<void> {
    const content = await fs.readFile(this.filePath, 'utf-8');
    try {
      this.data = JSON.parse(content) as TaskDTO[];
    } catch (error) {
      throw new Error(`Erro ao parsear JSON: ${error}`);
    }
  }

  private async saveData(): Promise<void> {
    const jsonData = JSON.stringify(this.data, null, 2);
    await fs.writeFile(this.filePath, jsonData, 'utf-8');
  }

  private async ensureLoaded(): Promise<void> {
    if (!this.loaded) {
      await this.initialize();
    }
  }

  async create(task: TaskDTO): Promise<void> {
    try {
      await this.ensureLoaded();
      this.data.push(task);
      await this.saveData();
    } catch (error) {
      throw new Error("Error creating file:" + error);
    }
  }

  async read(): Promise<TaskDTO[]> {
    try {
      await this.ensureLoaded();
      return this.data as TaskDTO[];
    } catch (error) {
      throw new Error("Error reading file:" + error);
    }
  }

  async update({ fileName, fileFormat, content }: UpdateTaskFileOperations): Promise<void> {
    const file = fileName + fileFormat;
    const filePath = path.resolve(process.cwd(), file);

    try {
      await this.ensureLoaded();
      await fs.appendFile(filePath, JSON.stringify(content, null, 2), 'utf-8');
    } catch (error) {
      console.error("Error updating file:", error);
    }
  }

  async remove({ fileName, fileFormat }: BaseFileOperations): Promise<void> {
    const file = fileName + fileFormat;
    const filePath = path.resolve(process.cwd(), file);

    try {
      await this.ensureLoaded();
      await fs.unlink(filePath);
    } catch (error) {
      console.error("Error removing file:", error);
    }
  }
}

export function resolveFilePath({ fileName, fileFormat }: BaseFileOperations): string {
  const file = fileName + fileFormat;

  return path.resolve(process.cwd(), file);
}

export async function verifyExistenceOfFile({ fileName, fileFormat }: BaseFileOperations): Promise<boolean> {
  try {
    const file = fileName + fileFormat;
    await fs.access(file);

    return true;
  } catch {
    return false;
  }
}


export async function createFile({ fileName, fileFormat, content }: CreateTaskFileOperations): Promise<void> {
  const file = fileName + fileFormat;
  const filePath = path.resolve(process.cwd(), file);

  try {
    await fs.writeFile(filePath, JSON.stringify(content, null, 2), 'utf-8');
  } catch (error) {
    throw new Error("Error creating file:" + error);
  }
}

export async function readFile({ fileName, fileFormat }: BaseFileOperations): Promise<TaskDTO[]> {
  const file = fileName + fileFormat;
  const filePath = path.resolve(process.cwd(), file);

  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data) as TaskDTO[];
  } catch (error) {
    throw new Error("Error reading file:" + error);
  }
}

export async function updateFile({ fileName, fileFormat, content }: UpdateTaskFileOperations): Promise<void> {
  const file = fileName + fileFormat;
  const filePath = path.resolve(process.cwd(), file);

  try {
    await fs.appendFile(filePath, JSON.stringify(content, null, 2), 'utf-8');
  } catch (error) {
    console.error("Error updating file:", error);
  }
}

export async function removeFile({ fileName, fileFormat }: BaseFileOperations): Promise<void> {
  const file = fileName + fileFormat;
  const filePath = path.resolve(process.cwd(), file);

  try {
    await fs.unlink(filePath);
  } catch (error) {
    console.error("Error removing file:", error);
  }
}