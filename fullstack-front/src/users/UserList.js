import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function UserList() {

  let navigate = useNavigate();

  const [users, setUsers] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:8080/users");
    setUsers(result.data);
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:8080/user/${id}`)
    loadUsers()
  }

  const checkBooking = async (id) => {
    window.sessionStorage.setItem('userList', 1)
    window.sessionStorage.setItem('userListUserId', id)
    navigate(`/booking/${id}`)
  }

  return (
    <div className='container'>
      <div className='py-4'>
        <div className='col-md-10 border rounded shadow mx-auto'>
          <h2 className='text-center m-4'>User List</h2>
          <table className="table border mx-auto">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">password</th>
                <th scope="col">Email</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {
                users.map((user, index) => (
                  <tr>
                    <th scope="row" key={index}>{index + 1}</th>
                    <td>{user.name}</td>
                    <td>{user.password}</td>
                    <td>{user.email}</td>
                    <td>
                      <button className='btn btn-outline-info mx-2'
                        onClick={() => checkBooking(user.id)}>Booking Info</button>
                      <Link className='btn btn-outline-primary mx-2' to={`/edituser/${user.id}`}>Edit</Link>
                      <button className='btn btn-outline-danger mx-2'
                        onClick={() => deleteUser(user.id)}>Delete</button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}