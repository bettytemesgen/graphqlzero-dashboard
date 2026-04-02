'use client';

import React from 'react';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';

// 1. Create a single, stable instance of the client
const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://graphqlzero.almansi.me/api',
  }),
  cache: new InMemoryCache(),
});

// 2. Wrap your application
export default function ApolloProviderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  );
}