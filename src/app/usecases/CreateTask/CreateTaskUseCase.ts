import { ICreateTaskUseCase } from "@/app/usecases/CreateTask/ICreateTaskUseCase";
import { CreateTaskDTO } from "@/app/usecases/CreateTask/CreateTaskDTO";
import { Task } from "@/domain/entities/Task";
import { ICreateTaskRepository } from "@/domain/repositories/Task.repository";

export class CreateTaskUseCase implements ICreateTaskUseCase {
  private createTaskRepository: ICreateTaskRepository;

  constructor(createTaskRepository: ICreateTaskRepository) {
    this.createTaskRepository = createTaskRepository;
  }

  async execute(task: CreateTaskDTO): Promise<Task> {
    const { description, title } = task;
    const newTask = new Task({
      createdAt: new Date(),
      description,
      title,
      status: "pending",
      done: false,
      id: 0,
    });

    return this.createTaskRepository.execute(newTask);
  }
}
