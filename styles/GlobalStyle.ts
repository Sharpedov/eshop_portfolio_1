import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    *, *::before, *::after{
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        behavior: "smooth";
    }

    html {
        font-size: 62.5%;
    }

    body {
        font-family: ${({ theme }) => theme.fonts.main};
        font-size: 1.6rem;
        color: ${({ theme }) => theme.color.white};
        background: ${({ theme }) => theme.background.primary};

        ::-webkit-scrollbar {
		    width: 13px;
	    }
	    ::-webkit-scrollbar-thumb {
           background:  rgba(80, 80, 80, 0.95);
             border-radius: 12px;
             border: 3px solid ${({ theme }) => theme.background.primary};
        :hover {
            background:  ${({ theme }) => theme.color.primary};
    }
	}
    }
    h1,h2,h3,h4,h5,h6,button{
        font-family: ${({ theme }) => theme.fonts.title};
		font-weight: 500;
        line-height: 1;
        margin: 0;
        padding: 0;
    }

    input, textarea {
    	caret-color: ${({ theme }) => theme.color.primary};
        outline: none;
        border: none;
    }

    span, label, input,p{
        line-height:1;
    }


    li{
        list-style: none;
    }

    a {
		outline: none;
        text-decoration: none;
        line-height:1;

        &:focus {
            color: gray;
        }
    }

    .ReactModal__Overlay {
	opacity: 0;
	transition: all 0.2s cubic-bezier(0.5, 1, 0.89, 1);
    }

    .ReactModal__Overlay--after-open {
        opacity: 1;
    }

    .ReactModal__Overlay--before-close {
        opacity: 0;
    }
`;

export default GlobalStyle;
