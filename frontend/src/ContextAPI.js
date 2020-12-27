import React from 'react';

export const TokenContext = React.createContext();
export const TokenProvider = (props) => {
  const [token, setToken] = React.useState('');

  return <TokenContext.Provider value={[token, setToken]}>{props.children}</TokenContext.Provider>;
};
