import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Game from './pages/Game';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';

//  Para o commit do Cacique

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/game" component={Game} />
          <Route path="/feedback" component={Feedback} />
          <Route path="/ranking" component={Ranking} />
          <Route path="/settings" component={Settings} />
          <Route path="/not_found" component={NotFound} />
        </Switch>
      </header>
    </div>
  );
}

export default App;
