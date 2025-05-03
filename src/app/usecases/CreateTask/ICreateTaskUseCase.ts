import { CreateTaskDTO } from "@/app/DTOs/CreateTaskDTO.js";
import { Task } from "@/domain/entities/Task.js";

export interface ICreateTaskUseCase {
  execute(task: CreateTaskDTO): Promise<Task>;
}