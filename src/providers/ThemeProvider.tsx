"use client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Global, css } from "@emotion/react";

const fonts = {
  heading: "'Inter', sans-serif",
  body: "'Inter', sans-serif",
};

const breakpoints = {
  base: "0px",
  sm: "480px",
  md: "768px",
  lg: "1024px",
  xl: "1100px",
  "2xl": "1536px",
};

const colors = {
  flint: {
    50: "#FFF9F0",
    100: "#FFF4E6",
    200: "#FFE8CC",
    300: "#FFDBB3",
    400: "#FFCD99",
    500: "#FFB366",
    600: "#E69A4D",
    700: "#CC8033",
    800: "#B3661A",
    900: "#994D00",
  },
  spark: {
    50: "#FFFBEB",
    100: "#FFF3C4",
    200: "#FFE99D",
    300: "#FFE076",
    400: "#FFD74F",
    500: "#FFCD28",
    600: "#E6B824",
    700: "#CCA320",
    800: "#B38E1C",
    900: "#997918",
  },
};

const components = {
  Heading: {
    baseStyle: {
      fontFamily: "'Inter', sans-serif",
    },
  },
  Button: {
    baseStyle: {
      fontFamily: "'Inter', sans-serif",
    },
  },
  Container: {
    baseStyle: {
      maxW: "1250px",
    },
  },
};

export const theme = extendTheme({ fonts, breakpoints, colors, components });

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={theme}>
      {children}
      <Global
        styles={css`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
          
          html, body {
          overflow-y: hidden;
          overflow-y: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
          }

          ::-webkit-scrollbar {
          display: none;
          }

          img {
            -webkit-user-drag: none;
            -webkit-touch-callout: none;
            -webkit-tap-highlight-color: transparent;
          }

          img[src$=".svg"] {
            image-rendering: auto;
            -webkit-image-rendering: auto;
          }

          * {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
        `}
      />
    </ChakraProvider>
  );
}
