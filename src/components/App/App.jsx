import { Route, Routes } from "react-router-dom";
import { lazy } from "react";
import Layout from "../Layout/Layout.jsx";

const HomePage = lazy(() => import("../../pages/HomePage/HomePage.jsx"));

const TeachersPage = lazy(() =>
  import("../../pages/TeachersPage/TeachersPage.jsx")
);

const FavoritesPage = lazy(() =>
  import("../../pages/FavoritesPage/FavoritesPage.jsx")
);

const NotFoundPage = lazy(() =>
  import("../../pages/NotFoundPage/NotFoundPage.jsx")
);

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/teachers" element={<TeachersPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
}
