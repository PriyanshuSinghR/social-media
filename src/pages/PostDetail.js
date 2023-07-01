import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { PostCard } from '../components/PostCard';
import axios from 'axios';
import { SocialContext } from '../context/SocialContext';

export const PostDetail = () => {
  const { postId } = useParams();
  const [post, setPost] = useState({});

  const { state, dispatch } = useContext(SocialContext);

  const getPost = async () => {
    try {
      const response = await axios.get(`/api/posts/${postId}`);
      setPost(response.data.post);

      console.log(response.data.post);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPost();
  }, [state.helper]);

  return (
    <Hero>
      <PostCard post={post} />

      {post?.comments?.length === 0 ? (
        <h3 style={{ margin: '40px auto', width: '60%' }}>No comments</h3>
      ) : (
        <div>
          {post?.comments?.map((comment) => (
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
              <div
                style={{
                  width: '90%',
                  textAlign: 'left',
                  height: '100%',
                  border: 'none',
                  marginBottom: '5px',
                  fontSize: '18px',
                  color: 'white',
                  display: 'flex',
                }}
              >
                <div style={{ marginRight: '10px' }}>
                  <img
                    src={comment?.image}
                    style={{
                      height: '50px',
                      width: '50px',
                      borderRadius: '50% 50%',
                    }}
                  />
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginTop: '5px',
                  }}
                >
                  <p
                    style={{
                      fontSize: '16px',
                      margin: '0px',
                      fontWeight: 'bold',
                    }}
                  >{`${comment?.firstName} ${comment?.lastName}`}</p>
                  <p style={{ fontSize: '14px', margin: '0px' }}>
                    @{comment?.username}
                  </p>
                </div>
              </div>
              <div
                style={{
                  fontSize: '16px',
                  // width: '80%',
                  textAlign: 'left',
                  padding: '10px 0px',
                  height: '100%',
                  border: 'none',
                }}
              >
                {comment?.comment}
              </div>
            </div>
          ))}
        </div>
      )}
    </Hero>
  );
};
