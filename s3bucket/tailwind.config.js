/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        primary: {
          100:"rgba(255, 183, 0, 1)",
          75:"#f3804e",
          50:"#f76e00"
        },
        danger: "#dc3545",
        menu: "#042b42",
        heading: "#343434",
        client:{
          100:"#5b6eb6",
          50:"#8aaae5"
        },
        border:{
          1:"#cccccc",
        },
        gray:{

        }
      },
      spacing: {
        3.7: "15px",
        4.5: "18px",
        11.5: "46px",
        1.25: "5px",
      },
    },
  },
  plugins: [],
}

