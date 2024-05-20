import { Box, Button, Typography } from '@mui/material';
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
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
      {links.map((x) => (
        <Link to={x.href} key={x.name}>
          <Typography sx={{ minWidth: 100 }} >{x.name}</Typography >
        </Link>
      ))}
      {isLoggedIn && <Button variant="outlined" onClick={onLogout}>Cerrar sesión</Button>}
      </Box>
    </div>
  );
};