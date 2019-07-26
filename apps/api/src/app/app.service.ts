import { Injectable } from '@nestjs/common';
import { Todo } from '@nest-ng-gql/data';

@Injectable()
export class AppService {
  todos: Todo[] = [{ title: 'Todo 1' }, { title: 'Todo 2' }];

  getData(): Todo[] {
    return this.todos;
  }

  addTodo() {
    const newTodo = {
      title: `New todo ${Math.floor(Math.random() * 1000)}`
    };
    this.todos.push(newTodo);
    return newTodo;
  }
}
