import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';
import icon from "../img/building.jpg";
import icon2 from "../img/building2.jpg";
import icon3 from "../img/room.jpg";
import icon4 from "../img/building3.jpg";
import icon5 from "../img/building4.jpg";
import icon6 from "../img/building5.jpg";

export default function Home() {

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

  return (
    <div className='container'>
      <div className='py-4 mt-3 border shadow'>
        <h2 className='mb-3'>Stay in front of the Sea</h2>
        <img src={icon} class="ms-2 rounded float-start" width='30%' />
        <img src={icon2} class="rounded" width='30%' />
        <img src={icon3} class="me-2 rounded float-end" width='30%' />
        <div className='mt-3'>
        <img src={icon4} class="ms-2 rounded float-start" width='30%' />
        <img src={icon5} class="rounded" width='30%' />
        <img src={icon6} class="me-2 rounded float-end" width='30%' />
        </div>
        {/* ダミー文 */}
        <p className='mt-3 mb-3'>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo 
        ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, 
        nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. 
        Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, 
        arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu 
        pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. 
        Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, 
        enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut 
        metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur 
        ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, 
        sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, 
        hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. 
        Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. 
        Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,</p>
        {/* ダミー文 */}
        <Link className='btn btn-success' to="/booking">Booking</Link>
      </div>
    </div>
  )
}