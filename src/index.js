import React from 'react';
import ReactDOM from 'react-dom';
import './Assets/index.css';
import App from './App';
import Spinner from "./Shared/Spinner";
// import { TransparentSpinner } from "rct-tpt-spnr";
import { ReactBootstrapAlert } from "rct-bs-alert";
import { AppProvider } from './Store/AppContext';

ReactDOM.render(
  <React.StrictMode>
      <ReactBootstrapAlert>
        <AppProvider>
        <App />
        </AppProvider>
      </ReactBootstrapAlert>
   
  </React.StrictMode>,
  document.getElementById('root')
);

