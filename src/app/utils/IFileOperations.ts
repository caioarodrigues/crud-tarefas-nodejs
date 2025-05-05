export interface BaseFileOperations {
  fileName: string;
  fileFormat: ".json";
}

export interface CreateTaskFileOperations extends BaseFileOperations {
  content: string;
}

export interface UpdateTaskFileOperations extends BaseFileOperations {
  content: string;
}