export interface BaseCreateTaskDTO {
  title: string;
  description: string;
  status: string;
}

export interface CreateTaskDTO extends BaseCreateTaskDTO {
  id: number;
  createdAt: Date,
  updatedAt: Date | null;
}