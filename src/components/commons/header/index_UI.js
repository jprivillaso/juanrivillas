import styled from 'styled-components';

export const HeaderContainer = styled.header`
  position: fixed;
  right: 0;
  left: 0;
  display: flex;
  align-items: center;
  z-index: 10;
  transition: top 0.3s,
              background-color 0.3s ease-out;
  background: transparent;

  .header_menu_item {
    padding: 0px 20px;
  }

  &.notTop {
    background-color: white;
  }
`;
