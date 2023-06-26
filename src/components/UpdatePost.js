import { Icon } from '@iconify/react';
import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { SocialContext } from '../context/SocialContext';

export const UpdatePost = ({ post, editClose }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const { state, dispatch } = useContext(SocialContext);

  const [upload, setUpload] = useState({
    content: post.content,
    mediaURL: post.mediaURL,
  });

  const newPostRef = useRef();
  console.log(upload);
  const hiddenFileInput = useRef(null);

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    setUpload({ ...upload, mediaURL: URL.createObjectURL(fileUploaded) });
  };

  const postData = async () => {
    const encodedToken = localStorage.getItem('tokenuser');

    try {
      const response = await axios.post(
        `/api/posts/edit/${post._id}`,
        { postData: upload },
        {
          headers: {
            authorization: encodedToken,
          },
        },
      );
      dispatch({
        type: 'HELPER',
      });

      toast.success('Post is updated Successfully');
      console.log(response.data.posts);
    } catch (error) {
      console.log(error);
      toast.warning('Please First Sign In');
    }
  };

  useEffect(() => {
    newPostRef.current.innerHTML = post.content;
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        margin: 'auto',
        width: '100%',
        paddingBottom: '20px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
        padding: '20px',
        borderRadius: '10px',
        backgroundColor: '#13192c',
        height: '100%',
      }}
    >
      <div>
        <img
          src={user?.image}
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
          alignItems: 'right',

          flexDirection: 'column',
          width: '90%',
        }}
      >
        <div
          role="textbox"
          ref={newPostRef}
          placeholder="What's happening?"
          contentEditable
          suppressContentEditableWarning={true}
          style={{
            width: '90%',
            textAlign: 'left',
            padding: '10px',
            height: '100%',
            border: 'none',
            marginBottom: '20px',
            fontSize: '18px',
            color: 'white',
          }}
          onInput={(event) =>
            setUpload({ ...upload, content: event.currentTarget.innerHTML })
          }
        ></div>
        {upload.mediaURL.length > 0 && (
          <div style={{ position: 'relative' }}>
            <img
              src={upload.mediaURL}
              style={{ height: '100%', width: '100%' }}
            />
            <Icon
              icon="typcn:delete"
              color="red"
              width="50"
              height="50"
              onClick={() => setUpload({ ...upload, mediaURL: '' })}
              style={{
                position: 'absolute',
                top: 0,
                right: '0',
                cursor: 'pointer',
              }}
            />
          </div>
        )}
        <div
          style={{
            display: 'flex',
            borderTop: '1px solid #535353',
            width: '90%',
            justifyContent: 'space-between',
            padding: '10px',
            marginTop: '30px',
          }}
        >
          <div
            style={{
              display: 'flex',
              width: '60px',
              justifyContent: 'space-between',
            }}
          >
            <Icon
              icon="ic:baseline-photo"
              color="white"
              width="25"
              height="25"
              style={{ cursor: 'pointer' }}
              onClick={handleClick}
            />
            <Icon
              icon="fluent:emoji-20-filled"
              color="white"
              width="25"
              height="25"
              style={{ cursor: 'pointer' }}
            />
          </div>
          <input
            type="file"
            accept="image/*"
            ref={hiddenFileInput}
            onChange={handleChange}
            style={{ display: 'none' }}
          />
          <button
            style={{
              border: 'none',
              cursor: 'pointer',
              padding: ' 0px',
              borderRadius: '15px',
              backgroundColor: 'red',
              fontSize: '14px',
              width: '60px',
              textAlign: 'center',
              color: 'white',
              fontWeight: 'bold',
            }}
            className="button-shadow"
            onClick={() => {
              postData();
              editClose();
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
