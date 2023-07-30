import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import { useParams } from "react-router-dom";

export default function ViewUser() {

  const Today = new Date();
  const [startDate, setStartDate] = useState(Today);
  const NextDay = new Date(startDate);
  NextDay.setDate(NextDay.getDate() + 1);

  const [endDate, setEndDate] = useState(NextDay);

  const { id } = useParams();

  useEffect(() => {
    loadUser()
  }, [])

  const loadUser = async () => {
    await axios.get(`http://localhost:8080/user/${id}`)
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`http://localhost:8080/booking/${startDate}/${endDate}`)
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
          <h2 className='text-center m-4'>確認</h2>
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
            </div>
            <button className='btn btn-outline-success mx-2' >Booking</button>
          </form >
        </div>
      </div>
    </div>
  )
}