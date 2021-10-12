import Home from './pages/home/Home.jsx'
import Login from './pages/login/Login.jsx'
import Profile from './pages/profile/Profile.jsx'
import Register from './pages/register/Register.jsx'

import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";

export function App() {
    return (
      <Router>
        <Switch>
            <Route exact path="/"><Home/></Route>
            <Route path="/login"><Login/></Route>
            <Route path="/register"><Register/></Route>
            <Route path="/profile/:username"><Profile/></Route>
        </Switch>

      </Router>

    );
}


export default App;
