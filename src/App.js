import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import Login from './components/pages/Login'
import Register from './components/pages/Register'
import Home from './components/pages/Home'
import MenuBar from './components/menu/MenuBar'

function App() {
  return (
    <div className="App">
      <Router>
        <MenuBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </Switch>
      </Router>
    </div>
  );
}

export default App