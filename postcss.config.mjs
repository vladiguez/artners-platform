// postcss.config.mjs
export default {
  plugins: {
    '@tailwindcss/postcss': {}, // For Tailwind CSS v3.x, this is correct
    autoprefixer: {},
  },
};