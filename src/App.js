import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Homepage from './pages/homepage/homepage.component'
import './pages/homepage/homepage.styles.scss'
import './App.css';


const HatsPage = ()=>(
  <div>
    <h1>Hats Page</h1>
  </div>
)


function App() {
  return (<div>
    <Switch>
      <Route exact path ='/' component = {Homepage}/>
      <Route  path ='/hats' component = {HatsPage}/>
    </Switch>
  </div>
  );
}

export default App;
