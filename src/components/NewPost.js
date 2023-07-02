import { Icon } from '@iconify/react';
import axios from 'axios';
import React, { useContext, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { SocialContext } from '../context/SocialContext';
import { emojis } from '../utils';

export const NewPost = ({ handleToggle }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  const { dispatch } = useContext(SocialContext);
  const [upload, setUpload] = useState({
    content: '',
    mediaURL: '',
  });
  const [emojiOpen, setEmojiOpen] = useState(false);
  const hiddenFileInput = useRef(null);

  const handleClick = () => {
    hiddenFileInput.current.click();
  };
  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    setUpload({ ...upload, mediaURL: URL.createObjectURL(fileUploaded) });
  };

  const postData = async () => {
    const encodedToken = localStorage.getItem('tokenuser');
    try {
      if (upload.content === '') {
        throw Error;
      }
      await axios.post(
        `/api/posts`,
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

      toast.success('New Post is Successfully Uploaded');
      setUpload({ content: '', mediaURL: '' });
      setEmojiOpen(false);
      handleToggle();
    } catch (error) {
      console.log(error);
      toast.warning('Boring!!! ... Write Something🙄');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        margin: 'auto',
        width: '60%',
        paddingBottom: '20px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
        padding: '20px',
        borderRadius: '10px',
        position: 'relative',
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
        <textarea
          value={upload.content}
          onChange={(event) =>
            setUpload({
              ...upload,
              content: event.currentTarget.value,
            })
          }
          style={{
            width: '90%',
            textAlign: 'left',
            padding: '10px',
            border: 'none',
            marginBottom: '5px',
            fontSize: '18px',
            color: 'white',
            backgroundColor: 'transparent',

            boxSizing: 'border-box',
            display: 'flex',
            overflow: 'auto',
            height: '100px',
            resize: 'none',
            outline: 'none',
          }}
        />

        {upload?.mediaURL?.length > 0 && (
          <div style={{ position: 'relative' }}>
            <img
              src={upload?.mediaURL}
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
            marginTop: '10px',
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
              onClick={() => setEmojiOpen(!emojiOpen)}
            />
          </div>
          {emojiOpen && (
            <div
              style={{
                position: 'absolute',
                bottom: '-189px',
                border: '1px solid gray',
                borderRadius: '5px',
                padding: '3px',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
                backgroundColor: 'rgb(41, 49, 76)',
                zIndex: 1,
              }}
            >
              {emojis?.map((emoji) => (
                <div
                  className="select-button"
                  onClick={() => {
                    setUpload({ ...upload, content: upload?.content + emoji });
                  }}
                  style={{ padding: '5px', cursor: 'pointer' }}
                >
                  {emoji}
                </div>
              ))}
            </div>
          )}
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
            onClick={postData}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};
