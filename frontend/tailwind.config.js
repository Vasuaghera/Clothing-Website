module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    'motion-safe:opacity-100',
    'motion-safe:translate-y-0',
    'motion-safe:transition-all',
    'motion-safe:duration-500',
  ],
};
