import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

export default function BookingHistory() {

  let navigate = useNavigate();

  const [bookingInfo, setBooking] = useState([]);

  useEffect(() => {
    loadBookings();
  }, []);

  const loginUserId = window.sessionStorage.getItem(['userId']);

  const { id } = useParams();

  const loadBookings = async (id) => {
    const paramsId = window.sessionStorage.getItem(['paramsId'])
    const result = await axios.get(`http://localhost:8080/bookings/history/${paramsId}`);
    window.sessionStorage.removeItem(['paramsId'])
    setBooking(result.data);
  }

  const checkBooking = async (id) => {
    window.sessionStorage.setItem('userList', 1)
    window.sessionStorage.setItem('userListUserId', id)
    navigate(`/booking/${id}`)
  }

  return (
    <div className='container'>
      <div className='py-4'>
        <div className='col-md-10 border p-4 m-3 rounded shadow mx-auto'>
          <h2 className='text-center m-4'>Booking History</h2>
          <table className="table border mx-auto">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Check In Day ~ Check Out Day</th>
                <th scope="col">Request</th>
              </tr>
            </thead>
            <tbody>
              {
                bookingInfo.map((booking, index) => (
                  <tr>
                    <th scope="row" key={index}>{index + 1}</th>
                    <td>{booking.start_date} ~ {booking.end_date}</td>
                    <td>{booking.memo}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
          <Link className='btn btn-outline-primary' to="/">
            Top
          </Link>
          <button className='btn btn-outline-info mx-2'
            onClick={() => checkBooking(id)}>Booking Info</button>
        </div>
      </div>
    </div>
  )
}
