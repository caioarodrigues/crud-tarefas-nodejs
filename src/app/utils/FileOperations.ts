import * as path from 'path';
import { promises as fs } from 'fs';
import { BaseFileOperations, CreateTaskFileOperations, UpdateTaskFileOperations } from './IFileOperations';
import { TaskDTO } from '../DTOs/TaskDTO';

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