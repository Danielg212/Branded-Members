import React from 'react';
import styles from './style/InputGroup.module.css';

export function Input({ value, onChange, name, type, placeholder }) {
  return (
    <input
      className={styles.Input}
      id={name}
      name={name}
      type={type ? type : 'text'}
      placeholder={placeholder}
      value={value}
      onChange={(e) => {
        onChange(e.target.value);
      }}
    />
  );
}

export function InputGroup({ formState, name, type, placeholder, children }) {
  const [form, setForm] = formState;

  return (
    <div className={styles.InputGroup}>
      <Input
        name={name}
        type={type}
        placeholder={placeholder}
        value={form[`${name}`]} // 'form' is an object, 'name' is a property
        onChange={(item) => {
          setForm({ ...form, [`${name}`]: item });
        }}
      />
      <label htmlFor={name}>
        {
          /* label is given as children, so that they can be displayed according to validations happening in parent component */
          children
        }
      </label>
    </div>
  );
}
