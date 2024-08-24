/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.html"],
  theme: {
    extend: {
      fontFamily: {
        'heading': ['Noto Serif Georgian', 'serif'],
        'subheading': ['Playfair Display', 'serif'],
        'body': ['lato']
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
