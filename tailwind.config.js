/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        grayGCI: {
          '800': '#262626',
          '700': '#1A1A1A',
          '600': '#1E1E1E',
          '500': '#373737',
          '200': '#A5A5A5',
          '100': '#D9D9D9'
        },
        purpleGCI: {
          '700': '#D304BF',
          '600': '#9804D3'
        },
        greeGCI: {
          '700': '#016545',
          '600': '#035F54',
        },
        redGCI: {
          '500': '#A60249',
        },
        orangeGCI: {
          '700': '#895F05',
        },
        blueGCI: {
          '500': '#0674DB'
        }
      }
    },
  },
  plugins: [],
}