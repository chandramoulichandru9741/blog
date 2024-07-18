import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from './Header';
import { Link } from 'react-router-dom';

const UserDetails = () => {
  const { id } = useParams(); // Access the route parameter
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({}); // Store comments by postId

  useEffect(() => {
    // Fetch user details and posts
    axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(response => setUser(response.data))
      .catch(error => console.log(error));

    axios.get(`https://jsonplaceholder.typicode.com/users/${id}/posts`)
      .then(response => {
        setPosts(response.data);
        // Fetch comments for each post
        response.data.forEach(post => {
          axios.get(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`)
            .then(res => setComments(prev => ({ ...prev, [post.id]: res.data })))
            .catch(error => console.log(error));
        });
      })
      .catch(error => console.log(error));
  }, [id]);

  return (
    <>
      <Header />
      <div className="container">
        <h1>{user.name}</h1>
        
        <div className="row">
          <div className="col-md-3">
            <h5>Posts</h5>
            {posts.map(post => (
              <div key={post.id} className="border rounded-lg">
                <p><Link to={`/blogs/${post.id}`} className='text-dark'>{post.title}</Link></p>
              </div>
            ))}
          </div>

          <div className="col-md-9">
            <h5>Comments</h5>
            {posts.map(post => (
              <div key={post.id}>
                {comments[post.id]?.map(comment => (
                  <div key={comment.id} className="border rounded">
                    <p>{comment.body}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default UserDetails;
