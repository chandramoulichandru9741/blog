import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from './Header';

const BlogDetails = () => {
  const { id } = useParams(); // Access the route parameter
  const [blog, setBlog] = useState({});
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Fetch blog details and comments
    axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(response => setBlog(response.data))
      .catch(error => console.log(error));

    axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
      .then(response => setComments(response.data))
      .catch(error => console.log(error));
  }, [id]); // Use id directly as a dependency

  return (
          <>
              <Header />
              <div className='container'>
                <h1 className='my-4'>{blog.title}</h1>

                <div className='row'>
                 <p className='col-5'>{blog.body}</p>
                  <div className='col-6'>
                  <h5>Comments</h5>
                  {comments.map(comment => (
                  <div key={comment.id} className='border rounded'>
                    <p>{comment.body}</p>
                    <p style={{textAlign:'end'}}><i>By: {comment.email}</i></p>
              </div>
      ))}
                  </div>
                </div>
                
                
                
    </div>
          </>
  );
}

export default BlogDetails;
