import './App.css';
import Header from './components/Header/Header.js';
import Home from './components/Home/Home.js';
import Login from './components/Login/Login.js';
import Deals from './components/Deals/Deals';
import Orders from './components/Orders/Orders';
// import Admin from './components/Admin/Admin.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { createContext, useState } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import CheckOut from './components/CheckOut/CheckOut';
import AdminPanel from './components/AdminPanel/AdminPanel';
import Footer from './components/Footer';

export const UserContext = createContext();
export const ProductContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [cart,setCart] = useState({});
  return (

    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <ProductContext.Provider value={[cart,setCart]}>
        <Router >
          <Header></Header>
          <Switch>
            <Route exact path="/">
              <Home />
              <Footer></Footer>
            </Route>
            <Route path="/login">
              <Login></Login>
            </Route>
            <Route path="/deals">
              <Deals></Deals>
            </Route>
            
            <PrivateRoute path="/orders">
              <Orders></Orders>
            </PrivateRoute>
            <PrivateRoute path="/admin">
              <AdminPanel></AdminPanel>              
            </PrivateRoute>
            <PrivateRoute path="/checkOut">
              <CheckOut></CheckOut>
            </PrivateRoute>
          </Switch>
        </Router>
      </ProductContext.Provider>
    </UserContext.Provider>

  );
}

export default App;
