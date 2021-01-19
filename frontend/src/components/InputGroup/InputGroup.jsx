import styles from './style/InputGroup.module.css';

export function Input({ formHook, value, onChange, name, type, placeholder }) {
  return (
    <input
      className={styles.Input}
      id={name}
      name={name}
      type={type ? type : 'text'}
      placeholder={placeholder}
      ref={formHook}
      // value={value}
      // onChange={(e) => {
      //   onChange(e.target.value);
      // }}
    />
  );
}

export function InputGroup({ formHook, name, type, placeholder, children }) {
  return (
    <div className={styles.InputGroup}>
      <Input name={name} type={type} placeholder={placeholder} formHook={formHook} />
      <label htmlFor={name}>
        {
          /* label is given as children, so that they can be displayed according to validations happening in parent component */
          children
        }
      </label>
    </div>
  );
}
