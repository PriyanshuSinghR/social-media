import React from 'react';

export const Popup = (props) => {
  return (
    <div
      style={{
        position: 'fixed',
        background: '#00000050',
        width: '100%',
        height: '100vh',
        top: 0,
        left: 0,
        zIndex: 1,
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '600px',
          margin: '0 auto',
          height: 'auto',
          maxHeight: '70vh',
          marginTop: 'calc(100vh - 85vh - 20px)',
          background: 'rgb(29 36 56 / 86%)',
          borderRadius: '4px',
          padding: '30px',
          overflowX: 'hidden',
        }}
      >
        <span
          onClick={props.handleClose}
          style={{
            content: 'x',
            cursor: 'pointer',
            position: 'absolute',
            right: '10px',
            top: '10px',
            background: 'red',
            width: '25px',
            height: '25px',
            borderRadius: '50%',
            lineHeight: '20px',
            textAlign: 'center',

            fontSize: '20px',
          }}
          className="button-shadow"
        >
          x
        </span>
        {props.content}
      </div>
    </div>
  );
};
