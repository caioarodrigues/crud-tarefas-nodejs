export interface BaseCreateTaskDTO {
  title: string;
  description: string;
  status: string,
  done: boolean,
}

export interface CreateTaskDTO extends BaseCreateTaskDTO {
  id: number;
  createdAt: Date,
  updatedAt: null;
}