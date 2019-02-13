import React from 'react';
import styled from 'styled-components';

const Home = styled.div`
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  max-width: 100% !important;
  margin: 0 !important;
  width: 100%;
  height: 100%;
  display: flex;
`;

const MainImage = styled.img`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -80%);
`;

const home = () => (
  <Home className="page_home">
    <MainImage atl="Welcome Image" src="../../images/welcome.png"/>
  </Home>
);

export default home;
