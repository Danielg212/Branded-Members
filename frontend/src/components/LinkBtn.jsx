import React from 'react';
import { Link } from 'react-router-dom';

function LinkBtn({ to, text, children }) {
  return (
    <Link to={to}>
      <button className={children ? 'btn-no-style' : 'btn'}>
        {text}
        {children}
      </button>
    </Link>
  );
}

export default LinkBtn;
