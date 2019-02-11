import React from 'react';
import styled from 'styled-components';
import './home.css';

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

const home = () => (
  <Home className="page_home" />
);

export default home;
