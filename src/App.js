import {
  BrowserRouter as Router, // Wrap everything inside Router
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import InternalLayout from "./components/layouts/InternalLayout/InternalLayout";
import Login from "./pages/login/Index";
import Request from "./pages/request/Index";
import Scan from "./pages/scan/Index";

import { useAuthContext } from "./hooks/useAuthContext";

const App = () => {
  const { user } = useAuthContext();
  const defaultRoutes = [
    {
      isPrivate: false,
      path: "/",
      element:
        user?.position === 1 ? <Navigate to={"/request"} replace /> : <Login />,
    },
    {
      isPrivate: false,
      path: "/login",
      element:
        user?.position === 1 ? <Navigate to={"/request"} replace /> : <Login />,
    },
  ];

  const ADMIN_ROUTES = [
    {
      isPrivate: true,
      path: "/request",
      element: <Request />,
    },
  ];
  const USER_ROUTES = [
    {
      isPrivate: true,
      path: "/request",
      element: <Request />,
    },
    {
      isPrivate: false,
      path: "/scan",
      element: <Scan />,
    },
  ];
  let routes = [];
  if (user?.position === 1) {
    routes = [...defaultRoutes, ...ADMIN_ROUTES];
  } else if (user?.position === 2) {
    routes = [...defaultRoutes, ...USER_ROUTES];
  } else {
    routes = [...defaultRoutes];
  }

  return (
    <Router>
      <Routes>
        {routes.map((route, index) =>
          route.isPrivate ? (
            <Route key={index} element={<InternalLayout />}>
              <Route {...route} />
            </Route>
          ) : (
            <Route key={index} {...route} />
          )
        )}
        <Route path="*" element={<Navigate to={"/"} replace />} />
      </Routes>
    </Router>
  );
};

export default App;
