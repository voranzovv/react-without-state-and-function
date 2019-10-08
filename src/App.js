import React from 'react';
import './App.css';
import ResponsiveDrawer from './components/test'
import Navbar from './components/navbar';
import Dashboard from './components/dashboard';
import Project from './components/project';
import Defect from './components/defect';
import { Route, Redirect, Switch, BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div>
     <Navbar/> 
     <BrowserRouter>
     <Route path="/" exact component={Dashboard} ></Route>
     <Route path="/projects" component={Project} ></Route>
     <Route path="/defects" component={Defect} ></Route>
     {/* <Redirect  to='/not-found'/> */}
     {/* <Dashboard/> */}
     {/* <Project/> */}
     {/* <Defect/> */}
     </BrowserRouter>
    </div>
  );
}

export default App;
