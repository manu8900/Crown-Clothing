import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
	body {
		font-family: 'Open Sans Condensed';
		padding: 20px 40px;
		@media screen and (max-width: 800px) {
			padding: 10px;
		}
    }
    body::-webkit-scrollbar-track{
        box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
        -webkit-box-shadow: inset 0 0 6px rgba(8, 6, 6, 0.3);
        /* border-radius: 10px; */
        background-color: #F5F5F5;
      }
      
      body::-webkit-scrollbar
      {
        width: 10px;
        background-color: #F5F5F5;
      }
      
      body::-webkit-scrollbar-thumb
      {
        border-radius: 10px;
        box-shadow: inset 0 0 6px rgba(0,0,0,.3);;
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
        background-color: #555;
        
      }
	a {
		text-decoration: none;
		color: black;
	}
	* {
		box-sizing: border-box;
	}
`;