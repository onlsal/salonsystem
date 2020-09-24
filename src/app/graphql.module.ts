import {NgModule} from '@angular/core';
import {HttpHeaders } from '@angular/common/http';
import {APOLLO_OPTIONS} from 'apollo-angular';
import {ApolloClientOptions, InMemoryCache} from '@apollo/client/core';
import {HttpLink} from 'apollo-angular/http';

const uri = 'https://olsaltbl.herokuapp.com/v1/graphql'; // <-- add the URL of the GraphQL server here
const authHeader = new HttpHeaders()
    .set('X-Hasura-Access-Key', 'something_secret')
    .set('X-Hasura-admin-secret', 'something_secret')
    .set('Content-Type', 'application/json');

    export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  return {
    link: httpLink.create({uri, headers: authHeader}),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}

// import { NgModule } from '@angular/core';
// import { HttpClientModule, HttpHeaders } from '@angular/common/http';
// import { Apollo, ApolloModule } from 'apollo-angular';
// import { HttpLink, HttpLinkModule } from 'apollo-angular/http';
// import { InMemoryCache } from '@apollo/client/core';

// @NgModule({
//   exports: [
//     HttpClientModule,
//     // ApolloModule,
//     // HttpLinkModule
//   ]
// })

// export class GraphQLModule {
//   constructor(apollo: Apollo, httpLink: HttpLink) {
//     const uri = 'https://olsaltbl.herokuapp.com/v1/graphql';

//     const authHeader = new HttpHeaders()
//     .set('X-Hasura-Access-Key', 'something_secret')
//     .set('X-Hasura-admin-secret', 'something_secret')
//     .set('Content-Type', 'application/json')
//     // .set('Authorization', `Bearer ${localStorage.getItem('access_token')}`)
//     // .set('X-Hasura-Role', 'user')
//     // .set('X-Hasura-User-Id', stringify(localStorage.getItem('user_id')))
//     ;

//     // console.log(localStorage.getItem('user_id'));
//     const http = httpLink.create({ uri, headers: authHeader });

//     apollo.create({
//       link: http,
//       cache: new InMemoryCache()
//     });
//   }
// }