import { ListTaskDTO } from "@/app/DTOs/ListTaskDTO";

export interface IFilterByKeyWord {
  filterByKeyword(keyword: string): Promise<ListTaskDTO>;
}