import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '@nest-ng-gql/data';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { pluck, scan, startWith, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

const GetTodos = gql`
    {
        todos {
            title
        }
    }
`;
const AddTodo = gql`
    mutation {
        addTodo {
            title
        }
    }
`;
const TodoUpdates = gql`
    subscription {
        todoAdded {
            title
        }
    }
`;

@Component({
  selector: 'nest-ng-gql-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  todos: Todo[] = [];

  initialTodos$: Observable<Array<Todo>> = this.apollo
    .query({
      query: GetTodos
    }).pipe(
      pluck('data', 'todos')
    );

  todoUpdates$: Observable<Todo> = this.apollo.subscribe({
    query: TodoUpdates
  }).pipe(
    pluck('data', 'todoAdded')
  );

  todos$ = this.initialTodos$.pipe(
    switchMap(todos => this.todoUpdates$.pipe(
      startWith(todos),
      scan((currentTodos: Todo[], update: Todo) =>
        update ? [...currentTodos, update] : currentTodos
      )
    ))
  );

  constructor(
    private apollo: Apollo
  ) {
  }


  addTodo() {
    this.apollo.mutate({
      mutation: AddTodo
    }).subscribe();
  }
}
