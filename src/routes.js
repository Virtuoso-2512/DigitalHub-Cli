import { useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import Loader from "./components/Loader";
import { GlobalState } from "./GlobalParent";
import { Error } from "./pages";

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  const { token } = GlobalState();
  return token && restricted ? <Redirect to={{ pathname: "/" }} /> : <Route {...rest} exact render={props => <Component {...props} />}/>;
};

const PrivateRoute = ({ component: Component, restricted, perm1, perm2, alt, ...rest }) => {
  const [loading, setLoading] = useState(true), { token, permissions} = GlobalState();

  useEffect(() => setTimeout(() => setLoading(false), 1500), [])

  return loading ? <Loader/> : (token ? <Route {...rest} exact render={props => (!perm1 && !perm2) || permissions?.[perm1]?.[perm2] || permissions?.[perm1]?.[alt] ? <Component {...props} /> : <Error/> } /> : <Redirect to={{ pathname: "/login" }} />);
};

export { PublicRoute, PrivateRoute };
