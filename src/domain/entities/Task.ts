interface ITask {
  id: number;
  title: string;
  description: string;
  status: string;
  createdAt: Date;
  updatedAt?: Date;
  done: boolean;
}

export class Task {
  public readonly id: number;
  public readonly title: string;
  public readonly description: string;
  public readonly status: string;
  public readonly createdAt: Date;
  public readonly updatedAt?: Date;
  public readonly done: boolean;

  constructor({
    id,
    title,
    description,
    status,
    createdAt,
    done,
    updatedAt,
  }: ITask) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.done = done;
  }
}
