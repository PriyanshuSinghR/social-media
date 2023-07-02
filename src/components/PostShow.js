import React, { useContext } from 'react';
import { PostCard } from './PostCard';
import { SocialContext } from '../context/SocialContext';
import { getSortedProducts } from '../utils';

export const PostShow = () => {
  const { state } = useContext(SocialContext);
  const user = JSON.parse(localStorage.getItem('user'));

  var postOfFollowingUsers = state?.allPosts?.filter((post) =>
    user?.following?.some(
      (followingUser) => followingUser?.username === post?.username,
    ),
  );

  const postsOfUser = state?.allPosts?.filter(
    (post) => post?.username === user?.username,
  );

  const timelinePosts = [...postOfFollowingUsers, ...postsOfUser];
  const sortedPost = getSortedProducts(timelinePosts, state.sort);
  console.log(user);
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
