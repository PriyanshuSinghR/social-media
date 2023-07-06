import { Icon } from '@iconify/react';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Hero } from '../components/Hero';
import { NewPost } from '../components/NewPost';
import { PostShow } from '../components/PostShow';
import { SocialContext } from '../context/SocialContext';
import { useClickOutside } from '../customHooks/useClickOutside';

export const Home = () => {
  const { state, dispatch } = useContext(SocialContext);
  const [showSortModal, setShowSortModal] = useState(false);
  const modalRef = useRef();

  useClickOutside(modalRef, setShowSortModal);
  useEffect(() => {
    dispatch({
      type: 'LOADING_STATUS',
      payload: true,
    });
    setTimeout(() => {
      dispatch({
        type: 'LOADING_STATUS',
        payload: false,
      });
    }, 500);
  }, []);

  return (
    <Hero>
      <NewPost handleToggle={() => {}} />
      <div
        style={{
          display: 'flex',
          width: '90%',
          justifyContent: 'space-between',
          margin: '20px auto',
          backgroundColor: 'rgb(41, 49, 76)',
          padding: '10px 20px',
          position: 'relative',
        }}
      >
        <p style={{ margin: '0' }}>{state.sort}</p>
        <div ref={modalRef}>
          <Icon
            icon="mi:filter"
            color="white"
            width="30"
            height="30"
            onClick={() => setShowSortModal((prev) => !prev)}
          />

          {showSortModal ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                position: 'absolute',
                right: '10px',
                border: '1px solid gray',
                fontSize: '14px',
                backgroundColor: 'rgb(41, 49, 76)',
                borderRadius: '5px',
                padding: '2px',
              }}
            >
              <div
                style={{
                  color: state.sort === 'TRENDING' ? '#1d9bf0' : '',
                  padding: '10px',
                  cursor: 'pointer',
                }}
                className="select-button"
                onClick={() => {
                  dispatch({ type: 'SORT', payload: 'TRENDING' });
                  setShowSortModal(false);
                }}
              >
                Trending
              </div>
              <div
                style={{
                  color: state.sort === 'LATEST' ? '#1d9bf0' : '',
                  padding: '10px',
                  cursor: 'pointer',
                }}
                className="select-button"
                onClick={() => {
                  dispatch({ type: 'SORT', payload: 'LATEST' });
                  setShowSortModal(false);
                }}
              >
                Latest
              </div>
              <div
                style={{
                  color: state.sort === 'OLDEST' ? '#1d9bf0' : '',
                  padding: '10px',
                  cursor: 'pointer',
                }}
                className="select-button"
                onClick={() => {
                  dispatch({ type: 'SORT', payload: 'OLDEST' });
                  setShowSortModal(false);
                }}
              >
                Oldest
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <PostShow />
    </Hero>
  );
};
