import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./reset.css";
import Router from "./shared/Router";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
    </>
  );
}

export default App;
