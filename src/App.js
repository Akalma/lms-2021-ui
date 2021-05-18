import Login from "./Screens/Auth/Login";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Assets/App.css'
import './Assets/css/main.css'
import './Assets/css/main_app.css'
import Dashboard from "./Screens/Dashboard/Dashboard";

import { Router } from "@reach/router";
import { Fragment, useContext } from "react";
import Spinner from "./Shared/Spinner/Spinner";
import AppContext from "./Store/AppContext";

function App() {
  const appContext = useContext(AppContext)
  return (<>
  <Spinner value={appContext.spinner} />
      <Router basepath="/" component={Fragment}>
         <Login path="/"/>
         <Dashboard path="dashboard/*"/>
      </Router>
  </>);
}

export default App;
