module.exports = {
    content: ["../resources/templates/**/*.{html,js}", "../resources/templates/*.{html,js}", "./node_modules/flowbite/**/*.js", "./main.css"],
    mode: 'jit',
    theme: {
      container: {
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },
      extend: {
        colors: {
          primary: {
            50: "#ebf9ff",
            100: "#c4eeff",
            200: "#b1e9ff",
            300: "#89deff",
            400: "#3bc8ff",
            500: "#00b7ff",
            600: "#0087ec",
            700: "#0063c5",
            800: "#004f9d",
            900: "#003176",
            950: "#00164f"
          }
        }
      },
      
    },
    plugins: [
      require('flowbite/plugin')({
        charts: true,
      }),
    ]
  }
  