export interface Todo {
  title: string;
  tags: (Tag | number)[]
}

export interface Tag {
  id: number,
  text: string,
}
