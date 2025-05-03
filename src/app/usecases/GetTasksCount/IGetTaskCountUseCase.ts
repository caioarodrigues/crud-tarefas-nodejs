export interface IGetTasksCountUseCase {
  getCount(): Promise<number>;
}