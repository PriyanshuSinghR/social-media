import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { SocialContext } from '../context/SocialContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { getSearchedUser } from '../utils';

const NavigationBar = () => {
  const { state, dispatch } = useContext(SocialContext);
  const history = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  const logoutHandler = () => {
    localStorage.removeItem('tokenuser');
    localStorage.removeItem('user');
    toast.success('Logout Successfully');

    dispatch({
      type: 'LOGIN_STATUS',
      payload: false,
    });

    history('/signin');
  };

  const allUsers = async () => {
    try {
      const response = await axios.get(`/api/users`);
      console.log(response.data.users);

      dispatch({
        type: 'UPDATE_USERS',
        payload: response.data.users,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const search = getSearchedUser(state.allUsers, state.searchInput);

  // useEffect(() => {
  //   if (state.searchInput.length > 0) {
  //     dispatch({
  //       type: 'UPDATE_PRODUCTS',
  //       payload: [...state.allProducts].filter((item) =>
  //         item.name.toLowerCase().includes(state.searchInput.toLowerCase()),
  //       ),
  //     });
  //     history('./');
  //   } else {
  //     dispatch({
  //       type: 'UPDATE_PRODUCTS',
  //       payload: [...state.allProducts],
  //     });
  //   }
  // }, [state.searchInput]);

  useEffect(() => {
    allUsers();
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        margin: 'auto',
        padding: '0px 20px',
        position: 'relative',
      }}
    >
      <Link to="/" style={{ textDecoration: 'none' }}>
        <h1 style={{ color: 'white' }}>Amatarasu</h1>
      </Link>
      <div
        style={{
          margin: 'auto',
          display: 'flex',
          backgroundColor: 'white',
          borderRadius: '10px',
          width: '400px',
        }}
      >
        <Icon
          icon="material-symbols:search"
          width="30"
          height="30"
          style={{ margin: '5px', color: '#4700d3' }}
        />
        <input
          value={state.searchInput}
          onChange={(event) =>
            dispatch({ type: 'SEARCH_PRODUCTS', payload: event.target.value })
          }
          style={{
            width: '100%',
            border: 'none',
            borderRadius: '0px 10px 10px 0px',
            fontSize: '18px',
            color: '#4700d3',
          }}
        />{' '}
      </div>
      <div
        style={{ color: 'white', display: 'flex', cursor: 'pointer' }}
        onClick={togglePopup}
      >
        <img
          src={user.image}
          style={{
            height: '50px',
            width: '50px',
            borderRadius: '50% 50%',
            padding: '10px 0px',
          }}
        ></img>
        <div style={{ padding: '25px 0px', marginLeft: '10px' }}>
          {user.firstName}
        </div>
        <Icon
          icon="ep:arrow-down-bold"
          width="20"
          height="20"
          style={{ color: 'rgb(175 39 35)', padding: '20px 0px' }}
        />
      </div>
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            top: '60px',
            right: '10px',
            backgroundColor: 'rgb(30 41 59)',
            zIndex: 1,
            boxShadow: '0 7px 30px 0 black',
            borderRadius: '10px',
            padding: '5px 20px',
            // paddingTop: '30px',
          }}
        >
          <div
            style={{ marginTop: '10px', padding: '5px' }}
            className="nav-down"
          >
            <Link
              to={`/profile/${user._id}`}
              style={{
                textDecoration: 'none',
                color: '#4361EE',
              }}
              onClick={togglePopup}
            >
              Profile
            </Link>
          </div>
          <p
            style={{ color: 'red', padding: '5px', cursor: 'pointer' }}
            className="nav-down"
            onClick={logoutHandler}
          >
            Logout
          </p>
        </div>
      )}
      {state?.searchInput?.length > 0 && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            position: 'absolute',
            top: '80px',
            left: '40%',
            backgroundColor: 'gray',
            padding: '3px',
            border: '1px solid gray',
            borderRadius: '10px',
          }}
        >
          {search?.map((e) => (
            <Link
              to={`/profile/${e._id}`}
              style={{
                display: 'flex',
                cursor: 'pointer',
                padding: '5px 10px',
                textDecoration: 'none',
                color: 'white',
              }}
              className="select-button"
              onClick={() => {
                dispatch({ type: 'SEARCH_PRODUCTS', payload: '' });
                dispatch({ type: 'HELPER' });
              }}
            >
              <div>
                <img
                  src={e?.image}
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
                >{`${e?.firstName} ${e?.lastName}`}</p>
                <p style={{ fontSize: '14px', margin: '0px' }}>
                  @{e?.username}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default NavigationBar;
