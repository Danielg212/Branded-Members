import React from 'react';

export default function InputGroup({ formState, name, type, placeholder, children }) {
  const [form, setForm] = formState;

  return (
    <div className='inp-group'>
      <input
        id={name}
        name={name}
        type={type ? type : 'text'}
        placeholder={placeholder}
        value={form[`${name}`]} // 'form' is an object, 'name' is a property
        onChange={(e) => {
          setForm({ ...form, [`${name}`]: e.target.value });
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
