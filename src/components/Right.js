import React from 'react';
import kio from '../assets/itachi1.jpeg';

export const Right = ({ login }) => {
  return (
    <section style={{ width: '100%', height: '100%' }}>
      <img
        src={kio}
        style={{
          height: '100%',
          width: '100%',
        }}
        alt=""
      />
    </section>
  );
};

export default Right;
