import AppRouter from "@/routes";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";

export default function App() {
  return (
    <BrowserRouter>
      <AppRouter />
      <Toaster />
    </BrowserRouter>
  );
}