import PropTypes from 'prop-types';
import Link from 'next/link';

const NavbarItem = ({ route, page, activeRoute }) => (
  <Link href={route}>
    <a className={route === activeRoute ? 'navbar-item is-active' : 'navbar-item'}>{page}</a>
  </Link>
);

NavbarItem.propTypes = {
  activeRoute: PropTypes.string,
  page: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
};

export default NavbarItem;
