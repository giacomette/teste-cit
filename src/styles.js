import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    font-family: Roboto, sans-serif;
    background-color: #efefef;
  }
`;

export const Container = styled.div`
  max-width: 1200px;
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  margin-top: 80px;
  .fc-scrollgrid {
    background-color: white;
    box-shadow: 0 0 8px 5px rgba(0, 0, 0, 0.04);
  }
`;
