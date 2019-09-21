import React from 'react';

import HeaderLogo from './logo';
import HeaderLinks from './links';
import HeaderSocial from './social';
import {
  HeaderContainer
} from './index_UI';

class Header extends React.Component {
  componentDidMount() {
    let prevScrollpos = window.pageYOffset;

    window.addEventListener('scroll', function () {
      if (typeof window !== 'undefined') {
        const $header = document.getElementsByClassName('header')[0];
        let currentScrollPos = window.pageYOffset;

        if (prevScrollpos >= currentScrollPos) {
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
