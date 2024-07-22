import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Blogs from './components/Blogs';
import Users from './components/Users';
import BlogDetails from './components/BlogDetails';
import UserDetails from './components/UserDetails';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/users" element={<Users />} />
          <Route path="/blogs/:id" element={<BlogDetails />} />
          <Route path="/users/:id" element={<UserDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
