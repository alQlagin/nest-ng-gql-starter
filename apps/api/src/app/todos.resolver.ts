import { Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';

import { AppService } from './app.service';

const pubSub = new PubSub();

@Resolver('Todos')
export class TodosResolver {
  constructor(
    private readonly appService: AppService
  ) {
  }

  @Query('todos')
  async todos() {
    return this.appService.getData();
  }

  @Mutation()
  async addTodo() {
    const newTodo = this.appService.addTodo();
    await pubSub.publish('todoAdded', {todoAdded: newTodo});
    return newTodo;
  }

  @Subscription()
  todoAdded() {
    return pubSub.asyncIterator('todoAdded');
  }
}
