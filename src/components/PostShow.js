import React, { useContext } from 'react';
import { PostCard } from './PostCard';
import { SocialContext } from '../context/SocialContext';
import { getSortedProducts } from '../utils';

export const PostShow = () => {
  const { state } = useContext(SocialContext);

  const postOfFollowingUsers = state?.allPosts?.filter((post) =>
    state?.mySelf?.following?.some(
      (followingUser) => followingUser?.username === post?.username,
    ),
  );

  const postsOfUser = state?.allPosts?.filter(
    (post) => post?.username === state?.mySelf?.username,
  );

  const timelinePosts = [...postOfFollowingUsers, ...postsOfUser];
  const sortedPost = getSortedProducts(timelinePosts, state.sort);

  return (
    <div>
      {sortedPost?.map((post) => (
        <div>
          <PostCard id={post._id} />
        </div>
      ))}
    </div>
  );
};
