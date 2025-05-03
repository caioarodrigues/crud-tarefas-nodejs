import { CreateTaskUseCase } from "../usecases/CreateTask/CreateTaskUseCase";
import { Task } from "@/domain/entities/Task";
import { GetTaskCountUseCase } from "../usecases/GetTasksCount/GetTaskCountUseCase";
import { BaseCreateTaskDTO, CreateTaskDTO } from "../DTOs/CreateTaskDTO";
import { CreateTaskRepository, GetTaskCountRepository } from "@/infra/impl/repositories/Task.repository";

export class CreateTaskService {
  private createTaskUseCase: CreateTaskUseCase;
  private getTaskCountUseCase: GetTaskCountUseCase;

  constructor() {
    this.createTaskUseCase = new CreateTaskUseCase(new CreateTaskRepository());
    this.getTaskCountUseCase = new GetTaskCountUseCase(new GetTaskCountRepository());
  }

  async create(task: BaseCreateTaskDTO): Promise<Task> {
    const taskCount = await this.getTaskCountUseCase.getCount();
    const createTask: CreateTaskDTO = {
      ...task,
      id: taskCount,
      createdAt: new Date(),
      updatedAt: null,
    };

    return this.createTaskUseCase.execute(createTask);
  }
}