import {
  BrowserRouter as Router, // Wrap everything inside Router
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import InternalLayout from "./components/layouts/InternalLayout/InternalLayout";
import Home from "./pages/home/Index";
import Login from "./pages/login/Index";
import Request from "./pages/request/Index";
import Accounts from "./pages/accounts/Index";

import { useAuthContext } from "./hooks/useAuthContext";
import useFetchUserPosition from "./hooks/useFetchUserPosition";

const App = () => {
  const { position } = useFetchUserPosition();
  const p_id = position?.id;
  const p_type = position?.type;

  const defaultRoutes = [
    {
      isPrivate: false,
      path: "/",
      element: p_id != null ? <Navigate to={"/request"} replace /> : <Home />,
    },
    {
      isPrivate: false,
      path: "/login",
      element: p_id != null ? <Navigate to={"/request"} replace /> : <Login />,
    },
  ];

  const NURSE_ROUTES = [
    {
      isPrivate: true,
      path: "/request",
      element: <Request />,
    },
    {
      isPrivate: true,
      path: "/accounts",
      element: <Accounts />,
    },
  ];
  const RT_ROUTES = [
    {
      isPrivate: true,
      path: "/request",
      element: <Request />,
    },
  ];

  let routes = [];

  if (p_id) {
    routes = [...defaultRoutes, ...NURSE_ROUTES];
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
            <Route key={index} element={<InternalLayout />}>
              <Route key={index} {...route} />
            </Route>
          )
        )}
        <Route path="*" element={<Navigate to={"/"} replace />} />
      </Routes>
    </Router>
  );
};

export default App;
