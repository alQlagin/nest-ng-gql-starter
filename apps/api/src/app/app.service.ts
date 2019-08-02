import { Injectable } from '@nestjs/common';
import { Tag, Todo } from '@nest-ng-gql/data';

@Injectable()
export class AppService {
  todos: Todo[] = [
    { title: 'Todo 1', tags: [1, 3] },
    { title: 'Todo 2', tags: [3] }
  ];

  tags = new Map([
    [1, 'gql'],
    [2, 'nestjs'],
    [3, 'angular']
  ]);

  getData(): Todo[] {
    return this.todos;
  }

  addTodo() {
    const newTodo = {
      title: `New todo ${Math.floor(Math.random() * 1000)}`,
      tags: []
    };
    this.todos.push(newTodo);
    return newTodo;
  }

  getTag(tag: Tag | number) {
    if (typeof tag !== 'number') {
      return tag;
    }
    return {
      id: tag,
      text: this.tags.get(tag)
    };
  }
}
