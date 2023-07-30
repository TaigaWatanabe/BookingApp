import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {

  let navigate = useNavigate();

  const [user, setUser] = useState({
    password: "",
    email: ""
  })

  const { userId, password, name, email } = user

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    const result = await axios.post("http://localhost:8080/login", user);

    if (result.data.status == "error") {
      alert(result.data.errorMessage);
    } else {
      // reactでsessionを扱う
      window.sessionStorage.setItem('userId', result.data.userId);
      window.sessionStorage.setItem('admin', result.data.adminUser);
      navigate("/");

    }
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
          <h2 className='text-center m-4'>Login</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className='mb-3'>
              <label htmlFor="Email" className='form-label'>
                E-mail
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder='Enter your e-mail address'
                name='email'
                value={email}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor="password" className='form-label'>
                Password
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder='Enter your password'
                name='password'
                value={password}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <button type='submit' className='btn btn-outline-primary'>
              Login
            </button>
            <Link className='btn btn-outline-success mx-2' to="/signup">
              Sign Up
            </Link>
            <Link className='btn btn-outline-danger' to="/">
              Top
            </Link>

          </form>
        </div>
      </div>
    </div>
  )
}
