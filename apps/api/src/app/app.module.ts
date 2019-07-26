import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosResolver } from './todos.resolver';

@Module({
  imports: [GraphQLModule.forRoot({
    typePaths: ['./**/*.graphql'],
    installSubscriptionHandlers: true,
  })],
  controllers: [AppController],
  providers: [AppService, TodosResolver]
})
export class AppModule {
}
