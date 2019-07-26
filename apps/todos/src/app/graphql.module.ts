import { NgModule } from '@angular/core';
import { Apollo, ApolloModule } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { WebSocketLink } from 'apollo-link-ws';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { OperationDefinitionNode } from 'graphql';

@NgModule({
  exports: [ApolloModule, HttpLinkModule, HttpClientModule]
})
export class GraphQLModule {
  constructor(apollo: Apollo, private httpClient: HttpClient) {
    const httpLink = new HttpLink(httpClient).create({
      uri: '/graphql'
    });

    const subscriptionLink = new WebSocketLink({
      uri: 'ws://localhost:3333/graphql',
      options: {
        reconnect: true
      }
    });

    const link = split(
      ({ query }) => {
        const { kind, operation } = getMainDefinition(query) as OperationDefinitionNode;
        return kind === 'OperationDefinition' && operation === 'subscription';
      },
      subscriptionLink,
      httpLink
    );

    apollo.create({
      link,
      cache: new InMemoryCache()
    });
  }
}
