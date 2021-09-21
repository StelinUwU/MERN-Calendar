import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { LoginScreen } from "../Components/auth/LoginScreen";
import { CalendarScreen } from "../Components/calendar/CalendarScreen";
import { startCheking } from "../actions/auth";
import LoadingSpinner from "../Components/ui/loadingSpinner";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
export const AppRouter = () => {
  const dispatch = useDispatch();
  const { checking, uid } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(startCheking());
  }, [dispatch]);
  if (checking) {
    return <LoadingSpinner />;
  }
  return (
    <Router>
      <div>
        <Switch>
          <PublicRoute
            path="/login"
            exact
            component={LoginScreen}
            isAuthenticated={!!uid}
          />
          <PrivateRoute
            path="/"
            exact
            component={CalendarScreen}
            isAuthenticated={!!uid}
          />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
};
