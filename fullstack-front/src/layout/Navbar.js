import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import icon from "../img/person_icon.png"

export default function Navbar() {

  let navigate = useNavigate();

  const onClickLogout = async (e) => {
    e.preventDefault();
    const logoutConfirmation = window.confirm('Do you want to logout?')
    if (logoutConfirmation) {
      window.sessionStorage.clear();
      alert('Logout completed!');
      navigate('/');
    }
  };

  const onClickLogin = async (e) => {
    e.preventDefault();
    const logoutConfirmation = window.confirm('Do you want to login?')
    if (logoutConfirmation) {
      navigate('/login');
    }
  };

  const loginUserId = window.sessionStorage.getItem(['userId']);
  const loginUserAdmin = window.sessionStorage.getItem(['admin']);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light navbar-dark bg-primary p-3.5">
        <div className="container-fluid" height='50px'>
          <Link className="navbar-brand" to="/">Travel Booking Application</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div>
            <Link className='btn btn-warning me-2' to={`/viewuser/${loginUserId}`}>確認</Link>
            {loginUserAdmin == 0 &&
              <Link className='btn btn-warning me-2' 
              to={`/userlist`}>User List</Link>
            }
            <Link className='btn btn-success' to="/booking">Booking</Link>
            {window.sessionStorage.length != 0 &&
              <Link className='btn btn-info m-2' 
              to={`/booking/${loginUserId}`}>Booking Info</Link>
            }
            {window.sessionStorage.length != 0
              ? <button className='btn btn-primary' type='submit'
                onClick={(e) => onClickLogout(e)}>
                <img src={icon} width='40vh' />
              </button>
              : <button className='btn btn-primary' type='submit'
                onClick={(e) => onClickLogin(e)}>
                <img src={icon} width='40vh' />
              </button>
            }
          </div>
        </div>
      </nav>
    </div>
  )
}
