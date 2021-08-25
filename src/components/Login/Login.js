import React, { useContext, useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}

const authToken = () => {
    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
        .then(function (idToken) {
            sessionStorage.setItem('token', idToken)
        }).catch(function (error) {
            console.log(error);
        });
}

const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [error, setError] = useState({});
    console.log("error: ",error);
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };


    const handleLogin = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then((result) => {
                const { displayName, email, photoURL } = result.user;
                const userInfo = {
                    name: displayName,
                    email: email,
                    photoUrl: photoURL,
                }
                setLoggedInUser(userInfo);
                authToken();
                history.replace(from);
            }).catch((error) => {
                const errorMessage = error.message;
                setError(errorMessage);
            });

    }

    return (
        <div className="mt-4 text-center">

            {
                loggedInUser.email?<div>
                    <p className="mt-4 "> Current User: {loggedInUser.email}</p>
                    <p>User Name: {loggedInUser.name}</p>
                    <button onClick={()=>{setLoggedInUser({})}} className=" btn-green">Log out</button>
                </div>:<button className=" btn-green" onClick={handleLogin}>Login with Google</button>
            }

        </div> 
    );
};

export default Login;