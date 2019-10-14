import React from 'react';
import ReactGA from 'react-ga';

import * as S from './styled';

const trackClickTheme = theme => {
  ReactGA.event({
    category: 'Theme',
    action: 'click',
    label: `Theme - Change to ${ theme }`
  });
};

const toggleDarkMode = e => {
  let theme = '';

  if (e.currentTarget.checked) {
    theme = 'theme-dark';
    document.getElementsByTagName('body')[0].classList.add('theme-dark');
  } else {
    theme = 'theme-light';
    document.getElementsByTagName('body')[0].classList.remove('theme-dark');
  }

  trackClickTheme(theme);
  window.__setTheme(theme);

  if (window && window.DISQUS !== undefined) {
    window.setTimeout(() => window.DISQUS.reset({ reload: true }), 600);
  }
};

const isDarkModeSet = () => {
  // eslint-disable-next-line no-undef
  const currentTheme = localStorage.getItem('theme');

  if (currentTheme === 'theme-dark' && typeof document !== 'undefined') {
    const darkModeEl = document.getElementById('dark-mode-toggle');
    if (darkModeEl) darkModeEl.checked = true;
  }
};

const getCheckboxElement = theme => (
  <input
    type="checkbox"
    id="dark-mode-toggle"
    checked={ theme === 'dark' ? true : undefined }
    onClick={e => toggleDarkMode(e)}
  />
);

const DarkModeToggle = () => {
  return (
    <S.ThemeSwitchWrapper className="theme-switch-wrapper">
      <label className="theme-switch" htmlFor="dark-mode-toggle">
        {
          isDarkModeSet() ? (
            getCheckboxElement('dark')
          ) : (
            getCheckboxElement()
          )
        }
        <div className="slider round"></div>
      </label>
    </S.ThemeSwitchWrapper>
  );
};

export default DarkModeToggle;
