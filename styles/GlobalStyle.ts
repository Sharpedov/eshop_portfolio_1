import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    *, *::before, *::after{
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        behavior: "smooth";
    }

    #nprogress .bar {
        background: ${({ theme }) => theme.color.primary};
    }

    html {
        font-size: 62.5%;
    }

    body {
        position: relative;
        font-family: ${({ theme }) => theme.family.roboto};
        font-size: 1.6rem;
        color: ${({ theme }) => theme.color.white};
        background: ${({ theme }) => theme.surface.primary};

        ::-webkit-scrollbar {
		    width: 13px;
	    }
	    ::-webkit-scrollbar-thumb {
           background:  rgba(80, 80, 80, 0.95);
             border-radius: 12px;
             border: 3px solid ${({ theme }) => theme.surface.primary};
        :hover {
            background:  ${({ theme }) => theme.color.primary};
    }
	}
    }

    input {
    	caret-color: ${({ theme }) => theme.color.primary};
        outline: none;
        border: none;
    }

    span, label, input,p{
        font-family: inherit;
        font-weight: ${({ theme }) => theme.weight.regular};
        line-height:1;
    }

    h1,h2,h3,h4,h5,h6 {
        font-family: inherit;
        font-weight: ${({ theme }) => theme.weight.regular};
		line-height: 1;
        margin: 0;
        padding: 0;
    }

    li{
        list-style: none;
    }

    a {
        font-family: inherit;
        font-weight: ${({ theme }) => theme.weight.regular};
		outline: none;
        text-decoration: none;
        line-height:1;

        &:focus {
            color: gray;
        }
    }
`;

export default GlobalStyle;
