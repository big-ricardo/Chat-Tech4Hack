import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`


    *{
        font-family: 'Chau Philomene One', Open-Sans, Helvetica, Sans-Serif;
    }

    body{
        background-color: ${props=>props.theme.primary}
    }

`;

export default GlobalStyle;
