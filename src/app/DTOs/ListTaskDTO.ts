import { TaskDTO } from "./TaskDTO";

export interface ListTaskDTO {
  count: number;
  tasks: TaskDTO[];
}