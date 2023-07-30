import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ReactDatePicker from 'react-datepicker';
import { Link, useNavigate, useParams } from 'react-router-dom'

export default function EditBooking() {

  let navigate = useNavigate();

  const [editBookingInfo, setBooking] = useState([]);

  const { start_date, end_date} = editBookingInfo;

  const { id } = useParams();

  const Today = new Date();
  const [startDate, setStartDate] = useState(Today);
  const NextDay = new Date(startDate);
  NextDay.setDate(NextDay.getDate() + 1);

  const [endDate, setEndDate] = useState(NextDay);

  // const userId = window.sessionStorage.getItem(['userId']);

  const [bookingInfo, setText] = useState({
    memo: ""
  })

  const { memo } = bookingInfo;

  const onInputChange = (e) => {
    setText({ ...memo, [e.target.name]: e.target.value })
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    if (window.sessionStorage.length == 0) {
      const confirmation = window.confirm('Please login before booking')
      if (confirmation) {
        navigate("/login")
      } 
    } else {
      const result = await axios.put(
        `http://localhost:8080/booking/update/${startDate}/${endDate}/${id}`, bookingInfo)
      if (result.data.status == "error") {
        alert(result.data.errorMessage);
      } else {
        navigate(`/booking/${id}`)
      }
    }


  }

  useEffect(() => {
    loadBooking();
  }, []);

  const loadBooking = async () => {
    const result = await axios.get(`http://localhost:8080/booking/edit/${id}`)
    setBooking(result.data);
    setText(result.data);
  };


  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-6 border rounded p-4 mt-3 shadow mx-auto'>
          <h2 className='text-center m-4'>Edit Booking</h2>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className='mb-3'>
              <div class="row justify-content-around m-3">
                <div class="col-4">
                  <div>
                  <label htmlFor="StartDay" className='form-label'>
                    Original Start Day
                  </label>
                  <p>
                    {start_date}
                  </p>
                  </div>
                  <label htmlFor="StartDay" className='form-label'>
                    Start Day
                  </label>
                  <ReactDatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    minDate={Today}
                    dateFormat="yyyy/M/dd"
                  />
                </div>
                <div class="col-4">
                <div>
                  <label htmlFor="StartDay" className='form-label'>
                    Original End Day
                  </label>
                  <p>
                    {end_date}
                  </p>
                  </div>
                  <label htmlFor="EndDay" className='form-label'>
                    End Day
                  </label>
                  <ReactDatePicker
                    type="date"
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    minDate={NextDay}
                    dateFormat="yyyy/M/dd"
                  />
                </div>
              </div>
              <div className='mb-3'>
                <label htmlFor="Request" className='form-label'>
                  Request
                </label>
                <input
                  type={"text"}
                  className="form-control"
                  placeholder='If you have some requests please write down here'
                  name='memo'
                  value={memo}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <button type='submit' className='btn btn-outline-primary'>
              Update
            </button>
            <Link className='btn btn-outline-danger m-2' to={`/booking/${id}`}>
              Cancel
            </Link>
          </form >
        </div>
      </div>
    </div>
  )
}