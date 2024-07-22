import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from './Header';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [users, setUsers] = useState({});
  const [dropdown, setDropdown] = useState('id');

  useEffect(() => {
    // Fetch blog data
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => setBlogs(response.data))
      .catch(error => console.log(error));

    // Fetch user data
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        // Converting user array to an object for easier lookup
        const userObject = response.data.reduce((acc, user) => {
          acc[user.id] = user;
          return acc;
        }, {});
        setUsers(userObject);
      })
      .catch(error => console.log(error));
  }, []);

  const handleSortChange = (e) => {
    setDropdown(e.target.value);
  };

  const sortedBlogs = [...blogs].sort((a, b) => {
    if (dropdown === 'title') {
      return a.title.localeCompare(b.title);
    } else {
      return a.id - b.id;
    }
  });

  return (
    <>
      <Header />
      <div className='container'>
        <div className='row'>
            <h1 className='my-4 col'>List of Blogs</h1>
            <p className=' my-4'>Sort based on:</p>
            <select className='col p-4 m-4' value={dropdown} onChange={handleSortChange}>
              <option value='id'>ID</option>
              <option value='title'>Title</option>
            </select>
        </div>
        {sortedBlogs.map(blog => (
          <div key={blog.id} className='border mb-2 p-2 rounded-lg '>
            <div className='row'>
              <div className='col-md-11'>
                <h5>{blog.title}</h5>
              </div>
              <div className='col-md-1 text-end'>
                <Link to={`/blogs/${blog.id}`}>View</Link>
              </div>
            </div>
            <p>{blog.body}</p>
            <div className='row'>
              <div className='col-md-12 offset-10'>
                <p className='text-muted'>
                  By: <Link to={`/users/${blog.userId}`} className='text-muted'>{users[blog.userId]?.name || 'Unknown Author'}</Link>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Blogs;
