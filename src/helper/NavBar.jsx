import React from 'react';
import { Link } from 'react-router-dom';

const links = [
  {
    name: 'View',
    href: '/'
  },
  {
    name: 'Creacion',
    href: '/create'
  },
];

export const NavBar = ({ isLoggedIn, onLogout }) => {
  return (
    <div>
      {links.map((x) => (
        <Link to={x.href} key={x.name}>
          {x.name}
        </Link>
      ))}
      {isLoggedIn && <button onClick={onLogout}>Cerrar sesión</button>}
    </div>
  );
};