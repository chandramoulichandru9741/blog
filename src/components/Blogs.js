import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from './Header';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [users, setUsers] = useState({}); // To store user data

  useEffect(() => {
    // Fetch blog data
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => setBlogs(response.data))
      .catch(error => console.log(error));

    // Fetch user data
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        // Convert user array to an object for easier lookup
        const userObject = response.data.reduce((acc, user) => {
          acc[user.id] = user;
          return acc;
        }, {});
        setUsers(userObject);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <>
      <Header />
      <div className='container'>
        <h1 className='my-4'>List of Blogs</h1>
        {blogs.map(blog => (
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
