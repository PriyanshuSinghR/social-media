import React, { useContext, useEffect } from 'react';
import { Hero } from '../components/Hero';
import { SocialContext } from '../context/SocialContext';
import { PostCard } from '../components/PostCard';

export const Bookmark = () => {
  const { state, dispatch } = useContext(SocialContext);
  console.log(state.bookmarkPosts);
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
      <div style={{ textAlign: 'center' }}>
        {state?.bookmarkPosts?.length === 0 ? (
          <h3>No Bookmark Yet</h3>
        ) : (
          <div>
            <h3>Your Bookmark</h3>
            {state?.bookmarkPosts?.map((post) => (
              <div>
                <PostCard id={post?._id} />
              </div>
            ))}
          </div>
        )}
      </div>
    </Hero>
  );
};
