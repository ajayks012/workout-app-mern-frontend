import { Navbar } from "@/components/Navbar/Navbar";
import { useAuthContext } from "@/hooks/useAuthContext";
import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Test = lazy(() => import("../pages/TestPage"));
const Home = lazy(() => import("../pages/Home"));
const AddWorkouts = lazy(() => import("../pages/AddWorkouts/AddWorkouts"));
const Signup = lazy(() => import("../pages/Signup/Signup"));
const Login = lazy(() => import("../pages/Login/Login"));

export const AppRouter: React.FC = () => {
  const { user } = useAuthContext();
  return (
    <BrowserRouter>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Routes>
          <Route path="/" element={<Navbar />}>
            {user ? (
              <>
                <Route path="/" element={<Home />} />
                {/* <Route path="/signup" element={<Home />} />
                <Route path="/login" element={<Home />} /> */}
                <Route path="/add-workout" element={<AddWorkouts />} />
                <Route path="*" element={<h1>NOT FOUND - 404</h1>} />
              </>
            ) : (
              <>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="*" element={<Login />} />

                {/* <Route path="/add-workout" element={<AddWorkouts />} /> */}
              </>
            )}
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
