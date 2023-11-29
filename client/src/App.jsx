import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Test from "./pages/Test";
import AppLayout from "./ui/AppLayout";

import { Provider } from "react-redux";
import store from "./store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Toast from "./ui/Toast";
import Home from "./pages/Home";
import Main from "./pages/Main";
import Requests from "./ui/Requests";
import RequestDetail from "./ui/RequestDetail";
import SuppliesList from "./features/supplies/SuppliesList";
import SupplyDetail from "./features/supplies/SupplyDetail";
import Dashboard from "./pages/Dashboard";
import Supplier from "./pages/Supplier";
import Demander from "./pages/Demander.jsx";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <ReactQueryDevtools /> */}
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="supplier" element={<Supplier />} />
              <Route path="requester" element={<Demander />} />
            </Route>
            <Route element={<AppLayout />}>
              <Route index replace element={<Navigate to="/home" />} />
              <Route path="/main" element={<Main />}>
                <Route index replace element={<Navigate to="requests" />} />
                <Route path="/main/requests" element={<Requests />} />
                <Route path="/main/requests/:id" element={<RequestDetail />} />
                <Route path="/main/supplies" element={<SuppliesList />} />
                <Route path="/main/supplies/:id" element={<SupplyDetail />} />
              </Route>
            </Route>
            <Route path="/test" element={<Test />} />
          </Routes>
        </BrowserRouter>
        <Toast />
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
