import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import './App.css'
import MenuBar from './components/menu/MenuBar'
import Home from './components/pages/Home'
import Login from './components/pages/Login'
import Register from './components/pages/Register'
import Booking from './components/pages/Booking'
import MyBooking from './components/pages/MyBooking'
import Profile from './components/pages/Profile'

function App() {
  return (
    <Router>
      <MenuBar />
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/booking/:id" component={Booking} />
          <Route exact path="/mybooking" component={MyBooking} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App