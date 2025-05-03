import { CreateTaskUseCase } from "../usecases/CreateTask/CreateTaskUseCase";
import { Task } from "@/domain/entities/Task";
import { GetTaskCountUseCase } from "../usecases/GetTasksCount/GetTaskCountUseCase";
import { BaseCreateTaskDTO, CreateTaskDTO } from "../DTOs/CreateTaskDTO";
import { CreateTaskRepository, GetTaskCountRepository } from "@/infra/impl/repositories/Task.repository";
import { createFile, removeFile, verifyExistenceOfFile } from "@/app/utils/FileOperations";
import { dbFileFormat, dbFileName } from "@/domain/constants/files";

export class CreateTaskService {
  private createTaskUseCase: CreateTaskUseCase;
  private getTaskCountUseCase: GetTaskCountUseCase;

  constructor() {
    this.createTaskUseCase = new CreateTaskUseCase(new CreateTaskRepository());
    this.getTaskCountUseCase = new GetTaskCountUseCase(new GetTaskCountRepository());
  }

  async create(task: BaseCreateTaskDTO): Promise<Task> {
    const dbFileExists = await verifyExistenceOfFile({ fileFormat: dbFileFormat, fileName: dbFileName });
    const taskCount = await this.getTaskCountUseCase.getCount();
    const createTask: CreateTaskDTO = {
      ...task,
      id: taskCount,
      createdAt: new Date(),
      updatedAt: null,
    };

    if (dbFileExists) {
      removeFile({ fileFormat: dbFileFormat, fileName: dbFileName });
    }

    createFile({ fileFormat: dbFileFormat, fileName: dbFileName, content: JSON.stringify({ tasks: [createTask] }) });

    return this.createTaskUseCase.execute(createTask);
  }
}