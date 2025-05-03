import { ListTaskDTO } from "@/app/DTOs/ListTaskDTO.js";

export interface IListTaskUseCase {
  execute(): Promise<ListTaskDTO>;
}