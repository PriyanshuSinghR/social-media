import React from 'react';
import { useParams } from 'react-router-dom';
import { Hero } from '../components/Hero';

export const PostDetail = () => {
  const { postId } = useParams();
  console.log(postId);
  return (
    <Hero>
      <h1 style={{ textAlign: 'center' }}>Post Details</h1>
    </Hero>
  );
};
