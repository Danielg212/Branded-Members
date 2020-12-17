import React from 'react';
import { Link } from 'react-router-dom';

export default function LinkBtn({ to, text }) {
  return (
    <Link to={to}>
      <button className='btn'>{text}</button>
    </Link>
  );
}
