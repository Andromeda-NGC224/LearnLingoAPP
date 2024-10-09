import { Route, Routes } from "react-router-dom";
import { lazy } from "react";
import Layout from "../Layout/Layout.jsx";
import { AuthProvider } from "../../utils/AuthContext.jsx";

const HomePage = lazy(() => import("../../pages/HomePage/HomePage.jsx"));

const TeachersPage = lazy(() =>
  import("../../pages/TeachersPage/TeachersPage.jsx")
);

const NotFoundPage = lazy(() =>
  import("../../pages/NotFoundPage/NotFoundPage.jsx")
);

export default function App() {
  return (
    <AuthProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/teachers" element={<TeachersPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </AuthProvider>
  );
}
