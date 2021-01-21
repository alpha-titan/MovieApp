import React from 'react'
import styled from 'styled-components'

const Navbar = styled.header`
  height: 80px;
  background-color: #0c121c;
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: -3px 15px 11px -6px rgba(0, 0, 0, 0.63);
`;

const Logo = styled.div`
    font-weight:400;
    color: white;
    font-size:2rem;
    margin-left:10px;
`;

const Search = styled.input`
    height:30px;
    border:none;
    border-radius:30px;
    margin-right:10px;
    padding:6px;
    font-size:1.5rem;
`;
const AppHeader = () => {
    return (
        <Navbar>
            <Logo>WOOKIE MOVIES</Logo>
            <Search />
        </Navbar>
    )
}

export default AppHeader
