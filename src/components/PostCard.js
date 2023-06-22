import { Icon } from '@iconify/react';
import axios from 'axios';
import moment from 'moment';
import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SocialContext } from '../context/SocialContext';

export const PostCard = ({ post }) => {
  const [user, setUser] = useState({ name: '', url: '' });
  const [bookmarked, setBookmarked] = useState(false);
  const { state, dispatch } = useContext(SocialContext);
  const getUserInfo = async () => {
    try {
      const response = await axios.get(`/api/users`);
      const data = response.data.users.find(
        (user) => user.username === post.username,
      );
      setUser({ name: `${data.firstName} ${data.lastName}`, url: data.image });
    } catch (error) {
      console.log(error);
    }
  };
  const likingPost = async () => {
    const encodedToken = localStorage.getItem('tokenuser');
    try {
      const response = await axios.post(
        `/api/posts/like/${post._id}`,
        {},
        {
          headers: {
            authorization: encodedToken,
          },
        },
      );
      dispatch({
        type: 'HELPER',
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const addToBookmark = async () => {
    const encodedToken = localStorage.getItem('tokenuser');
    try {
      const response = await axios.post(
        `/api/users/bookmark/${post._id}`,
        {},
        {
          headers: {
            authorization: encodedToken,
          },
        },
      );
      dispatch({
        type: 'HELPER',
      });

      dispatch({
        type: 'UPDATE_BOOKMARK',
        payload: response.data.bookmarks,
      });
      console.log(response.data.bookmarks);
    } catch (error) {
      console.log(error);
    }
  };
  const removeFromBookmark = async () => {
    const encodedToken = localStorage.getItem('tokenuser');
    try {
      const response = await axios.post(
        `/api/users/remove-bookmark/${post._id}`,
        {},
        {
          headers: {
            authorization: encodedToken,
          },
        },
      );
      dispatch({
        type: 'HELPER',
      });

      dispatch({
        type: 'UPDATE_BOOKMARK',
        payload: response.data.bookmarks,
      });
      console.log(response.data.bookmarks);
    } catch (error) {
      console.log(error);
    }
  };

  const checkedAsBookmark = state.bookmarkPosts.reduce((acc, curr) => {
    if (curr.id === post._id) {
      return true;
    }
    return acc;
  }, false);

  console.log(checkedAsBookmark);
  useEffect(() => {
    getUserInfo();
  }, []);
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        margin: '40px auto',
        width: '70%',
        paddingBottom: '20px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
        padding: '20px',
        borderRadius: '10px',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Link style={{ textDecoration: 'none', color: 'white' }}>
          <div style={{ display: 'flex' }}>
            <img
              src={user.url}
              style={{
                height: '50px',
                width: '50px',
                borderRadius: '50% 50%',
              }}
            />
            <div style={{ marginLeft: '10px' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '250px',
                }}
              >
                <p
                  style={{ fontSize: '16px', fontWeight: 'bold', margin: '0' }}
                >
                  {user.name}
                </p>
                <p
                  style={{ fontSize: '14px', color: '#e2e2e292', margin: '0' }}
                >
                  {moment(post.createdAt).format('DD-MMM-YYYY')}
                </p>
              </div>
              <p
                style={{
                  fontSize: '14px',
                  color: '#e2e2e292',
                  marginTop: '10px',
                }}
              >
                @{post.username}
              </p>
            </div>
          </div>
        </Link>
        <div style={{ cursor: 'pointer' }}>...</div>
      </div>
      <div
        style={{
          fontSize: '16px',
          width: '80%',
          textAlign: 'left',
          padding: '10px',
          height: '100%',
          border: 'none',
          marginBottom: '20px',
          marginLeft: '50px',
        }}
        dangerouslySetInnerHTML={{ __html: post.content }}
      ></div>
      {post.mediaURL.length > 0 && (
        <div>
          <img src={post.mediaURL} style={{ height: '100%', width: '100%' }} />
        </div>
      )}
      <div style={{ borderTop: '1px solid #535353' }}></div>
      <div
        style={{
          display: 'flex',
          padding: '10px',
          width: '200px',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex' }}>
          <Icon
            icon="mdi:heart"
            color="gray"
            width="25"
            height="25"
            style={{ cursor: 'pointer' }}
            onClick={likingPost}
          />
          {post.likes.likeCount > 0 && (
            <div style={{ fontSize: '16px', marginLeft: '10px' }}>
              {post.likes.likeCount}
            </div>
          )}
        </div>
        <div>
          <Icon
            icon="mdi:bookmark"
            color={checkedAsBookmark ? 'blue' : 'gray'}
            width="25"
            height="25"
            style={{ cursor: 'pointer' }}
            onClick={() =>
              checkedAsBookmark ? removeFromBookmark() : addToBookmark()
            }
          />
        </div>
        <div style={{ display: 'flex' }}>
          <Icon
            icon="mdi:comment"
            color="gray"
            width="25"
            height="25"
            style={{ cursor: 'pointer' }}
          />
          {post?.comments?.length > 0 && (
            <div style={{ fontSize: '16px', marginLeft: '10px' }}>
              {post.comments.length}
            </div>
          )}
        </div>
        <div>
          <Icon
            icon="mdi:share"
            color="gray"
            width="25"
            height="25"
            style={{ cursor: 'pointer' }}
          />
        </div>
      </div>
    </div>
  );
};
