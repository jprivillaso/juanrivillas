import styled from 'styled-components';

export const HeaderContainer = styled.header`
  position: fixed;
  right: 0;
  left: 0;
  display: flex;
  align-items: baseline;
  z-index: 10;
  transition: top 0.3s,
              background-color 0.3s ease-out;
  background: transparent;
  height: 50px;
  padding: 1.45rem 1.45rem 0 1.45rem;

  .header_menu_item {
    padding: 0px 20px;
  }

  &.notTop {
    background-color: white;
  }
`;
