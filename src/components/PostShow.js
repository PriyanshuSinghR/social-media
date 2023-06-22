import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { PostCard } from './PostCard';
import { SocialContext } from '../context/SocialContext';

export const PostShow = () => {
  const [posts, setPosts] = useState([]);
  const { state } = useContext(SocialContext);
  const getPosts = async () => {
    try {
      const response = await axios.get(`/api/posts`);
      setPosts(response.data.posts);
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
      {posts.map((post) => (
        <div>
          <PostCard post={post} />
        </div>
      ))}
    </div>
  );
};
