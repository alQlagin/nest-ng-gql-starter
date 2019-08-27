import { Injectable } from '@nestjs/common';
import { Tag, Todo } from '@nest-ng-gql/data';

@Injectable()
export class AppService {
  private id = 1;
  todos: Todo[] = [
    {id: this.id++, title: 'Todo 1', tags: [1, 3] },
    {id: this.id++, title: 'Todo 2', tags: [3] }
  ];

  tags = new Map([
    [1, 'gql'],
    [2, 'nestjs'],
    [3, 'angular']
  ]);

  async getData(): Promise<Todo[]> {
    return this.todos;
  }

  async addTodo(): Promise<Todo> {
    const newTodo = {
      id: this.id++,
      title: `New todo ${Math.floor(Math.random() * 1000)}`,
      tags: []
    };
    this.todos.push(newTodo);
    return newTodo;
  }

  async getTag(tag: Tag | number): Promise<Tag> {
    if (typeof tag !== 'number') {
      return tag;
    }
    return {
      id: tag,
      text: this.tags.get(tag)
    };
  }
}
