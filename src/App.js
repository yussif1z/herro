import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import MenuBar from './components/menu/MenuBar'
import Home from './components/pages/Home'
import Login from './components/pages/Login'
import Register from './components/pages/Register'
import Book from './components/pages/Book'
import MyBooking from './components/pages/MyBooking'

function App() {
  return (
    <div className="App">
      <Router>
        <MenuBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/book/:id" component={Book} />
          <Route exact path="/mybooking" component={MyBooking} />
        </Switch>
      </Router>
    </div>
  );
}

export default App