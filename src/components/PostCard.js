import { Icon } from '@iconify/react';
import axios from 'axios';
import moment from 'moment';
import React, { useContext, useEffect, useRef } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SocialContext } from '../context/SocialContext';
import { Popup } from './Popup';
import { UpdatePost } from './UpdatePost';
import { useClickOutside } from '../customHooks/useClickOutside';
import { textChanger } from '../utils';

export const PostCard = ({ post }) => {
  const [user, setUser] = useState({ name: '', url: '', userId: '' });
  const [open, setOpen] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [comment, setComment] = useState('');
  const modalRef = useRef();
  const mySelf = JSON.parse(localStorage.getItem('user'));
  const { state, dispatch, removePost, addToFollow, removeFromFollow } =
    useContext(SocialContext);

  const getUserInfo = async () => {
    try {
      const response = await axios.get(`/api/users`);
      const data = response.data.users.find(
        (user) => user.username === post.username,
      );
      setUser({
        name: `${data.firstName} ${data.lastName}`,
        url: data.image,
        userId: data._id,
      });
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
      dispatch({
        type: 'UPDATE_POSTS',
        payload: response.data.posts,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const dislikingPost = async () => {
    const encodedToken = localStorage.getItem('tokenuser');
    try {
      const response = await axios.post(
        `/api/posts/dislike/${post._id}`,
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
        type: 'UPDATE_POSTS',
        payload: response.data.posts,
      });
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

  const commentPost = () => {
    const uPost = {
      ...post,
      comments: [
        ...post?.comments,
        {
          _id: '',
          comment: comment,
          firstName: state.mySelf.firstName,
          lastName: state.mySelf.lastName,
          username: state.mySelf.username,
          image: state.mySelf.image,
        },
      ],
    };
    dispatch({
      type: 'UPDATE_POSTS',
      payload: state.allPosts.map((p) => (p._id === post._id ? uPost : p)),
    });
    setShowComment(false);
  };

  const checkedAsBookmark = () =>
    state?.bookmarkPosts?.reduce((acc, curr) => {
      if (curr?._id === post?._id) {
        return true;
      }
      return acc;
    }, false);

  const checkedAsLiked = () =>
    post?.likes?.likedBy?.reduce((acc, curr) => {
      if (curr?._id === mySelf?._id) {
        return true;
      }
      return acc;
    }, false);

  const toggleEdit = () => setShowEdit(!showEdit);

  useClickOutside(modalRef, () => setOpen(false));

  const textHtlm = textChanger(post?.content);

  useEffect(() => {
    getUserInfo();
  }, [post]);
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        margin: '40px auto',
        width: '60%',
        paddingBottom: '20px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
        padding: '20px',
        borderRadius: '10px',
        position: 'relative',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Link
          to={`/profile/${user.userId}`}
          style={{ textDecoration: 'none', color: 'white' }}
        >
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
        <div style={{ cursor: 'pointer' }} onClick={() => setOpen(!open)}>
          ...
        </div>
      </div>
      <Link
        to={`/post/${post._id}`}
        style={{ textDecoration: 'none', color: 'white' }}
      >
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
          dangerouslySetInnerHTML={{ __html: textHtlm }}
        ></div>
        {post.mediaURL?.length > 0 && (
          <div>
            <img
              src={post.mediaURL}
              style={{ height: '100%', width: '100%' }}
            />
          </div>
        )}
      </Link>
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
            color={checkedAsLiked() ? 'red' : 'gray'}
            width="25"
            height="25"
            style={{ cursor: 'pointer' }}
            onClick={() => (checkedAsLiked() ? dislikingPost() : likingPost())}
          />
          {post?.likes?.likeCount > 0 && (
            <div style={{ fontSize: '16px', marginLeft: '10px' }}>
              {post.likes.likeCount}
            </div>
          )}
        </div>
        <div>
          <Icon
            icon="mdi:bookmark"
            color={checkedAsBookmark() ? 'blue' : 'gray'}
            width="25"
            height="25"
            style={{ cursor: 'pointer' }}
            onClick={() =>
              checkedAsBookmark() ? removeFromBookmark() : addToBookmark()
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
            onClick={() => setShowComment(!showComment)}
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
      {open && (
        <div
          style={{
            position: 'absolute',
            top: '60px',
            right: '10px',
            boxShadow: '0 0 10px rgba(3, 3, 3, 0.5)',
            fontSize: '16px',
            padding: '3px',
            backgroundColor: 'rgb(41 49 76)',
            border: '1px solid gray',
            borderRadius: '5px',
          }}
          ref={modalRef}
        >
          {post?.username === state.mySelf.username ? (
            <div>
              <div
                style={{ padding: '10px', cursor: 'pointer' }}
                className="select-button"
                onClick={() => {
                  toggleEdit();
                  setOpen(!open);
                }}
              >
                Edit
              </div>
              <div
                style={{ padding: '10px', cursor: 'pointer' }}
                className="select-button"
                onClick={() => {
                  removePost(post._id);
                  setOpen(!open);
                }}
              >
                Delete
              </div>
            </div>
          ) : state.mySelf.following.reduce(
              (acc, curr) => (curr.username === post.username ? true : acc),
              false,
            ) ? (
            <div>
              <div
                style={{ padding: '10px', cursor: 'pointer' }}
                className="select-button"
                onClick={() => {
                  removeFromFollow(user.userId);
                  setOpen(!open);
                }}
              >
                Unfollow
              </div>
            </div>
          ) : (
            <div
              style={{ padding: '10px', cursor: 'pointer' }}
              className="select-button"
              onClick={() => {
                addToFollow(user.userId);
                setOpen(!open);
              }}
            >
              Follow
            </div>
          )}
        </div>
      )}
      {showEdit && (
        <div>
          <Popup
            content={
              <div>
                <UpdatePost post={post} editClose={toggleEdit} />
              </div>
            }
            handleClose={toggleEdit}
          />
        </div>
      )}
      {showComment && (
        <div>
          <Popup
            content={
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex' }}>
                  <img
                    src={state.mySelf.image}
                    style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '50% 50%',
                      marginRight: '10px',
                    }}
                  />
                  <input
                    value={comment}
                    type="text"
                    placeholder="Comment on that Post"
                    onChange={(event) => setComment(event.target.value)}
                    style={{
                      backgroundColor: 'transparent',
                      border: 'none',
                      width: '85%',
                      color: 'white',
                      fontSize: '16px',
                    }}
                  />
                </div>
                <div
                  onClick={commentPost}
                  className="button-shadow"
                  style={{
                    border: 'none',
                    margin: '20px auto',
                    cursor: 'pointer',
                    padding: '7px 0px',
                    borderRadius: '15px',
                    backgroundColor: 'red',
                    fontSize: '14px',
                    width: '80px',
                    textAlign: 'center',
                    color: 'white',
                    fontWeight: 'bold',
                  }}
                >
                  Send
                </div>
              </div>
            }
            handleClose={() => setShowComment(!showComment)}
          />
        </div>
      )}
    </div>
  );
};
