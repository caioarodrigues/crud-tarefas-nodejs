import { CreateTaskUseCase } from "../usecases/CreateTask/CreateTaskUseCase";
import { Task } from "@/domain/entities/Task";
import { GetTaskCountUseCase } from "../usecases/GetTasksCount/GetTaskCountUseCase";
import { ICreateTaskRepository, IGetTaskCountRepository } from "@/domain/repositories/Task.repository";
import { BaseCreateTaskDTO, CreateTaskDTO } from "../DTOs/CreateTaskDTO";

interface ICreateTaskServiceProperties {
  createTaskRepository: ICreateTaskRepository;
  getTaskCountRepository: IGetTaskCountRepository;
}

export class CreateTaskService {
  private createTaskUseCase: CreateTaskUseCase;
  private getTaskCountUseCase: GetTaskCountUseCase;

  constructor({ createTaskRepository, getTaskCountRepository }: ICreateTaskServiceProperties) {
    this.createTaskUseCase = new CreateTaskUseCase(createTaskRepository);
    this.getTaskCountUseCase = new GetTaskCountUseCase(getTaskCountRepository);
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