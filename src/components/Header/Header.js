import React, { useContext } from 'react';
import {Link} from 'react-router-dom';
import { UserContext } from '../../App';

const Header = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  
  return (
    <div className="text-white w-100vw pb-3 bg-green-700 shadow-md">
      <Link to="/">
      <h1 className=" text-center sm:text-2.5xl md:text-3xl font-bold uppercase"> Mudi Store </h1>
      </Link>
      <div className="mt-2 nav flex justify-center">
      <Link to="/">Home</Link>
      <Link to="/orders">Orders</Link>
      <Link to="/admin">Admin</Link>
      <Link to="/deals">Deals</Link>
      {
        loggedInUser.email?<Link to="/login">Profile</Link>:<Link to="/login">Login</Link>
      }
      </div>

    </div>
  );
};

export default Header;