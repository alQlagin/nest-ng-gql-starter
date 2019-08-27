import { Mutation, Parent, Query, ResolveProperty, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';

import { AppService } from './app.service';
import { Todo } from '@nest-ng-gql/data';

const pubSub = new PubSub();

@Resolver('Todo')
export class TodosResolver {
  constructor(
    private readonly appService: AppService
  ) {
  }

  @Query('todos')
  async getTodos() {
    return this.appService.getData();
  }

  @Mutation()
  async addTodo() {
    const newTodo = await this.appService.addTodo();
    await pubSub.publish('todoAdded', { todoAdded: newTodo });
    return newTodo;
  }

  @ResolveProperty('tags')
  getTags(@Parent() todo: Todo) {
    const tagsPromises = todo.tags.map(id => this.appService.getTag(id));
    return Promise.all(tagsPromises)
  }

  @Subscription()
  todoAdded() {
    return pubSub.asyncIterator('todoAdded');
  }
}
