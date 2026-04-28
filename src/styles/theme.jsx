import { css } from "styled-components";

export const lightTheme = {


  // Colors object (for your Title component and others)
  colors: {
    primary: "#ffffff",
    secondary: "#f8f9fa",
    success: "#28a745",
    danger: "#dc3545",
    warning: "#ffc107",
    info: "#17a2b8",
    light: "#f8f9fa",
    dark: "#343a40",
    // Text colors
    text: "#212529",
    textSecondary: "#6c757d",
    textLight: "#f8f9fa",
  },

  // Background Colors
  background: {
    primary: "#ffffff",
    secondary: "#f8f9fa",
    tertiary: "#e9ecef",
  },

  button : {
    primary: "#1e1e1e",
    secondary: "#2d2d2d",
  },

  cell: {
    background: "#2d2d2d",
  },

  // Text Colors
  text: {
    primary: "#212529",
    secondary: "#6c757d",
    light: "#f8f9fa",
  },

  // Border Colors
  border: {
    primary: "#dee2e6",
    secondary: "#e9ecef",
  },

  // Shadows
  shadow: {
    light: "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
    medium: "0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)",
    heavy: "0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)",
  },

  // Spacing
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    xxl: "3rem",
  },

  // Border Radius
  borderRadius: {
    sm: "0.25rem",
    md: "0.5rem",
    lg: "1rem",
    xl: "1.5rem",
    full: "9999px",
  },

  // Font Sizes
  fontSize: {
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    xxl: "1.5rem",
    xxxl: "2rem",
    xxxxl: "3rem",
  },

  // Font Weights
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  // Transitions
  transition: {
    fast: "all 0.2s ease-in-out",
    normal: "all 0.3s ease-in-out",
    slow: "all 0.5s ease-in-out",
  },

  // Breakpoints
  breakpoints: {
    mobile: "480px",
    tablet: "768px",
    desktop: "1024px",
    wide: "1440px",
  },

  // Media Queries
  media: {
    mobile: (styles) => css`
      @media (max-width: 480px) {
        ${styles}
      }
    `,
    mobileLandscape: (styles) => css`
      @media (max-width: 768px) and (orientation: landscape) {
        ${styles}
      }
    `,
    tablet: (styles) => css`
      @media (max-width: 768px) {
        ${styles}
      }
    `,
    tabletUp: (styles) => css`
      @media (min-width: 769px) {
        ${styles}
      }
    `,
    desktop: (styles) => css`
      @media (min-width: 1024px) {
        ${styles}
      }
    `,
    wide: (styles) => css`
      @media (min-width: 1440px) {
        ${styles}
      }
    `,
  },
};

export const darkTheme = {

  // Colors object
  colors: {
    primary: "#1e1e1e",
    secondary: "#2d2d2d",
    success: "#198754",
    danger: "#dc3545",
    warning: "#ffc107",
    info: "#0dcaf0",
    light: "#f8f9fa",
    dark: "#343a40",
    // Text colors
    text: "#f8f9fa",
    textSecondary: "#adb5bd",
    textLight: "#e9ecef",
  },

    cell: {
    background: "#d9d9d9",
  },

  // Background Colors
  background: {
    primary: "#1e1e1e",
    secondary: "#2d2d2d",
    tertiary: "#3d3d3d",
  },

  // Text Colors
  text: {
    primary: "#f8f9fa",
    secondary: "#adb5bd",
    light: "#e9ecef",
  },

   button : {
    primary: "#f8f9fa",
    secondary: "#adb5bd",
  },

  // Border Colors
  border: {
    primary: "#495057",
    secondary: "#3d3d3d",
  },

  // Shadows
  shadow: {
    light: "0 1px 3px rgba(0, 0, 0, 0.3), 0 1px 2px rgba(0, 0, 0, 0.4)",
    medium: "0 3px 6px rgba(0, 0, 0, 0.4), 0 3px 6px rgba(0, 0, 0, 0.5)",
    heavy: "0 10px 20px rgba(0, 0, 0, 0.5), 0 6px 6px rgba(0, 0, 0, 0.6)",
  },

  // Spacing
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    xxl: "3rem",
  },

  // Border Radius
  borderRadius: {
    sm: "0.25rem",
    md: "0.5rem",
    lg: "1rem",
    xl: "1.5rem",
    full: "9999px",
  },

  // Font Sizes
  fontSize: {
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    xxl: "1.5rem",
    xxxl: "2rem",
    xxxxl: "3rem",
  },

  // Font Weights
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  // Transitions
  transition: {
    fast: "all 0.2s ease-in-out",
    normal: "all 0.3s ease-in-out",
    slow: "all 0.5s ease-in-out",
  },

  // Breakpoints
  breakpoints: {
    mobile: "480px",
    tablet: "768px",
    desktop: "1024px",
    wide: "1440px",
  },

  // Media Queries
  media: {
    mobile: (styles) => css`
      @media (max-width: 480px) {
        ${styles}
      }
    `,
    mobileLandscape: (styles) => css`
      @media (max-width: 768px) and (orientation: landscape) {
        ${styles}
      }
    `,
    tablet: (styles) => css`
      @media (max-width: 768px) {
        ${styles}
      }
    `,
    tabletUp: (styles) => css`
      @media (min-width: 769px) {
        ${styles}
      }
    `,
    desktop: (styles) => css`
      @media (min-width: 1024px) {
        ${styles}
      }
    `,
    wide: (styles) => css`
      @media (min-width: 1440px) {
        ${styles}
      }
    `,
  },
};
