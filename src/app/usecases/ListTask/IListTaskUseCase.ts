import { ListTaskDTO } from "@/app/usecases/ListTask/ListTaskDTO.js";

export interface IListTaskUseCase {
  execute(): Promise<ListTaskDTO[]>;
}