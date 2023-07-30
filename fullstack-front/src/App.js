import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Navbar from './layout/Navbar';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EditUser from './users/EditUser';
import ViewUser from './users/ViewUser';
import Booking from './bookings/Booking';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UserList from './users/UserList';
import BookingList from './bookings/BookingList';
import BookingHistory from './bookings/BookingHistory';
import EditBooking from './bookings/EditBooking';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/booking" element={<Booking />} />
          <Route exact path="/booking/:id" element={<BookingList />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/edituser/:id" element={<EditUser />} />
          <Route exact path="/viewuser/:id" element={<ViewUser />} />
          <Route exact path="/userlist" element={<UserList />} />
          <Route exact path="/booking/history/:id" element={<BookingHistory />}/>
          <Route exact path="/booking/edit/:id" element={<EditBooking />} />
          <Route exact path="/signup" element={<Signup />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
