import React, { useContext } from 'react';
import { SocialContext } from '../context/SocialContext';
import { Link } from 'react-router-dom';

export const SuggestionCard = ({ user }) => {
  const { addToFollow } = useContext(SocialContext);

  return (
    <div
      style={{
        display: 'flex',
        borderBottom: '1px solid gray',
        margin: '5px',
        marginRight: '20px',
      }}
    >
      <Link
        to={`/profile/${user?._id}`}
        style={{ display: 'flex', color: 'white', textDecoration: 'none' }}
      >
        <div>
          <img
            src={user?.image}
            style={{
              height: '35px',
              width: '35px',
              borderRadius: '50% 50%',
              padding: '10px 0px',
            }}
          ></img>
        </div>
        <div style={{ margin: '10px', width: '150px' }}>
          <p
            style={{ fontSize: '16px', margin: '0px' }}
          >{`${user?.firstName} ${user?.lastName}`}</p>
          <p style={{ fontSize: '14px', margin: '0px' }}>@{user?.username}</p>
        </div>
      </Link>
      <div>
        <p
          style={{
            cursor: 'pointer',
            padding: '7px 0px',
            marginTop: '15px',
            borderRadius: '15px',
            backgroundColor: 'red',
            fontSize: '14px',
            width: '80px',
            textAlign: 'center',
            color: 'white',
            fontWeight: 'bold',
          }}
          className="button-shadow"
          onClick={() => addToFollow(user?._id)}
        >
          + Follow
        </p>
      </div>
    </div>
  );
};
