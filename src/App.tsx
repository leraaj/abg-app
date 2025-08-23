import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
// import "@ionic/react/css/palettes/dark.system.css";
import "bootstrap/dist/css/bootstrap.min.css";

/* Theme variables */
import "./theme/variables.css";

import { home, scan, library, search, gridOutline } from "ionicons/icons";
import Login from "./pages/Login/Login";
import { useAuthContext } from "./hooks/context/AuthContext";

setupIonicReact();

import React from "react";
import Loading from "./pages/other/Loading";
import Dashboard from "./pages/Tabs/ABG/ABGForm";
import Scan from "./pages/Tabs/Scan/Scan";
import SignInLoading from "./pages/other/SignInLoading";
import SignOutLoading from "./pages/other/SignOutLoading";
import ScanView from "./pages/Tabs/ABG/ABGView";
import ABGView from "./pages/Tabs/ABG/ABGView";

setupIonicReact();

const Tabs: React.FC = () => (
  <IonTabs>
    <IonRouterOutlet>
      <Route path="/tabs/scan" exact>
        <Scan />
      </Route>
      <Route path="/tabs/abg" exact>
        <Dashboard />
      </Route>
      <Redirect exact from="/tabs" to="/tabs/abg" />
    </IonRouterOutlet>

    <IonTabBar slot="bottom">
      <IonTabButton tab="dashboard" href="/tabs/abg">
        <IonIcon icon={gridOutline} />
        <IonLabel>ABG</IonLabel>
      </IonTabButton>
      <IonTabButton tab="scan" href="/tabs/scan">
        <IonIcon icon={scan} />
        <IonLabel>Scan</IonLabel>
      </IonTabButton>
    </IonTabBar>
  </IonTabs>
);

const App: React.FC = () => {
  const { user, isLoading, hasToken } = useAuthContext();

  if (hasToken && user && isLoading) return <Loading />;
  return (
    <IonApp>
      <IonReactRouter>
        <Switch>
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <Route
                path="/login"
                exact
                render={() => (!user ? <Login /> : <Redirect to="/tabs/abg" />)}
              />
              <Route
                path="/abg-view/:id"
                render={() => (!user ? <Login /> : <ABGView />)}
              />
              <Route
                path="/tabs"
                render={() => (user ? <Tabs /> : <Redirect to="/login" />)}
              />
              <Redirect exact from="/" to={user ? "/tabs/abg" : "/login"} />
            </>
          )}
        </Switch>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
