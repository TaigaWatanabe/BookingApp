import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function BookingList() {

  let navigate = useNavigate();

  const [bookingInfo, setBooking] = useState([]);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async (id) => {
    if (window.sessionStorage.getItem(['userList']) == 1) {
      const userListUserId = window.sessionStorage.getItem(['userListUserId']);
      const result = await axios.get(`http://localhost:8080/bookings/${userListUserId}`);
      window.sessionStorage.removeItem(['userList']);
      window.sessionStorage.removeItem(['userListUserId']);
      setBooking(result.data);
    } else {
      const loginUserId = window.sessionStorage.getItem(['userId']);
      const result = await axios.get(`http://localhost:8080/bookings/${loginUserId}`);
      setBooking(result.data);
    }
  }

  const deleteBooking = async (id) => {
    const bookingDeleteConformation = window.confirm('Do you want to cancel this booking?')
    if (bookingDeleteConformation) {
      await axios.delete(`http://localhost:8080/booking/delete/${id}`);
      loadBookings();
    }
  }

  const { id } = useParams();

  const bookingHistory = async (id) => {
    window.sessionStorage.setItem('paramsId', id);
    navigate(`/booking/history/${id}`)
  }

  return (
    <div className='container'>
      <div className='py-4'>
        <div className='col-md-10 border p-4 m-3 rounded shadow mx-auto'>
          <h2 className='text-center m-4'>Booking Information</h2>
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
                    <td>
                      <Link className='btn btn-outline-primary mx-2' to={`/booking/edit/${booking.id}`}>Edit</Link>
                      <button className='btn btn-outline-danger mx-2'
                        onClick={() => deleteBooking(booking.id)}>Cancel</button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
          <Link className='btn btn-outline-primary' to="/">
            Top
          </Link>

          <button className='btn btn-outline-success m-2'
            onClick={() => bookingHistory(id)}>Booking History</button>

          {/* <Link className='btn btn-outline-success m-2' to={`/booking/history/${id}`}>
            Booking History
          </Link> */}
        </div>
      </div>
    </div>
  )
}
