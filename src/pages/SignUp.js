import React from 'react';
import Right from '../components/Right';
import Left from '../components/Left';

export const SignUp = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        backgroundColor: 'black',
      }}
    >
      <div
        style={{
          display: 'flex',
          margin: 'auto',
          width: '80vw',
          height: '80vh',
          padding: '50px',
        }}
      >
        <Right login="SIGN UP" />
        <Left login="SIGN UP" />
      </div>
    </div>
  );
};
