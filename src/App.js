import {
  Navigate,
  Route,
  BrowserRouter as Router, // Wrap everything inside Router
  Routes,
} from "react-router-dom";
import InternalLayout from "./components/layouts/InternalLayout/InternalLayout";
import { useAuthContext } from "./hooks/auth/useAuthContext";
import useFetchUserPosition from "./hooks/auth/useFetchUserPosition";
import Accounts from "./pages/accounts/Index";
import Home from "./pages/home/Index";
import Login from "./pages/login/Index";
import Request from "./pages/request/Index";
import Scan from "./pages/scan/Index";

const App = () => {
  const { user } = useAuthContext();
  const { position } = useFetchUserPosition();
  const p_id = position?.id;
  const p_type = position?.type;

  const defaultRoutes = [
    {
      isPrivate: false,
      path: "/",
      element:
        user?.position_id != null ? (
          <Navigate to={"/request"} replace />
        ) : (
          <Home />
        ),
    },
    {
      isPrivate: false,
      path: "/login",
      element:
        user?.position_id != null ? (
          <Navigate to={"/request"} replace />
        ) : (
          <Login />
        ),
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

  if (user?.position_id) {
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
        <Route path="/scan" element={<Scan />} />

        <Route path="*" element={<Navigate to={"/"} replace />} />
      </Routes>
    </Router>
  );
};

export default App;
