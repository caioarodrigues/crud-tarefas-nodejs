import { ListTaskDTO } from "@/app/usecases/ListTask/ListTaskDTO";

export interface IListTaskUseCase {
  execute(): Promise<ListTaskDTO[]>;
}