import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { PostCard } from './PostCard';
import { SocialContext } from '../context/SocialContext';

export const PostShow = () => {
  const { state, dispatch } = useContext(SocialContext);
  const getPosts = async () => {
    try {
      const response = await axios.get(`/api/posts`);
      dispatch({
        type: 'UPDATE_POSTS',
        payload: response.data.posts,
      });

      console.log(response.data.posts);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPosts();
  }, [state.helper]);
  return (
    <div>
      {state.allPosts.map((post) => (
        <div>
          <PostCard post={post} />
        </div>
      ))}
    </div>
  );
};
