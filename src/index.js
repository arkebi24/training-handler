import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  ApolloProvider,
  ApolloClient,
  HttpLink,
  InMemoryCache,
  split,
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/link-ws";
import "./index.css";
import Schedules from "./components/Schedules";
import Createschedule from "./components/createSchedules";
import reportWebVitals from "./reportWebVitals";

const GRAPHQL_ENDPOINT = "training-handler.hasura.app/v1/graphql";

const httpLink = new HttpLink({
  uri: `https://${GRAPHQL_ENDPOINT}`,
});

const wsLink = new WebSocketLink({
  uri: `wss://${GRAPHQL_ENDPOINT}`,
  options: {
    reconnect: true,
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink,
});

const App = () => (
  <ApolloProvider client={client}>
    <Router>
      <Switch>
        <Route exact path="/" component={Schedules} />
        <Route exact="/create" component={Createschedule} />
      </Switch>
    </Router>
  </ApolloProvider>
);

render(<App />, document.getElementById("root"));

reportWebVitals();
