import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom';

function Login({ setUser, setIsLoggedin }) {
  const history = useHistory();
  const [info, setInfo] = useState({
    email: "",
    password: "",
  })

  const handleSubmit = e => {
    e.preventDefault();
    console.log(info);

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(info)
    };

    fetch('https://fit-spot.herokuapp.com/login', requestOptions)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Something went wrong');
      }
    })
    .then(data => {
        console.log(data);
        setUser(data);
        setIsLoggedin(true);
        history.push("/dashboard");
    })
    .catch(error => {
      console.log('error', error);
      alert('Your Username/Password is incorrect');
    });
  }

  return (
    <div className="spacer">
        <div className="accounts-div">
            <h1 className="txt txt-form">Login</h1>
            <form className="login-form" onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" className="input input-text" onChange={e => setInfo({...info, email: e.target.value})} />
                <input type="password" placeholder="Password" className="input input-text" onChange={e => setInfo({...info, password: e.target.value})} />
                <button className="btn btn-secondary">Login</button>
            </form>
            <h3 className="txt txt-footnote">Don't have an account?</h3>
            <Link to="/signup"><button className="btn btn-tertiary">Sign Up</button></Link>
        </div>
    </div>
  );
}

export default Login;