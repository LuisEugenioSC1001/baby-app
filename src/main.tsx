import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { createTheme, ThemeProvider } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import "./styles/base.css";
const theme = createTheme({
  palette: {
    primary: {
      main: "#fc466b",
    },
  },
});
const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://baby-graph-api.onrender.com/gql",
    fetchOptions: {
      mode: "cors", // no-cors, *cors, same-origin
    },
  }),
  cache: new InMemoryCache(),
});
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </ApolloProvider>
  </React.StrictMode>
);
