import axios from 'axios';
import React, { memo, useState } from 'react'
import ReactDatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Link, useNavigate } from 'react-router-dom';

export default function Booking() {

  let navigate = useNavigate();

  const Today = new Date();
  const [startDate, setStartDate] = useState(Today);
  const NextDay = new Date(startDate);
  NextDay.setDate(NextDay.getDate() + 1);

  const [endDate, setEndDate] = useState(NextDay);

  const userId = window.sessionStorage.getItem(['userId']);

  const [bookingInfo, setText] = useState({
    memo: ""
  })

  const {memo} = bookingInfo;

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
      const result = await axios.post(
        `http://localhost:8080/booking/${startDate}/${endDate}/${userId}`, bookingInfo)

      if (result.data.status == "error") {
        alert(result.data.errorMessage);
      } else {
        navigate("/")
      }
    }
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-6 border rounded p-4 mt-3 shadow mx-auto'>
          <h2 className='text-center m-4'>Booking</h2>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className='mb-3'>
              <div class="row justify-content-around m-3">
                <div class="col-4">
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
                  <label htmlFor="EndDay" className='form-label'>
                    End Day
                  </label>
                  <ReactDatePicker
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
                  type="text"
                  className="form-control"
                  placeholder='If you have some requests please write down here'
                  name='memo'
                  value={memo}
                  onChange={(e) => onInputChange(e)}
                /></div>
            </div>
            <button className='btn btn-outline-success mx-2' >Booking</button>
            <Link className='btn btn-outline-primary' to="/">
              Top
            </Link>
          </form >
        </div>
      </div>
    </div>
  )
}
