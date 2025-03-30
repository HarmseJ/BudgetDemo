import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard.pages";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
    </Routes>
  );
};

export default AppRoutes;