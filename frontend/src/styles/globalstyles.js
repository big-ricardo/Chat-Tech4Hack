import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    *{
        font-family: Sans-Serif, Open-Sans,'Chau Philomene One', Helvetica;
        box-sizing: border-box;
        padding: 0;
        margin: 0;
        outline: 0;
    }
    body, html{
   
        background: #FFF;
        font-family: 'Helvetica Neue', 'Helvetica', Arial, sans-serif;
        text-rendering: optimizeLegibility !important;
        -webkit-font-smoothing: antialiased !important;
        height: 100%;
        width: 100%;
    }
`;

export default GlobalStyle;
