import { ICreateTaskUseCase } from "@/app/usecases/CreateTask/ICreateTaskUseCase.js";
import { CreateTaskDTO } from "@/app/DTOs/CreateTaskDTO.js";
import { Task } from "@/domain/entities/Task.js";
import { ICreateTaskRepository } from "@/domain/repositories/Task.repository.js";

export class CreateTaskUseCase implements ICreateTaskUseCase {
  constructor(private createTaskRepository: ICreateTaskRepository) {}

  async execute(task: CreateTaskDTO): Promise<Task> {
    const newTask = new Task(task)

    return this.createTaskRepository.execute(newTask);
  }
}
