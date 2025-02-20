export interface Task {
  title: string;
  description: string;
  completed : boolean;
  createdAt: string;
};

export interface ResponseTasks {
  data : Task[]|[];
  message : string;
}
