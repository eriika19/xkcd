import React, { useState } from 'react';

import { NavbarItem } from '.';

const NAV_ITEMS = [
  { page: 'Inicio', route: '/' },
  { page: 'Favoritos', route: '/favorites' },
];

const Navbar = props => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <nav className='navbar'>
      <div className='container'>
        <div className='navbar-brand'>
          <figure className='image is-96x96'>
            <img src='/xkcd.png' alt='xkcd-logo' />
          </figure>
          <span
            className={isNavOpen ? 'navbar-burger burger is-active' : 'navbar-burger burger'}
            data-target='navbarMenuHeroB'
            onClick={toggleNav}
          >
            <span></span>
            <span></span>
            <span></span>
          </span>
        </div>
        <div className={isNavOpen ? 'navbar-menu is-active' : 'navbar-menu'} id='navbarMenuHeroB'>
          <div className={isNavOpen ? 'navbar-end is-active' : 'navbar-end'}>
            {NAV_ITEMS.map(item => (
              <NavbarItem key={`${item.page}-nav-item`} {...item} {...props} />
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
