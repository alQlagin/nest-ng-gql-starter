import { Component, Input, OnInit } from '@angular/core';
import { Todo } from '@nest-ng-gql/data';

@Component({
  selector: 'nest-ng-gql-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  @Input() todos: Todo[];

  constructor() {
  }

  ngOnInit() {
  }

}
