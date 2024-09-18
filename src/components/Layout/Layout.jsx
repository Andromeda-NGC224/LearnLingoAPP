import { Suspense } from "react";
import Header from "../Header/Header.jsx";
import Loader from "../Loader/Loader.jsx";

export default function Layout({ children }) {
  return (
    <Suspense fallback={<Loader />}>
      <Header />
      {children}
    </Suspense>
  );
}
