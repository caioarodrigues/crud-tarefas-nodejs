import { CreateTaskDTO } from "@/app/usecases/CreateTask/CreateTaskDTO";
import { Task } from "@/domain/entities/Task";

export interface ICreateTaskUseCase {
  execute(task: CreateTaskDTO): Promise<Task>;
}