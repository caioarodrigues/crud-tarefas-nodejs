interface ITask {
  id?: number;
  title: string;
  description: string;
  status: string;
  createdAt: Date;
  updatedAt?: Date;
  done: boolean;
}

export class Task {
  public id?: number;
  public title: string;
  public description: string;
  public status: string;
  public createdAt: Date;
  public updatedAt?: Date;
  public done: boolean;

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
