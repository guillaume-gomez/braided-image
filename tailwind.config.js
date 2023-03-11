/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
     daisyui: {
      themes: [
        {
          mytheme: {
           "primary": "#db8649",
           "secondary": "#f8cec1",
           "accent": "#00613a",
           "neutral": "#c5c54e",
           "base-100": "#f8cec1",
           "info": "#7CA2F3",
           "success": "#40E7B5",
           "warning": "#DF8611",
           "error": "#EA1F26",
          },
        },
      ],
    },
  plugins: [require("daisyui")],
}