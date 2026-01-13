"use client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Global, css } from "@emotion/react";

const fonts = {
  heading: "'EB Garamond', serif",
  body: "'EB Garamond', serif",
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
    50: "#FEF8F3",
    100: "#FEF8F3",
    200: "#FFE8CC",
    300: "#FFDBB3",
    400: "#FFCD99",
    500: "#FEF8F3",
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
      fontFamily: "'EB Garamond', serif",
    },
  },
  Button: {
    baseStyle: {
      fontFamily: "'EB Garamond', serif",
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
          @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600;700;800&display=swap');
          
          html {
          scroll-behavior: smooth;
          scroll-padding-top: 150px;
          }

          body {
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
