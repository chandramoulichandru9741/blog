import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from './Header';
const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => setUsers(response.data))
      .catch(error => console.log(error));
  }, []);

  return (
      <>
        <Header />
        <div className='container'>
      <h1 className='my-4'>Users</h1>
      {users.map(user => (
        <div key={user.id} className='border mb-2 rounded'>
            <h5><Link to={`/users/${user.id}`} className='text-secondary'>{user.name}</Link></h5>
        </div>
      ))}
    </div>
      </>
  );
}

export default Users;
