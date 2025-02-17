import {
  BrowserRouter as Router, // Wrap everything inside Router
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import InternalLayout from "./components/layouts/InternalLayout/InternalLayout";
import Login from "./pages/login/Index";
import Request from "./pages/request/Index";
import { useAuthContext } from "./hooks/useAuthContext";

const App = () => {
  const { user } = useAuthContext(); // Everytime na i-aaccess si user details dito kunin
  const defaultRoutes = [
    {
      isPrivate: false,
      path: "/",
      element:
        user?.position === 1 ? <Navigate to={"/request"} replace /> : <Login />,
    },
    {
      isPrivate: false,
      path: "/request",
      element: <Request />,
    },
    {
      isPrivate: false,
      path: "/login",
      element:
        user?.position === 1 ? <Navigate to={"/request"} replace /> : <Login />,
    },
    {
      isPrivate: false,
      path: "/request",
      element: <Request />,
    },
  ];

  const ADMIN_ROUTES = [
    {
      isPrivate: false, //TRUE dapat to, finalse ko lang para ma design
      path: "/request",
      element: <Request />,
    },
  ];
  const USER_ROUTES = [
    {
      isPrivate: false, //TRUE dapat to, finalse ko lang para ma design
      path: "/request",
      element: <Request />,
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
