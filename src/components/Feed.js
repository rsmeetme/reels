import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

let logout = async () => {
  logout();
};

export default function Feed() {
  const { logout } = useContext(AuthContext);
  return (
    <>
      <h1>This is feed page.</h1>
      <button onClick={logout}>Logout user</button>
    </>
  );
}
