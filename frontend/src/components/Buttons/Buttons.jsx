import React from 'react';
import styles from './style/Buttons.module.css';
import { Link } from 'react-router-dom';

export function Button({ children, onClick, type }) {
  return (
    <button className={styles.Button} onClick={onClick} type={type}>
      {children}
    </button>
  );
}

export function LinkButton({ children, to }) {
  return (
    <Link to={to}>
      <Button>{children}</Button>
    </Link>
  );
}
