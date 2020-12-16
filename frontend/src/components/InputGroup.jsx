import React from 'react';

function InputGroup({ formState, name, validate, type, placeholder, children }) {
  const [form, setForm] = formState;

  return (
    <div className='inp-group'>
      <input
        id={name}
        name={name}
        type={type ? type : 'text'}
        placeholder={placeholder}
        value={form[`${name}`]}
        onChange={(e) => {
          setForm({ ...form, [`${name}`]: e.target.value });
        }}
      />
      <label htmlFor={name}>{children}</label>
    </div>
  );
}

export default InputGroup;
