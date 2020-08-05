import PropTypes from 'prop-types';
import Link from 'next/link';

const NavbarItem = ({ route, page, active_route }) => (
  <Link href={route}>
    <a className={'navbar-item ' + (route === active_route ? 'is-active' : '')}>{page}</a>
  </Link>
);

NavbarItem.propTypes = {
  active_route: PropTypes.string,
  page: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
};

export default NavbarItem;
