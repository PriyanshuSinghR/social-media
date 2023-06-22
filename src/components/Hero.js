import { Icon } from '@iconify/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { SuggestionCard } from './SuggestionCard';

export const Hero = ({ children }) => {
  const [users, setUsers] = useState([]);
  const getUsers = async () => {
    const encodedToken = localStorage.getItem('tokenuser');

    try {
      const response = await axios.get(`/api/users`, {
        headers: {
          authorization: encodedToken,
        },
      });

      // console.log(response.data.users);
      setUsers(response.data.users);
    } catch (error) {
      console.log(error);
    }
  };

  const getActiveStyle = ({ isActive }) => ({
    color: 'white',
    textDecoration: 'none',
    marginRight: '20px',
    display: 'flex',
    fontWeight: isActive ? '600' : '200',
    color: isActive ? 'red' : 'white',
  });

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 3fr 1fr',
        height: '100%',
      }}
    >
      <div
        style={{
          height: '100vh',
          margin: '0',
          marginTop: '100px',
          width: '100%',
        }}
      >
        <nav
          style={{
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'left',
            margin: '0',
            justifyContent: 'space-between',
            height: '200px',
            alignItems: 'left',
          }}
        >
          <NavLink to="/" className="navlink-border" style={getActiveStyle}>
            <Icon
              icon="ic:baseline-home"
              color="white"
              width="30"
              height="30"
            />
            <div style={{ padding: '5px' }}>Home</div>
          </NavLink>
          <NavLink
            to="/explore"
            className="navlink-border"
            style={getActiveStyle}
          >
            <Icon
              icon="ic:round-explore"
              color="white"
              width="30"
              height="30"
            />
            <div style={{ padding: '5px' }}>Explore</div>
          </NavLink>
          <NavLink
            to="/bookmark"
            className="navlink-border"
            style={getActiveStyle}
          >
            <Icon
              icon="material-symbols:bookmark-sharp"
              color="white"
              width="30"
              height="30"
            />
            <div style={{ padding: '5px' }}>Bookmarks</div>
          </NavLink>
          <NavLink
            to="/liked"
            className="navlink-border"
            style={getActiveStyle}
          >
            <Icon icon="mdi:heart" color="white" width="30" height="30" />
            <div style={{ padding: '5px' }}>Liked Posts</div>
          </NavLink>
          <button
            style={{
              border: 'none',
              margin: '40px auto',
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
            className="button-shadow"
          >
            Post
          </button>
        </nav>
      </div>
      <div
        style={{
          borderRight: '1px solid #535353',
          borderLeft: '1px solid #535353',
          overflowX: 'hidden',
          height: '100vh',
          marginTop: '100px',

          width: '100%',
        }}
      >
        {children}
      </div>
      <div
        style={{
          textAlign: 'left',
          marginLeft: '10px',
          marginTop: '100px',
          width: '100%',
        }}
      >
        <p style={{ fontSize: '18px', fontWeight: 'bold' }}>
          Suggestions for You
        </p>
        {users.map((user) => (
          <div>
            <SuggestionCard user={user} />
          </div>
        ))}
      </div>
    </div>
  );
};
