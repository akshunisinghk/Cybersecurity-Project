import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import ProtectedRoute from "./ProtectedRoute";

import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Threats from "../pages/Threats";
import Firewall from "../pages/Firewall";
import DLP from "../pages/DLP";
import LiveTraffic from "../pages/LiveTraffic";
import Analytics from "../pages/Analytics";
import Alerts from "../pages/Alerts";
import Users from "../pages/Users";
import Models from "../pages/Models";
import AuditLogs from "../pages/AuditLogs";
import Settings from "../pages/Settings";
import Profile from "../pages/Profile";

import { ROUTES } from "../constants/routes";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Authentication Routes */}
        <Route element={<AuthLayout />}>
          <Route 
            path={ROUTES.LOGIN} 
            element={<Login />} 
          />

          <Route 
            path={ROUTES.SIGNUP} 
            element={<Signup />} 
          />
        </Route>


        {/* Protected Application Routes */}
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route
            path={ROUTES.DASHBOARD}
            element={<Dashboard />}
          />

          <Route 
            path={ROUTES.THREATS} 
            element={<Threats />} 
          />

          <Route 
            path={ROUTES.FIREWALL} 
            element={<Firewall />} 
          />

          <Route 
            path={ROUTES.DLP} 
            element={<DLP />} 
          />

          <Route 
            path={ROUTES.LIVE_TRAFFIC} 
            element={<LiveTraffic />} 
          />

          <Route 
            path={ROUTES.ANALYTICS} 
            element={<Analytics />} 
          />

          <Route 
            path={ROUTES.ALERTS} 
            element={<Alerts />} 
          />

          <Route 
            path={ROUTES.USERS} 
            element={<Users />} 
          />

          <Route 
            path={ROUTES.MODELS} 
            element={<Models />} 
          />

          <Route 
            path={ROUTES.AUDIT_LOGS} 
            element={<AuditLogs />} 
          />

          <Route 
            path={ROUTES.SETTINGS} 
            element={<Settings />} 
          />

          <Route 
            path={ROUTES.PROFILE} 
            element={<Profile />} 
          />

        </Route>


        {/* Fallback Route */}
        <Route
          path="*"
          element={
            <Navigate 
              to={ROUTES.DASHBOARD} 
              replace 
            />
          }
        />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;