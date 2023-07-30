import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {

  let navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    password: "",
    email: "",
    admin: 0
  })

  const { name, password, email } = user

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    const result = await axios.post("http://localhost:8080/signup", user)
    const errorMessage = result.data;
    const numberOfError = errorMessage.length;
    if(errorMessage != 0) {
      if(numberOfError == 1){
        alert(errorMessage);
      } else if (numberOfError == 2){
        alert(errorMessage[0] +"\n\n"+ errorMessage[1])
      } else {
        alert(errorMessage[0] +"\n\n"+ errorMessage[1]+"\n\n"+ errorMessage[2])
      }
    } else {
      navigate("/login")
    }
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
          <h2 className='text-center m-4'>Register User</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className='mb-3'>
              <label htmlFor="Name" className='form-label'>
                Name
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder='Enter your name'
                name='name'
                value={name}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor="Email" className='form-label'>
                E-mail
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder='Enter your E-mail'
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
              Register
            </button>
            <Link className='btn btn-outline-success mx-2' to="/login">
              Login
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

