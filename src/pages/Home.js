import { Icon } from '@iconify/react';
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { NewPost } from '../components/NewPost';
import axios from 'axios';
import { PostShow } from '../components/PostShow';

export const Home = () => {
  return (
    <Hero>
      <h1 style={{ textAlign: 'center' }}>Home</h1>
      <NewPost />
      <PostShow />
    </Hero>
  );
};
