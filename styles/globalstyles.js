import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        overflow-x: hidden;
    }
    body {
        font-family: 'Nunito Sans', sans-serif;
        }

       li{
            text-decoration: none;
        }
`;
