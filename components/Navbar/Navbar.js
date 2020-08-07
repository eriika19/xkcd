import React, { useState } from 'react';

import { NavbarInput, NavbarItem } from '.';

const NAV_ITEMS = [
  { page: 'Buscador', route: '/' },
  { page: 'Favoritos', route: '/favorites' },
];

const Navbar = props => {
  const { active_route } = props;
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
          {active_route === NAV_ITEMS[0].route ? <NavbarInput /> : ''}
          <span
            className={'navbar-burger burger ' + (isNavOpen ? 'is-active' : '')}
            data-target='navbarMenuHeroB'
            onClick={toggleNav}
          >
            <span></span>
            <span></span>
            <span></span>
          </span>
        </div>
        <div className={'navbar-menu ' + (isNavOpen ? 'is-active' : '')} id='navbarMenuHeroB'>
          <div className={'navbar-end ' + (isNavOpen ? 'is-active' : '')}>
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
