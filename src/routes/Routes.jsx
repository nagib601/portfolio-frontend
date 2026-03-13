import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Home from "../pages/Home";
import About from "../pages/About";
import Projects from "../pages/Projects";
import Contact from "../pages/Contact";
import Login from "../admin/pages/Login";
import AdminLayout from "../admin/layout/AdminLayout";
import ViewersPage from "../admin/pages/ViewersPage";
import Dashboard from "../admin/pages/AdminDashbord";
import ManageProjects from "../admin/pages/ManegeProjects";
import ProtectedRoute from "./PrivateRoutes";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/",         element: <Home />     },
      { path: "/about",    element: <About />    },
      { path: "/projects", element: <Projects /> },
      { path: "/contact",  element: <Contact />  },
      { path: "/login",    element: <Login />    },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "dashboard",        element: <Dashboard />      },
      { path: "manage-projects",  element: <ManageProjects /> },
      { path: "viewers",          element: <ViewersPage />    },
    ],
  },
]);

export default Routes;