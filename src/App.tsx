import AppRouter from "@/routes";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Initialize the QueryClient
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppRouter />
        <Toaster />
      </BrowserRouter>
    </QueryClientProvider>
  );
}
