import React from 'react';
import { Link } from 'gatsby';
import { FaGithub } from 'react-icons/fa';

const menuItems = [
  {
    label: 'Home',
    path: '/',
  },
  {
    label: 'Articles',
    path: '/articles',
  },
  {
    label: 'Talks',
    path: '/talks',
  },
];

const HeaderLogo = ({ siteTitle }) => (
  <div
    className="header_logo"
    style={{
      margin: '0 auto',
      padding: '1.45rem 1.0875rem',
      position: 'absolute',
    }}
  >
    <h2 style={{ margin: 0 }}>
      <Link
        to="/"
        style={{
          color: 'black',
          textDecoration: 'none',
        }}
      >
        {siteTitle}
      </Link>
    </h2>
  </div>
);

const HeaderLinks = () => {
  const headerLinks = menuItems.map(item => {
    return (
      <h5 key={`${ item.label }-h5` } className="header_menu_item">
        <Link
          key={item.label}
          to={`/${ item.path.toLowerCase() }`}
          style={{
            color: 'black',
            textDecoration: 'none',
          }}
        >
          {item.label}
        </Link>
      </h5>
    );
  });

  return (
    <div
      className="header_menu"
      style={{
        margin: '0 auto',
        padding: '1.45rem 1.0875rem',
        display: 'flex',
        width: '100%',
        maxWidth: '100%',
        justifyContent: 'center',
      }}
    >
      {headerLinks}
    </div>
  );
};

const HeaderSocial = () => (
  <div
    className="header_socials"
    style={{
      margin: '0 auto',
      padding: '1.45rem 1.0875rem',
      position: 'absolute',
      right: 0,
    }}
  >
    <a
      href="https://github.com/jprivillaso"
      title="github"
      style={{
        fontSize: '2em',
        color: 'black',
      }}
    >
      <FaGithub />
    </a>
  </div>
);

const Header = () => (
  <header
    className="header"
    style={{
      background: 'transparent',
      position: 'fixed',
      top: 0,
      right: 0,
      left: 0,
      display: 'flex',
      alignItems: 'center',
    }}
  >
    <HeaderLogo siteTitle={'JR'} />
    <HeaderLinks />
    <HeaderSocial />
  </header>
);

export default Header;
