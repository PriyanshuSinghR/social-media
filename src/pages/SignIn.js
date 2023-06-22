import React from 'react';

import Left from '../components/Left';
import Right from '../components/Right';

export const SignIn = () => {
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
        <Left login="Login" />
        <Right login="Login" />
      </div>
    </div>
  );
};
