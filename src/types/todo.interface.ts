export interface ITodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface IFormTodo {
  userId: number | null;
  title: string | null;
}
