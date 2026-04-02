"use client";

import { ApolloProvider } from "@apollo/client/react"; // correct import
// import { client } from "../lib/apolloClient";
import { client } from "../../lib/apolloClient"; // relative path
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function ApolloProviderWrapper({ children }: Props) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}