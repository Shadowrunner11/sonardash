import { ApolloClientOptions, InMemoryCache } from '@apollo/client'

export const apolloClientConfig: ApolloClientOptions<unknown> = {
  cache: new InMemoryCache(),
  uri: import.meta.env.VITE_GRAPHQL_API || 'http://localhost:4501/graphql',
}
