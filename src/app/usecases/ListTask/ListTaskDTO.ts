export interface ListTaskDTO {
  id: number;
  title: string;
  description: string;
  status: string;
  createdAt: Date;
  updatedAt?: Date;
  done: boolean;
}