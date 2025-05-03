import { CreateTaskDTO } from "@/app/DTOs/CreateTaskDTO";

export class Task {
  public id: number;
  public title: string;
  public description: string;
  public status: string;
  public createdAt: Date;
  public updatedAt: Date | null;
  public done: boolean;

  constructor({
    id,
    title,
    description,
    status,
    createdAt,
    done,
    updatedAt,
  }: CreateTaskDTO) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.done = done;
  }
}
