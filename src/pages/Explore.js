import React, { useContext, useEffect } from 'react';
import { Hero } from '../components/Hero';
import { SocialContext } from '../context/SocialContext';
import { PostCard } from '../components/PostCard';

export const Explore = () => {
  const { state, dispatch } = useContext(SocialContext);
  useEffect(() => {
    dispatch({
      type: 'LOADING_STATUS',
      payload: true,
    });
    setTimeout(() => {
      dispatch({
        type: 'LOADING_STATUS',
        payload: false,
      });
    }, 500);
  }, []);
  return (
    <Hero>
      {state?.allPosts?.map((post) => (
        <div>
          <PostCard id={post?._id} />
        </div>
      ))}
    </Hero>
  );
};
