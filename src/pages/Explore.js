import React, { useContext } from 'react';
import { Hero } from '../components/Hero';
import { SocialContext } from '../context/SocialContext';
import { PostCard } from '../components/PostCard';

export const Explore = () => {
  const { state } = useContext(SocialContext);
  return (
    <Hero>
      {state.allPosts.map((post) => (
        <div>
          <PostCard post={post} />
        </div>
      ))}
    </Hero>
  );
};
