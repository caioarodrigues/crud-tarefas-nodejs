export interface TaskDTO {
  id: number;
  title: string;
  description: string;
  status: string;
  createdAt: Date;
  updatedAt: Date | null;
  done: boolean;
}