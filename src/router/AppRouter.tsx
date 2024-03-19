import { Navbar } from "@/components/Navbar/Navbar";
import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Test = lazy(() => import("../pages/TestPage"));
const Home = lazy(() => import("../pages/Home"));

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route path="/" element={<Home />} />
            <Route path="/workout" element={<Test />} />

            <Route path="*" element={<h1>NOT FOUND - 404</h1>} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
