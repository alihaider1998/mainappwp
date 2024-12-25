// mainAppWp/src/App.js
import React, { lazy, Suspense } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import "./index.css";
import NotFound from "./components/NotFound";

const App1 = lazy(() => import("app1/App"));
const MainHome = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Main App Home</h2>
    <p className="text-gray-600">Welcome to the main application dashboard.</p>
  </div>
);
const MainAbout = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">AboutM Main App</h2>
    <p className="text-gray-600">This is the main application's about page.</p>
  </div>
);

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-gray-800">MainAppWp</h1>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `${
                      isActive
                        ? "border-indigo-500 text-gray-900"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`
                  }
                  end
                >
                  Home
                </NavLink>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `${
                      isActive
                        ? "border-indigo-500 text-gray-900"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`
                  }
                >
                  About
                </NavLink>
                <NavLink
                  to="/app1"
                  className={({ isActive }) =>
                    `${
                      isActive
                        ? "border-indigo-500 text-gray-900"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`
                  }
                >
                  App1
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
            </div>
          }
        >
          <Routes>
            <Route index element={<MainHome />} />
            <Route path="/about" element={<MainAbout />} />
            <Route path="/app1/*" element={<App1 basePath="/app1" />} />
             <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
};

export default App;
