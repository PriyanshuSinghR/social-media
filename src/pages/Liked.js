import React, { useContext } from 'react';
import { Hero } from '../components/Hero';
import { PostCard } from '../components/PostCard';
import { SocialContext } from '../context/SocialContext';

export const Liked = () => {
  const { state, dispatch } = useContext(SocialContext);
  const mySelf = JSON.parse(localStorage.getItem('user'));

  const likedPosts = state.allPosts.reduce((acc, curr) => {
    const post = curr.likes.likedBy.find((p) => p._id === mySelf._id);
    if (post?._id === mySelf?._id) {
      return [...acc, curr];
    }
    return acc;
  }, []);

  return (
    <Hero>
      <div style={{ textAlign: 'center' }}>
        {likedPosts?.length === 0 ? (
          <h3>Not Liked Yet</h3>
        ) : (
          <div>
            <h3>Your Liked</h3>
            {likedPosts.map((post) => (
              <div>
                <PostCard post={post} />
              </div>
            ))}
          </div>
        )}
      </div>
    </Hero>
  );
};
