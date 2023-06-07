import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { ErrorFallBackComponent } from "./components/Error/ErrorFallBackComponent";
import { ErrorBoundary } from "./components/Error/Errorboundary";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <React.StrictMode>
        <QueryClientProvider client={queryClient}>
          <ErrorBoundary fallBackComponent={ErrorFallBackComponent()}>
            <App />
          </ErrorBoundary>
          <ReactQueryDevtools initialIsOpen />
        </QueryClientProvider>
      </React.StrictMode>
    </BrowserRouter>
  </React.StrictMode>
);
