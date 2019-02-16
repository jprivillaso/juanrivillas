import React from 'react';
import styled from 'styled-components';

import HeaderLogo from './logo';
import HeaderLinks from './links';
import HeaderSocial from './social';

const HeaderContainer = styled.header`
  position: fixed;
  right: 0;
  left: 0;
  display: flex;
  align-items: center;
  z-index: 10;
  transition: top 0.3s;
  background: transparent;

  .header_menu_item {
    padding: 0px 20px;
  }

`;

class Header extends React.Component {
  componentDidMount() {
    let prevScrollpos = window.pageYOffset;

    window.addEventListener('scroll', function () {
      if (typeof window !== 'undefined') {
        const $header = document.getElementsByClassName('header')[0];
        let currentScrollPos = window.pageYOffset;

        if (prevScrollpos > currentScrollPos) {
          $header.style.top = '0';
        } else {
          $header.style.top = '-5.0rem';
        }
        prevScrollpos = currentScrollPos;
      }
    });
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', () => {});
  }

  render() {
    return (
      <HeaderContainer className="header">
        <HeaderLogo siteTitle={'JR'} />
        <HeaderLinks />
        <HeaderSocial />
      </HeaderContainer>
    );
  }
}

export default Header;
