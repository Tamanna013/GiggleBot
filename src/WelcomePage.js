// src/WelcomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const WelcomeContainer = styled.div`
  text-align: center;
  padding: 50px;
  background-color: #fdf4f4;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const MainHeading = styled.h1`
  font-family: 'Pacifico', cursive;
  font-size: 3rem;
  margin-bottom: 40px;
  color: #4d4d4d;
  position: relative;
  z-index: 1;
`;

const CardContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const Card = styled(Link)`
  background-color: #fde8e8;
  padding: 20px 30px;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s;
  text-decoration: none;
  color: inherit;
  z-index: 1;

  &:hover {
    transform: translateY(-10px);
  }
`;

const CardTitle = styled.h2`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.5rem;
  color: #4d4d4d;
  margin-bottom: 10px;
`;

const CardDescription = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  color: #7d7d7d;
`;

const Decoration = styled.div`
  position: absolute;
  background-color: ${(props) => props.color};
  border-radius: 50%;
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  right: ${(props) => props.right};
  bottom: ${(props) => props.bottom};
  opacity: 0.3;
  z-index: 0;
`;

const WelcomePage = () => (
  <WelcomeContainer>
    <MainHeading>Welcome to GiggleBot</MainHeading>
    <CardContainer>
      <Card to="/jokes">
        <CardTitle>laugh w me</CardTitle>
        <CardDescription>generate jokes</CardDescription>
      </Card>
      <Card to="/pickuplines">
        <CardTitle>flirt w me</CardTitle>
        <CardDescription>generate pick-up lines</CardDescription>
      </Card>
    </CardContainer>
    <Decoration color="#f7cfcf" size="100px" top="10%" left="5%" />
    <Decoration color="#cfdff7" size="150px" bottom="15%" right="10%" />
    <Decoration color="#fde8e8" size="120px" top="20%" right="15%" />
    <Decoration color="#f58b8b" size="90px" top="5%" right="20%" />
    <Decoration color="#8baef5" size="130px" bottom="10%" left="15%" />
    <Decoration color="#f5b8b8" size="110px" top="30%" left="25%" />
  </WelcomeContainer>
);

export default WelcomePage;
