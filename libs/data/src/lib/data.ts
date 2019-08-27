export interface Todo {
  id: number,
  title: string;
  tags: (Tag | number)[]
}

export interface Tag {
  id: number,
  text: string,
}
