import {
  Navigate,
  Route,
  BrowserRouter as Router, // Wrap everything inside Router
  Routes,
} from "react-router-dom";
import "./styles/inputStyles.css";
import InternalLayout from "./components/layouts/InternalLayout/InternalLayout";
import { useAuthContext } from "./hooks/auth/useAuthContext";
import useFetchUserPosition from "./hooks/auth/useFetchUserPosition";
import Accounts from "./pages/accounts/Index";
import Home from "./pages/home/Index";
import Login from "./pages/login/Index";
import Request from "./pages/request/Index";
import Scan from "./pages/scan/Index";
// Form
import ABGFormsPage from "./components/layouts/abg-form/Index";

const App = () => {
  const { user, userLoading } = useAuthContext();
  const { position } = useFetchUserPosition();

  if (userLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100dvh", width: "100%" }}>
        Loading
      </div>
    );
  }

  const defaultRoutes = [
    {
      isPrivate: false,
      path: "/",
      element:
        position?.id != null ? <Navigate to={"/request"} replace /> : <Home />,
    },
    {
      isPrivate: false,
      path: "/login",
      element:
        position?.id != null ? <Navigate to={"/request"} replace /> : <Login />,
    },
    {
      isPrivate: false,
      path: "/abg",
      element: <ABGFormsPage />,
    },
  ];

  const COMMON_ROUTES = [
    {
      isPrivate: true,
      path: "/request",
      element: <Request />,
    },
    {
      isPrivate: true,
      path: "/abg",
      element: <ABGFormsPage />,
    },
  ];
  const ADMIN_AUTHORIZED_ROUTES = [
    {
      isPrivate: true,
      path: "/accounts",
      element: <Accounts />,
    },
  ];

  let routes = [];
  if (position?.id != null) {
    routes = [...defaultRoutes, ...COMMON_ROUTES, ...ADMIN_AUTHORIZED_ROUTES];
  } else {
    routes = [...defaultRoutes];
  }

  return (
    <Router>
      <Routes>
        {routes.map((route, index) =>
          route.isPrivate ? (
            <Route key={index} element={<InternalLayout />}>
              <Route key={index} {...route} />
            </Route>
          ) : (
            <Route key={index} {...route} />
          )
        )}
        <Route path="/scan" element={<Scan />} />

        <Route path="*" element={<Navigate to={"/"} replace />} />
      </Routes>
    </Router>
  );
};

export default App;
