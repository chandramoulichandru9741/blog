import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
const Home = () => {
  return (
          <>
            <Header />
            <div className='container'>
              <h1>Welcome to Blogs Application</h1>
              <ul>
                 <li><Link to="/blogs">View List of Blogs</Link></li>
                <li><Link to="/users">View List of Users</Link></li>
              </ul>
            </div>
          </>
    
  );
}

export default Home;
